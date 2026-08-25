"use client";

import { useRef, useState, useTransition } from "react";
import { saveNote, deleteNote } from "@/app/(app)/modules/actions";
import type { StaffNote } from "@/lib/types";

export function AddNoteForm({ moduleId }: { moduleId: string | null }) {
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        startTransition(async () => {
          await saveNote(moduleId, value.trim());
          setValue("");
        });
      }}
      className="flex flex-col gap-2"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a private note to yourself…"
        rows={2}
        className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-iso-green"
      />
      <button
        type="submit"
        disabled={pending || !value.trim()}
        className="self-end text-sm bg-iso-green-deep text-white px-4 py-1.5 rounded-sm hover:bg-iso-ink transition-colors disabled:opacity-40"
      >
        {pending ? "Saving…" : "Add note"}
      </button>
    </form>
  );
}

export function NoteList({ notes }: { notes: StaffNote[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  if (notes.length === 0) {
    return <p className="text-sm text-iso-ink/40">No notes yet — only you can see these.</p>;
  }

  return (
    <ul className="space-y-2">
      {notes.map((n) => (
        <li
          key={n.id}
          className="bg-iso-sand/60 border border-black/5 rounded-sm px-3 py-2 text-sm flex items-start justify-between gap-3"
        >
          <span className="whitespace-pre-wrap text-iso-ink/80">{n.note}</span>
          <button
            onClick={() => {
              setPendingId(n.id);
              startTransition(async () => {
                await deleteNote(n.id);
                setPendingId(null);
              });
            }}
            disabled={pendingId === n.id}
            className="text-xs text-iso-ink/40 hover:text-iso-pink-deep shrink-0"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
