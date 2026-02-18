import { motion } from "framer-motion";
import { Wrench, Zap, Shirt, Hammer, AlertTriangle, UserCheck } from "lucide-react";
import { useState } from "react";

const tickets = [
  { id: "T-1042", title: "Bathroom tap leaking", room: "204", category: "plumber", status: "escalated", time: "15 min ago", student: "Rahul S.", assignedTo: "" },
  { id: "T-1041", title: "Light flickering in corridor", room: "3rd Floor", category: "electrician", status: "in_progress", time: "2 hrs ago", student: "Priya P.", assignedTo: "Ramesh K." },
  { id: "T-1040", title: "Wardrobe door broken", room: "108", category: "carpenter", status: "open", time: "4 hrs ago", student: "Sneha G.", assignedTo: "" },
  { id: "T-1039", title: "Washing machine not draining", room: "Laundry", category: "laundry", status: "resolved", time: "6 hrs ago", student: "Karan M.", assignedTo: "Suresh P." },
  { id: "T-1038", title: "AC not cooling", room: "302", category: "electrician", status: "escalated", time: "1 day ago", student: "Arjun S.", assignedTo: "" },
  { id: "T-1037", title: "Sink clogged", room: "210", category: "plumber", status: "in_progress", time: "1 day ago", student: "Neha V.", assignedTo: "Ramesh K." },
];

const statusBadge: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-primary/10 text-primary" },
  in_progress: { label: "In Progress", className: "bg-warning/10 text-warning" },
  escalated: { label: "Escalated >24hr", className: "bg-destructive/10 text-destructive" },
  resolved: { label: "Resolved", className: "bg-success/10 text-success" },
};

const staff = ["Ramesh K.", "Suresh P.", "Ajay M.", "Deepak R."];

const WardenComplaints = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? tickets.filter(t => t.status === filter) : tickets;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Complaint Queue</h1>
        <p className="text-muted-foreground mt-1">Manage tickets, assign staff, track resolution</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[null, "open", "in_progress", "escalated", "resolved"].map((s) => (
          <button
            key={s ?? "all"}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === s ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s ? statusBadge[s].label : "All"} ({s ? tickets.filter(t => t.status === s).length : tickets.length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ticket) => {
          const badge = statusBadge[ticket.status];
          return (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>{badge.label}</span>
                    {ticket.status === "escalated" && <AlertTriangle size={14} className="text-destructive" />}
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{ticket.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Room {ticket.room} • {ticket.student} • {ticket.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {ticket.assignedTo ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 rounded-full px-2.5 py-1">
                      <UserCheck size={12} /> {ticket.assignedTo}
                    </span>
                  ) : (
                    <select className="rounded-lg border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Assign staff...</option>
                      {staff.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WardenComplaints;
