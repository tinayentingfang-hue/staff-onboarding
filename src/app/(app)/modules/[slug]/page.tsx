import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { markInProgress } from "../actions";
import MarkdownContent from "@/components/MarkdownContent";
import { AddNoteForm, NoteList } from "@/components/NoteForm";
import type { Module, ModuleProgress, QuizAttempt, StaffNote } from "@/lib/types";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { supabase, user } = await requireUser();

  const { data: module_ } = await supabase
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .single<Module>();

  if (!module_) notFound();

  const [{ data: allModules }, { data: progressRow }, { data: attempts }, { data: notes }] =
    await Promise.all([
      supabase.from("modules").select("id, slug, order_index, title").order("order_index"),
      supabase
        .from("module_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("module_id", module_.id)
        .maybeSingle<ModuleProgress>(),
      supabase
        .from("quiz_attempts")
        .select("*")
        .eq("user_id", user.id)
        .eq("module_id", module_.id)
        .order("created_at", { ascending: false })
        .returns<QuizAttempt[]>(),
      supabase
        .from("staff_notes")
        .select("*")
        .eq("user_id", user.id)
        .eq("module_id", module_.id)
        .order("created_at", { ascending: false })
        .returns<StaffNote[]>(),
    ]);

  if (progressRow?.status !== "completed") {
    await markInProgress(module_.id);
  }

  const modules = allModules ?? [];
  const index = modules.findIndex((m) => m.id === module_.id);
  const prev = index > 0 ? modules[index - 1] : null;
  const next = index >= 0 && index < modules.length - 1 ? modules[index + 1] : null;
  const completed = progressRow?.status === "completed";
  const bestAttempt = attempts?.[0];

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-iso-ink/40 mb-2">
        Module {module_.order_index} of {modules.length}
      </p>
      <h1 className="text-3xl text-iso-ink mb-6">{module_.title}</h1>

      <MarkdownContent content={module_.content} />

      <div className="mt-10 bg-white border border-black/10 rounded-sm p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-iso-ink/60">
            {completed
              ? `Completed — best score ${bestAttempt?.score}/${bestAttempt?.total}`
              : "Finish reading, then take the quiz to complete this module."}
          </p>
        </div>
        <Link
          href={`/modules/${module_.slug}/quiz`}
          className="bg-iso-green-deep text-white px-5 py-2 rounded-sm text-sm hover:bg-iso-ink transition-colors"
        >
          {completed ? "Retake quiz" : "Take quiz"}
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">
          Your notes on this module
        </h2>
        <div className="mb-3">
          <NoteList notes={notes ?? []} />
        </div>
        <AddNoteForm moduleId={module_.id} />
      </div>

      <div className="mt-10 flex items-center justify-between text-sm">
        {prev ? (
          <Link href={`/modules/${prev.slug}`} className="text-iso-ink/60 hover:text-iso-ink">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/modules/${next.slug}`} className="text-iso-ink/60 hover:text-iso-ink">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
