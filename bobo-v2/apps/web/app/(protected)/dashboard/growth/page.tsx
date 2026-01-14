import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GrowthContent from "./GrowthContent";

export default async function GrowthPage() {
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

  // Fetch growth logs for all babies
  let growthLogs: any[] = [];
  if (babies && babies.length > 0) {
    const { data } = await supabase
      .from("growth_logs")
      .select("*")
      .in("baby_id", babies.map(b => b.id))
      .order("measurement_date", { ascending: true });
    growthLogs = data || [];
  }

  return (
    <GrowthContent 
      babies={babies || []}
      growthLogs={growthLogs}
      user={user}
    />
  );
}
