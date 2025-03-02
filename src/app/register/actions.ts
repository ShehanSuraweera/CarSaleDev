"use server";
import { createSupabaseClient } from "@/src/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export async function signup(formData: FormData) {
  const supabase = await createSupabaseClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
