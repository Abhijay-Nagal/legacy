import { Sidebar } from "@/components/layout/Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen gap-4 p-4">
      <Sidebar />

      <main className="glass flex flex-1 items-center justify-center rounded-2xl p-8">
        {children}
      </main>
    </div>
  );
}
