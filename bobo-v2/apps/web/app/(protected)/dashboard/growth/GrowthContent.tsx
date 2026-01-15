"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
  birth_weight_kg: number | null;
  birth_height_cm: number | null;
}

interface GrowthLog {
  id: string;
  baby_id: string;
  measurement_date: string;
  weight_kg: number | null;
  height_cm: number | null;
  head_circumference_cm: number | null;
  notes: string | null;
}

interface GrowthContentProps {
  babies: Baby[];
  growthLogs: GrowthLog[];
  user: User;
}

// WHO percentile data (simplified - 50th percentile)
const whoWeightBoys = [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6];
const whoWeightGirls = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9];
const whoHeightBoys = [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7];
const whoHeightGirls = [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0];

export default function GrowthContent({
  babies,
  growthLogs,
  user,
}: GrowthContentProps) {
  const [selectedBaby, setSelectedBaby] = useState<string>(babies[0]?.id || "");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"weight" | "height" | "head">("weight");
  const [recordedDate, setRecordedDate] = useState(new Date().toISOString().split("T")[0]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const selectedBabyData = babies.find(b => b.id === selectedBaby);
  const babyLogs = growthLogs.filter(log => log.baby_id === selectedBaby);
  
  // Calculate baby age in months
  const getAgeMonths = (date: string) => {
    if (!selectedBabyData) return 0;
    const birth = new Date(selectedBabyData.birth_date);
    const logDate = new Date(date);
    return Math.floor((logDate.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const handleAddGrowth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBaby) return;
    
    setLoading(true);
    
    const insertData = {
      baby_id: selectedBaby,
      measurement_date: recordedDate,
      weight_kg: weight ? parseFloat(weight) : null,
      height_cm: height ? parseFloat(height) : null,
      head_circumference_cm: headCircumference ? parseFloat(headCircumference) : null,
      notes: notes || null,
    };
    
    console.log("Inserting growth log:", insertData);
    
    const { data, error } = await supabase.from("growth_logs").insert(insertData).select();
    
    if (error) {
      console.error("Error inserting growth log:", error);
      alert(`Error saving: ${error.message}`);
      setLoading(false);
      return;
    }
    
    console.log("Growth log inserted:", data);

    setShowAddModal(false);
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    setNotes("");
    setLoading(false);
    router.refresh();
  };

  // Get latest measurements
  const latestLog = babyLogs[babyLogs.length - 1];
  const previousLog = babyLogs[babyLogs.length - 2];
  
  const weightChange = latestLog && previousLog && latestLog.weight_kg && previousLog.weight_kg
    ? (latestLog.weight_kg - previousLog.weight_kg).toFixed(2)
    : null;
  const heightChange = latestLog && previousLog && latestLog.height_cm && previousLog.height_cm
    ? (latestLog.height_cm - previousLog.height_cm).toFixed(1)
    : null;

  // Calculate percentile (simplified)
  const calculatePercentile = (value: number, month: number, type: "weight" | "height", gender: string | null) => {
    const whoData = type === "weight" 
      ? (gender === "female" ? whoWeightGirls : whoWeightBoys)
      : (gender === "female" ? whoHeightGirls : whoHeightBoys);
    const expected = whoData[Math.min(month, 12)];
    if (!expected) return 50;
    const diff = ((value - expected) / expected) * 100;
    return Math.max(1, Math.min(99, 50 + diff * 2));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          {selectedBaby && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
            >
              + Add Measurement
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>📊</span> Growth Charts
          </h1>
          <p className="text-gray-500">Track weight, height, and head circumference against WHO standards</p>
        </div>

        {/* Baby Selector */}
        {babies.length > 0 ? (
          <>
            <div className="mb-6">
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
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Weight */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                  <span className="text-2xl">⚖️</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {latestLog?.weight_kg ? `${latestLog.weight_kg} kg` : "—"}
                </div>
                {weightChange && (
                  <p className={`text-sm mt-1 ${parseFloat(weightChange) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {parseFloat(weightChange) >= 0 ? "+" : ""}{weightChange} kg since last
                  </p>
                )}
                {latestLog?.weight_kg && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Percentile</span>
                      <span>{Math.round(calculatePercentile(latestLog.weight_kg, getAgeMonths(latestLog.measurement_date), "weight", selectedBabyData?.gender || null))}th</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#425a51] rounded-full transition-all"
                        style={{ width: `${calculatePercentile(latestLog.weight_kg, getAgeMonths(latestLog.measurement_date), "weight", selectedBabyData?.gender || null)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Height */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Height</h3>
                  <span className="text-2xl">📏</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {latestLog?.height_cm ? `${latestLog.height_cm} cm` : "—"}
                </div>
                {heightChange && (
                  <p className={`text-sm mt-1 ${parseFloat(heightChange) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {parseFloat(heightChange) >= 0 ? "+" : ""}{heightChange} cm since last
                  </p>
                )}
                {latestLog?.height_cm && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Percentile</span>
                      <span>{Math.round(calculatePercentile(latestLog.height_cm, getAgeMonths(latestLog.measurement_date), "height", selectedBabyData?.gender || null))}th</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#cf765d] rounded-full transition-all"
                        style={{ width: `${calculatePercentile(latestLog.height_cm, getAgeMonths(latestLog.measurement_date), "height", selectedBabyData?.gender || null)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Head Circumference */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Head Circumference</h3>
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {latestLog?.head_circumference_cm ? `${latestLog.head_circumference_cm} cm` : "—"}
                </div>
              </div>
            </div>

            {/* Chart Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
              <div className="flex border-b border-gray-100">
                {[
                  { id: "weight", label: "Weight", icon: "⚖️" },
                  { id: "height", label: "Height", icon: "📏" },
                  { id: "head", label: "Head", icon: "🧠" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "weight" | "height" | "head")}
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#f4f6f5] text-[#425a51] border-b-2 border-[#425a51]"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Chart Area */}
              <div className="p-6">
                {babyLogs.length > 0 ? (
                  <div className="h-64 relative">
                    {/* Simple Chart Visualization */}
                    <div className="flex items-end justify-between h-full gap-2">
                      {babyLogs.slice(-12).map((log, index) => {
                        const value = activeTab === "weight" ? log.weight_kg :
                                     activeTab === "height" ? log.height_cm :
                                     log.head_circumference_cm;
                        
                        const maxValue = Math.max(...babyLogs.slice(-12).map(l => 
                          activeTab === "weight" ? (l.weight_kg || 0) :
                          activeTab === "height" ? (l.height_cm || 0) :
                          (l.head_circumference_cm || 0)
                        ));
                        
                        const heightPercent = value && maxValue ? (value / maxValue) * 100 : 0;
                        
                        return (
                          <div key={log.id} className="flex-1 flex flex-col items-center gap-2">
                            <div className="text-xs text-gray-500">
                              {value ? (activeTab === "weight" ? `${value}kg` : `${value}cm`) : "—"}
                            </div>
                            <div 
                              className={`w-full rounded-t-lg transition-all ${
                                activeTab === "weight" ? "bg-[#425a51]" :
                                activeTab === "height" ? "bg-[#cf765d]" : "bg-purple-500"
                              }`}
                              style={{ height: `${Math.max(heightPercent, 5)}%` }}
                            />
                            <div className="text-xs text-gray-400">
                              {getAgeMonths(log.measurement_date)}m
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-5xl mb-4">📈</div>
                      <p>Add measurements to see growth chart</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Measurement History */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Measurement History</h3>
              </div>
              {babyLogs.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {[...babyLogs].reverse().map((log) => (
                    <div key={log.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(log.measurement_date).toLocaleDateString("en-US", { 
                            month: "short", day: "numeric", year: "numeric" 
                          })}
                        </p>
                        <p className="text-xs text-gray-400">Age: {getAgeMonths(log.measurement_date)} months</p>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-gray-400 text-xs">Weight</p>
                          <p className="font-medium">{log.weight_kg ? `${log.weight_kg} kg` : "—"}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-xs">Height</p>
                          <p className="font-medium">{log.height_cm ? `${log.height_cm} cm` : "—"}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-xs">Head</p>
                          <p className="font-medium">{log.head_circumference_cm ? `${log.head_circumference_cm} cm` : "—"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <p>No measurements recorded yet</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No babies yet</h3>
            <p className="text-gray-500 mb-6">Add a baby to start tracking growth</p>
            <Link 
              href="/dashboard/babies/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold"
            >
              Add Baby
            </Link>
          </div>
        )}

        {/* WHO Reference */}
        <div className="mt-8 bg-[#f4f6f5] rounded-2xl p-6 border border-[#c5d3cd]">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>ℹ️</span> About Growth Percentiles
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Percentiles show how your baby compares to other children of the same age and gender, 
            based on WHO growth standards. A 50th percentile means your baby is average; 
            75th means larger than 75% of babies.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Note:</strong> Every baby grows at their own pace. If you have concerns, consult your pediatrician.
          </p>
        </div>
      </main>

      {/* Add Measurement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📊</span> Add Measurement
            </h2>
            
            <form onSubmit={handleAddGrowth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={recordedDate}
                  onChange={(e) => setRecordedDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    placeholder="e.g., 5.4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    placeholder="e.g., 60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Head Circumference (cm)</label>
                <input
                  type="number"
                  value={headCircumference}
                  onChange={(e) => setHeadCircumference(e.target.value)}
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                  placeholder="e.g., 40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                  placeholder="e.g., Doctor visit"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || (!weight && !height && !headCircumference)}
                  className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
