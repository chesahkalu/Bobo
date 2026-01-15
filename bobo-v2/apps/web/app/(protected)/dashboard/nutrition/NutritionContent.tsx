"use client";

import { useState } from "react";
import Link from "next/link";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
}

interface NutritionContentProps {
  babies: Baby[];
}

interface NutritionStage {
  id: string;
  ageRange: string;
  title: string;
  icon: string;
  color: string;
  overview: string;
  keyPoints: string[];
  foods: { name: string; emoji: string; tip: string }[];
  schedule: string[];
  warnings: string[];
}

const nutritionStages: NutritionStage[] = [
  {
    id: "0-4",
    ageRange: "0-4 months",
    title: "Exclusive Milk Feeding",
    icon: "🍼",
    color: "blue",
    overview: "Breast milk or formula provides all the nutrition your baby needs. No water, juice, or solid foods are needed.",
    keyPoints: [
      "Breast milk is the ideal first food",
      "Formula is a safe alternative when breastfeeding isn't possible",
      "Feed on demand - usually 8-12 times per day",
      "Look for hunger cues: rooting, hand-to-mouth, fussiness",
    ],
    foods: [
      { name: "Breast Milk", emoji: "🤱", tip: "Contains antibodies and perfect nutrition" },
      { name: "Formula", emoji: "🍼", tip: "Iron-fortified formula recommended" },
    ],
    schedule: [
      "Every 2-3 hours, or 8-12 feedings per day",
      "1-3 oz per feeding in first weeks",
      "Gradually increases to 4-5 oz by 4 months",
      "Follow baby's hunger and fullness cues",
    ],
    warnings: [
      "No water - can cause electrolyte imbalance",
      "No cereal in bottles - doesn't help sleep",
      "No honey - risk of botulism",
      "No cow's milk until 12 months",
    ],
  },
  {
    id: "4-6",
    ageRange: "4-6 months",
    title: "Introduction Readiness",
    icon: "👀",
    color: "amber",
    overview: "Watch for signs of readiness to start solids. Most babies are ready around 6 months, but some show signs earlier.",
    keyPoints: [
      "Continue breast milk or formula as primary nutrition",
      "Watch for readiness signs, not just age",
      "Can sit with support and has good head control",
      "Shows interest in food when others are eating",
    ],
    foods: [
      { name: "Breast Milk/Formula", emoji: "🍼", tip: "Still the main nutrition source" },
      { name: "Iron-fortified cereal", emoji: "🥣", tip: "If starting early, single-grain only" },
      { name: "Pureed vegetables", emoji: "🥕", tip: "Very smooth consistency" },
    ],
    schedule: [
      "Breast milk/formula: 24-32 oz per day",
      "If starting solids: 1-2 tablespoons once daily",
      "Best time: when baby is alert and happy",
      "Start with single-ingredient foods",
    ],
    warnings: [
      "Wait 3-5 days between new foods to check for allergies",
      "Texture should be very smooth, no chunks",
      "Don't force feed - baby knows when full",
      "Consult pediatrician before 6 months",
    ],
  },
  {
    id: "6-8",
    ageRange: "6-8 months",
    title: "First Foods Adventure",
    icon: "🥣",
    color: "green",
    overview: "Time for solid food exploration! Start with single-ingredient purees and gradually introduce variety.",
    keyPoints: [
      "Breast milk/formula still provides most nutrition",
      "Introduce iron-rich foods first (key for development)",
      "Offer a variety of flavors and colors",
      "Let baby set the pace - don't rush",
    ],
    foods: [
      { name: "Iron-fortified cereal", emoji: "🥣", tip: "Rice, oat, or barley cereal" },
      { name: "Pureed meats", emoji: "🍖", tip: "Excellent iron source" },
      { name: "Pureed vegetables", emoji: "🥬", tip: "Sweet potato, peas, carrots, squash" },
      { name: "Pureed fruits", emoji: "🍌", tip: "Banana, avocado, pear, apple" },
      { name: "Legumes", emoji: "🫘", tip: "Pureed lentils, beans" },
    ],
    schedule: [
      "Breast milk/formula: 24-32 oz per day",
      "Solids: 2-3 meals per day",
      "2-4 tablespoons per meal",
      "Offer milk before solids initially",
    ],
    warnings: [
      "Introduce common allergens early (peanut, egg)",
      "Avoid honey until 12 months",
      "No whole nuts, grapes, or hard foods",
      "Watch for allergic reactions",
    ],
  },
  {
    id: "8-10",
    ageRange: "8-10 months",
    title: "Texture Exploration",
    icon: "🥄",
    color: "purple",
    overview: "Graduate from smooth purees to mashed and soft finger foods. Baby is developing pincer grasp!",
    keyPoints: [
      "Move from purees to mashed/lumpy textures",
      "Introduce soft finger foods",
      "Baby may start using pincer grasp",
      "Encourage self-feeding with supervision",
    ],
    foods: [
      { name: "Mashed fruits", emoji: "🍎", tip: "Soft banana, ripe pear, mango" },
      { name: "Soft vegetables", emoji: "🥦", tip: "Well-cooked broccoli, carrots" },
      { name: "Soft proteins", emoji: "🍗", tip: "Shredded chicken, soft fish, tofu" },
      { name: "Finger foods", emoji: "🫳", tip: "Puffs, small pasta, soft cheese" },
      { name: "Whole grains", emoji: "🍞", tip: "Soft bread pieces, oatmeal" },
    ],
    schedule: [
      "Breast milk/formula: 24-30 oz per day",
      "Solids: 3 meals per day",
      "Plus 1-2 snacks",
      "Sippy cup practice with water at meals",
    ],
    warnings: [
      "Cut round foods to prevent choking",
      "Always supervise during meals",
      "Avoid hard, sticky, or slippery foods",
      "No cow's milk as main drink yet",
    ],
  },
  {
    id: "10-12",
    ageRange: "10-12 months",
    title: "Family Foods Transition",
    icon: "🍽️",
    color: "pink",
    overview: "Baby can eat most family foods in appropriate sizes. Moving toward toddler eating patterns!",
    keyPoints: [
      "Can eat most soft table foods",
      "Three meals plus 2 snacks daily",
      "Self-feeding skills improving",
      "Preparing for transition from bottle/breast",
    ],
    foods: [
      { name: "Soft table foods", emoji: "🍝", tip: "Cut into small, safe pieces" },
      { name: "Eggs", emoji: "🥚", tip: "Scrambled or hard-boiled (cut up)" },
      { name: "Dairy", emoji: "🧀", tip: "Cheese, yogurt (not milk as drink)" },
      { name: "Variety of proteins", emoji: "🐟", tip: "Fish, chicken, beans, tofu" },
      { name: "All vegetables", emoji: "🥗", tip: "Cooked soft, variety of colors" },
    ],
    schedule: [
      "Breast milk/formula: 16-24 oz per day",
      "3 meals + 2 snacks daily",
      "Offer water in cup at meals",
      "Transitioning milk to be supplement not main",
    ],
    warnings: [
      "Still avoid honey until 12 months",
      "No whole grapes, nuts, popcorn, hot dogs",
      "Cut foods to fingernail-size pieces",
      "Watch sodium in processed foods",
    ],
  },
  {
    id: "12+",
    ageRange: "12+ months",
    title: "Toddler Nutrition",
    icon: "👦",
    color: "teal",
    overview: "Your toddler can now drink cow's milk and eat almost anything the family eats. Focus on balanced nutrition!",
    keyPoints: [
      "Can transition to whole cow's milk",
      "Eating pattern similar to family",
      "Expected pickiness - stay patient",
      "Continue offering variety",
    ],
    foods: [
      { name: "Whole milk", emoji: "🥛", tip: "16-24 oz per day, not more" },
      { name: "Family meals", emoji: "🍽️", tip: "Same foods, appropriate sizes" },
      { name: "Whole grains", emoji: "🌾", tip: "Bread, pasta, cereals, rice" },
      { name: "Protein variety", emoji: "🥩", tip: "Meat, fish, eggs, beans, dairy" },
      { name: "Fruits & vegetables", emoji: "🥗", tip: "5+ servings per day goal" },
    ],
    schedule: [
      "3 meals + 2-3 snacks daily",
      "Whole milk: 16-24 oz per day",
      "Water available throughout day",
      "Family mealtimes together",
    ],
    warnings: [
      "Avoid low-fat milk until age 2",
      "Still no whole nuts, hard candy, popcorn",
      "Limit juice to 4 oz per day if any",
      "Watch for iron deficiency",
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-50 to-blue-100 border-blue-200",
  amber: "from-amber-50 to-amber-100 border-amber-200",
  green: "from-green-50 to-green-100 border-green-200",
  purple: "from-purple-50 to-purple-100 border-purple-200",
  pink: "from-pink-50 to-pink-100 border-pink-200",
  teal: "from-teal-50 to-teal-100 border-teal-200",
};

export default function NutritionContent({ babies }: NutritionContentProps) {
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const selectedBabyData = babies.find((b) => b.id === selectedBaby);
  
  const getBabyAge = () => {
    if (!selectedBabyData) return 0;
    const birth = new Date(selectedBabyData.birth_date);
    return Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const babyAge = getBabyAge();

  // Determine current stage
  const getCurrentStage = () => {
    if (babyAge < 4) return "0-4";
    if (babyAge < 6) return "4-6";
    if (babyAge < 8) return "6-8";
    if (babyAge < 10) return "8-10";
    if (babyAge < 12) return "10-12";
    return "12+";
  };

  const currentStageId = getCurrentStage();

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
            <Link href="/dashboard/ai-chat" className="text-sm text-gray-500 hover:text-[#425a51]">💬 Ask Bobo</Link>
            <Link href="/dashboard/settings" className="text-sm text-gray-500 hover:text-[#425a51]">⚙️ Settings</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>🥗</span> Nutrition Guide
          </h1>
          <p className="text-gray-500">Age-appropriate feeding guidance for your baby's healthy development</p>
        </div>

        {babies.length > 0 ? (
          <>
            {/* Baby Selector */}
            <div className="mb-6">
              <div className="flex gap-3 flex-wrap items-center">
                <span className="text-sm text-gray-500">Viewing guide for:</span>
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
                    {baby.gender === "male" ? "👦" : baby.gender === "female" ? "👧" : "👶"} {baby.name} ({getBabyAge()}mo)
                  </button>
                ))}
              </div>
            </div>

            {/* Current Stage Highlight */}
            {selectedBabyData && (
              <div className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-3xl p-8 text-white mb-8">
                <div className="flex items-start gap-6">
                  <div className="text-6xl">
                    {nutritionStages.find(s => s.id === currentStageId)?.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/70 text-sm mb-1">Current Stage for {selectedBabyData.name}</p>
                    <h2 className="text-2xl font-bold mb-2">
                      {nutritionStages.find(s => s.id === currentStageId)?.title}
                    </h2>
                    <p className="text-white/80 mb-4">
                      {nutritionStages.find(s => s.id === currentStageId)?.overview}
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-white/10 rounded-xl px-4 py-2">
                        <span className="text-sm">Age: <strong>{babyAge} months</strong></span>
                      </div>
                      <div className="bg-white/10 rounded-xl px-4 py-2">
                        <span className="text-sm">Stage: <strong>{nutritionStages.find(s => s.id === currentStageId)?.ageRange}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* All Stages */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">All Feeding Stages</h3>
            <div className="space-y-4 mb-8">
              {nutritionStages.map((stage) => {
                const isCurrentStage = stage.id === currentStageId;
                const isExpanded = expandedStage === stage.id;
                
                return (
                  <div
                    key={stage.id}
                    className={`bg-gradient-to-br ${colorMap[stage.color]} rounded-2xl border-2 overflow-hidden transition-all ${
                      isCurrentStage ? "ring-2 ring-[#425a51] ring-offset-2" : ""
                    }`}
                  >
                    <button
                      onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{stage.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-gray-900">{stage.title}</h4>
                            {isCurrentStage && (
                              <span className="text-xs px-2 py-0.5 bg-[#425a51] text-white rounded-full">Current</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{stage.ageRange}</p>
                        </div>
                      </div>
                      <span className="text-2xl text-gray-400">{isExpanded ? "−" : "+"}</span>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-6">
                        {/* Key Points */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span>✨</span> Key Points
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {stage.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-[#425a51]">✓</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommended Foods */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🍎</span> Recommended Foods
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {stage.foods.map((food, i) => (
                              <div key={i} className="bg-white/70 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xl">{food.emoji}</span>
                                  <span className="font-medium text-gray-900 text-sm">{food.name}</span>
                                </div>
                                <p className="text-xs text-gray-500">{food.tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Feeding Schedule */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span>🕐</span> Feeding Schedule
                          </h5>
                          <ul className="space-y-1">
                            {stage.schedule.map((item, i) => (
                              <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#425a51]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warnings */}
                        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                          <h5 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                            <span>⚠️</span> Important Warnings
                          </h5>
                          <ul className="space-y-1">
                            {stage.warnings.map((warning, i) => (
                              <li key={i} className="text-sm text-red-700 flex items-center gap-2">
                                <span>•</span>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/growth" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-bold text-gray-900">Growth Charts</h4>
                <p className="text-sm text-gray-500">Track weight and height</p>
              </Link>
              <Link href="/dashboard/milestones" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-gray-900">Milestones</h4>
                <p className="text-sm text-gray-500">Developmental tracking</p>
              </Link>
              <Link href="/dashboard/ai-chat" className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-bold text-gray-900">Ask Bobo AI</h4>
                <p className="text-sm text-gray-500">Get feeding advice</p>
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-sm text-gray-500">
                💡 This guide provides general recommendations. Every baby is different. 
                Always consult your pediatrician for personalized feeding advice.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add a baby first</h3>
            <p className="text-gray-500 mb-6">We'll personalize nutrition guides based on your baby's age</p>
            <Link
              href="/dashboard/babies/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
            >
              Add Baby
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
