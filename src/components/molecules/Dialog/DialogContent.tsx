import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Cross1Icon } from "@radix-ui/react-icons";

type DialogContentProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const DialogContent = ({
  title,
  description,
  children,
}: DialogContentProps) => {
  return (
    <Dialog.Content
      forceMount
      className={clsx(
        "fixed z-50",
        "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
        "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
        "bg-white",
        "focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75"
      )}
    >
      {title && (
        <Dialog.Title className="text-base font-medium text-gray-900">
          {title}
        </Dialog.Title>
      )}

      {description && (
        <Dialog.Description className="mt-1 text-sm font-normal text-gray-700">
          {description}
        </Dialog.Description>
      )}

      {children}

      <Dialog.Close
        className={clsx(
          "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
          "focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75"
        )}
      >
        <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
      </Dialog.Close>
    </Dialog.Content>
  );
};

export default DialogContent;
