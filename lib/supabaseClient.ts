import { cookies } from "next/headers";
import {
  // createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";

const cookieStore = cookies();
// export const serverComponentSupabase = createServerComponentClient({
//   cookies: () => cookieStore,
// });
export const serverActionSupabase = createServerActionClient({
  cookies: () => cookieStore,
});
export const routeHandlerSupabase = createRouteHandlerClient({
  cookies: () => cookieStore,
});
export const serverActionAdminSupabase = createServerActionClient(
  { cookies },
  { supabaseKey: process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY }
);
