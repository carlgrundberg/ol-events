"use client";

import classifications from "@/lib/classifications";
import disciplines from "@/lib/disciplines";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { usePiwikPro } from "@piwikpro/next-piwik-pro";
import { cookies } from "next/headers";
import Link from "next/link";

export type Filter = {
  q?: string;
  c?: string[];
  d?: string[];
  dt?: string;
};

export default function FilterModal({
  filter,
  onFilterChange,
}: {
  filter: Filter;
  onFilterChange: (formData?: FormData) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { CustomEvent } = usePiwikPro();

  useEffect(() => {
    if (CustomEvent && isOpen) {
      CustomEvent.trackEvent("Filter", "opened");
    }
  }, [isOpen, CustomEvent]);

  const onFilterReset = () => {
    onFilterChange();
    onOpenChange();
  };

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 justify-start sm:justify-center">
        {filter.q && (
          <Button size="sm" onPress={onOpen}>
            Sökord: &quot;{filter.q}&quot;
          </Button>
        )}
        {filter.d &&
          filter.d.length > 0 &&
          filter.d.length < disciplines.length && (
            <Button size="sm" onPress={onOpen}>
              {filter.d
                .map((d) => disciplines.find((di) => di.value === d)?.label)
                .join(", ")}
            </Button>
          )}
        {filter.c &&
          filter.c.length > 0 &&
          filter.c.length < classifications.length && (
            <Button size="sm" onPress={onOpen}>
              {filter.c
                .map((c) => classifications.find((cl) => cl.value === c)?.label)
                .join(", ")}
            </Button>
          )}
        {filter.dt !== "100" && <Button size="sm">Inom {filter.dt} mil</Button>}
        <Button color="primary" onPress={onOpen} size="sm">
          Ändra filter
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action={onFilterChange}>
              <ModalHeader className="flex flex-col gap-1">
                Filtrera
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Gren"
                  size="sm"
                  name="d"
                  selectionMode="multiple"
                  defaultSelectedKeys={filter.d}
                >
                  {disciplines.map((discipline) => (
                    <SelectItem key={discipline.key} value={discipline.value}>
                      {discipline.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Tävlingstyp"
                  size="sm"
                  name="c"
                  selectionMode="multiple"
                  defaultSelectedKeys={filter.c}
                >
                  {classifications.map((classification) => (
                    <SelectItem
                      key={classification.key}
                      value={classification.value}
                    >
                      {classification.label}
                    </SelectItem>
                  ))}
                </Select>
                <Slider
                  label="Max avstånd"
                  name="dt"
                  size="sm"
                  step={1}
                  maxValue={100}
                  minValue={1}
                  defaultValue={filter.dt ? parseInt(filter.dt, 10) : 100}
                  getValue={(v) => {
                    return Array.isArray(v) && v[0] === 100
                      ? "Oändligt"
                      : `${v} mil`;
                  }}
                />
                <Input
                  size="sm"
                  name="q"
                  type="text"
                  placeholder="Sökord"
                  defaultValue={filter.q}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onFilterReset}>Återställ</Button>
                <Button type="submit" color="primary">
                  Sök
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
