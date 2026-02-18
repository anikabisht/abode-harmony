import { motion } from "framer-motion";
import { Download, FileText, BarChart3, Calendar } from "lucide-react";

const reports = [
  { title: "Monthly Attendance Report", description: "Student-wise attendance for February 2026", type: "attendance", date: "Feb 18, 2026" },
  { title: "Complaint Resolution Report", description: "Ticket stats, avg resolution time, escalation rates", type: "complaints", date: "Feb 18, 2026" },
  { title: "Food Waste Analytics", description: "Daily waste data, ML predictions vs actual, savings", type: "food", date: "Feb 18, 2026" },
  { title: "Outpass Summary", description: "Outing frequency, overdue incidents, parent verification stats", type: "outpass", date: "Feb 18, 2026" },
  { title: "Roommate Satisfaction", description: "Match scores, change requests, success rates", type: "roommates", date: "Feb 18, 2026" },
];

const WardenReports = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold font-heading text-foreground">Reports</h1>
      <p className="text-muted-foreground mt-1">Export attendance, complaints, waste data & more</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reports.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Calendar size={10} /> {r.date}
                </div>
              </div>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-primary">
              <Download size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default WardenReports;
