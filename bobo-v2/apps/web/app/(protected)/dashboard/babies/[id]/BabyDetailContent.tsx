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
  weight_at_birth: number | null;
  height_at_birth: number | null;
  photo_url: string | null;
}

interface SleepLog {
  id: string;
  start_time: string;
  end_time: string | null;
  quality: string | null;
}

interface FeedingLog {
  id: string;
  feeding_type: string;
  start_time: string;
  amount_ml: number | null;
}

interface DiaperLog {
  id: string;
  diaper_type: string;
  logged_at: string;
}

interface BabyDetailContentProps {
  baby: Baby;
  sleepLogs: SleepLog[];
  feedingLogs: FeedingLog[];
  diaperLogs: DiaperLog[];
}

export default function BabyDetailContent({ 
  baby, 
  sleepLogs, 
  feedingLogs, 
  diaperLogs 
}: BabyDetailContentProps) {
  const [activeModal, setActiveModal] = useState<"sleep" | "feeding" | "diaper" | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Calculate age
  const birthDate = new Date(baby.birth_date);
  const today = new Date();
  const ageMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  const ageWeeks = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

  const handleLogSleep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await supabase.from("sleep_logs").insert({
      baby_id: baby.id,
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time") || null,
      quality: formData.get("quality") || null,
    });
    
    setActiveModal(null);
    setLoading(false);
    router.refresh();
  };

  const handleLogFeeding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await supabase.from("feeding_logs").insert({
      baby_id: baby.id,
      feeding_type: formData.get("feeding_type"),
      start_time: formData.get("start_time"),
      amount_ml: formData.get("amount_ml") ? parseInt(formData.get("amount_ml") as string) : null,
    });
    
    setActiveModal(null);
    setLoading(false);
    router.refresh();
  };

  const handleLogDiaper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await supabase.from("diaper_logs").insert({
      baby_id: baby.id,
      diaper_type: formData.get("diaper_type"),
      logged_at: new Date().toISOString(),
    });
    
    setActiveModal(null);
    setLoading(false);
    router.refresh();
  };

  const handleDeleteBaby = async () => {
    setLoading(true);
    
    // Delete all associated logs first
    await supabase.from("sleep_logs").delete().eq("baby_id", baby.id);
    await supabase.from("feeding_logs").delete().eq("baby_id", baby.id);
    await supabase.from("diaper_logs").delete().eq("baby_id", baby.id);
    await supabase.from("activity_logs").delete().eq("baby_id", baby.id);
    await supabase.from("growth_logs").delete().eq("baby_id", baby.id);
    
    // Delete baby
    await supabase.from("babies").delete().eq("id", baby.id);
    
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Baby Info Header */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#f4f6f5] flex items-center justify-center text-5xl overflow-hidden">
                {baby.photo_url ? (
                  <img 
                    src={baby.photo_url} 
                    alt={baby.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  baby.gender === "male" ? "👦" : baby.gender === "female" ? "👧" : "👶"
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{baby.name}</h1>
                <p className="text-gray-500">
                  {ageMonths >= 1 
                    ? `${ageMonths} month${ageMonths > 1 ? "s" : ""} old`
                    : `${ageWeeks} week${ageWeeks > 1 ? "s" : ""} old`}
                </p>
                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                  {baby.weight_at_birth && <span>Birth weight: {baby.weight_at_birth} kg</span>}
                  {baby.height_at_birth && <span>Birth height: {baby.height_at_birth} cm</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/dashboard/babies/${baby.id}/edit`}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>

        {/* Quick Log Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveModal("sleep")}
            className="p-6 bg-[#f4f6f5] rounded-2xl hover:shadow-md transition-all text-center border-2 border-transparent hover:border-[#425a51]"
          >
            <div className="text-4xl mb-2">🌙</div>
            <div className="font-bold text-gray-900">Log Sleep</div>
          </button>
          <button
            onClick={() => setActiveModal("feeding")}
            className="p-6 bg-[#fdf8f6] rounded-2xl hover:shadow-md transition-all text-center border-2 border-transparent hover:border-[#cf765d]"
          >
            <div className="text-4xl mb-2">🍼</div>
            <div className="font-bold text-gray-900">Log Feeding</div>
          </button>
          <button
            onClick={() => setActiveModal("diaper")}
            className="p-6 bg-[#f4f6f5] rounded-2xl hover:shadow-md transition-all text-center border-2 border-transparent hover:border-[#425a51]"
          >
            <div className="text-4xl mb-2">👶</div>
            <div className="font-bold text-gray-900">Log Diaper</div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sleep Logs */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🌙</span> Recent Sleep
            </h3>
            {sleepLogs.length > 0 ? (
              <ul className="space-y-3">
                {sleepLogs.map((log) => (
                  <li key={log.id} className="text-sm p-3 bg-gray-50 rounded-xl">
                    <div className="font-medium text-gray-900">
                      {new Date(log.start_time).toLocaleDateString()}
                    </div>
                    <div className="text-gray-500">
                      {new Date(log.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {log.end_time && ` - ${new Date(log.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No sleep logs yet</p>
            )}
          </div>

          {/* Feeding Logs */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🍼</span> Recent Feeding
            </h3>
            {feedingLogs.length > 0 ? (
              <ul className="space-y-3">
                {feedingLogs.map((log) => (
                  <li key={log.id} className="text-sm p-3 bg-gray-50 rounded-xl">
                    <div className="font-medium text-gray-900 capitalize">{log.feeding_type}</div>
                    <div className="text-gray-500">
                      {new Date(log.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {log.amount_ml && ` • ${log.amount_ml}ml`}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No feeding logs yet</p>
            )}
          </div>

          {/* Diaper Logs */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👶</span> Recent Diapers
            </h3>
            {diaperLogs.length > 0 ? (
              <ul className="space-y-3">
                {diaperLogs.map((log) => (
                  <li key={log.id} className="text-sm p-3 bg-gray-50 rounded-xl">
                    <div className="font-medium text-gray-900 capitalize">{log.diaper_type}</div>
                    <div className="text-gray-500">
                      {new Date(log.logged_at).toLocaleString([], { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No diaper logs yet</p>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {activeModal === "sleep" && (
              <form onSubmit={handleLogSleep}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🌙 Log Sleep</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time (optional)</label>
                    <input
                      type="datetime-local"
                      name="end_time"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                    <select
                      name="quality"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    >
                      <option value="">Select...</option>
                      <option value="poor">😫 Poor</option>
                      <option value="fair">😐 Fair</option>
                      <option value="good">😊 Good</option>
                      <option value="excellent">😴 Excellent</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl border border-gray-200 font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50">
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}

            {activeModal === "feeding" && (
              <form onSubmit={handleLogFeeding}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🍼 Log Feeding</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      name="feeding_type"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    >
                      <option value="breast">🤱 Breast</option>
                      <option value="bottle">🍼 Bottle</option>
                      <option value="formula">🧴 Formula</option>
                      <option value="solid">🥣 Solid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ml) - optional</label>
                    <input
                      type="number"
                      name="amount_ml"
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                      placeholder="e.g., 120"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl border border-gray-200 font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#cf765d] text-white font-medium disabled:opacity-50">
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}

            {activeModal === "diaper" && (
              <form onSubmit={handleLogDiaper}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">👶 Log Diaper</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "wet", label: "💧 Wet" },
                        { value: "dirty", label: "💩 Dirty" },
                        { value: "both", label: "💧💩 Both" },
                        { value: "dry", label: "✨ Dry" },
                      ].map((type) => (
                        <label key={type.value} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="diaper_type" value={type.value} required className="w-4 h-4" />
                          <span>{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl border border-gray-200 font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50">
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete {baby.name}?</h2>
              <p className="text-gray-500">
                This will permanently delete all data including sleep logs, feeding logs, diaper logs, and growth records. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="flex-1 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteBaby} 
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete Forever"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
