import { createClient } from "@/utils/supabase/server";
import { ProjectTable } from "@/components/ProjectTable";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("status", searchParams.status);
  }

  const { data: projects, error } = await query;

  if (error) {
    console.error("Database error:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Project Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your projects efficiently with real-time updates.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-lg shadow border border-border p-6">
          <ProjectTable initialData={projects || []} />
        </div>
      </div>
    </main>
  );
}