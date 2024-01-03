import EventList from "@/components/event-list";
import FilterSummary from "@/components/fiilter-summary";
import FilterModal, { Filter } from "@/components/filter-modal";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import dayjs from "dayjs";

export default function Home({ searchParams }: { searchParams: Filter }) {
  const filter = {
    from: searchParams.from || dayjs().format("YYYY-MM-DD"),
    to: searchParams.to || dayjs().add(30, "days").format("YYYY-MM-DD"),
    q: searchParams.q || "",
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <svg
            height="36"
            viewBox="0 0 500 500"
            width="36"
            className="rounded mr-2"
          >
            <path d="M502,0H0V502" fill="#FFF" />
            <path d="M0,500H500V0" fill="#F76D22" />
          </svg>
          <p className="font-bold text-inherit">Orienteringstävlingar</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <FilterModal filter={filter} />
        </NavbarContent>
      </Navbar>
      <main className="container mx-auto p-2 flex flex-col gap-2">
        <FilterSummary filter={filter} />
        <EventList filter={filter} />
      </main>
    </>
  );
}
