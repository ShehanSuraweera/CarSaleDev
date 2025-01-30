import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ errorMessage: error.message }, { status: 500 });
  }

  return NextResponse.json({ errorMessage: null });
}
