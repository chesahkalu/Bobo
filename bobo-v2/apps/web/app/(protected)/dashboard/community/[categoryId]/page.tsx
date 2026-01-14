import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CategoryContent from "./CategoryContent";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch category
  const { data: category } = await supabase
    .from("forum_categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  // Fetch threads in this category
  const { data: threads } = await supabase
    .from("forum_threads")
    .select(`
      *,
      profiles:user_id (full_name, email),
      forum_posts (id)
    `)
    .eq("category_id", categoryId)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <CategoryContent 
      category={category}
      categoryId={categoryId}
      threads={threads || []}
      user={user}
    />
  );
}
