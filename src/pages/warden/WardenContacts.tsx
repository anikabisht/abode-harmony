import { motion } from "framer-motion";
import { Phone, Wrench, Zap, Hammer, Shirt, Sparkles, User, PhoneCall } from "lucide-react";

const contacts = [
  { name: "Ramesh Kumar", role: "Plumber", phone: "+91 98765 43210", icon: Wrench, available: true },
  { name: "Suresh Patel", role: "Electrician", phone: "+91 98765 43211", icon: Zap, available: true },
  { name: "Ajay Mishra", role: "Carpenter", phone: "+91 98765 43212", icon: Hammer, available: false },
  { name: "Deepak Rao", role: "Laundry Staff", phone: "+91 98765 43213", icon: Shirt, available: true },
  { name: "Sunita Devi", role: "Cleaning Maid", phone: "+91 98765 43214", icon: Sparkles, available: true },
  { name: "Kamla Bai", role: "Cleaning Maid", phone: "+91 98765 43215", icon: Sparkles, available: true },
  { name: "Rajesh Gupta", role: "Security Guard", phone: "+91 98765 43216", icon: User, available: true },
  { name: "Amit Verma", role: "Mess Manager", phone: "+91 98765 43217", icon: User, available: false },
  { name: "Pradeep Singh", role: "Admin Staff", phone: "+91 98765 43218", icon: User, available: true },
];

const WardenContacts = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold font-heading text-foreground">Staff Contacts</h1>
      <p className="text-muted-foreground mt-1">Quick-dial directory for hostel staff</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="glass-card rounded-xl p-5 flex items-start gap-4"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            c.available ? "bg-primary/10" : "bg-muted"
          }`}>
            <c.icon size={20} className={c.available ? "text-primary" : "text-muted-foreground"} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.role}</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">{c.phone}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <a
              href={`tel:${c.phone.replace(/\s/g, "")}`}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                c.available
                  ? "bg-success/10 text-success hover:bg-success/20"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <PhoneCall size={16} />
            </a>
            <span className={`text-[10px] font-medium ${c.available ? "text-success" : "text-muted-foreground"}`}>
              {c.available ? "Online" : "Offline"}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default WardenContacts;
