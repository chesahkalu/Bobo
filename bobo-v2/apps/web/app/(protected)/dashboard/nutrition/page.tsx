import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NutritionContent from "./NutritionContent";

export default async function NutritionPage() {
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

  return <NutritionContent babies={babies || []} />;
}
