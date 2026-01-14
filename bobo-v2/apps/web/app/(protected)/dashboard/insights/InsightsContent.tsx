"use client";

import { useState } from "react";
import Link from "next/link";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
}

interface InsightsContentProps {
  babies: Baby[];
  activityLogs: any[];
  sleepLogs: any[];
  feedingLogs: any[];
  growthLogs: any[];
}

export default function InsightsContent({
  babies,
  activityLogs,
  sleepLogs,
  feedingLogs,
  growthLogs,
}: InsightsContentProps) {
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");

  const selectedBabyData = babies.find((b) => b.id === selectedBaby);
  
  const getBabyAge = () => {
    if (!selectedBabyData) return 0;
    const birth = new Date(selectedBabyData.birth_date);
    return Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const babyAge = getBabyAge();

  // Calculate insights from data
  const babySleepLogs = sleepLogs.filter(log => log.baby_id === selectedBaby);
  const babyFeedingLogs = feedingLogs.filter(log => log.baby_id === selectedBaby);
  const babyGrowthLogs = growthLogs.filter(log => log.baby_id === selectedBaby);

  // Average sleep duration
  const avgSleep = babySleepLogs.length > 0
    ? babySleepLogs.reduce((acc, log) => acc + (log.duration_minutes || 0), 0) / babySleepLogs.length
    : 0;

  // Feeding frequency
  const feedingsLast24h = babyFeedingLogs.filter(log => {
    const logTime = new Date(log.created_at);
    return Date.now() - logTime.getTime() < 24 * 60 * 60 * 1000;
  }).length;

  // Generate AI-style insights based on age and data
  const getAgeBasedInsights = () => {
    const insights = [];

    if (babyAge <= 3) {
      insights.push({
        icon: "🌙",
        title: "Sleep Pattern",
        description: `At ${babyAge} months, babies typically sleep 14-17 hours total. ${avgSleep > 0 ? `Current average: ${Math.round(avgSleep)} min per session.` : "Log sleep to track patterns."}`,
        tip: "Try keeping the room dark during night feeds to help establish day/night rhythm.",
        color: "blue",
      });
      insights.push({
        icon: "🍼",
        title: "Feeding Schedule",
        description: `Newborns feed 8-12 times per day. ${feedingsLast24h > 0 ? `You logged ${feedingsLast24h} feedings in the last 24 hours.` : "Track feedings to see patterns."}`,
        tip: "Watch for hunger cues like rooting, hand-to-mouth, or fussiness.",
        color: "green",
      });
    } else if (babyAge <= 6) {
      insights.push({
        icon: "🌙",
        title: "Sleep Consolidation",
        description: `At ${babyAge} months, babies start sleeping longer stretches. ${avgSleep > 0 ? `Average session: ${Math.round(avgSleep)} min.` : "Log more data for patterns."}`,
        tip: "Consider establishing a consistent bedtime routine around this age.",
        color: "blue",
      });
      insights.push({
        icon: "🥄",
        title: "Solid Foods",
        description: "Around 6 months is typically when babies are ready to start solids. Look for signs of readiness.",
        tip: "Signs include sitting with support, showing interest in food, and loss of tongue-thrust reflex.",
        color: "amber",
      });
    } else {
      insights.push({
        icon: "🌙",
        title: "Sleep Quality",
        description: `At ${babyAge} months, most babies sleep through the night. ${avgSleep > 0 ? `Average: ${Math.round(avgSleep)} min.` : "Keep tracking!"}`,
        tip: "If sleep regression occurs, it's often temporary. Maintain consistent routines.",
        color: "blue",
      });
      insights.push({
        icon: "🍎",
        title: "Nutrition",
        description: "Variety is key at this age. Offer different textures and flavors.",
        tip: "Include iron-rich foods like pureed meats, beans, and fortified cereals.",
        color: "green",
      });
    }

    // Add growth insight if we have data
    if (babyGrowthLogs.length > 0) {
      const latestWeight = babyGrowthLogs[0]?.weight_kg;
      insights.push({
        icon: "📊",
        title: "Growth Tracking",
        description: latestWeight ? `Latest weight: ${latestWeight} kg. Consistent growth is more important than hitting exact percentiles.` : "Add growth measurements for personalized insights.",
        tip: "Track growth monthly for the best picture of your baby's development.",
        color: "purple",
      });
    }

    // Milestone insight
    insights.push({
      icon: "🎯",
      title: `${babyAge} Month Milestones`,
      description: getMilestoneDescription(babyAge),
      tip: "Every baby develops at their own pace. These are general guidelines.",
      color: "pink",
    });

    return insights;
  };

  const getMilestoneDescription = (months: number) => {
    if (months <= 2) return "Watch for: social smiles, tracking objects with eyes, lifting head during tummy time.";
    if (months <= 4) return "Watch for: laughing, reaching for toys, rolling from tummy to back.";
    if (months <= 6) return "Watch for: sitting with support, babbling, responding to name.";
    if (months <= 9) return "Watch for: sitting independently, crawling, saying 'mama' or 'dada'.";
    if (months <= 12) return "Watch for: pulling to stand, first words, pointing at objects.";
    return "Watch for: walking, expanding vocabulary, following simple instructions.";
  };

  const insights = getAgeBasedInsights();

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    pink: "bg-pink-50 border-pink-200 text-pink-700",
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <Link
            href="/dashboard/ai-chat"
            className="px-4 py-2 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
          >
            💬 Ask Bobo AI
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>🧠</span> AI Insights
          </h1>
          <p className="text-gray-500">Personalized insights based on your baby's data and age</p>
        </div>

        {babies.length > 0 ? (
          <>
            {/* Baby Selector */}
            <div className="mb-6">
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
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-3xl p-8 text-white mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  {selectedBabyData?.gender === "male" ? "👦" : selectedBabyData?.gender === "female" ? "👧" : "👶"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedBabyData?.name}'s Insights</h2>
                  <p className="text-white/80">{babyAge} months old • Personalized recommendations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">{babySleepLogs.length}</p>
                  <p className="text-white/70 text-sm">Sleep logs</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">{babyFeedingLogs.length}</p>
                  <p className="text-white/70 text-sm">Feeding logs</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">{babyGrowthLogs.length}</p>
                  <p className="text-white/70 text-sm">Growth records</p>
                </div>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 ${colorMap[insight.color]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{insight.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h3>
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      <div className="bg-white/50 rounded-xl p-3">
                        <p className="text-sm">
                          <span className="font-medium">💡 Tip:</span> {insight.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Chat CTA */}
            <div className="mt-8 bg-[#fdf8f6] rounded-2xl p-6 border border-[#f3dad3] text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Have questions?</h3>
              <p className="text-gray-600 mb-4">
                Chat with Bobo AI for personalized parenting advice tailored to {selectedBabyData?.name}'s age.
              </p>
              <Link
                href="/dashboard/ai-chat"
                className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
              >
                Start Chatting →
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add a baby first</h3>
            <p className="text-gray-500 mb-6">We need baby info to generate personalized insights</p>
            <Link
              href="/dashboard/babies/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold"
            >
              Add Baby
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
