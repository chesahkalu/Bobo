import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
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

  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Fetch today's logs for all babies
  const babyIds = babies?.map(b => b.id) || [];
  
  let todayLogs = { sleep: 0, feeding: 0, diaper: 0 };
  
  if (babyIds.length > 0) {
    const { count: sleepCount } = await supabase
      .from("sleep_logs")
      .select("*", { count: "exact", head: true })
      .in("baby_id", babyIds)
      .gte("start_time", today.toISOString())
      .lt("start_time", tomorrow.toISOString());

    const { count: feedingCount } = await supabase
      .from("feeding_logs")
      .select("*", { count: "exact", head: true })
      .in("baby_id", babyIds)
      .gte("start_time", today.toISOString())
      .lt("start_time", tomorrow.toISOString());

    const { count: diaperCount } = await supabase
      .from("diaper_logs")
      .select("*", { count: "exact", head: true })
      .in("baby_id", babyIds)
      .gte("logged_at", today.toISOString())
      .lt("logged_at", tomorrow.toISOString());

    todayLogs = {
      sleep: sleepCount || 0,
      feeding: feedingCount || 0,
      diaper: diaperCount || 0,
    };
  }

  return <DashboardContent user={user} babies={babies || []} todayLogs={todayLogs} />;
}
