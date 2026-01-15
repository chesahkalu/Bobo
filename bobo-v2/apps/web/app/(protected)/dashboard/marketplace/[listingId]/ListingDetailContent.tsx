"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number | null;
  listing_type: "sell" | "swap" | "free";
  category: string;
  condition: string;
  images: string[];
  location: string | null;
  view_count: number;
  created_at: string;
  profiles: { id: string; full_name: string | null; email: string } | null;
}

interface ListingDetailContentProps {
  listing: Listing;
  currentUser: User;
  isFavorited: boolean;
}

const categories: Record<string, { name: string; icon: string }> = {
  clothing: { name: "Clothing", icon: "👕" },
  gear: { name: "Gear & Equipment", icon: "🚼" },
  toys: { name: "Toys & Books", icon: "🧸" },
  nursery: { name: "Nursery & Furniture", icon: "🛏️" },
  feeding: { name: "Feeding", icon: "🍼" },
  strollers: { name: "Strollers & Carriers", icon: "🚗" },
  safety: { name: "Safety & Health", icon: "🏥" },
  other: { name: "Other", icon: "📦" },
};

const conditionLabels: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-green-100 text-green-700" },
  like_new: { label: "Like New", color: "bg-blue-100 text-blue-700" },
  good: { label: "Good", color: "bg-amber-100 text-amber-700" },
  fair: { label: "Fair", color: "bg-gray-100 text-gray-600" },
};

const typeLabels: Record<string, { label: string; color: string; icon: string }> = {
  sell: { label: "For Sale", color: "bg-[#425a51] text-white", icon: "💰" },
  swap: { label: "Swap", color: "bg-purple-100 text-purple-700", icon: "🔄" },
  free: { label: "Free", color: "bg-pink-100 text-pink-700", icon: "🎁" },
};

export default function ListingDetailContent({
  listing,
  currentUser,
  isFavorited,
}: ListingDetailContentProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const sellerName = listing.profiles?.full_name || listing.profiles?.email?.split("@")[0] || "Anonymous";
  const isOwner = currentUser.id === listing.user_id;

  const toggleFavorite = async () => {
    if (favorited) {
      await supabase.from("marketplace_favorites").delete()
        .eq("user_id", currentUser.id)
        .eq("listing_id", listing.id);
    } else {
      await supabase.from("marketplace_favorites").insert({
        user_id: currentUser.id,
        listing_id: listing.id,
      });
    }
    setFavorited(!favorited);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setSending(true);

    await supabase.from("marketplace_messages").insert({
      listing_id: listing.id,
      sender_id: currentUser.id,
      receiver_id: listing.user_id,
      message: message.trim(),
    });

    setSending(false);
    setMessageSent(true);
    setMessage("");
    setTimeout(() => setShowMessageModal(false), 2000);
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/dashboard/marketplace" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl h-80 flex items-center justify-center relative">
              <span className="text-8xl opacity-50">
                {categories[listing.category]?.icon || "📦"}
              </span>
              <span className={`absolute top-4 left-4 text-sm px-3 py-1 rounded-full font-medium ${typeLabels[listing.listing_type]?.color}`}>
                {typeLabels[listing.listing_type]?.icon} {typeLabels[listing.listing_type]?.label}
              </span>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#425a51]">
                  {listing.listing_type === "free" ? "Free" : 
                   listing.listing_type === "swap" ? "Looking to Swap" :
                   listing.price ? `$${listing.price}` : "Make Offer"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl font-bold text-gray-900 mb-4">{listing.title}</h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${conditionLabels[listing.condition]?.color}`}>
                  {conditionLabels[listing.condition]?.label}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {categories[listing.category]?.icon} {categories[listing.category]?.name}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>👀 {listing.view_count} views</span>
                <span>•</span>
                <span>Posted {timeAgo(listing.created_at)}</span>
              </div>

              {listing.location && (
                <p className="text-sm text-gray-500 mb-6">📍 {listing.location}</p>
              )}

              {/* Actions */}
              {!isOwner ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowMessageModal(true)}
                    className="w-full py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
                  >
                    💬 Message Seller
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                      favorited 
                        ? "bg-red-50 text-red-600 border border-red-200" 
                        : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {favorited ? "❤️ Saved" : "🤍 Save to Favorites"}
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-[#f4f6f5] rounded-xl text-center">
                  <p className="text-sm text-gray-600">This is your listing</p>
                  <button className="text-[#425a51] font-medium text-sm mt-1 hover:underline">
                    Edit Listing
                  </button>
                </div>
              )}

              {/* Seller Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Seller</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#425a51] text-white flex items-center justify-center font-bold">
                    {sellerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{sellerName}</p>
                    <p className="text-xs text-gray-400">Verified Parent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
        </div>

        {/* Safety Tips */}
        <div className="mt-6 bg-[#fdf8f6] rounded-2xl p-6 border border-[#f3dad3]">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🛡️</span> Buying Safely
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Meet in a public place and bring someone with you</li>
            <li>• Inspect the item carefully before paying</li>
            <li>• Check for product recalls on CPSC.gov</li>
            <li>• Trust your instincts - if something feels off, walk away</li>
          </ul>
        </div>
      </main>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {messageSent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-2">The seller will receive your message</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Message {sellerName}</h2>
                <p className="text-sm text-gray-500 mb-4">About: {listing.title}</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 resize-none mb-4"
                  placeholder="Hi, is this still available?"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={sending || !message.trim()}
                    className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
