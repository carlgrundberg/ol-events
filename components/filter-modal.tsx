"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export type Filter = {
  q: string;
  from: string;
  to: string;
};

export default function FilterModal({ filter }: { filter: Filter }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex flex-row gap-2">
        <Button size="sm">
          {filter.from} - {filter.to}
        </Button>
        {filter.q && <Button size="sm">Sökord: &quot;{filter.q}&quot;</Button>}
        <Button color="primary" onPress={onOpen} size="sm">
          Ändra filter
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action="" method="GET">
              <ModalHeader className="flex flex-col gap-1">
                Filtrera
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-2">
                  <Input
                    label="Från"
                    size="sm"
                    name="from"
                    type="date"
                    defaultValue={filter.from}
                  />
                  <Input
                    label="Till"
                    size="sm"
                    name="to"
                    type="date"
                    defaultValue={filter.to}
                  />
                </div>
                <Input
                  size="sm"
                  name="q"
                  type="text"
                  placeholder="Sökord"
                  defaultValue={filter.q}
                />
              </ModalBody>
              <ModalFooter>
                <a href="/">
                  <Button>Återställ</Button>
                </a>
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
