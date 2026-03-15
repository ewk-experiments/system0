import { Sidebar } from "@/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-h-screen md:ml-64">
        <div className="p-4 pt-16 md:p-8 md:pt-8">{children}</div>
      </main>
    </div>
  );
}
