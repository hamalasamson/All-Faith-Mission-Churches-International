import { motion } from "framer-motion";
import { Heart, Gift, Star, Sprout, Handshake, MessageCircle } from "lucide-react";

const PASTOR_WA = "256772562123";

const givingTypes = [
  {
    id: "tithe",
    name: "Tithe",
    icon: Heart,
    color: "from-blue-500 to-indigo-600",
    desc: "Honor God with the first tenth of your income. Tithing unlocks the windows of heaven over your life.",
    message: "Hello Pastor, I would like to give my Tithe.",
  },
  {
    id: "offertory",
    name: "Offertory",
    icon: Gift,
    color: "from-violet-500 to-purple-600",
    desc: "Present your freewill offering to God with a cheerful heart. Every gift, big or small, matters.",
    message: "Hello Pastor, I would like to give my Offertory.",
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    icon: Star,
    color: "from-amber-500 to-orange-500",
    desc: "Express gratitude for God's faithfulness with a thanksgiving offering. Celebrate His goodness.",
    message: "Hello Pastor, I would like to give a Thanksgiving offering.",
  },
  {
    id: "seed",
    name: "Seed",
    icon: Sprout,
    color: "from-emerald-500 to-teal-600",
    desc: "Sow a seed of faith and watch God multiply it. Plant into fertile ground and reap a harvest.",
    message: "Hello Pastor, I would like to sow a Seed of faith.",
  },
  {
    id: "partnership",
    name: "Partnership",
    icon: Handshake,
    color: "from-rose-500 to-pink-600",
    desc: "Partner with All Faith Mission to advance the gospel. Your partnership fuels the mission.",
    message: "Hello Pastor, I would like to become a Ministry Partner.",
  },
];

export default function Giving() {
  return (
    <div className="px-4 py-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground">Give to the Kingdom</h1>
        <p className="text-sm text-muted-foreground mt-1">"Give and it will be given to you." — Luke 6:38</p>
      </motion.div>

      {/* Pastor Contact Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 flex items-start gap-3"
      >
        <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Contact the Pastor directly for giving instructions.</p>
          <a
            href={`https://wa.me/${PASTOR_WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-xs font-bold mt-0.5 block"
          >
            WhatsApp: +256 772 562 123
          </a>
        </div>
      </motion.div>

      {/* Giving Cards */}
      <div className="space-y-3">
        {givingTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:glow-blue transition-all"
            data-testid={`giving-card-${type.id}`}
          >
            <div className={`bg-gradient-to-r ${type.color} p-4 flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg font-display">{type.name}</h3>
              </div>
            </div>
            <div className="bg-card p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{type.desc}</p>
              <a
                href={`https://wa.me/${PASTOR_WA}?text=${encodeURIComponent(type.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${type.color} hover:opacity-90 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shadow-md`}
                data-testid={`button-give-${type.id}`}
              >
                Give Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
