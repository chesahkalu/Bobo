"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Listing {
  id: string;
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
  profiles: { full_name: string | null; email: string } | null;
}

interface MarketplaceContentProps {
  listings: Listing[];
  favoriteIds: Set<string>;
  user: User;
}

const categories = [
  { id: "all", name: "All Items", icon: "🛍️" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "gear", name: "Gear & Equipment", icon: "🚼" },
  { id: "toys", name: "Toys & Books", icon: "🧸" },
  { id: "nursery", name: "Nursery & Furniture", icon: "🛏️" },
  { id: "feeding", name: "Feeding", icon: "🍼" },
  { id: "strollers", name: "Strollers & Carriers", icon: "🚗" },
  { id: "safety", name: "Safety & Health", icon: "🏥" },
  { id: "other", name: "Other", icon: "📦" },
];

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

// Demo listings if database is empty
const demoListings: Listing[] = [
  { id: "demo-1", title: "Graco Stroller - Excellent Condition", description: "Used for 6 months, still like new. Includes rain cover.", price: 120, listing_type: "sell", category: "strollers", condition: "like_new", images: [], location: "Brooklyn, NY", view_count: 45, created_at: new Date().toISOString(), profiles: { full_name: "Sarah M.", email: "sarah@example.com" } },
  { id: "demo-2", title: "Baby Clothes Bundle (0-3 months)", description: "20+ items including onesies, sleepers, and bibs. All gently used.", price: 35, listing_type: "sell", category: "clothing", condition: "good", images: [], location: "Manhattan, NY", view_count: 32, created_at: new Date().toISOString(), profiles: { full_name: "Mike T.", email: "mike@example.com" } },
  { id: "demo-3", title: "Fisher Price Swing", description: "Works perfectly! We used it for only 4 months. Pick up only.", price: null, listing_type: "free", category: "gear", condition: "good", images: [], location: "Queens, NY", view_count: 89, created_at: new Date().toISOString(), profiles: { full_name: "Lisa K.", email: "lisa@example.com" } },
  { id: "demo-4", title: "Ergo Baby Carrier", description: "Original Ergo carrier in gray. Looking to swap for Tula carrier.", price: null, listing_type: "swap", category: "strollers", condition: "good", images: [], location: "Jersey City, NJ", view_count: 28, created_at: new Date().toISOString(), profiles: { full_name: "Anna W.", email: "anna@example.com" } },
  { id: "demo-5", title: "IKEA Crib with Mattress", description: "White IKEA Sundvik crib in excellent condition with mattress.", price: 85, listing_type: "sell", category: "nursery", condition: "like_new", images: [], location: "Hoboken, NJ", view_count: 67, created_at: new Date().toISOString(), profiles: { full_name: "David L.", email: "david@example.com" } },
  { id: "demo-6", title: "Dr Brown Bottles Set", description: "Set of 6 bottles, never used, still in packaging.", price: 25, listing_type: "sell", category: "feeding", condition: "new", images: [], location: "Brooklyn, NY", view_count: 15, created_at: new Date().toISOString(), profiles: { full_name: "Emily R.", email: "emily@example.com" } },
];

export default function MarketplaceContent({
  listings,
  favoriteIds,
  user,
}: MarketplaceContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(favoriteIds);
  const router = useRouter();
  const supabase = createClient();

  // Use demo listings if database is empty
  const displayListings = listings.length > 0 ? listings : demoListings;

  // Filter listings
  const filteredListings = displayListings.filter((listing) => {
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    const matchesType = !selectedType || listing.listing_type === selectedType;
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const toggleFavorite = async (listingId: string) => {
    if (favorites.has(listingId)) {
      await supabase.from("marketplace_favorites").delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);
      setFavorites(prev => {
        const next = new Set(prev);
        next.delete(listingId);
        return next;
      });
    } else {
      await supabase.from("marketplace_favorites").insert({
        user_id: user.id,
        listing_id: listingId,
      });
      setFavorites(prev => new Set([...prev, listingId]));
    }
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/marketplace/my-listings"
              className="px-4 py-2 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
            >
              My Listings
            </Link>
            <Link
              href="/dashboard/marketplace/new"
              className="px-4 py-2 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
            >
              + Sell or Swap
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#425a51] to-[#364842] rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">🛒 Parent Marketplace</h1>
              <p className="text-white/80">Buy, sell, and swap baby items with verified parents</p>
              <div className="flex gap-6 text-sm text-white/70 mt-4">
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>Verified Parents Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💚</span>
                  <span>Sustainable Parenting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Local Pickups</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block text-8xl">🛍️</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for baby items..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
              />
            </div>
            
            {/* Type Filter */}
            <div className="flex gap-2">
              {Object.entries(typeLabels).map(([type, { label, icon }]) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedType === type
                      ? "bg-[#425a51] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#425a51] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredListings.length} item{filteredListings.length !== 1 ? "s" : ""} found
        </p>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <span className="text-5xl opacity-50">
                    {categories.find(c => c.id === listing.category)?.icon || "📦"}
                  </span>
                  
                  {/* Type Badge */}
                  <span className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium ${typeLabels[listing.listing_type]?.color}`}>
                    {typeLabels[listing.listing_type]?.icon} {typeLabels[listing.listing_type]?.label}
                  </span>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id); }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      favorites.has(listing.id)
                        ? "bg-red-100 text-red-500"
                        : "bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {favorites.has(listing.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                
                {/* Content */}
                <Link href={`/dashboard/marketplace/${listing.id}`} className="block p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${conditionLabels[listing.condition]?.color}`}>
                      {conditionLabels[listing.condition]?.label}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 truncate">{listing.title}</h3>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1 h-10">{listing.description}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-[#425a51]">
                      {listing.listing_type === "free" ? "Free" : 
                       listing.listing_type === "swap" ? "Swap" :
                       listing.price ? `$${listing.price}` : "Make Offer"}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo(listing.created_at)}</span>
                  </div>
                  
                  {listing.location && (
                    <p className="text-xs text-gray-400 mt-2">📍 {listing.location}</p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedType(null); setSearchQuery(""); }}
              className="px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Safety Tips */}
        <div className="mt-12 bg-[#fdf8f6] rounded-2xl p-6 border border-[#f3dad3]">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🛡️</span> Safety Tips
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#cf765d]">✓</span>
              <span>Meet in public places for pickup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#cf765d]">✓</span>
              <span>Inspect items before completing transaction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#cf765d]">✓</span>
              <span>Check product recalls before buying</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#cf765d]">✓</span>
              <span>Use Bobo messaging for all communication</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
