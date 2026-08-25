import Link from "next/link";
import { requireUser } from "@/lib/auth";
import type { Module, ModuleProgress } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

const STATUS_STYLE: Record<string, string> = {
  not_started: "bg-black/5 text-iso-ink/50",
  in_progress: "bg-iso-mist text-iso-ink",
  completed: "bg-iso-green/30 text-iso-green-deep",
};

export default async function ModulesPage() {
  const { supabase, user } = await requireUser();

  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .order("order_index")
    .returns<Module[]>();

  const { data: progress } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .returns<ModuleProgress[]>();

  const progressByModule = new Map((progress ?? []).map((p) => [p.module_id, p]));
  const completedCount = (progress ?? []).filter((p) => p.status === "completed").length;
  const totalCount = modules?.length ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-iso-ink mb-1">Training Modules</h1>
        <p className="text-iso-ink/60">
          {completedCount} of {totalCount} modules completed
        </p>
        <div className="mt-3 h-1.5 w-full max-w-xs bg-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-iso-green-deep"
            style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : "0%" }}
          />
        </div>
      </div>

      <ol className="space-y-3">
        {(modules ?? []).map((m) => {
          const status = progressByModule.get(m.id)?.status ?? "not_started";
          return (
            <li key={m.id}>
              <Link
                href={`/modules/${m.slug}`}
                className="flex items-center justify-between gap-4 bg-white border border-black/10 rounded-sm px-5 py-4 hover:border-iso-green transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-iso-ink/30 font-display text-xl w-6 text-right">
                    {m.order_index}
                  </span>
                  <span className="text-iso-ink font-medium">{m.title}</span>
                </div>
                <span
                  className={`text-xs uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLE[status]}`}
                >
                  {STATUS_LABEL[status]}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {(modules ?? []).length === 0 && (
        <p className="text-iso-ink/50 text-sm">
          No modules yet — ask Tina to add training content.
        </p>
      )}
    </div>
  );
}
