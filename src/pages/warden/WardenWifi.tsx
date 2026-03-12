import { motion } from "framer-motion";
import { Wifi, WifiOff, AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { useState } from "react";

// Mock room WiFi data
const floors = [
  { floor: "1st Floor", rooms: ["101", "102", "103", "104", "105", "106", "107", "108"] },
  { floor: "2nd Floor", rooms: ["201", "202", "203", "204", "205", "206", "207", "208"] },
  { floor: "3rd Floor", rooms: ["301", "302", "303", "304", "305", "306", "307", "308"] },
];

const generateRoomData = () => {
  const data: Record<string, { strength: number; lastTest: string; reports: number }> = {};
  floors.forEach((f) =>
    f.rooms.forEach((r) => {
      data[r] = {
        strength: Math.floor(Math.random() * 80) + 15,
        lastTest: `${Math.floor(Math.random() * 60)} min ago`,
        reports: Math.floor(Math.random() * 4),
      };
    })
  );
  // Force some weak spots
  data["204"] = { strength: 18, lastTest: "5 min ago", reports: 3 };
  data["302"] = { strength: 22, lastTest: "12 min ago", reports: 2 };
  data["107"] = { strength: 28, lastTest: "8 min ago", reports: 4 };
  return data;
};

const roomData = generateRoomData();

// Mock hourly data for time-of-day chart
const hourlyAvg = [
  { hour: "6AM", avg: 82 }, { hour: "8AM", avg: 75 }, { hour: "10AM", avg: 60 },
  { hour: "12PM", avg: 45 }, { hour: "2PM", avg: 50 }, { hour: "4PM", avg: 42 },
  { hour: "6PM", avg: 35 }, { hour: "8PM", avg: 28 }, { hour: "9PM", avg: 25 },
  { hour: "10PM", avg: 30 }, { hour: "11PM", avg: 55 }, { hour: "12AM", avg: 78 },
];

const strengthColor = (val: number) => {
  if (val >= 70) return "bg-success";
  if (val >= 50) return "bg-primary";
  if (val >= 35) return "bg-warning";
  return "bg-destructive";
};

const strengthBg = (val: number) => {
  if (val >= 70) return "bg-success/10 border-success/20";
  if (val >= 50) return "bg-primary/10 border-primary/20";
  if (val >= 35) return "bg-warning/10 border-warning/20";
  return "bg-destructive/10 border-destructive/20";
};

const WardenWifi = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const weakRooms = Object.entries(roomData)
    .filter(([, d]) => d.strength < 40)
    .sort((a, b) => a[1].strength - b[1].strength);

  const lowestHour = hourlyAvg.reduce((min, h) => (h.avg < min.avg ? h : min), hourlyAvg[0]);
  const maxAvg = Math.max(...hourlyAvg.map((h) => h.avg));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">WiFi Heatmap</h1>
        <p className="text-muted-foreground mt-1">Real-time WiFi strength across all rooms</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wifi size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Avg Strength</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(Object.values(roomData).reduce((s, d) => s + d.strength, 0) / Object.keys(roomData).length)}%
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff size={16} className="text-destructive" />
            <span className="text-xs text-muted-foreground">Weak Zones</span>
          </div>
          <p className="text-2xl font-bold text-destructive">{weakRooms.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">Total Reports</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Object.values(roomData).reduce((s, d) => s + d.reports, 0)}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-destructive" />
            <span className="text-xs text-muted-foreground">Weakest Hour</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{lowestHour.hour}</p>
          <p className="text-xs text-muted-foreground">{lowestHour.avg}% avg</p>
        </motion.div>
      </div>

      {/* Time-of-day chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">WiFi Strength by Time of Day</h2>
        </div>
        <div className="flex items-end gap-1.5 h-32">
          {hourlyAvg.map((h) => (
            <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-foreground">{h.avg}%</span>
              <div
                className={`w-full rounded-t-sm transition-all ${strengthColor(h.avg)}`}
                style={{ height: `${(h.avg / maxAvg) * 100}%` }}
              />
              <span className="text-[9px] text-muted-foreground">{h.hour}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Room Heatmap */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Room-wise Heatmap</h2>
        <div className="space-y-4">
          {floors.map((floor) => (
            <div key={floor.floor}>
              <p className="text-xs font-medium text-muted-foreground mb-2">{floor.floor}</p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {floor.rooms.map((room) => {
                  const d = roomData[room];
                  return (
                    <button
                      key={room}
                      onClick={() => setSelectedRoom(selectedRoom === room ? null : room)}
                      className={`relative rounded-lg border p-2 text-center transition-all hover:scale-105 ${strengthBg(d.strength)} ${
                        selectedRoom === room ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <p className="text-xs font-mono font-bold text-foreground">{room}</p>
                      <p className={`text-[10px] font-semibold ${d.strength >= 50 ? "text-foreground" : "text-destructive"}`}>
                        {d.strength}%
                      </p>
                      {d.reports > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground">
                          {d.reports}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected room detail */}
        {selectedRoom && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Room {selectedRoom}</p>
                <p className="text-xs text-muted-foreground">Last tested: {roomData[selectedRoom].lastTest}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${roomData[selectedRoom].strength < 40 ? "text-destructive" : "text-foreground"}`}>
                  {roomData[selectedRoom].strength}%
                </p>
                <p className="text-xs text-muted-foreground">{roomData[selectedRoom].reports} report(s)</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-success" /> 70%+</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-primary" /> 50-69%</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-warning" /> 35-49%</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-destructive" /> &lt;35%</span>
        </div>
      </motion.div>

      {/* Critical rooms table */}
      {weakRooms.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle size={14} className="text-destructive" /> Critical Weak Zones
          </h2>
          <div className="space-y-2">
            {weakRooms.map(([room, d]) => (
              <div key={room} className="flex items-center justify-between rounded-lg bg-destructive/5 border border-destructive/10 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <WifiOff size={14} className="text-destructive" />
                  <span className="text-sm font-mono font-medium text-foreground">Room {room}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{d.reports} reports</span>
                  <span className="text-sm font-bold text-destructive">{d.strength}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WardenWifi;
