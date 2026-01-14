import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ListingDetailContent from "./ListingDetailContent";

interface PageProps {
  params: Promise<{ listingId: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { listingId } = await params;
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch listing with seller info
  const { data: listing, error: listingError } = await supabase
    .from("marketplace_listings")
    .select(`
      *,
      profiles:user_id (id, full_name, email)
    `)
    .eq("id", listingId)
    .single();

  if (listingError || !listing) {
    notFound();
  }

  // Increment view count
  await supabase
    .from("marketplace_listings")
    .update({ view_count: (listing.view_count || 0) + 1 })
    .eq("id", listingId);

  // Check if favorited
  const { data: favorite } = await supabase
    .from("marketplace_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("listing_id", listingId)
    .single();

  return (
    <ListingDetailContent 
      listing={listing}
      currentUser={user}
      isFavorited={!!favorite}
    />
  );
}
