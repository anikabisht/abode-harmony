import { motion } from "framer-motion";
import { ClipboardList, MessageSquareWarning, MapPin, Heart, UtensilsCrossed, BarChart3, Bell, Image } from "lucide-react";
import StatCard from "@/components/StatCard";
import { useRole } from "@/contexts/RoleContext";
import { useNotifications } from "@/contexts/NotificationContext";

const StudentDashboard = () => {
  const { studentName } = useRole();
  const { notifications, markRead } = useNotifications();
  const firstName = studentName.split(" ")[0];
  const myNotifications = notifications.filter(n => n.target === "all" || n.target === studentName).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Hey, {firstName} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your hostel life at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardList} title="Attendance" value="94%" subtitle="This month" gradient="success" delay={0} />
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
            {myNotifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notifications</p>
            ) : myNotifications.map((n) => (
              <div key={n.id} onClick={() => markRead(n.id)} className={`flex items-start gap-3 py-2 cursor-pointer ${n.read ? "opacity-60" : ""}`}>
                <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${n.read ? "bg-muted-foreground/30" : "bg-primary"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  {n.type === "poll" && n.pollOptions && (
                    <div className="mt-1.5 flex gap-2">
                      {n.pollOptions.map((o, j) => (
                        <button key={j} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">{o.text}</button>
                      ))}
                    </div>
                  )}
                  {n.type === "image" && n.imageUrl && <img src={n.imageUrl} alt="" className="mt-1.5 rounded-lg max-h-24 object-cover" />}
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
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
