import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, Tv, Bell, BarChart3, CalendarDays, Home, LogOut,
  Plus, Edit2, Trash2, Send, Loader2, CheckCircle, X, Save, MessageSquare
} from "lucide-react";
import { supabase, Announcement, PrayerRequest, Sermon } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { DEMO_DATA } from "@/data/demo";
import { useToast } from "@/hooks/use-toast";

type AdminTab = "overview" | "announcements" | "prayer" | "verses" | "sermons" | "users" | "services";

function StatCard({ icon: Icon, label, value, color, loading }: {
  icon: React.ElementType; label: string; value: string | number; color: string; loading?: boolean;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl p-4 bg-[#1e293b] border border-white/10">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {loading ? (
        <div className="h-8 w-12 bg-white/10 rounded animate-pulse mb-1" />
      ) : (
        <p className="text-2xl font-bold text-white font-display">{value}</p>
      )}
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </motion.div>
  );
}

function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </motion.div>
    </div>
  );
}

function AnnouncementsTab() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: "", description: "", date_label: "", pinned: false });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("announcements").select("*").order("pinned", { ascending: false }).order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm({ title: "", description: "", date_label: "", pinned: false });
    setModalOpen(true);
  }

  function openEdit(item: Announcement) {
    setEditing(item);
    setForm({ title: item.title, description: item.description, date_label: item.date_label, pinned: item.pinned });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("announcements").update(form).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Announcement updated!" }); setModalOpen(false); load(); }
    } else {
      const { error } = await supabase.from("announcements").insert([form]);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Announcement added!" }); setModalOpen(false); load(); }
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); load(); }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white font-display">Announcements</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden min-h-[100px]">
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">No announcements yet. Add one above.</p>
        ) : items.map((a, i) => (
          <div key={a.id} className={`flex items-start justify-between gap-4 p-4 ${i < items.length - 1 ? "border-b border-white/10" : ""}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {a.pinned && <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Pinned</span>}
                <span className="text-slate-400 text-xs">{a.date_label}</span>
              </div>
              <p className="text-white font-semibold text-sm">{a.title}</p>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">{a.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Announcement" : "New Announcement"}>
        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Title *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. Night of Wonders" />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Details..." />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Date Label</label>
            <input value={form.date_label} onChange={e => setForm(f => ({ ...f, date_label: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. This Sunday, Coming Friday" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))} className="w-4 h-4 accent-primary" />
            <span className="text-slate-300 text-sm">Pin this announcement</span>
          </label>
          <button onClick={handleSave} disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

function PrayerTab() {
  const [items, setItems] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("prayer_requests").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markPrayed(id: number) {
    await supabase.from("prayer_requests").update({ status: "prayed" }).eq("id", id);
    toast({ title: "Marked as prayed!" });
    load();
  }

  async function handleDelete(id: number) {
    await supabase.from("prayer_requests").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-white font-display">Prayer Requests</h1>
      <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden min-h-[100px]">
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">No prayer requests yet.</p>
        ) : items.map((r, i) => (
          <div key={r.id} className={`flex items-start justify-between gap-4 p-4 ${i < items.length - 1 ? "border-b border-white/10" : ""}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === "prayed" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}>
                  {r.status === "prayed" ? "Prayed" : "Pending"}
                </span>
                <span className="text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-white font-semibold text-sm">{r.name}</p>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">{r.request}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {r.status !== "prayed" && (
                <button onClick={() => markPrayed(r.id)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" title="Mark as prayed">
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => handleDelete(r.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SermonsTab() {
  const [items, setItems] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [form, setForm] = useState({ title: "", date_label: "", duration: "", youtube_url: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("sermons").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setEditing(null); setForm({ title: "", date_label: "", duration: "", youtube_url: "" }); setModalOpen(true); }
  function openEdit(s: Sermon) { setEditing(s); setForm({ title: s.title, date_label: s.date_label, duration: s.duration, youtube_url: s.youtube_url }); setModalOpen(true); }

  async function handleSave() {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("sermons").update(form).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Sermon updated!" }); setModalOpen(false); load(); }
    } else {
      const { error } = await supabase.from("sermons").insert([form]);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Sermon added!" }); setModalOpen(false); load(); }
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    await supabase.from("sermons").delete().eq("id", id);
    toast({ title: "Deleted" });
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white font-display">Sermons</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Sermon
        </button>
      </div>
      <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden min-h-[100px]">
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">No sermons yet. Add one above.</p>
        ) : items.map((s, i) => (
          <div key={s.id} className={`flex items-center justify-between gap-4 p-4 ${i < items.length - 1 ? "border-b border-white/10" : ""}`}>
            <div>
              <p className="text-white font-semibold text-sm">{s.title}</p>
              <p className="text-slate-400 text-xs mt-0.5">{s.date_label} · {s.duration}</p>
              {s.youtube_url && <p className="text-primary text-xs mt-0.5 truncate max-w-[220px]">{s.youtube_url}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(s)} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Sermon" : "New Sermon"}>
        <div className="space-y-3">
          {[
            { label: "Title *", key: "title", placeholder: "e.g. Walking in Faith" },
            { label: "Date Label", key: "date_label", placeholder: "e.g. Last Sunday" },
            { label: "Duration", key: "duration", placeholder: "e.g. 45 min" },
            { label: "YouTube URL", key: "youtube_url", placeholder: "https://youtube.com/..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">{label}</label>
              <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={placeholder} />
            </div>
          ))}
          <button onClick={handleSave} disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState<{ id: string; email: string; full_name: string; role: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("profiles").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setUsers(data || []); setLoading(false); });
  }, []);

  async function changeRole(id: string, role: string) {
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setUsers(u => u.map(user => user.id === id ? { ...user, role } : user));
    toast({ title: "Role updated!" });
  }

  const roleColors: Record<string, string> = {
    admin: "bg-primary/20 text-primary",
    leader: "bg-amber-400/20 text-amber-400",
    member: "bg-emerald-400/20 text-emerald-400",
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-white font-display">Members {!loading && `(${users.length})`}</h1>
      <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : users.length === 0 ? (
          <p className="text-center text-slate-500 py-12 text-sm">No members yet.</p>
        ) : users.map((u, i) => (
          <div key={u.id} className={`flex items-center justify-between gap-4 p-4 ${i < users.length - 1 ? "border-b border-white/10" : ""}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">{(u.full_name || u.email || "?")[0].toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{u.full_name || "—"}</p>
                <p className="text-slate-400 text-xs truncate">{u.email}</p>
              </div>
            </div>
            <select
              value={u.role}
              onChange={e => changeRole(u.id, e.target.value)}
              className={`text-xs font-bold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40 ${roleColors[u.role] || "bg-white/10 text-white"}`}
            >
              <option value="member">Member</option>
              <option value="leader">Leader</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  function handleSend() {
    if (!title || !message) { toast({ title: "Please fill in all fields", variant: "destructive" }); return; }
    toast({ title: "Notification sent!", description: "All members have been notified." });
    setTitle(""); setMessage("");
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-white font-display">Send Notification</h1>
      <div className="rounded-2xl bg-[#1e293b] border border-white/10 p-5 max-w-lg space-y-4">
        <div>
          <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Notification title" />
        </div>
        <div>
          <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Write your message..." />
        </div>
        <button onClick={handleSend} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm glow-blue hover:opacity-90">
          <Send className="w-4 h-4" /> Send to All Members
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [stats, setStats] = useState({ members: 0, prayer: 0, sermons: 0, announcements: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [members, prayer, sermons, announcements] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("prayer_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("sermons").select("id", { count: "exact", head: true }),
        supabase.from("announcements").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        members: members.count || 0,
        prayer: prayer.count || 0,
        sermons: sermons.count || 0,
        announcements: announcements.count || 0,
      });
      setStatsLoading(false);
    }
    loadStats();
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate("/");
    toast({ title: "Signed out" });
  }

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "prayer", label: "Prayer Requests", icon: MessageSquare },
    { id: "sermons", label: "Sermons", icon: Tv },
    { id: "verses", label: "Bible Verses", icon: BookOpen },
    { id: "users", label: "Members", icon: Users },
    { id: "services", label: "Services", icon: CalendarDays },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/10 flex flex-col p-4 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-6 mt-2">
          <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" fill="none" className="w-4 h-4 text-primary">
              <rect x="32" y="4" width="16" height="72" rx="4" fill="currentColor" />
              <rect x="8" y="24" width="64" height="16" rx="4" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">All Faith Mission</p>
            <p className="text-slate-500 text-[10px]">Admin Panel</p>
          </div>
        </div>

        {/* User info */}
        {user && (
          <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-xl bg-primary/30 flex items-center justify-center mb-2">
              <span className="text-primary font-bold text-sm">
                {(profile?.full_name || user.email || "A")[0].toUpperCase()}
              </span>
            </div>
            <p className="text-white text-xs font-semibold truncate">{profile?.full_name || "Admin"}</p>
            <p className="text-slate-500 text-[10px] truncate">{user.email}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary mt-1 inline-block">
              {profile?.role || "admin"}
            </span>
          </div>
        )}

        <nav className="flex-1 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === id ? "bg-primary/20 text-primary font-semibold" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`admin-nav-${id}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-white/10">
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Home className="w-4 h-4" /> Back to App
            </button>
          </Link>
          {user ? (
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <Link href="/login">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-primary/10 transition-all">
                <Users className="w-4 h-4" /> Sign In
              </button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">Dashboard Overview</h1>
                  <p className="text-slate-400 text-sm mt-1">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={Users} label="Total Members" value={stats.members} color="bg-blue-600" loading={statsLoading} />
                  <StatCard icon={MessageSquare} label="Pending Prayers" value={stats.prayer} color="bg-violet-600" loading={statsLoading} />
                  <StatCard icon={Tv} label="Sermons" value={stats.sermons} color="bg-rose-600" loading={statsLoading} />
                  <StatCard icon={Bell} label="Announcements" value={stats.announcements} color="bg-emerald-600" loading={statsLoading} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#1e293b] border border-white/10 p-5">
                    <h2 className="text-white font-bold mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                      {[
                        { label: "Add Announcement", tab: "announcements" as AdminTab },
                        { label: "View Prayer Requests", tab: "prayer" as AdminTab },
                        { label: "Add a Sermon", tab: "sermons" as AdminTab },
                        { label: "Manage Members", tab: "users" as AdminTab },
                      ].map(({ label, tab }) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                          className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary text-slate-300 text-sm transition-all">
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#1e293b] border border-white/10 p-5">
                    <h2 className="text-white font-bold mb-4">App Info</h2>
                    <div className="space-y-3 text-sm">
                      {[
                        { label: "Church", value: "All Faith Mission Churches International" },
                        { label: "Pastor", value: "Pastor Expedito" },
                        { label: "Location", value: "Nabweru - Kagoma Rd, Kampala" },
                        { label: "WhatsApp", value: "+256 772 562 123" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-2">
                          <span className="text-slate-400">{label}</span>
                          <span className="text-white text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "announcements" && <AnnouncementsTab />}
            {activeTab === "prayer" && <PrayerTab />}
            {activeTab === "sermons" && <SermonsTab />}
            {activeTab === "users" && <UsersTab />}
            {activeTab === "verses" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-white font-display">Bible Verses</h1>
                <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
                  {DEMO_DATA.verses.map((v, i) => {
                    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    return (
                      <div key={i} className={`flex items-start justify-between gap-4 p-4 ${i < DEMO_DATA.verses.length - 1 ? "border-b border-white/10" : ""}`}>
                        <div>
                          <p className="text-primary text-xs font-bold mb-1">{days[i]} — {v.ref}</p>
                          <p className="text-slate-300 text-sm leading-relaxed italic">"{v.text}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeTab === "services" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-white font-display">Service Schedules</h1>
                <div className="grid gap-4">
                  {DEMO_DATA.services.map((svc) => (
                    <div key={svc.id} className="rounded-2xl bg-[#1e293b] border border-white/10 p-5">
                      <h3 className="text-white font-bold mb-3">{svc.title}</h3>
                      <div className="space-y-2">
                        {svc.schedule.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-300">{item.event}</span>
                            <span className="text-primary font-semibold">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "notifications" && <NotificationsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
