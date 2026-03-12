import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Send, Image, BarChart3, Users, User, Plus, X } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { useToast } from "@/hooks/use-toast";

const STUDENTS = ["All Students", "Rahul Sharma", "Priya Patel", "Vikram Joshi", "Ananya Gupta", "Arjun Reddy", "Sneha Iyer"];

const WardenNotifications = () => {
  const { notifications, addNotification } = useNotifications();
  const { toast } = useToast();
  const [tab, setTab] = useState<"compose" | "sent">("compose");
  const [type, setType] = useState<"text" | "poll" | "image">("text");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("All Students");
  const [imageUrl, setImageUrl] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Title and message are required", variant: "destructive" });
      return;
    }
    addNotification({
      type,
      title: title.trim(),
      message: message.trim(),
      target: target === "All Students" ? "all" : target,
      ...(type === "image" && imageUrl ? { imageUrl } : {}),
      ...(type === "poll" ? { pollOptions: pollOptions.filter(o => o.trim()).map(o => ({ text: o.trim(), votes: 0 })) } : {}),
    });
    toast({ title: "Notification sent!", description: `Sent to ${target}` });
    setTitle(""); setMessage(""); setImageUrl(""); setPollOptions(["", ""]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">Send announcements, polls & images to students</p>
      </div>

      <div className="flex gap-2">
        {(["compose", "sent"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {t === "compose" ? "Compose" : `Sent (${notifications.length})`}
          </button>
        ))}
      </div>

      {tab === "compose" ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-5">
          {/* Type selector */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
            <div className="flex gap-2">
              {([{ v: "text", icon: Bell, label: "Text" }, { v: "poll", icon: BarChart3, label: "Poll" }, { v: "image", icon: Image, label: "Image" }] as const).map((t) => (
                <button key={t.v} onClick={() => setType(t.v)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === t.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Send To</label>
            <div className="flex items-center gap-2">
              {target === "All Students" ? <Users size={16} className="text-primary" /> : <User size={16} className="text-primary" />}
              <select value={target} onChange={(e) => setTarget(e.target.value)} className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                {STUDENTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Title & Message */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title..." className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Write your notification..." className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>

          {/* Image URL */}
          {type === "image" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          )}

          {/* Poll Options */}
          {type === "poll" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Poll Options</label>
              <div className="space-y-2">
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={opt} onChange={(e) => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }} placeholder={`Option ${i + 1}`} className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    {pollOptions.length > 2 && (
                      <button onClick={() => setPollOptions(pollOptions.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button onClick={() => setPollOptions([...pollOptions, ""])} className="flex items-center gap-1 text-sm text-primary hover:underline"><Plus size={14} /> Add option</button>
                )}
              </div>
            </div>
          )}

          <button onClick={handleSend} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-md">
            <Send size={16} /> Send Notification
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-2 rounded-lg ${n.type === "poll" ? "bg-accent" : n.type === "image" ? "bg-success/20" : "bg-primary/20"}`}>
                    {n.type === "poll" ? <BarChart3 size={16} className="text-accent-foreground" /> : n.type === "image" ? <Image size={16} className="text-success" /> : <Bell size={16} className="text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                    {n.type === "poll" && n.pollOptions && (
                      <div className="mt-2 space-y-1">
                        {n.pollOptions.map((o, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {o.text} — {o.votes} votes
                          </div>
                        ))}
                      </div>
                    )}
                    {n.type === "image" && n.imageUrl && (
                      <img src={n.imageUrl} alt="" className="mt-2 rounded-lg max-h-32 object-cover" />
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${n.target === "all" ? "bg-primary/20 text-primary" : "bg-accent text-accent-foreground"}`}>
                    {n.target === "all" ? "Everyone" : n.target}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WardenNotifications;
