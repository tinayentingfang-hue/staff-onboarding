import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireUser();

  return (
    <div className="min-h-screen flex flex-col bg-iso-paper">
      <header className="border-b border-black/10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/modules" className="flex items-center gap-2">
            <Image src="/iso-logo.png" alt="ISO" width={32} height={32} />
            <span className="font-medium text-iso-ink hidden sm:inline">
              Training Portal
            </span>
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            <Link href="/modules" className="text-iso-ink/70 hover:text-iso-ink">
              Modules
            </Link>
            <Link href="/progress" className="text-iso-ink/70 hover:text-iso-ink">
              My Progress
            </Link>
            {profile.role === "admin" && (
              <Link href="/admin" className="text-iso-ink/70 hover:text-iso-ink">
                Admin
              </Link>
            )}
            <span className="text-iso-ink/40 hidden sm:inline">
              {profile.full_name || "Staff"}
            </span>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
