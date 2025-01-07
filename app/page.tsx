import { cookies } from "next/headers";
import EventList from "@/components/event-list";
import FilterModal, { Filter } from "@/components/filter-modal";
import classifications from "@/lib/classifications";
import disciplines from "@/lib/disciplines";
import { form } from "@nextui-org/react";
import { redirect } from "next/navigation";

const classificationValues = classifications.map((c) => c.value);
const disciplineValues = disciplines.map((d) => d.value);

function getSingleParam(
  param: string | string[] | undefined,
  storeValue: string | undefined,
  defaultValue: string
) {
  if (Array.isArray(param)) {
    return param[0];
  }
  if (param) {
    return param;
  }
  if (storeValue) {
    return storeValue;
  }
  return defaultValue;
}

function getArrayParam(
  param: string | string[] | undefined,
  storeValue: string[] | undefined,
  defaultValue: string[]
) {
  if (Array.isArray(param)) {
    return param;
  }
  if (param) {
    return param.split(",").map((p) => p.trim());
  }
  if (storeValue) {
    return storeValue;
  }
  return defaultValue;
}

async function getStoredFilter(): Promise<Filter | null> {
  try {
    const cookieStore = await cookies();
    const filterCookie = cookieStore.get("filter");
    if (!filterCookie) {
      return null;
    }
    return JSON.parse(filterCookie.value);
  } catch {
    return null;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const storedFilter = await getStoredFilter();
  const params = await searchParams;

  const filter: Filter = {
    q: getSingleParam(params.q, storedFilter?.q, ""),
    c: getArrayParam(params.c, storedFilter?.c, classificationValues),
    d: getArrayParam(params.d, storedFilter?.d, disciplineValues),
    dt: getSingleParam(params.dt, storedFilter?.dt, "100"),
  };

  async function onFilterChange(formData?: FormData) {
    "use server";

    const cookieStore = await cookies();

    if (formData) {
      const newFilter = {
        q: formData.get("q") as string,
        c: formData.getAll("c"),
        d: formData.getAll("d"),
        dt: formData.get("dt") as string,
      };

      cookieStore.set("filter", JSON.stringify(newFilter));

      const searchParams = new URLSearchParams(
        formData as unknown as Record<string, string>
      ).toString();

      redirect(`/?${searchParams}`);
    } else {
      cookieStore.delete("filter");
      redirect("/");
    }
  }

  return (
    <main className="container mx-auto p-2 flex flex-col gap-2">
      <FilterModal filter={filter} onFilterChange={onFilterChange} />
      <EventList filter={filter} />
    </main>
  );
}
