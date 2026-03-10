import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle2, AlertTriangle, Navigation } from "lucide-react";
import StatCard from "@/components/StatCard";

const outpasses = [
  { student: "Priya Patel", room: "205", destination: "Home - Mumbai", returnBy: "6:00 PM", status: "active", timeStatus: "on_time", location: { lat: 19.076, lng: 72.8777, label: "Andheri West, Mumbai" } },
  { student: "Vikram Joshi", room: "104", destination: "Friend's house", returnBy: "4:00 PM", status: "active", timeStatus: "overdue", location: { lat: 28.6139, lng: 77.209, label: "Connaught Place, Delhi" } },
  { student: "Karan Mehta", room: "210", destination: "Market", returnBy: "5:30 PM", status: "active", timeStatus: "overdue", location: { lat: 28.5355, lng: 77.391, label: "Sector 18, Noida" } },
  { student: "Sneha Gupta", room: "108", destination: "Medical", returnBy: "3:00 PM", status: "returned", timeStatus: "on_time", location: null },
  { student: "Arjun Singh", room: "302", destination: "Home - Delhi", returnBy: "8:00 PM", status: "active", timeStatus: "on_time", location: { lat: 28.7041, lng: 77.1025, label: "Rohini, Delhi" } },
  { student: "Ananya Rao", room: "315", destination: "Library", returnBy: "7:00 PM", status: "returned", timeStatus: "on_time", location: null },
];

const rowBg: Record<string, string> = {
  on_time: "",
  overdue: "bg-destructive/5 border-destructive/20",
};

const WardenOutpass = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold font-heading text-foreground">Outpass Monitor</h1>
      <p className="text-muted-foreground mt-1">Track active outings, flag overdue students</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={MapPin} title="Currently Out" value="4" subtitle="Active outpasses" gradient="primary" delay={0} />
      <StatCard icon={AlertTriangle} title="Overdue" value="2" subtitle="Past return time" gradient="danger" delay={0.05} />
      <StatCard icon={CheckCircle2} title="Returned Today" value="2" subtitle="On time" gradient="success" delay={0.1} />
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-3">
      {outpasses.map((op, i) => (
        <div key={i} className={`glass-card rounded-xl p-4 border ${rowBg[op.timeStatus]}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                op.status === "returned" ? "bg-success/10" : op.timeStatus === "overdue" ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                {op.status === "returned" ? (
                  <CheckCircle2 size={18} className="text-success" />
                ) : op.timeStatus === "overdue" ? (
                  <AlertTriangle size={18} className="text-destructive" />
                ) : (
                  <MapPin size={18} className="text-primary" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{op.student}</p>
                <p className="text-xs text-muted-foreground">Room {op.room} • {op.destination}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              {/* Live location */}
              {op.location && op.status === "active" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-accent-foreground font-medium">
                  <Navigation size={11} className="text-primary animate-pulse" />
                  {op.location.label}
                </span>
              )}
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock size={12} /> Return by {op.returnBy}
              </span>
              {op.status === "returned" ? (
                <span className="inline-flex rounded-full bg-success/10 px-2.5 py-0.5 font-medium text-success">Returned ✓</span>
              ) : op.timeStatus === "overdue" ? (
                <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-0.5 font-bold text-destructive animate-pulse">OVERDUE</span>
              ) : (
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">Active</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

export default WardenOutpass;
