import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Moon, Sun, Music, BookOpen, Users, Cigarette, Sparkles } from "lucide-react";

interface RoommateProfile {
  name: string;
  age: number;
  course: string;
  compatibility: number;
  traits: { label: string; icon: React.ElementType; value: string }[];
  bio: string;
}

const profiles: RoommateProfile[] = [
  {
    name: "Arjun Reddy",
    age: 19,
    course: "B.Tech CSE",
    compatibility: 92,
    traits: [
      { label: "Sleep", icon: Moon, value: "Night Owl" },
      { label: "Study", icon: BookOpen, value: "With Music" },
      { label: "Social", icon: Users, value: "Ambivert" },
      { label: "Clean", icon: Sparkles, value: "Very Tidy" },
    ],
    bio: "Love late-night coding sessions and lo-fi beats. Clean workspace is a must!",
  },
  {
    name: "Sneha Iyer",
    age: 20,
    course: "B.Tech ECE",
    compatibility: 87,
    traits: [
      { label: "Sleep", icon: Sun, value: "Early Bird" },
      { label: "Study", icon: BookOpen, value: "Silence" },
      { label: "Social", icon: Users, value: "Introvert" },
      { label: "Clean", icon: Sparkles, value: "Moderate" },
    ],
    bio: "Morning person who loves quiet study time. Weekend movie marathons are my thing!",
  },
  {
    name: "Karan Shah",
    age: 19,
    course: "B.Tech IT",
    compatibility: 78,
    traits: [
      { label: "Sleep", icon: Moon, value: "Night Owl" },
      { label: "Study", icon: Music, value: "With Music" },
      { label: "Social", icon: Users, value: "Extrovert" },
      { label: "Clean", icon: Sparkles, value: "Moderate" },
    ],
    bio: "Guitar player, loves jamming. Always up for a good conversation and chai.",
  },
  {
    name: "Ananya Das",
    age: 20,
    course: "B.Tech CSE",
    compatibility: 95,
    traits: [
      { label: "Sleep", icon: Moon, value: "Night Owl" },
      { label: "Study", icon: BookOpen, value: "With Music" },
      { label: "Social", icon: Users, value: "Ambivert" },
      { label: "Clean", icon: Sparkles, value: "Very Tidy" },
    ],
    bio: "Competitive programmer by day, anime fan by night. Looking for a like-minded roommate!",
  },
];

const Roommates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const profile = profiles[currentIndex];
  const isFinished = currentIndex >= profiles.length;

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    if (dir === "right") {
      setMatches(prev => [...prev, profile.name]);
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 300);
  };

  const compatColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    return "text-warning";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Roommate Matching</h1>
        <p className="text-muted-foreground mt-1">Find your perfect roommate based on personality compatibility</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: direction === "left" ? -100 : direction === "right" ? 100 : 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                  rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Compatibility Badge */}
                <div className="relative gradient-primary p-6 pb-10">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-card/20 backdrop-blur-sm px-3 py-1">
                    <Heart size={14} className="text-primary-foreground" />
                    <span className={`text-sm font-bold text-primary-foreground`}>{profile.compatibility}%</span>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm text-2xl font-bold text-primary-foreground font-heading">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>

                <div className="p-6 -mt-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold font-heading text-foreground">{profile.name}, {profile.age}</h2>
                    <p className="text-sm text-muted-foreground">{profile.course}</p>
                  </div>

                  <p className="text-sm text-foreground/80 mb-5 italic">"{profile.bio}"</p>

                  {/* Traits */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {profile.traits.map((trait, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2.5">
                        <trait.icon size={16} className="text-primary flex-shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{trait.label}</p>
                          <p className="text-xs font-medium text-foreground">{trait.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => handleSwipe("left")}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <X size={24} />
                    </button>
                    <button
                      onClick={() => handleSwipe("right")}
                      className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
                    >
                      <Heart size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-primary-foreground mx-auto mb-4">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-foreground mb-2">All caught up!</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  You've matched with {matches.length} potential roommate{matches.length !== 1 ? "s" : ""}.
                </p>
                {matches.length > 0 && (
                  <div className="space-y-2">
                    {matches.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
                        <Heart size={14} />
                        {name}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => { setCurrentIndex(0); setMatches([]); }}
                  className="mt-6 inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Roommates;
