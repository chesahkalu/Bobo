import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BabyDetailContent from "./BabyDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BabyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect("/login");
  }

  // Fetch baby details
  const { data: baby, error: babyError } = await supabase
    .from("babies")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (babyError || !baby) {
    notFound();
  }

  // Fetch recent logs
  const { data: sleepLogs } = await supabase
    .from("sleep_logs")
    .select("*")
    .eq("baby_id", id)
    .order("start_time", { ascending: false })
    .limit(5);

  const { data: feedingLogs } = await supabase
    .from("feeding_logs")
    .select("*")
    .eq("baby_id", id)
    .order("start_time", { ascending: false })
    .limit(5);

  const { data: diaperLogs } = await supabase
    .from("diaper_logs")
    .select("*")
    .eq("baby_id", id)
    .order("logged_at", { ascending: false })
    .limit(5);

  return (
    <BabyDetailContent 
      baby={baby} 
      sleepLogs={sleepLogs || []}
      feedingLogs={feedingLogs || []}
      diaperLogs={diaperLogs || []}
    />
  );
}
