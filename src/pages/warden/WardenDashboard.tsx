import { Users, QrCode, MessageSquareWarning, UtensilsCrossed, MapPin, Heart, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";

const recentActivity = [
  { text: "Rahul Sharma checked in at 10:42 PM", time: "2 min ago", color: "bg-success" },
  { text: "New plumbing complaint from Room 204", time: "15 min ago", color: "bg-warning" },
  { text: "Dinner wastage logged: 12kg excess rice", time: "1 hr ago", color: "bg-destructive" },
  { text: "Outpass approved for Priya Patel", time: "2 hrs ago", color: "bg-primary" },
  { text: "OVERDUE: Vikram Joshi — 45 min past return time", time: "30 min ago", color: "bg-destructive" },
];

const WardenDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Warden Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time hostel overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Total Students" value="486" subtitle="12 checked out" gradient="primary" delay={0} />
        <StatCard icon={QrCode} title="Present Today" value="474" subtitle="97.5% attendance" gradient="success" delay={0.05} />
        <StatCard icon={MessageSquareWarning} title="Open Complaints" value="23" subtitle="8 escalated" gradient="warning" delay={0.1} />
        <StatCard icon={UtensilsCrossed} title="Food Saved" value="34%" subtitle="₹42K this month" gradient="success" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold font-heading text-foreground mb-4">Live Activity Feed</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <span className={`mt-1.5 h-2 w-2 rounded-full ${item.color} flex-shrink-0`} />
                <div className="flex-1"><p className="text-sm text-foreground">{item.text}</p><p className="text-xs text-muted-foreground mt-0.5">{item.time}</p></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold font-heading text-foreground mb-4">Alerts</h2>
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, text: "8 complaints escalated (>24hrs)", color: "text-destructive" },
              { icon: Clock, text: "3 students past curfew", color: "text-warning" },
              { icon: MapPin, text: "2 overdue outpasses", color: "text-destructive" },
              { icon: TrendingUp, text: "Sat waste 35kg — above average", color: "text-warning" },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <alert.icon size={16} className={alert.color} />
                <p className="text-sm text-foreground">{alert.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WardenDashboard;
