import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Calendar, Bell, MapPin, CheckCircle } from "lucide-react";
import { SiFacebook, SiTiktok, SiYoutube } from "react-icons/si";
import { DEMO_DATA } from "@/data/demo";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const MAPS_URL =
  "https://www.google.com/maps/dir/0.3879184,32.5359/All+Faith+Mission+Church+Ministries,+Nabweru+-+Kagoma,+Road,+Kampala,+Uganda/@0.388193,32.536222,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x177dafe21210acc3:0xb98a63ea19043f55!2m2!1d32.5358996!2d0.3879183?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D";

const allAnnouncements = [
  ...DEMO_DATA.announcements,
  { id: 3, title: "Youth Camp 2026", date: "Next Month", desc: "Annual youth camp registration is now open. Sign up with the Youth Ministry leader.", pinned: false },
  { id: 4, title: "Choir Rehearsal", date: "Every Saturday", desc: "Choir rehearsals are held every Saturday at 3:00 PM. All choir members must attend.", pinned: false },
  { id: 5, title: "Evangelism Outreach", date: "Last Sunday of Month", desc: "Join us for our monthly community outreach. All members are welcome to participate.", pinned: false },
];

const TABS = ["Announcements", "Prayer", "Location", "Social"] as const;
type Tab = typeof TABS[number];

function AnnouncementsTab() {
  const sorted = [...allAnnouncements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  return (
    <div className="space-y-3">
      {sorted.map((a, i) => {
        const TypeIcon = a.pinned ? Pin : i < 2 ? Bell : Calendar;
        const typeBadge = a.pinned ? "pinned" : i % 2 === 0 ? "event" : "update";
        const badgeColors: Record<string, string> = {
          pinned: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
          event: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
          update: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
        };
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4 bg-card border border-border"
            data-testid={`announcement-more-${a.id}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${badgeColors[typeBadge]}`}>
                <TypeIcon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${badgeColors[typeBadge]}`}>
                    {typeBadge}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{a.date}</span>
                </div>
                <p className="font-semibold text-sm text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function PrayerTab() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !request.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("prayer_requests").insert([{
      name: name.trim(),
      request: request.trim(),
      status: "pending",
    }]);
    setSaving(false);
    if (error) {
      toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    setName("");
    setRequest("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border border-violet-200/50 dark:border-violet-800/30">
        <h3 className="font-bold text-foreground mb-1">Share Your Prayer Request</h3>
        <p className="text-xs text-muted-foreground mb-4">We pray for every request submitted</p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center glow-blue"
              >
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <p className="font-semibold text-foreground text-center">Prayer request submitted!</p>
              <p className="text-xs text-muted-foreground text-center">We will lift you up in prayer</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/40"
                data-testid="input-prayer-name"
              />
              <textarea
                placeholder="Share your prayer request..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                data-testid="input-prayer-request"
              />
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm glow-blue hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                data-testid="button-submit-prayer"
              >
                {saving ? "Submitting..." : "Submit Prayer Request"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function LocationTab() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden border border-border">
        {/* Map placeholder */}
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1e3a8a] h-40 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col items-center gap-2">
            <MapPin className="w-10 h-10 text-white animate-pulse-glow" />
            <p className="text-white/70 text-xs">Nabweru - Kagoma Road, Kampala</p>
          </div>
        </div>
        <div className="bg-card p-5 space-y-4">
          <div>
            <h3 className="font-bold text-foreground">All Faith Mission Church Ministries</h3>
            <p className="text-sm text-muted-foreground mt-1">Nabweru - Kagoma Road, Kampala, Uganda</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Service Times</p>
            <div className="space-y-1.5">
              {[
                ["Sunday Morning", "7:00 AM – 10:00 AM"],
                ["Sunday Main", "10:00 AM – 1:00 PM"],
                ["Wednesday", "4:00 PM – 8:00 PM"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-foreground">{day}</span>
                  <span className="text-muted-foreground">{time}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm glow-blue hover:opacity-90 transition-all"
            data-testid="button-get-directions"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

function SocialTab() {
  const socials = [
    { name: "Facebook", handle: "@allfaithmissionchurches", color: "#1877F2", Icon: SiFacebook, href: "https://www.facebook.com/allfaithmissionchurches/", bg: "from-[#1877F2] to-[#145DB2]" },
    { name: "TikTok", handle: "@allfaithmission.kisimu", color: "#010101", Icon: SiTiktok, href: "https://www.tiktok.com/@allfaithmission.kisimu", bg: "from-[#010101] to-[#2d2d2d]" },
    { name: "YouTube", handle: "@allfaithmissionchurches", color: "#FF0000", Icon: SiYoutube, href: "https://www.youtube.com/@allfaithmissionchurches", bg: "from-[#FF0000] to-[#CC0000]" },
  ];

  return (
    <div className="space-y-3">
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${s.bg} text-white`}
          data-testid={`social-card-${s.name.toLowerCase()}`}
        >
          <s.Icon className="w-10 h-10 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-lg font-display">{s.name}</p>
            <p className="text-white/70 text-sm">{s.handle}</p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-white/20 text-xs font-bold">Follow</span>
        </motion.a>
      ))}
    </div>
  );
}

export default function More() {
  const [activeTab, setActiveTab] = useState<Tab>("Announcements");

  return (
    <div className="px-4 py-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground">More</h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-secondary overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-background text-primary shadow-sm glow-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Announcements" && <AnnouncementsTab />}
          {activeTab === "Prayer" && <PrayerTab />}
          {activeTab === "Location" && <LocationTab />}
          {activeTab === "Social" && <SocialTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
