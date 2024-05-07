// Import necessary modules and components
'use client';
import { AlertDialogDemo } from '@/app/alertDialog';
import Navbarr from '../../componentes/navbarR';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useEffect, useState } from 'react';

// Define interface for route parameters of ItemViewPage
interface ItemViewRouteParams {
  id: number;
}

// Define interface for the response received for item details
interface ItemResponse {
  id: number;
  description: string;
  price: number;
  item: {
    id: number;
    name: string;
    description: string;
    code: string;
    username: string;
    imagePath: string;
    ip: string;
    tradableStatus: boolean;
  };
}

// Define the functional component ItemViewPage
function ItemViewPage({ params }: { params: { id: number } }) {
  // Initialize state to hold item details
  const [itemDetails, setItemDetails] = useState<ItemResponse>();

  // Fetch item details from server on component mount
  useEffect(() => {
    async function getItem(id: number) {
      // Fetch item details from server      
      const res = await fetch(`http://localhost:8080/sales/items/${id}`, {
        method: 'GET',
      });

      // Parse response data as JSON
      const data = await res.json();
      // Set item details in state
      setItemDetails(data);
      return data;
    }

    // Call getItem function with item ID from route parameters
    const item = getItem(params.id);
  }, []);

  // Return JSX for rendering the item view page
  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <Navbarr />
      <div className="flex bg-backgroundPurple h-96 w-5/6 mx-auto mt-12 rounded-md">
        {/* Lado izquierdo */}
        <div className="w-1/2 flex flex-col p-8">
          <label htmlFor="titleItem" className="text-textGray text-3xl ">
            {itemDetails?.item.name}
          </label>
          {/* Imagen item */}
          <div className="h-3/4 mx-auto">
            <div className="h-full rounded-md overflow-hidden">
              <img src={itemDetails?.item.imagePath} alt="Imagen item" />
            </div>
          </div>
        </div>
        {/* Lado derecho */}
        <div className="w-1/2 p-8 flex flex-col">
          {/* Descripcion item */}
          <div className="h-1/2 w-full mx-auto flex flex-col mt-6 gap-4">
            <label
              htmlFor="descripcionItem"
              className="text-textGray text-3xl "
            >
              Description
            </label>
            <div className="w-full h-full">
              <textarea
                id="descripcionItem"
                className="w-full h-full rounded-md resize-none"
                value={itemDetails?.description}
                readOnly
              ></textarea>
            </div>
          </div>
          {/* Precio y botón Buy */}
          <div className="flex flex-row justify-between items-end mt-6">
            {/* Precio */}
            <div>
              <div className="flex items-center gap-4">
                <div className="h-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-md overflow-hidden">
                    <img
                      src="/images/coin.png"
                      alt="Imagen item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-white text-xl">{itemDetails?.price}</p>
              </div>
            </div>
            {/* Boton buy */}
            <div>
              <AlertDialogDemo buttonText="Buy" idItem={String(params.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemViewPage;
