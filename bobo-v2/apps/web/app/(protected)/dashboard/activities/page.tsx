import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ActivitiesContent from "./ActivitiesContent";

export default async function ActivitiesPage() {
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

  // Fetch completed activities
  const { data: completedActivities } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("activity_type", "play")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <ActivitiesContent 
      babies={babies || []} 
      completedActivities={completedActivities || []}
    />
  );
}
