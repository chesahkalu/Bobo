"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  ageMin: number;
  ageMax: number;
  duration: number; // minutes
  category: "sensory" | "motor" | "cognitive" | "social" | "language" | "creative";
  materials: string[];
  steps: string[];
  benefits: string[];
  milestone?: string;
  icon: string;
}

interface CompletedActivity {
  id: string;
  baby_id: string;
  activity_type: string;
  notes: string | null;
  duration_minutes: number | null;
  created_at: string;
}

interface ActivitiesContentProps {
  babies: Baby[];
  completedActivities: CompletedActivity[];
}

// Comprehensive activity database
const activities: Activity[] = [
  // 0-3 months
  {
    id: "tummy-time",
    title: "Tummy Time",
    description: "Strengthen neck and shoulder muscles while exploring the world from a new angle.",
    ageMin: 0,
    ageMax: 6,
    duration: 5,
    category: "motor",
    materials: ["Soft mat or blanket", "Optional: mirror, toys"],
    steps: [
      "Place baby on their tummy on a firm, flat surface",
      "Get down to baby's eye level and talk/sing to them",
      "Place colorful toys just out of reach to encourage reaching",
      "Start with 1-2 minutes, work up to 5+ minutes",
      "Always supervise - never leave baby unattended"
    ],
    benefits: ["Builds neck strength", "Prevents flat head", "Develops motor skills"],
    milestone: "Head control",
    icon: "🏋️"
  },
  {
    id: "high-contrast",
    title: "High Contrast Cards",
    description: "Stimulate visual development with bold black and white patterns.",
    ageMin: 0,
    ageMax: 3,
    duration: 5,
    category: "sensory",
    materials: ["Black and white cards or printed patterns", "Optional: card holder"],
    steps: [
      "Hold card 8-12 inches from baby's face",
      "Move the card slowly from side to side",
      "Watch baby's eyes track the pattern",
      "Try different patterns to see which baby prefers",
      "Talk about what you see"
    ],
    benefits: ["Visual tracking", "Focus development", "Brain stimulation"],
    milestone: "Visual tracking",
    icon: "👁️"
  },
  {
    id: "gentle-massage",
    title: "Baby Massage",
    description: "Bond with gentle touch while promoting relaxation and body awareness.",
    ageMin: 0,
    ageMax: 12,
    duration: 10,
    category: "sensory",
    materials: ["Baby-safe oil (optional)", "Warm room", "Soft towel"],
    steps: [
      "Ensure the room is warm and baby is calm",
      "Remove baby's clothes, keep diaper on if preferred",
      "Use gentle strokes on legs, then arms, then tummy",
      "Sing or talk softly while massaging",
      "Follow baby's cues - stop if they seem uncomfortable"
    ],
    benefits: ["Bonding", "Relaxation", "Body awareness", "Better sleep"],
    icon: "💆"
  },
  // 3-6 months
  {
    id: "reach-grab",
    title: "Reach and Grab",
    description: "Encourage reaching and grasping skills with enticing toys.",
    ageMin: 3,
    ageMax: 6,
    duration: 10,
    category: "motor",
    materials: ["Soft toys", "Rattles", "Textured objects"],
    steps: [
      "Lay baby on their back on a play mat",
      "Hold a toy just within reach",
      "Encourage baby to reach for it",
      "Let them explore the texture and sound",
      "Celebrate their efforts with enthusiasm!"
    ],
    benefits: ["Hand-eye coordination", "Grasping skills", "Cause and effect"],
    milestone: "Grasping objects",
    icon: "🤲"
  },
  {
    id: "mirror-play",
    title: "Mirror Play",
    description: "Introduce baby to their reflection and encourage social development.",
    ageMin: 2,
    ageMax: 12,
    duration: 5,
    category: "social",
    materials: ["Baby-safe mirror"],
    steps: [
      "Hold baby securely in front of mirror",
      "Point to baby's reflection: 'Who's that?'",
      "Make facial expressions and watch them react",
      "Touch different body parts and name them",
      "Let baby touch the mirror safely"
    ],
    benefits: ["Self-awareness", "Social smiling", "Facial recognition"],
    milestone: "Social smiling",
    icon: "🪞"
  },
  {
    id: "bubble-fun",
    title: "Bubble Watching",
    description: "Captivate baby with floating bubbles to encourage tracking and reaching.",
    ageMin: 3,
    ageMax: 18,
    duration: 10,
    category: "sensory",
    materials: ["Bubble solution", "Bubble wand"],
    steps: [
      "Blow bubbles where baby can see them",
      "Point to bubbles and describe them",
      "Let baby try to reach for/touch bubbles",
      "Talk about colors and movement",
      "Pop bubbles together for fun!"
    ],
    benefits: ["Visual tracking", "Reaching", "Cause and effect", "Sensory experience"],
    icon: "🫧"
  },
  // 6-9 months
  {
    id: "peek-a-boo",
    title: "Peek-a-Boo",
    description: "Classic game that teaches object permanence and brings endless giggles!",
    ageMin: 4,
    ageMax: 18,
    duration: 5,
    category: "cognitive",
    materials: ["Blanket or cloth", "Your hands"],
    steps: [
      "Cover your face with hands or cloth",
      "Say 'Where's Mommy/Daddy?'",
      "Remove cover and say 'Peek-a-boo!'",
      "Watch for baby's delighted reaction",
      "Let baby try covering their face too"
    ],
    benefits: ["Object permanence", "Anticipation", "Social interaction", "Joy!"],
    milestone: "Object permanence",
    icon: "🙈"
  },
  {
    id: "texture-exploration",
    title: "Texture Discovery Box",
    description: "Explore different textures to stimulate tactile senses.",
    ageMin: 5,
    ageMax: 12,
    duration: 10,
    category: "sensory",
    materials: ["Box/basket", "Various textured items: soft, rough, smooth, bumpy"],
    steps: [
      "Gather safe items with different textures",
      "Let baby touch each item one at a time",
      "Describe what they're feeling: 'soft,' 'bumpy'",
      "Guide their hands if needed",
      "Watch for their preferences"
    ],
    benefits: ["Tactile development", "Vocabulary building", "Sensory processing"],
    icon: "🧸"
  },
  {
    id: "stacking-cups",
    title: "Stacking Cups",
    description: "Build and knock down towers for endless fun and learning!",
    ageMin: 6,
    ageMax: 24,
    duration: 15,
    category: "cognitive",
    materials: ["Stacking cups or blocks"],
    steps: [
      "Stack cups into a tower",
      "Encourage baby to knock it down",
      "Celebrate the crash together!",
      "Help baby try stacking one on top",
      "Progress to more cups as skills develop"
    ],
    benefits: ["Cause and effect", "Fine motor skills", "Size concepts", "Problem solving"],
    milestone: "Stacking objects",
    icon: "🏗️"
  },
  // 9-12 months
  {
    id: "container-play",
    title: "In and Out Game",
    description: "Fill containers and dump them out - simple but endlessly entertaining!",
    ageMin: 8,
    ageMax: 18,
    duration: 15,
    category: "cognitive",
    materials: ["Container", "Small toys or balls"],
    steps: [
      "Show baby how to put toys IN the container",
      "Dump them OUT with exaggerated 'Uh oh!'",
      "Hand baby a toy to put in",
      "Let them dump and repeat",
      "Count objects as you go"
    ],
    benefits: ["Object permanence", "Fine motor", "Spatial awareness", "Early math"],
    icon: "📦"
  },
  {
    id: "music-dance",
    title: "Dance Party",
    description: "Move to music together for rhythm, coordination, and joy!",
    ageMin: 6,
    ageMax: 36,
    duration: 10,
    category: "motor",
    materials: ["Music player", "Optional: scarves, instruments"],
    steps: [
      "Put on upbeat, baby-friendly music",
      "Hold baby and sway/bounce to the beat",
      "Move their arms and legs rhythmically",
      "Let them feel the music vibrations",
      "Add instruments like shakers as they grow"
    ],
    benefits: ["Rhythm awareness", "Balance", "Bonding", "Gross motor skills"],
    icon: "💃"
  },
  {
    id: "book-reading",
    title: "Story Time",
    description: "Read together to build language, bonding, and love of books.",
    ageMin: 0,
    ageMax: 36,
    duration: 10,
    category: "language",
    materials: ["Board books with bright pictures"],
    steps: [
      "Cuddle baby in your lap with book in view",
      "Point to pictures and name them",
      "Let baby touch and explore pages",
      "Use animated voices for characters",
      "Follow baby's attention - it's okay to skip pages!"
    ],
    benefits: ["Language development", "Bonding", "Attention span", "Pre-literacy"],
    milestone: "Babbling",
    icon: "📚"
  },
  {
    id: "finger-foods",
    title: "Finger Food Fun",
    description: "Practice pincer grasp while exploring new textures and tastes.",
    ageMin: 8,
    ageMax: 18,
    duration: 15,
    category: "motor",
    materials: ["Baby-safe finger foods", "High chair", "Bib"],
    steps: [
      "Place a few small pieces on high chair tray",
      "Let baby explore texture with hands first",
      "Demonstrate picking up with thumb and finger",
      "Celebrate successful grabs and bites",
      "Supervise closely for safety"
    ],
    benefits: ["Pincer grasp", "Self-feeding", "Independence", "Texture exposure"],
    milestone: "Pincer grasp",
    icon: "🥕"
  },
  // 12+ months
  {
    id: "scribble-art",
    title: "First Scribbles",
    description: "Introduce crayons for early mark-making and creativity.",
    ageMin: 12,
    ageMax: 36,
    duration: 15,
    category: "creative",
    materials: ["Large paper", "Chunky crayons", "Tape"],
    steps: [
      "Tape paper to table so it doesn't move",
      "Show baby how to hold crayon",
      "Make marks together - any scribble counts!",
      "Name the colors you're using",
      "Celebrate their 'masterpiece'"
    ],
    benefits: ["Fine motor", "Creativity", "Color recognition", "Pre-writing"],
    icon: "🖍️"
  },
  {
    id: "ball-play",
    title: "Ball Rolling",
    description: "Roll a ball back and forth to teach turn-taking and tracking.",
    ageMin: 6,
    ageMax: 24,
    duration: 10,
    category: "social",
    materials: ["Soft ball"],
    steps: [
      "Sit facing baby with legs spread",
      "Roll ball gently toward them",
      "Encourage them to push it back",
      "Cheer: 'You rolled it back!'",
      "Take turns and keep it going"
    ],
    benefits: ["Turn-taking", "Gross motor", "Social interaction", "Tracking"],
    icon: "⚽"
  },
  {
    id: "water-play",
    title: "Splash Time",
    description: "Safe water play for sensory exploration and fun.",
    ageMin: 6,
    ageMax: 36,
    duration: 15,
    category: "sensory",
    materials: ["Shallow basin", "Warm water", "Cups, spoons", "Towel"],
    steps: [
      "Fill basin with a few inches of warm water",
      "Let baby splash with hands",
      "Add cups for pouring",
      "Describe: 'wet,' 'splash,' 'pour'",
      "ALWAYS supervise - never leave unattended"
    ],
    benefits: ["Sensory exploration", "Cause and effect", "Fine motor", "Vocabulary"],
    icon: "💦"
  },
];

