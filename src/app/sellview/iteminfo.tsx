'use client';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { AlertDialogSell } from '../alertDialogSell';
import { useState } from 'react';

// Define type for ItemInfoProps
type ItemInfoProps = {
  itemDetails: any;
  setItemDetails: React.Dispatch<React.SetStateAction<any>>;
};

// Define functional component ItemInfo
export const ItemInfo = ({ itemDetails, setItemDetails }: ItemInfoProps) => {
  // Initialize state variable for error message related to price
  const [errorPrice, setErrorPrice] = useState('');

  // Function to set item description
  const setItemDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemDetails({
      ...itemDetails,
      ['descripcion']: e.currentTarget.value, // Update item description in itemDetails state
    });
  };

  // Function to set item price
  const setItemPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (value >= 0) {
      setItemDetails({
        ...itemDetails,
        ['price']: value, // Update item price in itemDetails state
      });
      setErrorPrice(''); // Clear error message
    } else {
      setErrorPrice('Price not supported, please change It');// Set error message
    }
  };

   // Return JSX for rendering the item information
  return (
    <div className="w-1/2 bg-backgroundPurple rounded-md flex flex-col p-6 h-full">
      {/* Flex-row 1 */}
      <div className="flex flex-row">
        {/* Imagen Item */}
        <div className="w-2/5">
          <div className="w-auto rounded-lg overflow-hidden">
            <img
              src={
                itemDetails
                  ? itemDetails.imagePath
                  : '/images/logo_metapulse.png'
              }
              alt="Imagen item"
            />
          </div>
        </div>

        {/* Item Name and Input */}
        <div className="w-auto flex flex-col ml-8">
          <h1 className="text-5xl font-bold text-textGray w-full text-left">
            {itemDetails ? itemDetails.name : 'Item X'}
          </h1>
          <div className="flex flex-col mt-10 gap-4">
            {/* Coin Image */}
            <div className="w-10 h-10 rounded-md overflow-hidden">
              <img
                src="/images/coin.png"
                alt="Imagen item"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Input for Price */}
            <input
              type="text"
              name="price"
              id="InfoItems"
              placeholder="Enter the price"
              className="rounded-md p-2 w-3/4 placeholder-gray-500 text-xl font-bold"
              defaultValue={itemDetails.price}
              onChange={setItemPrice}
            />
            <h2 className="text-red-500">{errorPrice}</h2>
          </div>
        </div>
      </div>

      {/* Flex-row 2 */}
      <div className="flex flex-row mt-8">
        <textarea
          name="descripcionItem"
          id="desc_item"
          placeholder="Write a description"
          className="w-full resize-none h-40 rounded-md"
          onChange={setItemDescription}
          defaultValue={itemDetails.description}
        ></textarea>
      </div>

      {/* Flex-row 3 */}
      <div className="flex flex-grow justify-end">
        {/* Boton sell */}
        <div>
          {/* Render AlertDialogSell component with buttonText and itemDetails props */}
          <AlertDialogSell buttonText="Sell" itemDetails={itemDetails} />
        </div>
      </div>
    </div>
  );
};
