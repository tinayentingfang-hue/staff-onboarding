"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export async function updateModuleContent(moduleId: string, title: string, content: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: mod } = await supabase
    .from("modules")
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq("id", moduleId)
    .select("slug")
    .single();

  revalidatePath("/modules");
  revalidatePath("/admin");
  if (mod) revalidatePath(`/modules/${mod.slug}`);
}

export async function addQuestion(
  moduleId: string,
  question: string,
  options: { text: string; isCorrect: boolean }[]
) {
  await requireAdmin();
  const supabase = await createClient();

  const { count } = await supabase
    .from("quiz_questions")
    .select("*", { count: "exact", head: true })
    .eq("module_id", moduleId);

  const { data: newQuestion, error } = await supabase
    .from("quiz_questions")
    .insert({ module_id: moduleId, question, order_index: count ?? 0 })
    .select()
    .single();

  if (error || !newQuestion) throw new Error(error?.message ?? "Failed to add question");

  await supabase.from("quiz_options").insert(
    options.map((o, i) => ({
      question_id: newQuestion.id,
      option_text: o.text,
      is_correct: o.isCorrect,
      order_index: i,
    }))
  );

  revalidatePath("/admin");
  const { data: mod } = await supabase
    .from("modules")
    .select("slug")
    .eq("id", moduleId)
    .single();
  if (mod) {
    revalidatePath(`/admin/modules/${mod.slug}/edit`);
    revalidatePath(`/modules/${mod.slug}/quiz`);
  }
}

export async function updateQuestion(
  questionId: string,
  moduleId: string,
  question: string,
  options: { text: string; isCorrect: boolean }[]
) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.from("quiz_questions").update({ question }).eq("id", questionId);
  await supabase.from("quiz_options").delete().eq("question_id", questionId);
  await supabase.from("quiz_options").insert(
    options.map((o, i) => ({
      question_id: questionId,
      option_text: o.text,
      is_correct: o.isCorrect,
      order_index: i,
    }))
  );

  const { data: mod } = await supabase
    .from("modules")
    .select("slug")
    .eq("id", moduleId)
    .single();
  if (mod) {
    revalidatePath(`/admin/modules/${mod.slug}/edit`);
    revalidatePath(`/modules/${mod.slug}/quiz`);
  }
}

export async function deleteQuestion(questionId: string, moduleId: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.from("quiz_questions").delete().eq("id", questionId);

  const { data: mod } = await supabase
    .from("modules")
    .select("slug")
    .eq("id", moduleId)
    .single();
  if (mod) {
    revalidatePath(`/admin/modules/${mod.slug}/edit`);
    revalidatePath(`/modules/${mod.slug}/quiz`);
  }
}
