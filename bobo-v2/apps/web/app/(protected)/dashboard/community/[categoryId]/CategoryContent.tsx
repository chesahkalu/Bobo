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
  forum_posts: { id: string }[];
}

interface CategoryContentProps {
  category: Category | null;
  categoryId: string;
  threads: Thread[];
  user: User;
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

// Default categories if database returns null
const defaultCategories: Record<string, Category> = {
  "1": { id: "1", name: "Sleep & Naps", description: "Discuss sleep training, nap schedules, and bedtime routines", icon: "🌙", color: "blue" },
  "2": { id: "2", name: "Feeding & Nutrition", description: "Breastfeeding, formula, solids, and picky eaters", icon: "🍼", color: "green" },
  "3": { id: "3", name: "Development & Milestones", description: "Motor skills, speech, cognitive development", icon: "🎯", color: "purple" },
  "4": { id: "4", name: "Health & Wellness", description: "Illness, vaccines, pediatrician tips", icon: "💊", color: "red" },
  "5": { id: "5", name: "New Parents", description: "First-time parent advice and support", icon: "👶", color: "pink" },
  "6": { id: "6", name: "Work-Life Balance", description: "Returning to work, childcare, parenting burnout", icon: "⚖️", color: "amber" },
  "7": { id: "7", name: "Products & Gear", description: "Reviews, recommendations, what worked for you", icon: "🛒", color: "indigo" },
  "8": { id: "8", name: "Success Stories", description: "Share your wins and celebrate milestones", icon: "🎉", color: "emerald" },
};

export default function CategoryContent({
  category,
  categoryId,
  threads,
  user,
}: CategoryContentProps) {
  const [showNewThread, setShowNewThread] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Use default category if not found in DB
  const displayCategory = category || defaultCategories[categoryId];
  
  if (!displayCategory) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <Link href="/dashboard/community" className="text-[#425a51] hover:underline">
            ← Back to Community
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setLoading(true);
    
    const { error } = await supabase.from("forum_threads").insert({
      category_id: categoryId,
      user_id: user.id,
      title,
      content,
    });

    if (!error) {
      setShowNewThread(false);
      setTitle("");
      setContent("");
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
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/community" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Community</span>
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
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Category Header */}
        <div className={`rounded-3xl p-8 mb-8 border-2 ${colorMap[displayCategory.color]}`}>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{displayCategory.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{displayCategory.name}</h1>
              <p className="text-gray-600 mt-1">{displayCategory.description}</p>
              <p className="text-sm text-gray-400 mt-2">{threads.length} discussion{threads.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>

        {/* Threads List */}
        {threads.length > 0 ? (
          <div className="space-y-3">
            {threads.map((thread) => (
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
                      {thread.is_pinned && <span className="text-xs">📌 Pinned</span>}
                    </div>
                    <h3 className="font-medium text-gray-900">{thread.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{thread.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{thread.profiles?.full_name || "Anonymous"}</span>
                      <span>•</span>
                      <span>{timeAgo(thread.created_at)}</span>
                      <span>•</span>
                      <span>💬 {thread.forum_posts?.length || 0} replies</span>
                      <span>•</span>
                      <span>👀 {thread.view_count} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">{displayCategory.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No discussions yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Be the first to share your experience or ask a question about {displayCategory.name.toLowerCase()}!
            </p>
            <button
              onClick={() => setShowNewThread(true)}
              className="px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
            >
              Start the First Discussion
            </button>
          </div>
        )}
      </main>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>{displayCategory.icon}</span> New {displayCategory.name} Discussion
            </h2>
            <p className="text-gray-500 mb-6">Share your experience or ask the community</p>
            
            <form onSubmit={handleCreateThread} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience or Question</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 resize-none"
                  placeholder="Share as much detail as you'd like..."
                />
              </div>

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
                  disabled={loading || !title || !content}
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
