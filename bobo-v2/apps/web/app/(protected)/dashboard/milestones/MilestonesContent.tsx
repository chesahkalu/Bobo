"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
}

interface Milestone {
  id: string;
  category: string;
  name: string;
  description: string;
  age_range_start_months: number;
  age_range_end_months: number;
  tips: string[];
}

interface BabyMilestone {
  id: string;
  baby_id: string;
  milestone_id: string;
  achieved_date: string | null;
}

interface MilestonesContentProps {
  babies: Baby[];
  milestones: Milestone[];
  babyMilestones: BabyMilestone[];
}

// Default milestones if database is empty
const defaultMilestones = [
  // 0-3 months
  { category: "Motor", name: "Lifts head during tummy time", age_start: 0, age_end: 3, icon: "💪" },
  { category: "Motor", name: "Opens and closes hands", age_start: 0, age_end: 3, icon: "✋" },
  { category: "Social", name: "Smiles at people", age_start: 1, age_end: 3, icon: "😊" },
  { category: "Communication", name: "Coos and makes sounds", age_start: 1, age_end: 3, icon: "🗣️" },
  // 3-6 months
  { category: "Motor", name: "Rolls over (front to back)", age_start: 3, age_end: 6, icon: "🔄" },
  { category: "Motor", name: "Brings objects to mouth", age_start: 3, age_end: 6, icon: "👄" },
  { category: "Social", name: "Laughs out loud", age_start: 3, age_end: 6, icon: "😂" },
  { category: "Cognitive", name: "Recognizes familiar faces", age_start: 3, age_end: 6, icon: "👀" },
  // 6-9 months
  { category: "Motor", name: "Sits without support", age_start: 6, age_end: 9, icon: "🧘" },
  { category: "Motor", name: "Starts crawling", age_start: 6, age_end: 10, icon: "🐛" },
  { category: "Communication", name: "Responds to own name", age_start: 6, age_end: 9, icon: "👂" },
  { category: "Social", name: "Plays peek-a-boo", age_start: 6, age_end: 9, icon: "🙈" },
  // 9-12 months
  { category: "Motor", name: "Pulls to stand", age_start: 9, age_end: 12, icon: "🧍" },
  { category: "Motor", name: "First steps", age_start: 9, age_end: 15, icon: "🚶" },
  { category: "Communication", name: "Says 'mama' or 'dada'", age_start: 9, age_end: 12, icon: "💬" },
  { category: "Cognitive", name: "Waves bye-bye", age_start: 9, age_end: 12, icon: "👋" },
  // 12-18 months
  { category: "Motor", name: "Walks independently", age_start: 12, age_end: 18, icon: "🚶‍♂️" },
  { category: "Motor", name: "Scribbles with crayon", age_start: 12, age_end: 18, icon: "✏️" },
  { category: "Communication", name: "Says several words", age_start: 12, age_end: 18, icon: "🗨️" },
  { category: "Cognitive", name: "Points to wanted items", age_start: 12, age_end: 18, icon: "👆" },
];

const categoryColors: Record<string, string> = {
  Motor: "bg-blue-100 text-blue-700",
  Social: "bg-pink-100 text-pink-700",
  Communication: "bg-purple-100 text-purple-700",
  Cognitive: "bg-amber-100 text-amber-700",
};

