"use client";

import { useState, useEffect } from "react";
import { useTransition } from "react";
import { deleteProject } from "@/app/actions";
import { ProjectFormData } from "@/lib/schema";
import { ProjectForm } from "./ProjectForm";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project extends ProjectFormData {
  id: string;
  created_at: string;
}

interface ProjectTableProps {
  initialData: Project[];
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  "on hold": "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
};

export function ProjectTable({ initialData }: ProjectTableProps) {
  const [isPending, startTransition] = useTransition();
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<
    (Project & { id: string }) | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const refetchProjects = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!formOpen && !editingProject) {
      const timer = setTimeout(() => {
        refetchProjects();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formOpen, editingProject]);

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        const result = await deleteProject(id);
        if (!("error" in result)) {
          await refetchProjects();
        }
      });
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function handleOpenChange(open: boolean) {
    setFormOpen(open);
    if (!open) {
      setEditingProject(undefined);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          onClick={() => {
            setEditingProject(undefined);
            setFormOpen(true);
          }}
          disabled={isLoading}
        >
          + New Project
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-4 text-muted-foreground">
          Updating projects...
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Team Member</TableHead>
              <TableHead>Budget (€)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No projects yet. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>{project.assigned_team_member}</TableCell>
                  <TableCell>€{Number(project.budget).toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        disabled={isPending || isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectForm
        open={formOpen}
        onOpenChange={handleOpenChange}
        initialData={editingProject}
      />
    </>
  );
}
