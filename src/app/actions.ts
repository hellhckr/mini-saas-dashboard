"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { projectSchema, ProjectFormData } from "@/lib/schema";

export async function createProject(data: ProjectFormData) {
  const validated = projectSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .insert([validated.data]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateProject(
  id: string,
  data: ProjectFormData
) {
  const validated = projectSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}