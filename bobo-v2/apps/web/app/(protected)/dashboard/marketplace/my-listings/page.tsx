import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MyListingsContent from "./MyListingsContent";

export default async function MyListingsPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch user's listings
  const { data: listings } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <MyListingsContent listings={listings || []} />;
}
