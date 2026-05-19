import { Link, useLocation } from "wouter";
import { HomeIcon, CalendarDays, PlaySquare, Users, HeartHandshake, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/services", label: "Services", icon: CalendarDays },
  { href: "/livestream", label: "Livestream", icon: PlaySquare },
  { href: "/recruitment", label: "Recruit", icon: Users },
  { href: "/giving", label: "Giving", icon: HeartHandshake },
  { href: "/more", label: "More", icon: Menu },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t pb-safe max-w-[480px] mx-auto">
      <div className="flex items-center justify-around px-2 h-16">
        {tabs.map((tab) => {
          const isActive = location === tab.href;
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className="w-full">
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn("relative transition-all duration-300", isActive && "scale-110")}>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <div className="absolute inset-0 bg-primary blur-md opacity-40 rounded-full" />
                  )}
                </div>
                <span className={cn("text-[10px] font-medium transition-colors", isActive && "font-semibold")}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
