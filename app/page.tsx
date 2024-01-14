import EventList from "@/components/event-list";
import FilterModal, { Filter } from "@/components/filter-modal";
import classifications from "@/lib/classifications";
import disciplines from "@/lib/disciplines";
import dayjs from "dayjs";

function getArrayParam(
  param: string | string[] | undefined,
  defaultValue: string[]
) {
  if (Array.isArray(param)) {
    return param;
  }
  if (param) {
    return [param];
  }
  return defaultValue;
}

export default function Home({ searchParams }: { searchParams: Filter }) {
  const filter = {
    from: searchParams.from || dayjs().format("YYYY-MM-DD"),
    to: searchParams.to || dayjs().add(30, "days").format("YYYY-MM-DD"),
    q: searchParams.q || "",
    c: getArrayParam(
      searchParams.c,
      classifications.map((c) => c.value)
    ),
    d: getArrayParam(
      searchParams.d,
      disciplines.map((d) => d.value)
    ),
  };

  return (
    <main className="container mx-auto p-2 flex flex-col gap-2">
      <FilterModal filter={filter} />
      <EventList filter={filter} />
    </main>
  );
}
