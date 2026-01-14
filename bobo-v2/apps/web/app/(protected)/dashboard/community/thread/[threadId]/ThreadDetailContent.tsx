"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Thread {
  id: string;
  title: string;
  content: string;
  created_at: string;
  view_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  profiles: { id: string; full_name: string | null; email: string } | null;
  forum_categories: { name: string; icon: string; color: string } | null;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  is_helpful: boolean;
  profiles: { id: string; full_name: string | null; email: string } | null;
}

interface ThreadDetailContentProps {
  thread: Thread;
  posts: Post[];
  currentUser: User;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  red: "bg-red-100 text-red-700",
  pink: "bg-pink-100 text-pink-700",
  amber: "bg-amber-100 text-amber-700",
  indigo: "bg-indigo-100 text-indigo-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

export default function ThreadDetailContent({
  thread,
  posts,
  currentUser,
}: ThreadDetailContentProps) {
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || thread.is_locked) return;
    
    setLoading(true);
    
    await supabase.from("forum_posts").insert({
      thread_id: thread.id,
      user_id: currentUser.id,
      content: replyContent,
    });
    
    setReplyContent("");
    setLoading(false);
    router.refresh();
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const authorName = thread.profiles?.full_name || thread.profiles?.email?.split("@")[0] || "Anonymous";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/dashboard/community" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Community</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Thread */}
        <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          {/* Thread Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              {thread.is_pinned && <span className="text-sm">📌 Pinned</span>}
              <span className={`text-xs px-2 py-1 rounded-full ${colorMap[thread.forum_categories?.color || "blue"]}`}>
                {thread.forum_categories?.icon} {thread.forum_categories?.name}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#425a51] flex items-center justify-center text-white font-bold">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{authorName}</p>
                <p className="text-sm text-gray-400">
                  {timeAgo(thread.created_at)} • 👀 {thread.view_count} views
                </p>
              </div>
            </div>
          </div>
          
          {/* Thread Content */}
          <div className="p-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{thread.content}</p>
            </div>
          </div>
        </article>

        {/* Replies Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            💬 {posts.length} {posts.length === 1 ? "Reply" : "Replies"}
          </h2>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, index) => {
                const postAuthor = post.profiles?.full_name || post.profiles?.email?.split("@")[0] || "Anonymous";
                return (
                  <div
                    key={post.id}
                    className={`bg-white rounded-2xl border p-6 ${
                      post.is_helpful ? "border-[#425a51] bg-[#f4f6f5]" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                        {postAuthor.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">{postAuthor}</span>
                          <span className="text-sm text-gray-400">{timeAgo(post.created_at)}</span>
                          {post.is_helpful && (
                            <span className="text-xs px-2 py-0.5 bg-[#425a51] text-white rounded-full">
                              ✓ Helpful
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-4xl mb-2">🤔</div>
              <p className="text-gray-500">No replies yet. Be the first to help!</p>
            </div>
          )}
        </div>

        {/* Reply Form */}
        {!thread.is_locked ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Share your experience</h3>
            <form onSubmit={handleReply}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 resize-none mb-4"
                placeholder="Share your advice, tips, or words of encouragement..."
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Be supportive and share from your experience 💚
                </p>
                <button
                  type="submit"
                  disabled={loading || !replyContent.trim()}
                  className="px-6 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Post Reply"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-6 text-center text-gray-500">
            🔒 This discussion is locked
          </div>
        )}
      </main>
    </div>
  );
}
