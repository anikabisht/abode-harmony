import { motion } from "framer-motion";
import { Wrench, Zap, Shirt, Hammer, Plus, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "plumber", label: "Plumbing", icon: Wrench, count: 8 },
  { id: "electrician", label: "Electrical", icon: Zap, count: 6 },
  { id: "carpenter", label: "Carpentry", icon: Hammer, count: 4 },
  { id: "laundry", label: "Laundry", icon: Shirt, count: 5 },
];

const tickets = [
  { id: "T-1042", title: "Bathroom tap leaking", room: "204", category: "plumber", status: "escalated", time: "15 min ago", student: "Rahul S." },
  { id: "T-1041", title: "Light flickering in corridor", room: "3rd Floor", category: "electrician", status: "in_progress", time: "2 hrs ago", student: "Priya P." },
  { id: "T-1040", title: "Wardrobe door broken", room: "108", category: "carpenter", status: "open", time: "4 hrs ago", student: "Sneha G." },
  { id: "T-1039", title: "Washing machine not draining", room: "Laundry", category: "laundry", status: "resolved", time: "6 hrs ago", student: "Karan M." },
  { id: "T-1038", title: "AC not cooling", room: "302", category: "electrician", status: "escalated", time: "1 day ago", student: "Arjun S." },
  { id: "T-1037", title: "Sink clogged", room: "210", category: "plumber", status: "in_progress", time: "1 day ago", student: "Neha V." },
];

const statusBadge = {
  open: { label: "Open", className: "bg-primary/10 text-primary" },
  in_progress: { label: "In Progress", className: "bg-warning/10 text-warning" },
  escalated: { label: "Escalated", className: "bg-destructive/10 text-destructive" },
  resolved: { label: "Resolved", className: "bg-success/10 text-success" },
};

const Complaints = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory ? tickets.filter(t => t.category === activeCategory) : tickets;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Complaints</h1>
          <p className="text-muted-foreground mt-1">Track and manage hostel maintenance requests</p>
        </div>
        <button className="inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
          <Plus size={16} />
          New Ticket
        </button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`flex items-center gap-3 rounded-xl p-4 border transition-all duration-200 ${
              activeCategory === cat.id
                ? "border-primary bg-accent shadow-md"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <cat.icon size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{cat.label}</p>
              <p className="text-xs text-muted-foreground">{cat.count} open</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        {filtered.map((ticket) => {
          const badge = statusBadge[ticket.status as keyof typeof statusBadge];
          return (
            <div
              key={ticket.id}
              className="glass-card rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{ticket.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span>Room {ticket.room}</span>
                    <span>•</span>
                    <span>{ticket.student}</span>
                    <span>•</span>
                    <span>{ticket.time}</span>
                  </div>
                </div>
                {ticket.status === "escalated" && (
                  <AlertTriangle size={16} className="text-destructive flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Complaints;
