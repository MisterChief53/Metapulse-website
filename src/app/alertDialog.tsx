'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useState } from 'react';

async function buyItem({
  id,
  setModalExitoAbierto,
  setModalErrorAbierto,
}: {
  id: number;
  setModalExitoAbierto: React.Dispatch<React.SetStateAction<boolean>>;
  setModalErrorAbierto: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log(`el id es: ${id}`);

  try {
    const itemResponse = await fetch(`http://localhost:8080/sales/items/${id}`);
    const itemData = await itemResponse.json();
    const generalItemId = itemData.item.id;

    const saleResponse = await fetch(
      `http://localhost:8080/sales/buy/${generalItemId}`,
      {
        method: 'POST',
        headers: {
          Authorization: localStorage['token'],
        },
      }
    );

    if (saleResponse.ok) {
      console.log('sale completed successfully');
      setModalExitoAbierto(true);
      setModalErrorAbierto(false);
    } else {
      console.error('Error while processing the sale');
      setModalExitoAbierto(false);
      setModalErrorAbierto(true);
    }
  } catch (error) {
    console.error('Error processing the request', error);
    setModalExitoAbierto(false);
    setModalErrorAbierto(true);
  }
}

export function AlertDialogDemo({ buttonText, idItem }) {
  const [modalExitoAbierto, setModalExitoAbierto] = useState(false);
  const [modalErrorAbierto, setModalErrorAbierto] = useState(false);

  const handleAccept = () => {
    buyItem({ id: idItem, setModalExitoAbierto, setModalErrorAbierto });
  };

  const returnToMenu = () => {
    setModalExitoAbierto(false);
    window.location.href = 'http://localhost:3000/websiteview';
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {buttonText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-backgroundBlue border-2 border-blue-500 shadow-lg hover:shadow-blue-700 boxShadow = '0px 0px 15px 7px rgba(0, 0, 255, 0.5)'">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">
              Do you want to continue?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleAccept}
            >
              Accept
            </AlertDialogCancel>
            <AlertDialogAction className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
              Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={modalExitoAbierto}>
        <AlertDialogContent className="bg-backgroundBlue border-2 border-blue-500 shadow-lg hover:shadow-blue-700 boxShadow = '0px 0px 15px 7px rgba(0, 0, 255, 0.5)' flex justify-center items-center flex-col">
          <div className="w-28 h-28 rounded-full bg-green-500 flex justify-center items-center">
            <span className="text-white text-6xl font-bold">✅</span>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">
              Confirmed purchase
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={returnToMenu}
            >
              Return to menu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={modalErrorAbierto}>
        <AlertDialogContent className="bg-backgroundBlue border-2 border-blue-500 shadow-lg hover:shadow-blue-700 boxShadow = '0px 0px 15px 7px rgba(0, 0, 255, 0.5)'">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">
              Error in purchase
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-white text-sm">
            There was an error processing your purchase. Please try again.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              onClick={() => setModalErrorAbierto(false)}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
