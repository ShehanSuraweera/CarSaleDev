"use server";

import { createSupabaseClient, protectRoute } from "@/src/auth/server";
import { getErrorMessage } from "../lib/utils";

export async function createAccountAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = await createSupabaseClient();

    const { error } = await auth.signUp({ email, password });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}
export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = await createSupabaseClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const { auth } = await createSupabaseClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

const signInwith = (provider: any) => async () => {
  const supabase = await createSupabaseClient();

  const auth_callbacl_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: auth_callbacl_url },
  });

  if (error) {
    console.error("Error logging in with Google", error);
  }
};

const signInWithGoogle = signInwith("google");

export { signInWithGoogle };
