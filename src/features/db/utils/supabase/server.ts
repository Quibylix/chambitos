import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default function getServerClient() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies) {
          try {
            cookies.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            const NEXT_SERVER_COOKIE_ERROR =
              "Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options";

            if (
              error instanceof Error &&
              error.message === NEXT_SERVER_COOKIE_ERROR
            ) {
              return;
            }

            console.error("Failed to set cookies", error);
          }
        },
      },
    },
  );

  return supabase;
}
