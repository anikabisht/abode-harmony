import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient: "primary" | "success" | "warning" | "danger";
  delay?: number;
}

const StatCard = ({ title, value, subtitle, icon: Icon, gradient, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card rounded-xl p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1.5 text-2xl font-bold font-heading text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg gradient-${gradient} text-primary-foreground`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
