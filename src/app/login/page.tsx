"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/modules");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-iso-paper px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/iso-logo.png" alt="ISO Skin Cancer & Laser Clinic" width={96} height={96} priority />
        </div>

        <h1 className="text-2xl text-iso-ink text-center mb-1">Training Portal</h1>
        <p className="text-sm text-iso-ink/60 text-center mb-8">
          Sign in with the account Tina set up for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-iso-green"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-iso-ink/60 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-black/15 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-iso-green"
            />
          </div>

          {error && <p className="text-sm text-iso-pink-deep">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-iso-green-deep text-white py-2 rounded-sm hover:bg-iso-ink transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-iso-ink/50 text-center mt-6">
          Trouble signing in? Ask Tina to resend your invite.
        </p>
      </div>
    </main>
  );
}