export default function MilestonesContent({
  babies,
  milestones,
  babyMilestones,
}: MilestonesContentProps) {
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");
  const [achievedMilestones, setAchievedMilestones] = useState<Set<string>>(
    new Set(babyMilestones.filter(bm => bm.achieved_date).map(bm => `${bm.baby_id}-${bm.milestone_id}`))
  );
  const router = useRouter();
  const supabase = createClient();

  // Calculate selected baby's age in months
  const selectedBabyData = babies.find(b => b.id === selectedBaby);
  const babyAgeMonths = selectedBabyData 
    ? Math.floor((Date.now() - new Date(selectedBabyData.birth_date).getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    : 0;

  // Use default milestones if DB is empty
  const displayMilestones = milestones.length > 0 
    ? milestones 
    : defaultMilestones.map((m, i) => ({
        id: `default-${i}`,
        category: m.category,
        name: m.name,
        description: "",
        age_range_start_months: m.age_start,
        age_range_end_months: m.age_end,
        tips: [],
      }));

  const toggleMilestone = async (milestoneId: string) => {
    if (!selectedBaby) return;
    
    const key = `${selectedBaby}-${milestoneId}`;
    const isAchieved = achievedMilestones.has(key);
    
    if (isAchieved) {
      // Remove achievement
      await supabase
        .from("baby_milestones")
        .delete()
        .eq("baby_id", selectedBaby)
        .eq("milestone_id", milestoneId);
      
      setAchievedMilestones(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    } else {
      // Add achievement
      await supabase
        .from("baby_milestones")
        .upsert({
          baby_id: selectedBaby,
          milestone_id: milestoneId,
          achieved_date: new Date().toISOString().split("T")[0],
        });
      
      setAchievedMilestones(prev => new Set([...prev, key]));
    }
    
    router.refresh();
  };

  // Group milestones by age range
  const ageGroups = [
    { label: "0-3 months", min: 0, max: 3 },
    { label: "3-6 months", min: 3, max: 6 },
    { label: "6-9 months", min: 6, max: 9 },
    { label: "9-12 months", min: 9, max: 12 },
    { label: "12-18 months", min: 12, max: 18 },
    { label: "18-24 months", min: 18, max: 24 },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>🎯</span> Milestone Tracker
          </h1>
          <p className="text-gray-500">
            Track your baby&apos;s developmental milestones with WHO-backed guidance
          </p>
        </div>

        {/* Baby Selector */}
        {babies.length > 0 ? (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Baby</label>
            <div className="flex gap-3 flex-wrap">
              {babies.map((baby) => (
                <button
                  key={baby.id}
                  onClick={() => setSelectedBaby(baby.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedBaby === baby.id
                      ? "bg-[#425a51] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-[#425a51]"
                  }`}
                >
                  {baby.gender === "male" ? "👦" : baby.gender === "female" ? "👧" : "👶"} {baby.name}
                </button>
              ))}
            </div>
            {selectedBabyData && (
              <p className="mt-2 text-sm text-gray-500">
                {selectedBabyData.name} is {babyAgeMonths} month{babyAgeMonths !== 1 ? "s" : ""} old
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 mb-8">
            <div className="text-5xl mb-4">👶</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No babies yet</h3>
            <p className="text-gray-500 mb-4">Add a baby to start tracking milestones</p>
            <Link 
              href="/dashboard/babies/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold"
            >
              Add Baby
            </Link>
          </div>
        )}

        {/* Progress Overview */}
        {selectedBaby && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Progress Overview</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {Object.keys(categoryColors).map((category) => {
                const categoryMilestones = displayMilestones.filter(m => m.category === category);
                const achieved = categoryMilestones.filter(m => 
                  achievedMilestones.has(`${selectedBaby}-${m.id}`)
                ).length;
                return (
                  <div key={category} className="p-4 bg-gray-50 rounded-xl">
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${categoryColors[category]}`}>
                      {category}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{achieved}/{categoryMilestones.length}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Milestones by Age */}
        {selectedBaby && ageGroups.map((group) => {
          const groupMilestones = displayMilestones.filter(
            m => m.age_range_start_months >= group.min && m.age_range_start_months < group.max
          );
          
          if (groupMilestones.length === 0) return null;
          
          const isCurrentAgeGroup = babyAgeMonths >= group.min && babyAgeMonths < group.max;
          
          return (
            <div key={group.label} className="mb-8">
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${
                isCurrentAgeGroup ? "text-[#425a51] text-lg" : "text-gray-700"
              }`}>
                {group.label}
                {isCurrentAgeGroup && (
                  <span className="text-xs px-2 py-1 bg-[#425a51] text-white rounded-full">Current</span>
                )}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupMilestones.map((milestone) => {
                  const isAchieved = achievedMilestones.has(`${selectedBaby}-${milestone.id}`);
                  const icon = defaultMilestones.find(m => m.name === milestone.name)?.icon || "🎯";
                  
                  return (
                    <button
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isAchieved
                          ? "bg-[#f4f6f5] border-[#425a51]"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isAchieved ? "bg-[#425a51] text-white" : "bg-gray-100"
                        }`}>
                          {isAchieved ? "✓" : icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[milestone.category]}`}>
                              {milestone.category}
                            </span>
                          </div>
                          <h4 className={`font-medium ${isAchieved ? "text-[#425a51]" : "text-gray-900"}`}>
                            {milestone.name}
                          </h4>
                          {milestone.description && (
                            <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
