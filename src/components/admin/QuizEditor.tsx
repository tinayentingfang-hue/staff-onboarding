"use client";

import { useState, useTransition } from "react";
import { addQuestion, updateQuestion, deleteQuestion } from "@/app/(app)/admin/actions";

type Option = { id?: string; option_text: string; is_correct: boolean };
type Question = { id: string; question: string; quiz_options: Option[] };

function emptyOptions(): Option[] {
  return [
    { option_text: "", is_correct: true },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ];
}

function QuestionEditor({
  moduleId,
  questionId,
  initialQuestion,
  initialOptions,
  onDone,
}: {
  moduleId: string;
  questionId?: string;
  initialQuestion: string;
  initialOptions: Option[];
  onDone?: () => void;
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [pending, startTransition] = useTransition();

  const correctIndex = options.findIndex((o) => o.is_correct);
  const valid = question.trim() && options.every((o) => o.option_text.trim()) && correctIndex >= 0;

  function save() {
    if (!valid) return;
    const payload = options.map((o) => ({ text: o.option_text.trim(), isCorrect: o.is_correct }));
    startTransition(async () => {
      if (questionId) {
        await updateQuestion(questionId, moduleId, question.trim(), payload);
      } else {
        await addQuestion(moduleId, question.trim(), payload);
        setQuestion("");
        setOptions(emptyOptions());
      }
      onDone?.();
    });
  }

  return (
    <div className="border border-black/10 rounded-sm p-4 bg-white space-y-3">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question text"
        className="w-full border border-black/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-iso-green"
      />
      <div className="space-y-2">
        {options.map((o, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${questionId ?? "new"}`}
              checked={o.is_correct}
              onChange={() =>
                setOptions((opts) => opts.map((opt, j) => ({ ...opt, is_correct: j === i })))
              }
            />
            <input
              value={o.option_text}
              onChange={(e) =>
                setOptions((opts) =>
                  opts.map((opt, j) => (j === i ? { ...opt, option_text: e.target.value } : opt))
                )
              }
              placeholder={`Option ${i + 1}`}
              className="flex-1 border border-black/15 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-iso-green"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-iso-ink/40">Select the radio button next to the correct answer.</p>
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={!valid || pending}
          className="text-sm bg-iso-green-deep text-white px-4 py-1.5 rounded-sm hover:bg-iso-ink disabled:opacity-40"
        >
          {pending ? "Saving…" : questionId ? "Save question" : "Add question"}
        </button>
        {questionId && (
          <button
            onClick={() =>
              startTransition(async () => {
                await deleteQuestion(questionId, moduleId);
              })
            }
            className="text-sm text-iso-pink-deep hover:text-iso-ink"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function QuizEditor({
  moduleId,
  questions,
}: {
  moduleId: string;
  questions: Question[];
}) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <QuestionEditor
          key={q.id}
          moduleId={moduleId}
          questionId={q.id}
          initialQuestion={q.question}
          initialOptions={
            q.quiz_options.length
              ? q.quiz_options.map((o) => ({
                  id: o.id,
                  option_text: o.option_text,
                  is_correct: o.is_correct,
                }))
              : emptyOptions()
          }
        />
      ))}

      {adding ? (
        <QuestionEditor
          moduleId={moduleId}
          initialQuestion=""
          initialOptions={emptyOptions()}
          onDone={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm border border-dashed border-black/20 rounded-sm px-4 py-2 w-full text-iso-ink/60 hover:border-iso-green hover:text-iso-ink"
        >
          + Add a question
        </button>
      )}
    </div>
  );
}
