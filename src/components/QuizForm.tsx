"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/app/(app)/modules/actions";

type Option = { id: string; option_text: string };
type Question = { id: string; question: string; options: Option[] };

export default function QuizForm({
  moduleId,
  moduleSlug,
  moduleTitle,
  questions,
}: {
  moduleId: string;
  moduleSlug: string;
  moduleTitle: string;
  questions: Question[];
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(
    null
  );
  const [pending, startTransition] = useTransition();

  const allAnswered = questions.every((q) => answers[q.id]);

  function handleSubmit() {
    startTransition(async () => {
      const res = await submitQuiz(moduleId, moduleSlug, answers);
      setResult(res);
    });
  }

  if (result) {
    return (
      <div className="bg-white border border-black/10 rounded-sm p-8 text-center">
        <p className="text-xs uppercase tracking-wide text-iso-ink/40 mb-2">
          {moduleTitle}
        </p>
        <h2 className="text-3xl text-iso-ink mb-2">
          {result.score} / {result.total}
        </h2>
        <p
          className={`text-sm font-medium mb-6 ${
            result.passed ? "text-iso-green-deep" : "text-iso-pink-deep"
          }`}
        >
          {result.passed
            ? "Passed — module marked complete."
            : "Not quite — you need 80% to pass. Review the module and try again."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push(`/modules/${moduleSlug}`)}
            className="text-sm border border-black/15 px-4 py-2 rounded-sm hover:border-iso-green"
          >
            Back to module
          </button>
          {!result.passed && (
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
              }}
              className="text-sm bg-iso-green-deep text-white px-4 py-2 rounded-sm hover:bg-iso-ink"
            >
              Retry quiz
            </button>
          )}
          <button
            onClick={() => router.push("/modules")}
            className="text-sm border border-black/15 px-4 py-2 rounded-sm hover:border-iso-green"
          >
            All modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, i) => (
        <fieldset
          key={q.id}
          className="bg-white border border-black/10 rounded-sm p-5"
        >
          <legend className="text-sm font-medium text-iso-ink mb-3">
            {i + 1}. {q.question}
          </legend>
          <div className="space-y-2">
            {q.options.map((o) => (
              <label
                key={o.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm border cursor-pointer text-sm transition-colors ${
                  answers[q.id] === o.id
                    ? "border-iso-green bg-iso-green/10"
                    : "border-black/10 hover:border-black/25"
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={o.id}
                  checked={answers[q.id] === o.id}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                  className="accent-[#6b6c5c]"
                />
                {o.option_text}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || pending}
        className="w-full bg-iso-green-deep text-white py-3 rounded-sm hover:bg-iso-ink transition-colors disabled:opacity-40"
      >
        {pending ? "Submitting…" : "Submit quiz"}
      </button>
    </div>
  );
}
