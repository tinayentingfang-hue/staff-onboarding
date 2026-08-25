import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import type { Module, ModuleProgress, Profile, QuizAttempt } from "@/lib/types";

export default async function AdminPage() {
  const { supabase } = await requireAdmin();

  const [{ data: staff }, { data: modules }, { data: progress }, { data: attempts }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("role", "staff")
        .order("created_at")
        .returns<Profile[]>(),
      supabase.from("modules").select("*").order("order_index").returns<Module[]>(),
      supabase.from("module_progress").select("*").returns<ModuleProgress[]>(),
      supabase.from("quiz_attempts").select("*").returns<QuizAttempt[]>(),
    ]);

  const statusFor = (userId: string, moduleId: string) =>
    (progress ?? []).find((p) => p.user_id === userId && p.module_id === moduleId)?.status ??
    "not_started";

  const bestScoreFor = (userId: string, moduleId: string) => {
    const list = (attempts ?? []).filter(
      (a) => a.user_id === userId && a.module_id === moduleId
    );
    if (list.length === 0) return null;
    return list.reduce((best, a) => (a.score > best.score ? a : best));
  };

  return (
    <div>
      <h1 className="text-3xl text-iso-ink mb-1">Admin</h1>
      <p className="text-iso-ink/60 mb-8">Staff progress and training content.</p>

      <section className="mb-10">
        <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">
          Module content
        </h2>
        <div className="bg-white border border-black/10 rounded-sm divide-y divide-black/5">
          {(modules ?? []).map((m) => (
            <div key={m.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-iso-ink">
                {m.order_index}. {m.title}
              </span>
              <Link
                href={`/admin/modules/${m.slug}/edit`}
                className="text-sm text-iso-green-deep hover:text-iso-ink"
              >
                Edit content & quiz →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">
          Staff progress
        </h2>

        {(staff ?? []).length === 0 ? (
          <p className="text-sm text-iso-ink/50">
            No staff accounts yet. Invite a new receptionist from the Supabase dashboard —
            see SETUP.md.
          </p>
        ) : (
          <div className="bg-white border border-black/10 rounded-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-iso-sand text-left text-xs uppercase tracking-wide text-iso-ink/60">
                  <th className="px-4 py-2 sticky left-0 bg-iso-sand">Staff</th>
                  {(modules ?? []).map((m) => (
                    <th key={m.id} className="px-3 py-2 whitespace-nowrap">
                      {m.order_index}.{" "}
                      <span className="normal-case">{m.title.split(" ").slice(0, 2).join(" ")}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(staff ?? []).map((s) => (
                  <tr key={s.id} className="border-t border-black/5">
                    <td className="px-4 py-2.5 text-iso-ink whitespace-nowrap sticky left-0 bg-white">
                      <div>{s.full_name || "(no name set)"}</div>
                      {s.start_date && (
                        <div className="text-xs text-iso-ink/40">
                          since {new Date(s.start_date).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    {(modules ?? []).map((m) => {
                      const status = statusFor(s.id, m.id);
                      const best = bestScoreFor(s.id, m.id);
                      return (
                        <td key={m.id} className="px-3 py-2.5 text-center">
                          {status === "completed" ? (
                            <span className="text-iso-green-deep font-medium">
                              {best ? `${best.score}/${best.total}` : "✓"}
                            </span>
                          ) : status === "in_progress" ? (
                            <span className="text-iso-ink/40">reading</span>
                          ) : (
                            <span className="text-iso-ink/20">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
