import EventList from "@/components/event-list";
import FilterModal, { Filter } from "@/components/filter-modal";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import dayjs from "dayjs";

export default function Home({ searchParams }: { searchParams: Filter }) {
  const filter = {
    from: searchParams.from || dayjs().format("YYYY-MM-DD"),
    to: searchParams.to || dayjs().add(30, "days").format("YYYY-MM-DD"),
    q: searchParams.q || "",
  };

  return (
    <main className="container mx-auto p-2 flex flex-col gap-2">
      <FilterModal filter={filter} />
      <EventList filter={filter} />
    </main>
  );
}
