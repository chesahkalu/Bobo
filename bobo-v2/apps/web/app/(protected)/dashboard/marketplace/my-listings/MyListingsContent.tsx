"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number | null;
  listing_type: "sell" | "swap" | "free";
  category: string;
  condition: string;
  is_active: boolean;
  view_count: number;
  created_at: string;
}

interface MyListingsContentProps {
  listings: Listing[];
}

const typeLabels: Record<string, { label: string; color: string; icon: string }> = {
  sell: { label: "For Sale", color: "bg-[#425a51] text-white", icon: "💰" },
  swap: { label: "Swap", color: "bg-purple-100 text-purple-700", icon: "🔄" },
  free: { label: "Free", color: "bg-pink-100 text-pink-700", icon: "🎁" },
};

export default function MyListingsContent({ listings }: MyListingsContentProps) {
  const router = useRouter();
  const supabase = createClient();

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("marketplace_listings").update({ is_active: !currentStatus }).eq("id", id);
    router.refresh();
  };

  const deleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    await supabase.from("marketplace_listings").delete().eq("id", id);
    router.refresh();
  };

  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/marketplace" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Marketplace</span>
          </Link>
          <Link
            href="/dashboard/marketplace/new"
            className="px-4 py-2 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
          >
            + New Listing
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Listings</h1>

        {listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className={`bg-white rounded-2xl p-6 border border-gray-100 ${!listing.is_active ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${typeLabels[listing.listing_type]?.color}`}>
                        {typeLabels[listing.listing_type]?.icon} {typeLabels[listing.listing_type]?.label}
                      </span>
                      {!listing.is_active && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">Inactive</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{listing.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <span>👀 {listing.view_count} views</span>
                      <span>•</span>
                      <span>Posted {timeAgo(listing.created_at)}</span>
                      <span>•</span>
                      <span className="font-medium text-[#425a51]">
                        {listing.listing_type === "free" ? "Free" : 
                         listing.listing_type === "swap" ? "Swap" :
                         listing.price ? `$${listing.price}` : "Make Offer"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Link
                      href={`/dashboard/marketplace/${listing.id}`}
                      className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => toggleActive(listing.id, listing.is_active)}
                      className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {listing.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Start selling, swapping, or giving away baby items</p>
            <Link
              href="/dashboard/marketplace/new"
              className="inline-block px-6 py-3 rounded-xl bg-[#425a51] text-white font-semibold hover:bg-[#364842] transition-colors"
            >
              Create Your First Listing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
