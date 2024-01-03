"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export type ClientTableProps = {
  label: string;
  columns: {
    key: string;
    label: string;
  }[];
  items: {
    [key: string]: any;
  }[];
};

export default function ClientTable({
  label,
  columns,
  items,
}: ClientTableProps) {
  return (
    <Table aria-label={label} isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"Inga tävlingar matchar filtret."}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
