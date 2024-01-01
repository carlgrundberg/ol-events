import { getDbClient } from "@/lib/db";

export async function GET() {
  const { data } = await getDbClient().from("events").select("*").order("date");

  return Response.json({ data });
}
