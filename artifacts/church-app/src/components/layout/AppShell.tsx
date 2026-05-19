import { ReactNode } from "react";
import { TopHeader } from "./TopHeader";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background relative overflow-x-hidden">
      <TopHeader />
      <main className="flex-1 w-full max-w-[480px] mx-auto pb-20 relative">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
