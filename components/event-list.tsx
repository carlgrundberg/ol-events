import { Event } from "@/lib/db";
import { Button } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import ClientTable from "./client-table";
import { Filter } from "./filter-modal";

async function getEvents(filter: Filter) {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  const { data } = await supabaseClient
    .from("events")
    .select("*")
    .gte("date", filter.from)
    .lte("date", filter.to)
    .in("classificationId", [filter.c])
    .in("disciplineId", [filter.d])
    .like("name", `%${filter.q}%`)
    .order("date");

  return data as Event[];
}

export default async function EventList({ filter }: { filter: Filter }) {
  const events = await getEvents(filter);

  const columns = [
    {
      key: "event",
      label: "Tävling",
    },
    {
      key: "actions",
      label: "",
    },
  ];

  const items = events.map((event) => ({
    key: event.id,
    event: (
      <div className="flex flex-col gap-1">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {event.name}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {event.date}
        </div>
      </div>
    ),
    actions: (
      <a
        href={`https://eventor.orientering.se/Events/Show/${event.id}`}
        target="_blank"
      >
        <Button color="primary">Eventor</Button>
      </a>
    ),
  }));

  return <ClientTable label="Event list" columns={columns} items={items} />;
}
