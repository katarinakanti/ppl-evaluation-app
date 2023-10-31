import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";

const cookieStore = cookies();
export const clientComponentSupabase = createClientComponentClient();
export const serverComponentSupabase = createServerComponentClient({
  cookies: () => cookieStore,
});
export const serverActionSupabase = createServerActionClient({
  cookies: () => cookieStore,
});
export const routeHandlerSupabase = createRouteHandlerClient({
  cookies: () => cookieStore,
});
