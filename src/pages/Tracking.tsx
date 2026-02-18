import { motion } from "framer-motion";
import { MapPin, CheckCircle2, XCircle, Clock, Shield } from "lucide-react";
import StatCard from "@/components/StatCard";

const outpassRequests = [
  { student: "Priya Patel", room: "205", destination: "Home - Mumbai", from: "Feb 18", to: "Feb 20", parentStatus: "verified", status: "approved" },
  { student: "Arjun Singh", room: "302", destination: "Friend's house", from: "Feb 18", to: "Feb 18", parentStatus: "not_home", status: "denied" },
  { student: "Karan Mehta", room: "210", destination: "Home - Pune", from: "Feb 19", to: "Feb 21", parentStatus: "pending", status: "pending" },
  { student: "Sneha Gupta", room: "108", destination: "Medical appointment", from: "Feb 18", to: "Feb 18", parentStatus: "verified", status: "approved" },
  { student: "Vikram Joshi", room: "104", destination: "Home - Delhi", from: "Feb 20", to: "Feb 23", parentStatus: "verified", status: "approved" },
];

const statusStyles = {
  approved: { icon: CheckCircle2, className: "text-success", bg: "bg-success/10" },
  denied: { icon: XCircle, className: "text-destructive", bg: "bg-destructive/10" },
  pending: { icon: Clock, className: "text-warning", bg: "bg-warning/10" },
};

const parentStyles = {
  verified: { label: "Parent Home ✓", className: "text-success" },
  not_home: { label: "Parent Away ✗", className: "text-destructive" },
  pending: { label: "Checking...", className: "text-warning" },
};

const Tracking = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Student Tracking</h1>
        <p className="text-muted-foreground mt-1">Smart outpass verification with passive parent checks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={MapPin} title="Active Outpasses" value="12" subtitle="Currently out" gradient="primary" delay={0} />
        <StatCard icon={Shield} title="Auto-Verified" value="89%" subtitle="No parent action needed" gradient="success" delay={0.05} />
        <StatCard icon={XCircle} title="Auto-Denied" value="7" subtitle="This week" gradient="danger" delay={0.1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="space-y-3"
      >
        <h2 className="text-lg font-semibold font-heading text-foreground">Outpass Requests</h2>
        {outpassRequests.map((req, i) => {
          const st = statusStyles[req.status as keyof typeof statusStyles];
          const ps = parentStyles[req.parentStatus as keyof typeof parentStyles];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${st.bg}`}>
                    <st.icon size={18} className={st.className} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{req.student}</p>
                    <p className="text-xs text-muted-foreground">Room {req.room} • {req.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-muted-foreground">{req.from} → {req.to}</span>
                  <span className={`font-medium ${ps.className}`}>{ps.label}</span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium capitalize ${st.bg} ${st.className}`}>
                    {req.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Tracking;
