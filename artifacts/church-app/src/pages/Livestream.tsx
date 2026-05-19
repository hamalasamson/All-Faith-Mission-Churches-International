import { motion } from "framer-motion";
import { Play, Clock, Calendar } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { DEMO_DATA } from "@/data/demo";

function CrossIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white/30">
      <rect x="32" y="4" width="16" height="72" rx="4" fill="currentColor" />
      <rect x="8" y="24" width="64" height="16" rx="4" fill="currentColor" />
    </svg>
  );
}

const upcoming = [
  { title: "Sunday Morning Service", date: "This Sunday", time: "7:00 AM EAT" },
  { title: "Wednesday Bible Study", date: "This Wednesday", time: "4:00 PM EAT" },
];

export default function Livestream() {
  return (
    <div className="px-4 py-5 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-display text-foreground">Watch Live</h1>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            LIVE
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Stream live services and watch past sermons</p>
      </motion.div>

      {/* Featured Livestream */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#1e3a8a] aspect-video flex flex-col items-center justify-center relative border border-primary/20 glow-blue"
        data-testid="livestream-featured"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
        <CrossIcon />
        <p className="text-white/60 text-sm mt-3 mb-5">All Faith Mission Churches International</p>
        <a
          href="https://www.youtube.com/@allfaithmissionchurches"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 bg-[#FF0000] text-white rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg"
          data-testid="button-watch-youtube"
        >
          <SiYoutube className="w-5 h-5" />
          Watch on YouTube
        </a>
      </motion.div>

      {/* Past Sermons */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Past Sermons</h2>
        <div className="space-y-3">
          {DEMO_DATA.sermons.map((sermon, i) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-3 items-center rounded-2xl p-3 bg-card border border-border hover:border-primary/30 hover:glow-blue transition-all group cursor-pointer"
              data-testid={`sermon-card-${sermon.id}`}
            >
              {/* Thumbnail */}
              <div className="w-20 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.4)_0%,transparent_70%)]" />
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground leading-tight">{sermon.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {sermon.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {sermon.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Streams */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Upcoming Streams</h2>
        <div className="space-y-3">
          {upcoming.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
              data-testid={`upcoming-stream-${i}`}
            >
              <div>
                <p className="font-semibold text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.date} · {item.time}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/30 text-primary">
                UPCOMING
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
