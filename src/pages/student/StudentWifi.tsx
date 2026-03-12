import { motion } from "framer-motion";
import { Wifi, WifiOff, Signal, Gauge, Send, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const strengthLabel = (val: number) => {
  if (val >= 80) return { text: "Excellent", color: "text-success" };
  if (val >= 60) return { text: "Good", color: "text-primary" };
  if (val >= 40) return { text: "Fair", color: "text-warning" };
  return { text: "Poor", color: "text-destructive" };
};

const StudentWifi = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<null | { strength: number; speed: number; latency: number }>(null);
  const [room, setRoom] = useState("101");
  const [submitted, setSubmitted] = useState(false);

  const runTest = () => {
    setTesting(true);
    setResult(null);
    setSubmitted(false);
    // Simulate a speed test
    setTimeout(() => {
      setResult({
        strength: Math.floor(Math.random() * 60) + 25,
        speed: Math.floor(Math.random() * 80) + 5,
        latency: Math.floor(Math.random() * 120) + 10,
      });
      setTesting(false);
    }, 2500);
  };

  const submitReport = () => {
    setSubmitted(true);
  };

  const label = result ? strengthLabel(result.strength) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">WiFi Help Desk</h1>
        <p className="text-muted-foreground mt-1">Test your connection strength and report issues</p>
      </div>

      {/* Speed Test Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Gauge size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold font-heading text-foreground">Speed Test</h2>
            <p className="text-xs text-muted-foreground">Check your current WiFi performance</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <MapPin size={16} className="text-muted-foreground" />
          <label className="text-sm text-muted-foreground">Room:</label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground w-24 focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Room #"
          />
        </div>

        {!result && !testing && (
          <button onClick={runTest} className="gradient-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-medium shadow-md hover:opacity-90 transition-opacity flex items-center gap-2">
            <Wifi size={16} />
            Run Speed Test
          </button>
        )}

        {testing && (
          <div className="flex flex-col items-center py-8 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"
            />
            <p className="text-sm text-muted-foreground animate-pulse">Testing your connection…</p>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            {/* Strength gauge */}
            <div className="flex flex-col items-center py-4">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="stroke-muted" />
                  <circle
                    cx="60" cy="60" r="52" fill="none" strokeWidth="10"
                    strokeDasharray={`${(result.strength / 100) * 327} 327`}
                    strokeLinecap="round"
                    className={result.strength >= 60 ? "stroke-primary" : result.strength >= 40 ? "stroke-warning" : "stroke-destructive"}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{result.strength}%</span>
                  <span className={`text-xs font-medium ${label!.color}`}>{label!.text}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Download</p>
                <p className="text-lg font-bold text-foreground">{result.speed}</p>
                <p className="text-[10px] text-muted-foreground">Mbps</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Upload</p>
                <p className="text-lg font-bold text-foreground">{Math.floor(result.speed * 0.4)}</p>
                <p className="text-[10px] text-muted-foreground">Mbps</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Latency</p>
                <p className="text-lg font-bold text-foreground">{result.latency}</p>
                <p className="text-[10px] text-muted-foreground">ms</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={runTest} className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Re-test
              </button>
              {result.strength < 60 && !submitted && (
                <button onClick={submitReport} className="gradient-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Send size={14} />
                  Report Weak WiFi
                </button>
              )}
              {submitted && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                  ✓ Report submitted for Room {room}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Troubleshooting Tips</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2"><Signal size={12} className="mt-0.5 text-primary shrink-0" /> Move closer to the WiFi access point in your corridor</li>
          <li className="flex items-start gap-2"><WifiOff size={12} className="mt-0.5 text-primary shrink-0" /> Disconnect unused devices to free bandwidth</li>
          <li className="flex items-start gap-2"><Wifi size={12} className="mt-0.5 text-primary shrink-0" /> Prefer 5GHz band for faster speeds on supported devices</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default StudentWifi;
