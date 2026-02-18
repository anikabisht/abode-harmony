import { motion } from "framer-motion";
import { UtensilsCrossed, TrendingDown, TrendingUp, BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";

const mealData = [
  { meal: "Breakfast", cooked: 120, consumed: 105, waste: 15, prediction: 108 },
  { meal: "Lunch", cooked: 200, consumed: 175, waste: 25, prediction: 180 },
  { meal: "Snacks", cooked: 80, consumed: 72, waste: 8, prediction: 74 },
  { meal: "Dinner", cooked: 190, consumed: 165, waste: 25, prediction: 170 },
];

const weeklyTrend = [
  { day: "Mon", waste: 18 },
  { day: "Tue", waste: 22 },
  { day: "Wed", waste: 15 },
  { day: "Thu", waste: 28 },
  { day: "Fri", waste: 12 },
  { day: "Sat", waste: 35 },
  { day: "Sun", waste: 20 },
];

const maxWaste = Math.max(...weeklyTrend.map(d => d.waste));

const FoodWastage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Food & Mess Analytics</h1>
        <p className="text-muted-foreground mt-1">ML-powered predictions to minimize waste</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UtensilsCrossed} title="Today's Waste" value="73 kg" subtitle="↓ 12% vs yesterday" gradient="warning" delay={0} />
        <StatCard icon={TrendingDown} title="Monthly Savings" value="₹42,000" subtitle="Compared to last month" gradient="success" delay={0.05} />
        <StatCard icon={BarChart3} title="Prediction Accuracy" value="94.2%" subtitle="ML model confidence" gradient="primary" delay={0.1} />
        <StatCard icon={TrendingUp} title="Waste Reduction" value="34%" subtitle="Since system adoption" gradient="success" delay={0.15} />
      </div>

      {/* Meal Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-foreground mb-4">Today's Meal Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Meal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cooked (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Consumed (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Waste (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ML Prediction</th>
              </tr>
            </thead>
            <tbody>
              {mealData.map((m, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{m.meal}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{m.cooked}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{m.consumed}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${m.waste > 20 ? "text-destructive" : "text-warning"}`}>
                      {m.waste}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                      {m.prediction} kg
                      <TrendingDown size={12} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Weekly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold font-heading text-foreground mb-6">Weekly Waste Trend</h2>
        <div className="flex items-end gap-3 h-40">
          {weeklyTrend.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{d.waste}kg</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.waste / maxWaste) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                className={`w-full rounded-t-md ${d.waste > 25 ? "bg-destructive/70" : "bg-primary/70"}`}
              />
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FoodWastage;
