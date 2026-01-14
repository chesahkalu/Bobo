"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const categories = [
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "gear", name: "Gear & Equipment", icon: "🚼" },
  { id: "toys", name: "Toys & Books", icon: "🧸" },
  { id: "nursery", name: "Nursery & Furniture", icon: "🛏️" },
  { id: "feeding", name: "Feeding", icon: "🍼" },
  { id: "strollers", name: "Strollers & Carriers", icon: "🚗" },
  { id: "safety", name: "Safety & Health", icon: "🏥" },
  { id: "other", name: "Other", icon: "📦" },
];

const conditions = [
  { id: "new", label: "New", description: "Brand new, never used, with tags" },
  { id: "like_new", label: "Like New", description: "Used once or twice, perfect condition" },
  { id: "good", label: "Good", description: "Normal wear, works perfectly" },
  { id: "fair", label: "Fair", description: "Shows wear but still functional" },
];

export default function NewListingPage() {
  const [listingType, setListingType] = useState<"sell" | "swap" | "free">("sell");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("marketplace_listings").insert({
      user_id: user.id,
      title,
      description,
      price: listingType === "sell" && price ? parseFloat(price) : null,
      listing_type: listingType,
      category,
      condition,
      location: location || null,
      images: [],
    });

    if (insertError) {
      setError("Failed to create listing. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/dashboard/marketplace?success=true");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link href="/dashboard/marketplace" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Listing</h1>
          <p className="text-gray-500">Sell, swap, or give away baby items</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">What would you like to do?</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setListingType("sell")}
                className={`p-4 rounded-xl text-center transition-all border-2 ${
                  listingType === "sell"
                    ? "bg-[#425a51] text-white border-[#425a51]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">💰</div>
                <div className="font-medium">Sell</div>
              </button>
              <button
                type="button"
                onClick={() => setListingType("swap")}
                className={`p-4 rounded-xl text-center transition-all border-2 ${
                  listingType === "swap"
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🔄</div>
                <div className="font-medium">Swap</div>
              </button>
              <button
                type="button"
                onClick={() => setListingType("free")}
                className={`p-4 rounded-xl text-center transition-all border-2 ${
                  listingType === "free"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🎁</div>
                <div className="font-medium">Give Free</div>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={80}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
              placeholder="e.g., Graco Stroller - Excellent Condition"
            />
            <p className="text-xs text-gray-400 mt-1">{title.length}/80 characters</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 resize-none"
              placeholder="Describe the item, its condition, and any included accessories..."
            />
          </div>

          {/* Price (only for sell) */}
          {listingType === "sell" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
                placeholder="0.00"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl text-center transition-all border-2 ${
                    category === cat.id
                      ? "bg-[#f4f6f5] border-[#425a51] text-[#425a51]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-xl mb-1">{cat.icon}</div>
                  <div className="text-xs font-medium">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Condition *</label>
            <div className="space-y-2">
              {conditions.map((cond) => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setCondition(cond.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all border-2 ${
                    condition === cond.id
                      ? "bg-[#f4f6f5] border-[#425a51]"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{cond.label}</div>
                  <div className="text-xs text-gray-500">{cond.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20"
              placeholder="e.g., Brooklyn, NY"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !title || !description || !category || !condition || (listingType === "sell" && !price)}
            className="w-full py-4 rounded-xl bg-[#425a51] text-white font-semibold disabled:opacity-50 hover:bg-[#364842] transition-colors"
          >
            {loading ? "Creating Listing..." : "Create Listing"}
          </button>
        </form>
      </main>
    </div>
  );
}
