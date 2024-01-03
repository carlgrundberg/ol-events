"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Filter } from "./filter-modal";

export default function FilterSummary({ filter }: { filter: Filter }) {
  return (
    <Breadcrumbs
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: ["px-2 py-0.5 border-small border-default-400 rounded-small"],
        separator: "hidden",
      }}
    >
      <BreadcrumbItem isCurrent={false}>
        {filter.from} - {filter.to}
      </BreadcrumbItem>
      {filter.q && (
        <BreadcrumbItem isCurrent={false}>{filter.q}</BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}
