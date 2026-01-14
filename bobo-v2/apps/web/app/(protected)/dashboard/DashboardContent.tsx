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
              <div
                key={baby.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#f4f6f5] flex items-center justify-center text-3xl">
                    {baby.gender === "male" ? "👶" : baby.gender === "female" ? "👧" : "👶"}
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
              </div>
            ))}
          </div>
        ) : null}

        {/* Add Baby Card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center hover:border-[#425a51] transition-colors cursor-pointer">
          <div className="text-5xl mb-4">👶</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Add a Baby</h3>
          <p className="text-gray-500 mb-4">Start tracking sleep, feeding, and milestones</p>
          <button className="px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors">
            Add Baby Profile
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
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
      </main>
    </div>
  );
}
