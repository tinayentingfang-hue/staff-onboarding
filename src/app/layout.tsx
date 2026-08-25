import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISO Training Portal",
  description: "Staff onboarding & training for ISO Skin Cancer & Laser Clinic",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
