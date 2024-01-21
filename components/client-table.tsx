"use client";
import { Event } from "@/lib/db";
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
import geodist from "geodist";

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
    distance = geodist(
      { lat, lon: lng },
      { lat: event.lat, lon: event.lng },
      { exact: true, unit: "km" }
    );
  }
  return {
    ...event,
    distance,
  };
}

export default function ClientTable({ events, distance }: ClientTableProps) {
  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    suppressLocationOnMount: true,
  });

  useEffect(() => {
    if (distance && !coords) {
      getPosition();
    }
  }, [distance, getPosition, coords]);

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
            {event.distance
              ? ` | ${Math.round(event.distance / 10)} mil bort`
              : ""}
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
    <Table aria-label="Event list" isStriped hideHeader>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"Inga tävlingar matchar filtret."}>
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
