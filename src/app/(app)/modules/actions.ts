"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { QuizQuestion } from "@/lib/types";

const PASS_THRESHOLD = 0.8;

export async function markInProgress(moduleId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: existing } = await supabase
    .from("module_progress")
    .select("status")
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .maybeSingle();

  if (existing?.status === "completed") return;

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_id: moduleId,
      status: "in_progress",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" }
  );
}

export async function submitQuiz(
  moduleId: string,
  moduleSlug: string,
  answers: Record<string, string>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*, quiz_options(*)")
    .eq("module_id", moduleId)
    .returns<QuizQuestion[]>();

  const total = questions?.length ?? 0;
  let score = 0;

  for (const q of questions ?? []) {
    const chosenOptionId = answers[q.id];
    const correctOption = q.quiz_options.find((o) => o.is_correct);
    if (chosenOptionId && correctOption && chosenOptionId === correctOption.id) {
      score += 1;
    }
  }

  const passed = total > 0 && score / total >= PASS_THRESHOLD;

  await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    module_id: moduleId,
    score,
    total,
    passed,
  });

  await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_id: moduleId,
      status: passed ? "completed" : "in_progress",
      completed_at: passed ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" }
  );

  revalidatePath("/modules");
  revalidatePath("/progress");
  revalidatePath(`/modules/${moduleSlug}`);

  return { score, total, passed };
}

export async function saveNote(moduleId: string | null, note: string, noteId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  if (noteId) {
    await supabase
      .from("staff_notes")
      .update({ note, updated_at: new Date().toISOString() })
      .eq("id", noteId)
      .eq("user_id", user.id);
  } else {
    await supabase.from("staff_notes").insert({
      user_id: user.id,
      module_id: moduleId,
      note,
    });
  }

  revalidatePath("/progress");
  if (moduleId) {
    const { data: mod } = await supabase
      .from("modules")
      .select("slug")
      .eq("id", moduleId)
      .single();
    if (mod) revalidatePath(`/modules/${mod.slug}`);
  }
}

export async function deleteNote(noteId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  await supabase.from("staff_notes").delete().eq("id", noteId).eq("user_id", user.id);
  revalidatePath("/progress");
}
