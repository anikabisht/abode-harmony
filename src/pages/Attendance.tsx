import { motion } from "framer-motion";
import { QrCode, Search, Filter, Clock, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "@/components/StatCard";

const students = [
  { name: "Rahul Sharma", room: "101", status: "present", time: "10:42 PM" },
  { name: "Priya Patel", room: "205", status: "present", time: "9:15 PM" },
  { name: "Arjun Singh", room: "302", status: "absent", time: "—" },
  { name: "Sneha Gupta", room: "108", status: "present", time: "8:30 PM" },
  { name: "Karan Mehta", room: "210", status: "late", time: "11:58 PM" },
  { name: "Ananya Rao", room: "315", status: "present", time: "7:45 PM" },
  { name: "Vikram Joshi", room: "104", status: "absent", time: "—" },
  { name: "Neha Verma", room: "209", status: "present", time: "9:50 PM" },
];

const statusConfig = {
  present: { icon: CheckCircle2, className: "text-success", label: "Present" },
  absent: { icon: XCircle, className: "text-destructive", label: "Absent" },
  late: { icon: Clock, className: "text-warning", label: "Late" },
};

const Attendance = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Attendance</h1>
          <p className="text-muted-foreground mt-1">QR-based check-in/check-out tracking</p>
        </div>
        <button className="inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
          <QrCode size={16} />
          Generate QR Codes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} title="Present" value="474" subtitle="97.5%" gradient="success" delay={0} />
        <StatCard icon={XCircle} title="Absent" value="10" subtitle="2.1%" gradient="danger" delay={0.05} />
        <StatCard icon={Clock} title="Late Entry" value="2" subtitle="After 11 PM" gradient="warning" delay={0.1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Room</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Scan</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const cfg = statusConfig[s.status as keyof typeof statusConfig];
                return (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.room}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${cfg.className}`}>
                        <cfg.icon size={14} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
