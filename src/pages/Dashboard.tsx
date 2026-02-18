import { Users, QrCode, MessageSquareWarning, UtensilsCrossed, MapPin, Heart, TrendingUp, AlertTriangle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";

const recentActivity = [
  { type: "attendance", text: "Rahul Sharma checked in at 10:42 PM", time: "2 min ago", color: "bg-success" },
  { type: "complaint", text: "New plumbing complaint from Room 204", time: "15 min ago", color: "bg-warning" },
  { type: "food", text: "Dinner wastage logged: 12kg excess rice", time: "1 hr ago", color: "bg-destructive" },
  { type: "tracking", text: "Outpass approved for Priya Patel", time: "2 hrs ago", color: "bg-primary" },
  { type: "roommate", text: "New match request: Arjun ↔ Karan (91%)", time: "3 hrs ago", color: "bg-accent-foreground" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Warden. Here's your hostel overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Total Students" value="486" subtitle="12 checked out" gradient="primary" delay={0} />
        <StatCard icon={QrCode} title="Present Today" value="474" subtitle="97.5% attendance" gradient="success" delay={0.05} />
        <StatCard icon={MessageSquareWarning} title="Open Complaints" value="23" subtitle="8 escalated" gradient="warning" delay={0.1} />
        <StatCard icon={UtensilsCrossed} title="Food Saved" value="34%" subtitle="vs. last month" gradient="success" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold font-heading text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <span className={`mt-1.5 h-2 w-2 rounded-full ${item.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold font-heading text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { icon: QrCode, label: "View Attendance", color: "gradient-primary" },
              { icon: AlertTriangle, label: "Escalated Issues", color: "gradient-danger" },
              { icon: TrendingUp, label: "Food Analytics", color: "gradient-success" },
              { icon: MapPin, label: "Outpass Requests", color: "gradient-warning" },
              { icon: Heart, label: "Match Students", color: "gradient-primary" },
            ].map((action, i) => (
              <button
                key={i}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-md ${action.color} text-primary-foreground`}>
                  <action.icon size={15} />
                </div>
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
