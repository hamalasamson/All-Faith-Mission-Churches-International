import { Link } from "wouter";
import { Bell, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function TopHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl max-w-[480px] mx-auto">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            <img src="https://i.imgur.com/c50ZwVn.png" alt="Church Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-sm leading-tight text-foreground/90 w-[140px] truncate">
            All Faith Mission
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full w-9 h-9"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 ml-1 bg-secondary/50">
              <User className="h-5 w-5 text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
