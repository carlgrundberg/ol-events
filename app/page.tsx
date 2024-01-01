import EventList, { EventListProps } from "@/components/event-list";

type HomeProps = {
  searchParams: EventListProps;
};

export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="container mx-auto p-2">
      <EventList
        q={searchParams.q}
        from={searchParams.from}
        to={searchParams.to}
      />
    </main>
  );
}
