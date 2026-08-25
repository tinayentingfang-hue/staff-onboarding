"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Supabase's default (no custom SMTP) invite/reset emails deliver the
// session as a URL fragment (#access_token=...) rather than a server-side
// token, and always redirect back to the Site URL — i.e. here. Pick that up
// client-side, since fragments never reach the server.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.slice(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(() => {
          router.replace("/set-password");
        });
        return;
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      router.replace(data.session ? "/modules" : "/login");
    });
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-iso-paper">
      <p className="text-sm text-iso-ink/40">Loading…</p>
    </main>
  );
}
