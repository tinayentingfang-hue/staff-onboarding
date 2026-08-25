"use client";

import { useState, useTransition } from "react";
import { updateModuleContent } from "@/app/(app)/admin/actions";

export default function ContentEditor({
  moduleId,
  initialTitle,
  initialContent,
}: {
  moduleId: string;
  initialTitle: string;
  initialContent: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaved(false);
          }}
          className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-iso-green"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
          Content (Markdown — supports headings, bullet lists, and tables)
        </label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSaved(false);
          }}
          rows={22}
          className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-iso-green"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            startTransition(async () => {
              await updateModuleContent(moduleId, title, content);
              setSaved(true);
            })
          }
          disabled={pending}
          className="bg-iso-green-deep text-white px-5 py-2 rounded-sm text-sm hover:bg-iso-ink transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save content"}
        </button>
        {saved && <span className="text-sm text-iso-green-deep">Saved.</span>}
      </div>
    </div>
  );
}
