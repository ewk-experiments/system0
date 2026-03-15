"use client";

import { useApp } from "@/lib/context";
import { Sidebar } from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth/signin");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-s0-bg">
      <Sidebar />
      <main className="md:pl-60">
        <div className="mx-auto max-w-6xl p-4 pt-16 md:p-8 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
