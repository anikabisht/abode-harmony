import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ClipboardList } from "lucide-react";

const attendanceHistory = [
  { date: "Feb 18", breakfast: true, lunch: true, dinner: false },
  { date: "Feb 17", breakfast: true, lunch: true, dinner: true },
  { date: "Feb 16", breakfast: false, lunch: true, dinner: true },
  { date: "Feb 15", breakfast: true, lunch: false, dinner: true },
  { date: "Feb 14", breakfast: true, lunch: true, dinner: true },
  { date: "Feb 13", breakfast: true, lunch: true, dinner: true },
  { date: "Feb 12", breakfast: false, lunch: true, dinner: false },
];

const StudentAttendance = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">My Attendance</h1>
        <p className="text-muted-foreground mt-1">Attendance is marked by your warden</p>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
          <ClipboardList size={24} />
        </div>
        <div>
          <h2 className="text-sm font-semibold font-heading text-foreground">Warden-Marked Attendance</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Your attendance is recorded by the warden during roll call</p>
        </div>
      </motion.div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-success">94%</p>
          <p className="text-xs text-muted-foreground mt-1">Overall</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-foreground">42</p>
          <p className="text-xs text-muted-foreground mt-1">Days Present</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold font-heading text-destructive">3</p>
          <p className="text-xs text-muted-foreground mt-1">Days Missed</p>
        </div>
      </div>

      {/* History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold font-heading text-foreground">Meal History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Breakfast</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Lunch</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((day, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{day.date}</td>
                  {[day.breakfast, day.lunch, day.dinner].map((present, j) => (
                    <td key={j} className="px-4 py-3 text-center">
                      {present ? <CheckCircle2 size={16} className="text-success mx-auto" /> : <XCircle size={16} className="text-destructive/50 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentAttendance;
