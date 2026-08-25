import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import QuizForm from "@/components/QuizForm";
import type { Module, QuizQuestion } from "@/lib/types";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { supabase } = await requireUser();

  const { data: module_ } = await supabase
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .single<Module>();

  if (!module_) notFound();

  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("*, quiz_options(*)")
    .eq("module_id", module_.id)
    .order("order_index")
    .returns<QuizQuestion[]>();

  const formQuestions = (questions ?? []).map((q) => ({
    id: q.id,
    question: q.question,
    options: [...q.quiz_options]
      .sort((a, b) => a.order_index - b.order_index)
      .map((o) => ({ id: o.id, option_text: o.option_text })),
  }));

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-iso-ink/40 mb-2">
        Module {module_.order_index} quiz
      </p>
      <h1 className="text-3xl text-iso-ink mb-2">{module_.title}</h1>
      <p className="text-iso-ink/60 mb-8">
        Answer all {formQuestions.length} questions. You need 80% to pass.
      </p>

      {formQuestions.length === 0 ? (
        <p className="text-iso-ink/50 text-sm">
          No quiz questions have been added for this module yet.
        </p>
      ) : (
        <QuizForm
          moduleId={module_.id}
          moduleSlug={module_.slug}
          moduleTitle={module_.title}
          questions={formQuestions}
        />
      )}
    </div>
  );
}
