import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ConfirmPurchaseModal = () => {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Content>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-green-500 p-4 mb-4">
            {/* Ícono de marca de verificación */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          {/* Texto "Confirmed purchase" */}
          <div className="text-center text-xl font-semibold mb-4">
            Confirmed purchase
          </div>
          {/* Mensaje de agradecimiento */}
          <div className="text-center text-lg mb-4">
            Thank you for your purchase!
          </div>
          {/* Botón "Return to menu" */}
          <button className={buttonVariants()}>Return to menu</button>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Root>
  );
};

export { ConfirmPurchaseModal };
