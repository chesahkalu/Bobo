import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditBabyContent from "./EditBabyContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBabyPage({ params }: PageProps) {
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

  return <EditBabyContent baby={baby} />;
}
