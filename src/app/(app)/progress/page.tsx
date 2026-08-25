import { requireUser } from "@/lib/auth";
import { AddNoteForm, NoteList } from "@/components/NoteForm";
import type { Module, ModuleProgress, QuizAttempt, StaffNote } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

export default async function ProgressPage() {
  const { supabase, user, profile } = await requireUser();

  const [{ data: modules }, { data: progress }, { data: attempts }, { data: notes }] =
    await Promise.all([
      supabase.from("modules").select("*").order("order_index").returns<Module[]>(),
      supabase
        .from("module_progress")
        .select("*")
        .eq("user_id", user.id)
        .returns<ModuleProgress[]>(),
      supabase
        .from("quiz_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .returns<QuizAttempt[]>(),
      supabase
        .from("staff_notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .returns<StaffNote[]>(),
    ]);

  const progressByModule = new Map((progress ?? []).map((p) => [p.module_id, p]));
  const attemptsByModule = new Map<string, QuizAttempt[]>();
  for (const a of attempts ?? []) {
    const list = attemptsByModule.get(a.module_id) ?? [];
    list.push(a);
    attemptsByModule.set(a.module_id, list);
  }

  const generalNotes = (notes ?? []).filter((n) => !n.module_id);
  const moduleById = new Map((modules ?? []).map((m) => [m.id, m]));

  return (
    <div>
      <h1 className="text-3xl text-iso-ink mb-1">My Progress</h1>
      <p className="text-iso-ink/60 mb-1">{profile.full_name || "Staff"}</p>
      {profile.start_date && (
        <p className="text-sm text-iso-ink/40 mb-8">
          Started {new Date(profile.start_date).toLocaleDateString()}
        </p>
      )}

      <div className="bg-white border border-black/10 rounded-sm overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-iso-sand text-left text-xs uppercase tracking-wide text-iso-ink/60">
              <th className="px-4 py-2">Module</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Best score</th>
              <th className="px-4 py-2">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {(modules ?? []).map((m) => {
              const status = progressByModule.get(m.id)?.status ?? "not_started";
              const moduleAttempts = attemptsByModule.get(m.id) ?? [];
              const best = moduleAttempts.reduce<QuizAttempt | null>(
                (acc, a) => (!acc || a.score > acc.score ? a : acc),
                null
              );
              return (
                <tr key={m.id} className="border-t border-black/5">
                  <td className="px-4 py-2.5 text-iso-ink">{m.title}</td>
                  <td className="px-4 py-2.5 text-iso-ink/70">{STATUS_LABEL[status]}</td>
                  <td className="px-4 py-2.5 text-iso-ink/70">
                    {best ? `${best.score}/${best.total}` : "—"}
                  </td>
                  <td className="px-4 py-2.5 text-iso-ink/70">{moduleAttempts.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg text-iso-ink mb-3 font-display font-semibold">
        My notes
      </h2>
      <p className="text-xs text-iso-ink/40 mb-4">
        Private to you — Tina can't see these.
      </p>

      <div className="space-y-6 mb-8">
        {(notes ?? [])
          .filter((n) => n.module_id)
          .reduce<{ moduleId: string; title: string; notes: StaffNote[] }[]>((groups, n) => {
            const mod = moduleById.get(n.module_id!);
            const existing = groups.find((g) => g.moduleId === n.module_id);
            if (existing) {
              existing.notes.push(n);
            } else {
              groups.push({
                moduleId: n.module_id!,
                title: mod?.title ?? "Unknown module",
                notes: [n],
              });
            }
            return groups;
          }, [])
          .map((group) => (
            <div key={group.moduleId}>
              <p className="text-sm font-medium text-iso-ink mb-2">{group.title}</p>
              <NoteList notes={group.notes} />
            </div>
          ))}
      </div>

      <div>
        <p className="text-sm font-medium text-iso-ink mb-2">General notes</p>
        <div className="mb-3">
          <NoteList notes={generalNotes} />
        </div>
        <AddNoteForm moduleId={null} />
      </div>
    </div>
  );
}
