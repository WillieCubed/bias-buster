import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// TODO: Use database schema types
export const supabase = createClientComponentClient();
