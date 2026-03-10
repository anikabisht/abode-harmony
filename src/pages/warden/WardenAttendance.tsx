import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Search, AlertTriangle } from "lucide-react";
import StatCard from "@/components/StatCard";

const initialStudents = [
  { name: "Rahul Sharma", room: "101", status: "present", time: "10:42 PM" },
  { name: "Priya Patel", room: "205", status: "present", time: "9:15 PM" },
  { name: "Arjun Singh", room: "302", status: "absent", time: "—" },
  { name: "Sneha Gupta", room: "108", status: "present", time: "8:30 PM" },
  { name: "Karan Mehta", room: "210", status: "late", time: "11:58 PM" },
  { name: "Ananya Rao", room: "315", status: "present", time: "7:45 PM" },
  { name: "Vikram Joshi", room: "104", status: "absent", time: "—" },
  { name: "Neha Verma", room: "209", status: "present", time: "9:50 PM" },
];

const statusOptions = ["present", "absent", "late"] as const;

const statusConfig: Record<string, { icon: typeof CheckCircle2; className: string; label: string }> = {
  present: { icon: CheckCircle2, className: "text-success", label: "Present" },
  absent: { icon: XCircle, className: "text-destructive", label: "Absent" },
  late: { icon: Clock, className: "text-warning", label: "Late" },
};

const WardenAttendance = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const toggleStatus = (index: number) => {
    setStudents((prev) => {
      const updated = [...prev];
      const current = updated[index].status;
      const nextIndex = (statusOptions.indexOf(current as any) + 1) % statusOptions.length;
      const nextStatus = statusOptions[nextIndex];
      updated[index] = {
        ...updated[index],
        status: nextStatus,
        time: nextStatus === "absent" ? "—" : new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      };
      return updated;
    });
  };

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.room.includes(search)
  );

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const lateCount = students.filter((s) => s.status === "late").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Live Attendance</h1>
        <p className="text-muted-foreground mt-1">Manually mark students present, absent, or late</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} title="Present" value={String(presentCount)} subtitle={`${((presentCount / students.length) * 100).toFixed(1)}%`} gradient="success" delay={0} />
        <StatCard icon={XCircle} title="Absent" value={String(absentCount)} subtitle={`${((absentCount / students.length) * 100).toFixed(1)}%`} gradient="danger" delay={0.05} />
        <StatCard icon={AlertTriangle} title="Late" value={String(lateCount)} subtitle="Marked late" gradient="warning" delay={0.1} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Room</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Marked At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const originalIndex = students.findIndex((st) => st.name === s.name);
              const cfg = statusConfig[s.status];
              return (
                <tr key={s.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.room}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(originalIndex)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                        s.status === "present"
                          ? "border-success/30 bg-success/10 text-success hover:bg-success/20"
                          : s.status === "absent"
                          ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                          : "border-warning/30 bg-warning/10 text-warning hover:bg-warning/20"
                      }`}
                    >
                      <cfg.icon size={14} /> {cfg.label}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default WardenAttendance;
