import { createClient } from "@supabase/supabase-js";

export type Event = {
  id: number;
  name: string;
  date: string;
  lat: number | null;
  lng: number | null;
};

export function getDbClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
}
