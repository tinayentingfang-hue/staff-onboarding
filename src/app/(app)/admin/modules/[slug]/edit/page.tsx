import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import ContentEditor from "@/components/admin/ContentEditor";
import QuizEditor from "@/components/admin/QuizEditor";
import type { Module, QuizQuestion } from "@/lib/types";

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { supabase } = await requireAdmin();

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

  return (
    <div>
      <Link href="/admin" className="text-sm text-iso-ink/50 hover:text-iso-ink">
        ← Admin
      </Link>
      <h1 className="text-3xl text-iso-ink mt-2 mb-8">Edit: {module_.title}</h1>

      <section className="mb-12">
        <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">Content</h2>
        <ContentEditor
          moduleId={module_.id}
          initialTitle={module_.title}
          initialContent={module_.content}
        />
      </section>

      <section>
        <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">
          Quiz questions
        </h2>
        <QuizEditor moduleId={module_.id} questions={questions ?? []} />
      </section>
    </div>
  );
}
