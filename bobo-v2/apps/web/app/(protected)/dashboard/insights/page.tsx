import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InsightsContent from "./InsightsContent";

export default async function InsightsPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch user's babies
  const { data: babies } = await supabase
    .from("babies")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch recent activity logs
  let activityLogs: any[] = [];
  let sleepLogs: any[] = [];
  let feedingLogs: any[] = [];
  let growthLogs: any[] = [];
  
  if (babies && babies.length > 0) {
    const babyIds = babies.map(b => b.id);
    
    const [activity, sleep, feeding, growth] = await Promise.all([
      supabase.from("activity_logs").select("*").in("baby_id", babyIds).order("created_at", { ascending: false }).limit(50),
      supabase.from("activity_logs").select("*").in("baby_id", babyIds).eq("activity_type", "sleep").order("created_at", { ascending: false }).limit(20),
      supabase.from("activity_logs").select("*").in("baby_id", babyIds).eq("activity_type", "feeding").order("created_at", { ascending: false }).limit(20),
      supabase.from("growth_logs").select("*").in("baby_id", babyIds).order("measurement_date", { ascending: false }).limit(10),
    ]);
    
    activityLogs = activity.data || [];
    sleepLogs = sleep.data || [];
    feedingLogs = feeding.data || [];
    growthLogs = growth.data || [];
  }

  return (
    <InsightsContent 
      babies={babies || []}
      activityLogs={activityLogs}
      sleepLogs={sleepLogs}
      feedingLogs={feedingLogs}
      growthLogs={growthLogs}
    />
  );
}
