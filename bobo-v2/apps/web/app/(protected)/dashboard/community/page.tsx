import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CommunityContent from "./CommunityContent";

export default async function CommunityPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch categories with thread counts
  const { data: categories } = await supabase
    .from("forum_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  // Fetch recent threads with user info
  const { data: recentThreads } = await supabase
    .from("forum_threads")
    .select(`
      *,
      profiles:user_id (full_name, email),
      forum_categories:category_id (name, icon, color),
      forum_posts (id)
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <CommunityContent 
      categories={categories || []} 
      recentThreads={recentThreads || []}
      user={user}
      profile={profile}
    />
  );
}
