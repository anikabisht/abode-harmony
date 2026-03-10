import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle2, Timer, Send } from "lucide-react";

interface OutpassRequest {
  id: string;
  destination: string;
  reason: string;
  from: string;
  to: string;
  status: "approved" | "denied" | "pending" | "active";
  parentVerified: boolean;
  timeLeft?: number; // minutes
}

const pastRequests: OutpassRequest[] = [
  { id: "OP-42", destination: "Home - Mumbai", reason: "Weekend visit", from: "Feb 15", to: "Feb 17", status: "approved", parentVerified: true },
  { id: "OP-41", destination: "Friend's house", reason: "Birthday party", from: "Feb 10", to: "Feb 10", status: "denied", parentVerified: false },
  { id: "OP-40", destination: "Medical", reason: "Doctor appointment", from: "Feb 5", to: "Feb 5", status: "approved", parentVerified: true },
];

const statusStyles: Record<string, { label: string; className: string }> = {
  approved: { label: "Approved", className: "bg-success/10 text-success" },
  denied: { label: "Denied", className: "bg-destructive/10 text-destructive" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning" },
  active: { label: "Active", className: "gradient-primary text-primary-foreground" },
};

const StudentOutpass = () => {
  const [activeOutpass, setActiveOutpass] = useState<{ destination: string; totalMinutes: number; minutesLeft: number } | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!activeOutpass || activeOutpass.minutesLeft <= 0) return;
    const interval = setInterval(() => {
      setActiveOutpass((prev) => prev ? { ...prev, minutesLeft: Math.max(0, prev.minutesLeft - 1) } : null);
    }, 60000);
    return () => clearInterval(interval);
  }, [activeOutpass]);

  const startDemo = () => {
    setActiveOutpass({ destination: "Connaught Place", totalMinutes: 180, minutesLeft: 142 });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Outpass</h1>
          <p className="text-muted-foreground mt-1">Request and track your outings</p>
        </div>
        {!activeOutpass && (
          <button onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
            <Send size={16} /> Request Outpass
          </button>
        )}
      </div>

      {/* Active Outpass Timer */}
      {activeOutpass && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-6 border-2 border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <Timer size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Active Outpass</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">{activeOutpass.destination}</p>
            <div className="text-5xl font-bold font-heading text-foreground mb-2">
              {Math.floor(activeOutpass.minutesLeft / 60)}h {activeOutpass.minutesLeft % 60}m
            </div>
            <p className="text-xs text-muted-foreground">remaining</p>
            {/* Progress bar */}
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${activeOutpass.minutesLeft < 30 ? "bg-destructive" : "gradient-primary"}`}
                initial={{ width: "100%" }}
                animate={{ width: `${(activeOutpass.minutesLeft / activeOutpass.totalMinutes) * 100}%` }}
              />
            </div>
            <button onClick={() => setActiveOutpass(null)} className="mt-4 text-sm text-destructive hover:underline">
              Mark as Returned
            </button>
          </div>
        </motion.div>
      )}

      {/* Request Form */}
      {showForm && !activeOutpass && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">New Outpass Request</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Destination" className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Reason" className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <input type="time" className="rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent p-3 text-xs text-accent-foreground">
              <CheckCircle2 size={14} />
              <span>Parent verification will be checked automatically</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-foreground">
              <MapPin size={14} className="text-primary" />
              <span>Your live location will be shared with the warden during the outpass</span>
            </div>
            <button onClick={startDemo} className="gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium w-full">
              Submit Request
            </button>
          </div>
        </motion.div>
      )}

      {/* Past Requests */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold font-heading text-foreground">Past Requests</h2>
        {pastRequests.map((req) => {
          const st = statusStyles[req.status];
          return (
            <div key={req.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{req.id}</span>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${st.className}`}>{st.label}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{req.destination}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{req.from} → {req.to}</p>
                </div>
                <MapPin size={16} className="text-muted-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentOutpass;
