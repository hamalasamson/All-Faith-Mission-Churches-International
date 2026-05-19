import { motion } from "framer-motion";
import { Sun, Moon, BookOpen, Flame, Bell } from "lucide-react";
import { DEMO_DATA } from "@/data/demo";
import { useToast } from "@/hooks/use-toast";

const serviceIcons = [Sun, Sun, Moon, Flame];
const serviceColors = [
  "from-orange-400 to-amber-500",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
];

export default function Services() {
  const { toast } = useToast();

  function handleReminder(title: string) {
    toast({ title: "Reminder Set", description: `We'll remind you before ${title}` });
  }

  return (
    <div className="px-4 py-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground">Service Schedules</h1>
        <p className="text-sm text-muted-foreground mt-1">Join us as we worship together</p>
      </motion.div>

      {DEMO_DATA.services.map((service, idx) => {
        const Icon = serviceIcons[idx] || BookOpen;
        const color = serviceColors[idx] || "from-blue-500 to-indigo-600";

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all"
            data-testid={`service-card-${service.id}`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${color} p-4 flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white font-bold font-display text-base">{service.title}</h2>
            </div>

            {/* Timeline */}
            <div className="p-4">
              <div className="relative ml-3">
                {/* Vertical line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-border" />

                <div className="space-y-4">
                  {service.schedule.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.12 + i * 0.06 }}
                      className="flex items-start gap-4 pl-6 relative"
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background -translate-x-0.5" />
                      <div className="flex-1 flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">{item.event}</span>
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">{item.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleReminder(service.title)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-all"
                data-testid={`button-reminder-${service.id}`}
              >
                <Bell className="w-4 h-4" /> Set Reminder
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
