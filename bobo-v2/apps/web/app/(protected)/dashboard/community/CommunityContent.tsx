"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Thread {
  id: string;
  title: string;
  content: string;
  created_at: string;
  view_count: number;
  is_pinned: boolean;
  profiles: { full_name: string | null; email: string } | null;
  forum_categories: { name: string; icon: string; color: string } | null;
  forum_posts: { id: string }[];
}

interface Profile {
  id: string;
  full_name: string | null;
  email: string;
}

interface CommunityContentProps {
  categories: Category[];
  recentThreads: Thread[];
  user: User;
  profile: Profile | null;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  red: "bg-red-100 text-red-700 border-red-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

// Default categories if database is empty
const defaultCategories = [
  { id: "1", name: "Sleep & Naps", description: "Discuss sleep training, nap schedules, and bedtime routines", icon: "🌙", color: "blue" },
  { id: "2", name: "Feeding & Nutrition", description: "Breastfeeding, formula, solids, and picky eaters", icon: "🍼", color: "green" },
  { id: "3", name: "Development & Milestones", description: "Motor skills, speech, cognitive development", icon: "🎯", color: "purple" },
  { id: "4", name: "Health & Wellness", description: "Illness, vaccines, pediatrician tips", icon: "💊", color: "red" },
  { id: "5", name: "New Parents", description: "First-time parent advice and support", icon: "👶", color: "pink" },
  { id: "6", name: "Work-Life Balance", description: "Returning to work, childcare, parenting burnout", icon: "⚖️", color: "amber" },
  { id: "7", name: "Products & Gear", description: "Reviews, recommendations, what worked for you", icon: "🛒", color: "indigo" },
  { id: "8", name: "Success Stories", description: "Share your wins and celebrate milestones", icon: "🎉", color: "emerald" },
];

export default function CommunityContent({
  categories,
  recentThreads,
  user,
  profile,
}: CommunityContentProps) {
  const [showNewThread, setShowNewThread] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !title || !content) return;
    
    setLoading(true);
    
    const { error } = await supabase.from("forum_threads").insert({
      category_id: selectedCategory,
      user_id: user.id,
      title,
      content,
    });

    if (!error) {
      setShowNewThread(false);
      setTitle("");
      setContent("");
      setSelectedCategory("");
      router.refresh();
    }
    
