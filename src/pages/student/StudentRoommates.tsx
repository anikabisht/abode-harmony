import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Moon, Sun, Music, BookOpen, Users, Sparkles, ArrowRight } from "lucide-react";

// Quiz questions
const quizQuestions = [
  { question: "What's your sleep schedule?", options: ["Early Bird (before 11 PM)", "Night Owl (after midnight)", "Flexible"] },
  { question: "How do you like to study?", options: ["Complete silence", "Lo-fi / background music", "Doesn't matter"] },
  { question: "Your cleanliness level?", options: ["Spotless always", "Reasonably tidy", "Organized chaos"] },
  { question: "Social preference?", options: ["Introvert — need my space", "Ambivert — balanced", "Extrovert — love company"] },
  { question: "Guests in the room?", options: ["Rarely / never", "Occasionally", "Frequently"] },
];

interface RoommateProfile {
  name: string;
  age: number;
  course: string;
  compatibility: number;
  traits: { label: string; value: string }[];
  bio: string;
}

const profiles: RoommateProfile[] = [
  {
    name: "Arjun Reddy", age: 19, course: "B.Tech CSE", compatibility: 92,
    traits: [{ label: "Sleep", value: "Night Owl" }, { label: "Study", value: "With Music" }, { label: "Social", value: "Ambivert" }, { label: "Clean", value: "Very Tidy" }],
    bio: "Love late-night coding sessions and lo-fi beats. Clean workspace is a must!",
  },
  {
    name: "Sneha Iyer", age: 20, course: "B.Tech ECE", compatibility: 87,
    traits: [{ label: "Sleep", value: "Early Bird" }, { label: "Study", value: "Silence" }, { label: "Social", value: "Introvert" }, { label: "Clean", value: "Moderate" }],
    bio: "Morning person who loves quiet study time. Weekend movie marathons are my thing!",
  },
  {
    name: "Karan Shah", age: 19, course: "B.Tech IT", compatibility: 78,
    traits: [{ label: "Sleep", value: "Night Owl" }, { label: "Study", value: "With Music" }, { label: "Social", value: "Extrovert" }, { label: "Clean", value: "Moderate" }],
    bio: "Guitar player, loves jamming. Always up for a good conversation and chai.",
  },
  {
    name: "Ananya Das", age: 20, course: "B.Tech CSE", compatibility: 95,
    traits: [{ label: "Sleep", value: "Night Owl" }, { label: "Study", value: "With Music" }, { label: "Social", value: "Ambivert" }, { label: "Clean", value: "Very Tidy" }],
    bio: "Competitive programmer by day, anime fan by night. Looking for a like-minded roommate!",
  },
];

const StudentRoommates = () => {
  const [quizDone, setQuizDone] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  };

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    if (dir === "right") setMatches((prev) => [...prev, profiles[currentIndex].name]);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const profile = profiles[currentIndex];
  const isFinished = currentIndex >= profiles.length;

  // Quiz Phase
  if (!quizDone) {
    const q = quizQuestions[quizStep];
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Roommate Quiz</h1>
          <p className="text-muted-foreground mt-1">Answer {quizQuestions.length} quick questions to find your match</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= quizStep ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={quizStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-xs text-muted-foreground mb-2">Question {quizStep + 1} of {quizQuestions.length}</p>
                <h2 className="text-lg font-bold font-heading text-foreground mb-5">{q.question}</h2>
                <div className="space-y-2.5">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:bg-accent transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  // Matching Phase
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Your Matches</h1>
        <p className="text-muted-foreground mt-1">Swipe right to connect, left to skip</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: direction === "left" ? -300 : 300, rotate: direction === "left" ? -15 : 15 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative gradient-primary p-6 pb-10">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-card/20 backdrop-blur-sm px-3 py-1">
                    <Heart size={14} className="text-primary-foreground" />
                    <span className="text-sm font-bold text-primary-foreground">{profile.compatibility}%</span>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm text-2xl font-bold text-primary-foreground font-heading">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>

                <div className="p-6 -mt-4">
                  <h2 className="text-xl font-bold font-heading text-foreground">{profile.name}, {profile.age}</h2>
                  <p className="text-sm text-muted-foreground">{profile.course}</p>
                  <p className="text-sm text-foreground/80 my-4 italic">"{profile.bio}"</p>

                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {profile.traits.map((t, i) => (
                      <div key={i} className="rounded-lg bg-muted/50 p-2.5">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.label}</p>
                        <p className="text-xs font-medium text-foreground">{t.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <button onClick={() => handleSwipe("left")} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                      <X size={24} />
                    </button>
                    <button onClick={() => handleSwipe("right")} className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity">
                      <Heart size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-primary-foreground mx-auto mb-4">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-xl font-bold font-heading text-foreground mb-2">All caught up!</h2>
                <p className="text-sm text-muted-foreground mb-4">You matched with {matches.length} roommate{matches.length !== 1 ? "s" : ""}.</p>
                {matches.length > 0 && (
                  <div className="space-y-2">
                    {matches.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
                        <Heart size={14} /> {name}
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => { setCurrentIndex(0); setMatches([]); setQuizDone(false); setQuizStep(0); setAnswers([]); }}
                  className="mt-6 inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium">
                  Retake Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StudentRoommates;
