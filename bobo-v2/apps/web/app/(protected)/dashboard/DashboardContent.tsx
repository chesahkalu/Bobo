"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
  photo_url: string | null;
}

interface DashboardContentProps {
  user: User;
  babies: Baby[];
}

export default function DashboardContent({ user, babies }: DashboardContentProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Parent";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🍃</span>
            <span className="text-xl font-bold text-[#425a51]">Bobo</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-[#425a51]">Dashboard</Link>
            <Link href="/dashboard/milestones" className="text-sm font-medium text-gray-500 hover:text-[#425a51]">Milestones</Link>
            <Link href="/dashboard/insights" className="text-sm font-medium text-gray-500 hover:text-[#425a51]">Insights</Link>
            <Link href="/dashboard/community" className="text-sm font-medium text-gray-500 hover:text-[#425a51]">Community</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Hello, <strong className="text-gray-900">{userName}</strong>
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-500">
            {babies.length > 0 
              ? `You're tracking ${babies.length} little one${babies.length > 1 ? "s" : ""}.`
              : "Let's get started by adding your first baby profile."}
          </p>
        </div>

        {/* Baby Profiles Grid */}
        {babies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {babies.map((baby) => (
              <Link
                key={baby.id}
                href={`/dashboard/babies/${baby.id}`}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#f4f6f5] flex items-center justify-center text-3xl">
                    {baby.gender === "male" ? "👦" : baby.gender === "female" ? "👧" : "👶"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{baby.name}</h3>
                    <p className="text-sm text-gray-400">
                      Born {new Date(baby.birth_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-[#f4f6f5] rounded-xl">
                    <div className="text-2xl mb-1">🌙</div>
                    <div className="text-xs text-gray-500">Sleep</div>
                  </div>
                  <div className="p-3 bg-[#fdf8f6] rounded-xl">
                    <div className="text-2xl mb-1">🍼</div>
                    <div className="text-xs text-gray-500">Feed</div>
                  </div>
                  <div className="p-3 bg-[#f4f6f5] rounded-xl">
                    <div className="text-2xl mb-1">👶</div>
                    <div className="text-xs text-gray-500">Diaper</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Add Baby Card */}
        <Link 
          href="/dashboard/babies/new"
          className="block bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center hover:border-[#425a51] transition-colors cursor-pointer mb-12"
        >
          <div className="text-5xl mb-4">👶</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Add a Baby</h3>
          <p className="text-gray-500 mb-4">Start tracking sleep, feeding, and milestones</p>
          <span className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors">
            Add Baby Profile
          </span>
        </Link>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center">
              <div className="text-3xl mb-2">🌙</div>
              <div className="font-medium text-gray-900">Log Sleep</div>
            </button>
            <button className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center">
              <div className="text-3xl mb-2">🍼</div>
              <div className="font-medium text-gray-900">Log Feed</div>
            </button>
            <button className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center">
              <div className="text-3xl mb-2">👶</div>
              <div className="font-medium text-gray-900">Log Diaper</div>
            </button>
            <button className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-medium text-gray-900">View Stats</div>
            </button>
          </div>
        </div>

        {/* Feature Sections - Coming Soon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Milestones */}
          <Link href="/dashboard/milestones" className="bg-gradient-to-br from-[#f4f6f5] to-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>🎯</span> Milestones
              </h3>
              <span className="text-xs px-2 py-1 bg-[#425a51] text-white rounded-full">New</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Track developmental milestones with WHO-backed guidance</p>
            <div className="flex gap-2">
              <span className="text-2xl">🚶</span>
              <span className="text-2xl">🗣️</span>
              <span className="text-2xl">🧠</span>
            </div>
          </Link>

          {/* AI Chatbot */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span>🤖</span> AI Assistant
              </h3>
              <span className="text-xs px-2 py-1 bg-[#cf765d] text-white rounded-full">Coming Soon</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Get instant answers to parenting questions from our AI</p>
            <div className="flex gap-2 text-gray-500">
              <span className="text-2xl opacity-50">💬</span>
              <span className="text-2xl opacity-50">🧠</span>
              <span className="text-2xl opacity-50">✨</span>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-br from-[#fdf8f6] to-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>📈</span> AI Insights
              </h3>
              <span className="text-xs px-2 py-1 bg-[#cf765d] text-white rounded-full">Coming Soon</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Smart predictions for sleep patterns & feeding schedules</p>
            <div className="flex gap-2">
              <span className="text-2xl opacity-50">📊</span>
              <span className="text-2xl opacity-50">🔮</span>
              <span className="text-2xl opacity-50">💡</span>
            </div>
          </div>

          {/* Community */}
          <Link href="/dashboard/community" className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-2xl p-6 border border-[#425a51] hover:shadow-lg hover:-translate-y-1 transition-all block">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span>👥</span> Community
              </h3>
              <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">50K+ Parents</span>
            </div>
            <p className="text-sm text-white/80 mb-4">Connect with other parents, share tips & experiences</p>
            <div className="flex gap-2">
              <span className="text-2xl">💬</span>
              <span className="text-2xl">👨‍👩‍👧</span>
              <span className="text-2xl">❤️</span>
            </div>
          </Link>

          {/* Marketplace */}
          <Link href="/dashboard/marketplace" className="bg-gradient-to-br from-[#fdf8f6] to-white rounded-2xl p-6 border border-[#f3dad3] hover:shadow-lg hover:-translate-y-1 transition-all block">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>🛒</span> Marketplace
              </h3>
              <span className="text-xs px-2 py-1 bg-[#cf765d] text-white rounded-full">Browse Items</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Buy, sell & swap baby items with other parents</p>
            <div className="flex gap-2">
              <span className="text-2xl">👕</span>
              <span className="text-2xl">🧸</span>
              <span className="text-2xl">🛍️</span>
            </div>
          </Link>

          {/* Growth Charts */}
          <Link href="/dashboard/growth" className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all block">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span>📏</span> Growth Charts
              </h3>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">WHO Standards</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Track weight, height & head circumference over time</p>
            <div className="flex gap-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-2xl">📐</span>
              <span className="text-2xl">📊</span>
            </div>
          </Link>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-[#425a51] to-[#364842] rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Upgrade to Premium ✨</h3>
              <p className="text-white/80">Unlock AI insights, unlimited history, and premium features</p>
            </div>
            <button className="px-8 py-4 bg-white text-[#425a51] font-bold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap">
              Start Free Trial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
