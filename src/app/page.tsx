import { createClient } from "@/utils/supabase/server";
import { ProjectTable } from "@/components/ProjectTable";
import { SearchFilters } from "@/components/SearchFilters";
import { LogoutButton } from "@/components/LogoutButton";
export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {

  const params = await searchParams;

  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // Filter by status
  if (params.status) {
    query = query.eq("status", params.status);
  }

  const { data: allProjects, error } = await query;

  if (error) {
    console.error("Database error:", error);
  }

  let filteredProjects = allProjects || [];
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredProjects = filteredProjects.filter((project) =>
      project.title.toLowerCase().includes(searchLower)
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Project Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your projects efficiently with real-time updates.
          </p>
        </div>
        <LogoutButton />
      </div>

        {/* Search & Filters */}
        <SearchFilters />

        {/* Content Card */}
        <div className="bg-card rounded-lg shadow border border-border p-6">
          <ProjectTable initialData={filteredProjects} />
        </div>
      </div>
    </main>
  );
}
