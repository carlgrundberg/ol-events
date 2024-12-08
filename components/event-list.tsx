import { Event } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";
import ClientTable from "./client-table";
import { Filter } from "./filter-modal";
import dayjs from "dayjs";

async function getEvents(filter: Filter) {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  const { data } = await supabaseClient
    .from("events")
    .select("*")
    .gte("date", dayjs().startOf("day").format("YYYY-MM-DD"))
    // .lte("date", filter.to)
    .in("classificationId", [filter.c])
    .in("disciplineId", [filter.d])
    .like("name", `%${filter.q}%`)
    .order("date");

  return data as Event[];
}

export default async function EventList({ filter }: { filter: Filter }) {
  const events = await getEvents(filter);

  return (
    <ClientTable
      events={events}
      distance={filter.dt < 100 ? filter.dt : undefined}
    />
  );
}
