import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Heart, BookOpen, CalendarDays, Pin, Share2, ChevronRight, Facebook, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { DEMO_DATA } from "@/data/demo";

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="32" y="4" width="16" height="72" rx="4" fill="currentColor" />
      <rect x="8" y="24" width="64" height="16" rx="4" fill="currentColor" />
    </svg>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-xl border border-primary/30 bg-primary/10 glow-blue flex items-center justify-center">
        <span className="text-2xl font-bold text-primary font-display">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function compute() {
      const now = new Date();
      // Next Sunday 7:00 AM EAT (UTC+3)
      const eatOffset = 3 * 60;
      const localOffset = now.getTimezoneOffset();
      const eatNow = new Date(now.getTime() + (eatOffset + localOffset) * 60000);
      const daysUntilSun = (7 - eatNow.getDay()) % 7 || 7;
      const nextSunday = new Date(eatNow);
      nextSunday.setDate(eatNow.getDate() + daysUntilSun);
      nextSunday.setHours(7, 0, 0, 0);
      const diff = nextSunday.getTime() - eatNow.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown();
  const verse = DEMO_DATA.verses[new Date().getDay()];

  const quickActions = [
    { label: "Livestream", icon: Play, href: "/livestream", color: "from-blue-500 to-indigo-600" },
    { label: "Give", icon: Heart, href: "/giving", color: "from-rose-500 to-pink-600" },
    { label: "Prayer", icon: BookOpen, href: "/more", color: "from-violet-500 to-purple-600" },
    { label: "Services", icon: CalendarDays, href: "/services", color: "from-emerald-500 to-teal-600" },
  ];

  const socials = [
    { label: "Facebook", icon: Facebook, color: "#1877F2", href: "https://www.facebook.com/allfaithmissionchurches/" },
    { label: "TikTok", icon: SiTiktok, color: "#010101", href: "https://www.tiktok.com/@allfaithmission.kisimu" },
    { label: "YouTube", icon: Youtube, color: "#FF0000", href: "https://www.youtube.com/@allfaithmissionchurches" },
  ];

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#0a1628] to-[#1e3a8a] glow-rainbow"
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-start gap-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 text-blue-300 animate-float"
          >
            <CrossIcon className="w-full h-full" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display leading-tight">
              Welcome to<br />
              <span className="text-gradient">All Faith Mission</span>
            </h1>
            <p className="text-blue-200 text-sm mt-2 leading-relaxed italic">
              "People of faith will never be defeated."
            </p>
          </div>
          <Link href="/services">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold glow-blue transition-all hover:scale-105 active:scale-95">
              Join Us This Sunday <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Bible Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-800/30"
        data-testid="bible-verse-card"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
              Verse of the Day
            </p>
            <p className="text-sm text-foreground leading-relaxed italic">"{verse.text}"</p>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-2">— {verse.ref}</p>
          </div>
          <button
            className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 hover:scale-110 transition-transform"
            data-testid="button-share-verse"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl p-5 bg-card border border-border"
        data-testid="countdown-timer"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-4">
          Morning Service starts in
        </p>
        <div className="flex items-center justify-around">
          <CountdownBox value={days} label="Days" />
          <span className="text-primary text-2xl font-bold mb-4">:</span>
          <CountdownBox value={hours} label="Hours" />
          <span className="text-primary text-2xl font-bold mb-4">:</span>
          <CountdownBox value={minutes} label="Mins" />
          <span className="text-primary text-2xl font-bold mb-4">:</span>
          <CountdownBox value={seconds} label="Secs" />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Access</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2"
                data-testid={`quick-action-${action.label.toLowerCase()}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] font-medium text-foreground/80">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Announcements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Announcements</h2>
          <Link href="/more">
            <span className="text-xs text-primary font-medium">View all</span>
          </Link>
        </div>
        <div className="space-y-3">
          {DEMO_DATA.announcements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4 bg-card border border-border hover:border-primary/30 hover:glow-blue transition-all"
              data-testid={`announcement-card-${a.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {a.pinned && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-full">
                        <Pin className="w-2.5 h-2.5" /> Pinned
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground">{a.date}</span>
                  </div>
                  <p className="font-semibold text-sm text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Follow Us</h2>
        <div className="grid grid-cols-3 gap-3">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all"
              data-testid={`social-${s.label.toLowerCase()}`}
            >
              <s.icon className="w-7 h-7" style={{ color: s.color }} />
              <span className="text-[11px] font-medium text-foreground/70">{s.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
