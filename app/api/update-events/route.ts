import { Event, getDbClient } from "@/lib/db";
import dayjs from "dayjs";
import { getEvents } from "eventor-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseClient = getDbClient();

  const events = await getEvents({
    fromDate: dayjs().format("YYYY-MM-DD"),
    toDate: dayjs().add(3, "month").format("YYYY-MM-DD"),
  });

  const mappedEvents: Event[] = events.map((e) => ({
    id: parseInt(e.eventid, 10),
    name: e.name,
    date: e.startdate.date,
    lat: e.eventrace.eventcenterposition?.y
      ? parseFloat(e.eventrace.eventcenterposition.y)
      : null,
    lng: e.eventrace.eventcenterposition?.x
      ? parseFloat(e.eventrace.eventcenterposition.x)
      : null,
    classificationId: parseInt(e.eventclassificationid, 10),
    disciplineId: parseInt(e.disciplineid, 10),
  }));

  const { error } = await supabaseClient.from("events").upsert(mappedEvents);

  if (error) {
    return Response.json({ mesage: error.message }, { status: 500 });
  } else {
    return Response.json({ events, mappedEvents });
  }
}
