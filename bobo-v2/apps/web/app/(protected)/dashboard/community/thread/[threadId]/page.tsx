import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ThreadDetailContent from "./ThreadDetailContent";

interface PageProps {
  params: Promise<{ threadId: string }>;
}

export default async function ThreadDetailPage({ params }: PageProps) {
  const { threadId } = await params;
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }

  // Fetch thread with author
  const { data: thread, error: threadError } = await supabase
    .from("forum_threads")
    .select(`
      *,
      profiles:user_id (id, full_name, email),
      forum_categories:category_id (name, icon, color)
    `)
    .eq("id", threadId)
    .single();

  if (threadError || !thread) {
    notFound();
  }

  // Increment view count
  await supabase
    .from("forum_threads")
    .update({ view_count: (thread.view_count || 0) + 1 })
    .eq("id", threadId);

  // Fetch posts with authors
  const { data: posts } = await supabase
    .from("forum_posts")
    .select(`
      *,
      profiles:user_id (id, full_name, email)
    `)
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  return (
    <ThreadDetailContent 
      thread={thread}
      posts={posts || []}
      currentUser={user}
    />
  );
}
