import { motion } from "framer-motion";
import { Camera, Music, Mic2, Shield, Heart, DoorOpen, Zap, Globe } from "lucide-react";
import { DEMO_DATA } from "@/data/demo";

const deptIcons: Record<string, React.ElementType> = {
  media: Camera,
  choir: Music,
  praise: Mic2,
  men: Shield,
  women: Heart,
  ushering: DoorOpen,
  youth: Zap,
  outreach: Globe,
};

const deptColors: Record<string, string> = {
  media: "from-blue-500 to-cyan-500",
  choir: "from-violet-500 to-purple-600",
  praise: "from-pink-500 to-rose-500",
  men: "from-slate-600 to-slate-700",
  women: "from-rose-400 to-pink-500",
  ushering: "from-amber-500 to-orange-500",
  youth: "from-yellow-400 to-orange-400",
  outreach: "from-teal-500 to-emerald-500",
};

export default function Recruitment() {
  return (
    <div className="px-4 py-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground">Join a Department</h1>
        <p className="text-sm text-muted-foreground mt-1">Find your calling and serve with excellence</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {DEMO_DATA.departments.map((dept, i) => {
          const Icon = deptIcons[dept.id] || Globe;
          const color = deptColors[dept.id] || "from-blue-500 to-indigo-600";
          const waUrl = `https://wa.me/${dept.number}?text=Hello%2C%20I%27d%20like%20to%20join%20the%20${encodeURIComponent(dept.name)}%20department`;

          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="rounded-2xl bg-card border border-border overflow-hidden hover:glow-rainbow transition-all group"
              data-testid={`dept-card-${dept.id}`}
            >
              {/* Icon header */}
              <div className={`bg-gradient-to-br ${color} p-4 flex items-center justify-center`}>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="p-3 space-y-2">
                <h3 className="font-bold text-sm text-foreground leading-tight">{dept.name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{dept.desc}</p>
                <p className="text-[10px] font-semibold text-primary/70">{dept.leader}</p>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full mt-2 py-2 text-center rounded-xl text-white text-[11px] font-bold bg-gradient-to-r ${color} hover:opacity-90 transition-opacity`}
                  data-testid={`button-join-${dept.id}`}
                >
                  Join via WhatsApp
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
