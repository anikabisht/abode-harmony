import { motion } from "framer-motion";
import { Wrench, Zap, Shirt, Hammer, Plus, AlertTriangle, Sparkles, UtensilsCrossed, MoreHorizontal, Wifi } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "plumber", label: "Plumbing", icon: Wrench },
  { id: "electrician", label: "Electrical", icon: Zap },
  { id: "carpenter", label: "Carpentry", icon: Hammer },
  { id: "laundry", label: "Laundry", icon: Shirt },
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "others", label: "Others", icon: MoreHorizontal },
];

const myTickets = [
  { id: "T-1042", title: "Bathroom tap leaking", category: "plumber", status: "in_progress", time: "2 hrs ago" },
  { id: "T-1038", title: "AC not cooling", category: "electrician", status: "escalated", time: "1 day ago" },
  { id: "T-1035", title: "Washing machine issue", category: "laundry", status: "resolved", time: "3 days ago" },
];

const statusBadge: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-primary/10 text-primary" },
  in_progress: { label: "In Progress", className: "bg-warning/10 text-warning" },
  escalated: { label: "Escalated", className: "bg-destructive/10 text-destructive" },
  resolved: { label: "Resolved", className: "bg-success/10 text-success" },
};

const StudentComplaints = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">My Complaints</h1>
          <p className="text-muted-foreground mt-1">Raise and track your maintenance requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Raise Complaint
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Select Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all ${
                  selectedCategory === cat.id ? "border-primary bg-accent" : "border-border hover:border-primary/30"
                }`}
              >
                <cat.icon size={22} className="text-primary" />
                <span className="text-xs font-medium text-foreground">{cat.label}</span>
              </button>
            ))}
          </div>
          <textarea
            placeholder="Describe the issue..."
            className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={3}
          />
          <button className="mt-3 gradient-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium">
            Submit
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">My Tickets</h2>
        {myTickets.map((ticket) => {
          const badge = statusBadge[ticket.status];
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>{badge.label}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{ticket.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{ticket.time}</p>
                </div>
                {ticket.status === "escalated" && <AlertTriangle size={16} className="text-destructive" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentComplaints;
