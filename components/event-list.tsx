import { Event } from "@/lib/db";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import ClientTable from "./client-table";

export type EventListProps = {
  q: string;
  from: string;
  to: string;
};

async function getEvents({ q, from, to }: EventListProps) {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  const { data } = await supabaseClient
    .from("events")
    .select("*")
    .gte("date", from)
    .lte("date", to)
    .like("name", `%${q}%`)
    .order("date");

  return data as Event[];
}

export default async function EventList(props: EventListProps) {
  const from = props.from || dayjs().format("YYYY-MM-DD");
  const to = props.to || dayjs().add(30, "days").format("YYYY-MM-DD");
  const q = props.q || "";
  const events = await getEvents({ q, from, to });

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

  return (
    <>
      <div className="mb-4">
        <form action="" method="GET">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Input
              size="sm"
              name="from"
              type="date"
              placeholder="Från"
              defaultValue={from}
            />
            <Input
              size="sm"
              name="to"
              type="date"
              placeholder="Till"
              defaultValue={to}
            />
            <Input
              size="sm"
              name="q"
              type="text"
              placeholder="Sökord"
              defaultValue={q}
            />
            <Button type="submit" color="primary" size="lg" fullWidth>
              Sök
            </Button>
          </div>
        </form>
      </div>
      <ClientTable label="Event list" columns={columns} items={items} />
    </>
  );
}
