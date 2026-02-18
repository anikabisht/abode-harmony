import { motion } from "framer-motion";
import { QrCode, MessageSquareWarning, MapPin, Heart, UtensilsCrossed, BarChart3, Bell } from "lucide-react";
import StatCard from "@/components/StatCard";
import { useRole } from "@/contexts/RoleContext";

const StudentDashboard = () => {
  const { studentName } = useRole();
  const firstName = studentName.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Hey, {firstName} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your hostel life at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={QrCode} title="Attendance" value="94%" subtitle="This month" gradient="success" delay={0} />
        <StatCard icon={MessageSquareWarning} title="Open Complaints" value="2" subtitle="1 in progress" gradient="warning" delay={0.05} />
        <StatCard icon={MapPin} title="Outings" value="3" subtitle="This month" gradient="primary" delay={0.1} />
        <StatCard icon={Heart} title="Roommate Match" value="92%" subtitle="Arjun Reddy" gradient="success" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Mess Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed size={18} className="text-primary" />
            <h2 className="text-lg font-semibold font-heading text-foreground">Today's Mess Menu</h2>
          </div>
          <div className="space-y-3">
            {[
              { meal: "Breakfast", items: "Poha, Bread & Butter, Tea", time: "7:30 - 9:00 AM" },
              { meal: "Lunch", items: "Dal, Rice, Roti, Paneer Curry", time: "12:30 - 2:00 PM" },
              { meal: "Snacks", items: "Samosa, Chai", time: "4:30 - 5:30 PM" },
              { meal: "Dinner", items: "Chole, Rice, Roti, Salad", time: "7:30 - 9:00 PM" },
            ].map((m, i) => (
              <div key={i} className="flex items-start justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{m.meal}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.items}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{m.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-primary" />
            <h2 className="text-lg font-semibold font-heading text-foreground">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { text: "🎉 Happy Republic Day! Hostel closed tomorrow.", time: "2 hrs ago", unread: true },
              { text: "📝 Mid-sem exams start Feb 24. Mess timings extended.", time: "5 hrs ago", unread: true },
              { text: "👕 Your laundry is ready for pickup.", time: "1 day ago", unread: false },
              { text: "🔧 Plumbing complaint resolved — Room 204.", time: "2 days ago", unread: false },
            ].map((n, i) => (
              <div key={i} className={`flex items-start gap-3 py-2 ${n.unread ? "" : "opacity-60"}`}>
                {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                {!n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground/30 flex-shrink-0" />}
                <div>
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Personal Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-primary" />
          <h2 className="text-lg font-semibold font-heading text-foreground">Your Stats</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Days Present", value: "42/45" },
            { label: "Complaints Filed", value: "5" },
            { label: "Outings Taken", value: "8" },
            { label: "Meals Attended", value: "126" },
          ].map((s, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xl font-bold font-heading text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
