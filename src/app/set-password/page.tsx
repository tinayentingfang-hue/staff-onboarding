"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    router.push("/modules");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-iso-paper px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl text-iso-ink mb-1">Set your password</h1>
        <p className="text-sm text-iso-ink/60 mb-6">
          Choose a password for your ISO Training Portal account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-iso-green"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-iso-green"
            />
          </div>

          {error && <p className="text-sm text-iso-pink-deep">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-iso-green-deep text-white py-2 rounded-sm hover:bg-iso-ink transition-colors disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save password & continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