    setLoading(false);
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <button
            onClick={() => setShowNewThread(true)}
            className="px-4 py-2 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
          >
            + New Discussion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">👥</span>
            <div>
              <h1 className="text-3xl font-bold">Parent Community</h1>
              <p className="text-white/80">Real experiences. Real advice. Real parents.</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-white/70 mt-4">
            <div className="flex items-center gap-2">
              <span>👨‍👩‍👧‍👦</span>
              <span>50,000+ Parents</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💬</span>
              <span>10,000+ Discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <span>❤️</span>
              <span>Supportive Community</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`/dashboard/community/${category.id}`}
                className={`p-4 rounded-2xl border-2 hover:shadow-md transition-all ${colorMap[category.color] || "bg-gray-100"}`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-bold text-gray-900">{category.name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Recent & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Discussions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">🕐 Recent Discussions</h2>
            </div>

            {recentThreads.length > 0 ? (
              <div className="space-y-3">
                {recentThreads.slice(0, 5).map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/dashboard/community/thread/${thread.id}`}
                    className="block p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f4f6f5] flex items-center justify-center text-lg font-bold text-[#425a51]">
                        {(thread.profiles?.full_name || thread.profiles?.email || "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.is_pinned && <span className="text-xs">📌</span>}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${colorMap[thread.forum_categories?.color || "blue"]}`}>
                            {thread.forum_categories?.icon} {thread.forum_categories?.name}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 truncate">{thread.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>{timeAgo(thread.created_at)}</span>
                          <span>•</span>
                          <span>💬 {thread.forum_posts?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No discussions yet</h3>
                <p className="text-gray-500 mb-4">Be the first to start a conversation!</p>
                <button
                  onClick={() => setShowNewThread(true)}
                  className="px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold"
                >
                  Start a Discussion
                </button>
              </div>
            )}
          </div>

          {/* Trending Discussions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">🔥 Trending Now</h2>
            </div>

            {recentThreads.length > 0 ? (
              <div className="space-y-3">
                {[...recentThreads]
                  .sort((a, b) => (b.view_count + b.forum_posts?.length * 5) - (a.view_count + a.forum_posts?.length * 5))
                  .slice(0, 5)
                  .map((thread, index) => (
                  <Link
                    key={thread.id}
                    href={`/dashboard/community/thread/${thread.id}`}
                    className="block p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-amber-100 text-amber-700" : 
                        index === 1 ? "bg-gray-200 text-gray-600" : 
                        index === 2 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{thread.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          <span>👀 {thread.view_count} views</span>
                          <span>💬 {thread.forum_posts?.length || 0} replies</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-gray-500 text-sm">Trending topics will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Parenting News & Expert Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Featured Articles */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📰</span> Parenting News & Tips
            </h3>
            <div className="space-y-4">
              {[
                { title: "AAP Updates Safe Sleep Guidelines for 2026", source: "American Academy of Pediatrics", time: "2 hours ago", icon: "🌙" },
                { title: "Study: Benefits of Baby-Led Weaning Confirmed", source: "Pediatrics Journal", time: "5 hours ago", icon: "🍼" },
                { title: "New Milestone App Features: AI Sleep Predictions", source: "Bobo Team", time: "1 day ago", icon: "🤖" },
                { title: "How Screen Time Affects Infant Development", source: "Child Development Research", time: "2 days ago", icon: "📱" },
              ].map((article, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="text-2xl">{article.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{article.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{article.source} • {article.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Tips of the Day */}
          <div className="bg-gradient-to-br from-[#fdf8f6] to-white rounded-2xl p-6 border border-[#f3dad3]">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span> Expert Tip of the Day
            </h3>
            <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
              <p className="text-gray-700 italic text-sm leading-relaxed">
                "The 'wake window' for a 4-month-old is about 1.5-2 hours. Watch for sleepy cues like yawning and eye rubbing before this window closes."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-[#425a51] text-white flex items-center justify-center text-xs font-bold">DR</div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Dr. Rachel Kim</p>
                  <p className="text-xs text-gray-400">Pediatric Sleep Specialist</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="text-sm text-[#425a51] font-medium hover:underline">
                See More Expert Tips →
              </button>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-[#f4f6f5] rounded-2xl p-6 border border-[#c5d3cd]">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📋</span> Community Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#425a51]">✓</span>
              <span>Be kind and supportive — we&apos;re all learning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#425a51]">✓</span>
              <span>Share real experiences and what worked for you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#425a51]">✓</span>
              <span>Respect different parenting styles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#425a51]">✓</span>
              <span>For medical advice, always consult a pediatrician</span>
            </li>
          </ul>
        </div>
      </main>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>💬</span> Start a Discussion
            </h2>
            
            <form onSubmit={handleCreateThread} className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {displayCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-xl text-left transition-all border-2 ${
                        selectedCategory === cat.id
                          ? `${colorMap[cat.color]} border-current`
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div className="text-xs font-medium mt-1">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share your experience or question</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 resize-none"
                  placeholder="Share as much detail as you'd like. The more context you give, the better advice you'll receive!"
                />
              </div>

              {/* Tips */}
              <div className="bg-[#fdf8f6] rounded-xl p-4 text-sm">
                <p className="font-medium text-gray-900 mb-2">💡 Tips for a great discussion:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Be specific about your situation</li>
                  <li>• Mention your baby&apos;s age if relevant</li>
                  <li>• Share what you&apos;ve already tried</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewThread(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedCategory || !title || !content}
                  className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Post Discussion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
