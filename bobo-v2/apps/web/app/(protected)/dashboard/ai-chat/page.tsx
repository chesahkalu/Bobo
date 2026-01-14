import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AIChatContent from "./AIChatContent";

export default async function AIChatPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch user's babies for context
  const { data: babies } = await supabase
    .from("babies")
    .select("*")
    .order("created_at", { ascending: false });

  return <AIChatContent babies={babies || []} />;
}
