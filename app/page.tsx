import EventList from "@/components/event-list";
import FilterModal, { Filter } from "@/components/filter-modal";
import classifications from "@/lib/classifications";
import disciplines from "@/lib/disciplines";

function getArrayParam(
  param: string | string[] | undefined,
  defaultValue: string[]
) {
  if (Array.isArray(param)) {
    return param;
  }
  if (param) {
    return param.split(",").map((p) => p.trim());
  }
  return defaultValue;
}

export default function Home({ searchParams }: { searchParams: Filter }) {
  const filter = {
    q: searchParams.q || "",
    c: getArrayParam(
      searchParams.c,
      classifications.map((c) => c.value)
    ),
    d: getArrayParam(
      searchParams.d,
      disciplines.map((d) => d.value)
    ),
    dt: searchParams.dt || 100,
  };

  return (
    <main className="container mx-auto p-2 flex flex-col gap-2">
      <FilterModal filter={filter} />
      <EventList filter={filter} />
    </main>
  );
}
