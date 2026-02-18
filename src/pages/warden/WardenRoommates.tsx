import { motion } from "framer-motion";
import { Heart, TrendingUp, TrendingDown, Users } from "lucide-react";
import StatCard from "@/components/StatCard";

const matchStats = [
  { pair: "Arjun R. & Rahul S.", score: 92, status: "happy", changeReq: false },
  { pair: "Sneha I. & Ananya D.", score: 95, status: "happy", changeReq: false },
  { pair: "Karan S. & Vikram J.", score: 78, status: "neutral", changeReq: true },
  { pair: "Neha V. & Priya P.", score: 87, status: "happy", changeReq: false },
  { pair: "Amit K. & Rohit G.", score: 65, status: "unhappy", changeReq: true },
];

const statusEmoji: Record<string, string> = { happy: "😊", neutral: "😐", unhappy: "😟" };

const WardenRoommates = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold font-heading text-foreground">Roommate Success</h1>
      <p className="text-muted-foreground mt-1">Match rates, satisfaction, and change requests</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Heart} title="Avg Match Score" value="83%" subtitle="Across all pairs" gradient="primary" delay={0} />
      <StatCard icon={TrendingUp} title="Happy Pairs" value="78%" subtitle="No change requests" gradient="success" delay={0.05} />
      <StatCard icon={TrendingDown} title="Change Requests" value="12" subtitle="This semester" gradient="warning" delay={0.1} />
      <StatCard icon={Users} title="Total Pairs" value="243" subtitle="486 students" gradient="primary" delay={0.15} />
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold font-heading text-foreground">Recent Matches</h2>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Pair</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Score</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Change Req</th>
          </tr>
        </thead>
        <tbody>
          {matchStats.map((m, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
              <td className="px-4 py-3 text-sm font-medium text-foreground">{m.pair}</td>
              <td className="px-4 py-3">
                <span className={`text-sm font-bold ${m.score >= 85 ? "text-success" : m.score >= 70 ? "text-primary" : "text-warning"}`}>
                  {m.score}%
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{statusEmoji[m.status]} {m.status}</td>
              <td className="px-4 py-3">
                {m.changeReq ? (
                  <span className="inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">Requested</span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  </div>
);

export default WardenRoommates;