const categoryInfo = {
  sensory: { label: "Sensory", color: "bg-purple-100 text-purple-700", icon: "🎨" },
  motor: { label: "Motor Skills", color: "bg-blue-100 text-blue-700", icon: "🏃" },
  cognitive: { label: "Cognitive", color: "bg-amber-100 text-amber-700", icon: "🧩" },
  social: { label: "Social", color: "bg-pink-100 text-pink-700", icon: "👋" },
  language: { label: "Language", color: "bg-green-100 text-green-700", icon: "💬" },
  creative: { label: "Creative", color: "bg-orange-100 text-orange-700", icon: "🎭" },
};

export default function ActivitiesContent({ babies, completedActivities }: ActivitiesContentProps) {
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activityNotes, setActivityNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const selectedBabyData = babies.find((b) => b.id === selectedBaby);
  const babyAge = selectedBabyData 
    ? Math.floor((Date.now() - new Date(selectedBabyData.birth_date).getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    : 0;

  // Filter activities by age and category
  const filteredActivities = activities.filter((activity) => {
    const ageMatch = babyAge >= activity.ageMin && babyAge <= activity.ageMax;
    const categoryMatch = selectedCategory === "all" || activity.category === selectedCategory;
    return ageMatch && categoryMatch;
  });

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get random activity
  const getRandomActivity = useCallback(() => {
    if (filteredActivities.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredActivities.length);
    const activity = filteredActivities[randomIndex];
    if (activity) {
      setSelectedActivity(activity);
    }
  }, [filteredActivities]);

  // Start activity with timer
  const startActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setTimerSeconds(0);
    setIsTimerActive(true);
  };

  // Complete activity and log it
  const completeActivity = async () => {
    if (!selectedBaby || !selectedActivity) return;
    
    setLoading(true);
    
    await supabase.from("activity_logs").insert({
      baby_id: selectedBaby,
      activity_type: "play",
      notes: `${selectedActivity.title}${activityNotes ? `: ${activityNotes}` : ""}`,
      duration_minutes: Math.ceil(timerSeconds / 60),
    });
    
    setLoading(false);
    setShowCompleteModal(false);
    setIsTimerActive(false);
    setSelectedActivity(null);
    setActivityNotes("");
    router.refresh();
  };

  // Toggle favorite
  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Count completions this week
  const thisWeekCompletions = completedActivities.filter((log) => {
    const logDate = new Date(log.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate > weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <span className="text-xl">←</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/milestones" className="text-sm text-gray-500 hover:text-[#425a51]">🎯 Milestones</Link>
            <Link href="/dashboard/ai-chat" className="text-sm text-gray-500 hover:text-[#425a51]">💬 Ask Bobo</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>🎮</span> Activity Library
          </h1>
          <p className="text-gray-500">Age-appropriate play activities to support your baby's development</p>
        </div>

        {babies.length > 0 ? (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-2xl font-bold text-gray-900">{filteredActivities.length}</div>
                <div className="text-xs text-gray-500">Activities for {babyAge}mo</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-2xl font-bold text-gray-900">{thisWeekCompletions}</div>
                <div className="text-xs text-gray-500">Completed this week</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-2xl font-bold text-gray-900">{favorites.length}</div>
                <div className="text-xs text-gray-500">Favorites saved</div>
              </div>
              <button
                onClick={getRandomActivity}
                className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-xl p-4 text-white text-left hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl mb-1">🎲</div>
                <div className="font-bold">Surprise Me!</div>
                <div className="text-xs text-white/70">Random activity</div>
              </button>
            </div>

            {/* Baby Selector + Category Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">Baby:</span>
                {babies.map((baby) => (
                  <button
                    key={baby.id}
                    onClick={() => setSelectedBaby(baby.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedBaby === baby.id
                        ? "bg-[#425a51] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#425a51]"
                    }`}
                  >
                    {baby.name} ({babyAge}mo)
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-500">Category:</span>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  All
                </button>
                {Object.entries(categoryInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === key
                        ? info.color
                        : "bg-white border border-gray-200 text-gray-700"
                    }`}
                  >
                    {info.icon} {info.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{activity.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{activity.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo[activity.category].color}`}>
                          {categoryInfo[activity.category].label}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(activity.id)}
                      className="text-xl"
                    >
                      {favorites.includes(activity.id) ? "⭐" : "☆"}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span>⏱️ {activity.duration} min</span>
                    <span>👶 {activity.ageMin}-{activity.ageMax}mo</span>
                  </div>

                  {activity.milestone && (
                    <div className="text-xs bg-[#f4f6f5] text-[#425a51] px-2 py-1 rounded-lg mb-3 inline-block">
                      🎯 Supports: {activity.milestone}
                    </div>
                  )}
                  
                  <button
                    onClick={() => startActivity(activity)}
                    className="w-full py-2.5 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
                  >
                    ▶️ Start Activity
                  </button>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-500">Try changing the category filter or check back as your baby grows!</p>
              </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/milestones" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-gray-900">Track Milestones</h4>
                <p className="text-sm text-gray-500">See developmental progress</p>
              </Link>
              <Link href="/dashboard/nutrition" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🥗</div>
                <h4 className="font-bold text-gray-900">Nutrition Guide</h4>
                <p className="text-sm text-gray-500">Age-appropriate feeding</p>
              </Link>
              <Link href="/dashboard/ai-chat" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-bold text-gray-900">Ask Bobo AI</h4>
                <p className="text-sm text-gray-500">Get activity ideas</p>
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add a baby first</h3>
            <p className="text-gray-500 mb-6">We'll show activities appropriate for your baby's age</p>
            <Link
              href="/dashboard/babies/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
            >
              Add Baby
            </Link>
          </div>
        )}
      </main>

      {/* Activity Detail Modal with Timer */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedActivity.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedActivity.title}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo[selectedActivity.category].color}`}>
                    {categoryInfo[selectedActivity.category].label}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedActivity(null);
                  setIsTimerActive(false);
                  setTimerSeconds(0);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Timer */}
            <div className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-2xl p-6 text-white text-center mb-6">
              <div className="text-5xl font-mono font-bold mb-3">{formatTime(timerSeconds)}</div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {isTimerActive ? "⏸️ Pause" : "▶️ Start"}
                </button>
                <button
                  onClick={() => setTimerSeconds(0)}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{selectedActivity.description}</p>

            {/* Materials */}
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 mb-2">📦 Materials Needed</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {selectedActivity.materials.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#425a51] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 mb-2">📋 Steps</h4>
              <ol className="text-sm text-gray-600 space-y-2">
                {selectedActivity.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f4f6f5] text-[#425a51] text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">✨ Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {selectedActivity.benefits.map((benefit, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete Button */}
            <button
              onClick={() => setShowCompleteModal(true)}
              className="w-full py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
            >
              ✅ Complete Activity
            </button>
          </div>
        </div>
      )}

      {/* Complete Confirmation Modal */}
      {showCompleteModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900">Great job!</h3>
              <p className="text-gray-500">You spent {formatTime(timerSeconds)} on {selectedActivity.title}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a note (optional)</label>
              <input
                type="text"
                value={activityNotes}
                onChange={(e) => setActivityNotes(e.target.value)}
                placeholder="How did it go? Any observations?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={completeActivity}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-bold hover:bg-[#364842] transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save & Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
