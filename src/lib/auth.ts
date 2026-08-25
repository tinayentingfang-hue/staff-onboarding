import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  if (profile) return { supabase, user, profile };

  // No profile row yet — normally created by a database trigger on signup,
  // but a re-invite of an existing (unconfirmed) auth user reuses the row
  // instead of inserting a new one, so the trigger never fires. Self-heal
  // here instead of leaving the user stuck. Concurrent requests (e.g. link
  // prefetching) can race to insert the same row — whichever loses that
  // race just re-reads the winner's row rather than failing.
  const { data: created } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      role: user.email === "tina.yenting.fang@gmail.com" ? "admin" : "staff",
      start_date: new Date().toISOString().slice(0, 10),
    })
    .select("*")
    .maybeSingle<Profile>();

  if (created) return { supabase, user, profile: created };

  const { data: refetched } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  if (!refetched) redirect("/login");

  return { supabase, user, profile: refetched };
}

export async function requireAdmin() {
  const ctx = await requireUser();
  if (ctx.profile.role !== "admin") redirect("/modules");
  return ctx;
}
