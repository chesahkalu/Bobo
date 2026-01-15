"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface SettingsContentProps {
  user: User;
}

export default function SettingsContent({ user }: SettingsContentProps) {
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
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <span className="text-xl">←</span>
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">⚙️ Settings</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#425a51] text-white flex items-center justify-center text-2xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900">{userName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Account Created</span>
              <span className="text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/babies/new" className="p-4 bg-[#f4f6f5] rounded-xl text-center hover:bg-[#e8edea] transition-colors">
              <div className="text-2xl mb-1">👶</div>
              <span className="text-sm font-medium">Add Baby</span>
            </Link>
            <Link href="/dashboard/growth" className="p-4 bg-[#f4f6f5] rounded-xl text-center hover:bg-[#e8edea] transition-colors">
              <div className="text-2xl mb-1">📏</div>
              <span className="text-sm font-medium">Growth Charts</span>
            </Link>
            <Link href="/dashboard/nutrition" className="p-4 bg-[#f4f6f5] rounded-xl text-center hover:bg-[#e8edea] transition-colors">
              <div className="text-2xl mb-1">🥗</div>
              <span className="text-sm font-medium">Nutrition</span>
            </Link>
            <Link href="/dashboard/ai-chat" className="p-4 bg-[#f4f6f5] rounded-xl text-center hover:bg-[#e8edea] transition-colors">
              <div className="text-2xl mb-1">🤖</div>
              <span className="text-sm font-medium">AI Chat</span>
            </Link>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <span className="text-gray-900 font-medium">🌙 Dark Mode</span>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <div className="relative">
                <button
                  className="w-12 h-7 bg-gray-200 rounded-full relative cursor-not-allowed opacity-50"
                  title="Coming soon!"
                >
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <span className="text-gray-900 font-medium">🔔 Notifications</span>
                <p className="text-sm text-gray-500">Enable push notifications</p>
              </div>
              <div className="relative">
                <button
                  className="w-12 h-7 bg-gray-200 rounded-full relative cursor-not-allowed opacity-50"
                  title="Coming soon!"
                >
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">More preferences coming soon!</p>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-900">2.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Support</span>
              <a href="mailto:support@bobo.app" className="text-[#425a51] hover:underline">support@bobo.app</a>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h2 className="text-lg font-bold text-red-800 mb-4">Account Actions</h2>
          <button
            onClick={handleSignOut}
            className="w-full py-3 rounded-xl bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
