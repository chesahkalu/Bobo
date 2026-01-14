import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MarketplaceContent from "./MarketplaceContent";

export default async function MarketplacePage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch active listings
  const { data: listings } = await supabase
    .from("marketplace_listings")
    .select(`
      *,
      profiles:user_id (full_name, email)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch user's favorites
  const { data: favorites } = await supabase
    .from("marketplace_favorites")
    .select("listing_id")
    .eq("user_id", user.id);

  const favoriteIds = new Set(favorites?.map(f => f.listing_id) || []);

  return (
    <MarketplaceContent 
      listings={listings || []}
      favoriteIds={favoriteIds}
      user={user}
    />
  );
}
