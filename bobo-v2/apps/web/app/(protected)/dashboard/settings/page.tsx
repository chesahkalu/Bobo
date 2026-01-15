import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsContent from "./SettingsContent";

export default async function SettingsPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  return <SettingsContent user={user} />;
}
