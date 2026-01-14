import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MilestonesContent from "./MilestonesContent";

export default async function MilestonesPage() {
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

  // Fetch milestone templates
  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .order("age_range_start_months", { ascending: true });

  // Fetch baby milestones if there are babies
  let babyMilestones: any[] = [];
  if (babies && babies.length > 0) {
    const { data } = await supabase
      .from("baby_milestones")
      .select("*")
      .in("baby_id", babies.map(b => b.id));
    babyMilestones = data || [];
  }

  return (
    <MilestonesContent 
      babies={babies || []} 
      milestones={milestones || []}
      babyMilestones={babyMilestones}
    />
  );
}
