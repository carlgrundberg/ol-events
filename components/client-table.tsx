"use client";
import { Event } from "@/lib/db";
import getDistance from "@/lib/geodist";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

export type ClientTableProps = {
  events: Event[];
  distance?: number;
};

type EventWithDistance = Event & {
  distance?: number;
};

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

function calcluateDistance(
  event: Event,
  lat: number,
  lng: number
): EventWithDistance {
  let distance;
  if (event.lat && event.lng) {
    distance = getDistance([lat, lng], [event.lat, event.lng]);
  }
  return {
    ...event,
    distance,
  };
}

export default function ClientTable({ events, distance }: ClientTableProps) {
  const {
    coords,
    getPosition,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    suppressLocationOnMount: true,
  });

  useEffect(() => {
    if (distance && !coords && !positionError && isGeolocationAvailable) {
      getPosition();
    }
  }, [distance, getPosition, coords, isGeolocationAvailable, positionError]);

  const items = events
    .map((event) => {
      if (distance && coords) {
        return calcluateDistance(event, coords?.latitude, coords?.longitude);
      }
      return event as EventWithDistance;
    })
    .filter(
      (event) => !distance || (event.distance && event.distance < distance)
    )
    .map((event) => ({
      key: event.id,
      event: (
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {event.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {event.date}
            {event.distance ? ` | ${Math.round(event.distance)} mil bort` : ""}
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

  const emptyContent = positionError ? (
    <>
      <p>Du måste tillåta platstjänster för att kunna filtrera på avstånd.</p>
      <Button className="mt-4" onClick={getPosition}>
        Försök igen
      </Button>
    </>
  ) : (
    "Inga tävlingar matchar filtret."
  );

  return (
    <Table aria-label="Event list" isStriped hideHeader>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={emptyContent}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{item[columnKey as "actions" | "event"]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
