import { motion } from "framer-motion";
import { GraduationCap, Shield } from "lucide-react";
import AbodeLogo from "@/components/AbodeLogo";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const select = (role: "student" | "warden") => {
    setRole(role);
    navigate(role === "student" ? "/student" : "/warden");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <div className="flex justify-center mb-6">
          <AbodeLogo size={48} />
        </div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Welcome to Abode</h1>
        <p className="text-muted-foreground mb-10">Smart Hostel Management System</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => select("student")}
            className="group glass-card rounded-2xl p-8 text-left hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-primary-foreground mb-5 group-hover:shadow-lg transition-shadow">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-lg font-bold font-heading text-foreground mb-1">Student</h2>
            <p className="text-sm text-muted-foreground">Attendance, outpass, roommate matching, complaints & more</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => select("warden")}
            className="group glass-card rounded-2xl p-8 text-left hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-foreground text-background mb-5 group-hover:shadow-lg transition-shadow">
              <Shield size={28} />
            </div>
            <h2 className="text-lg font-bold font-heading text-foreground mb-1">Warden</h2>
            <p className="text-sm text-muted-foreground">Live tracking, complaint queue, food analytics, reports & more</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
