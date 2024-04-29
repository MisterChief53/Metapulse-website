'use client';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { AlertDialogSell } from '../alertDialogSell';
import { useState } from 'react';

type ItemInfoProps = {
  itemDetails: any; 
  setItemDetails: React.Dispatch<React.SetStateAction<any>>; 
};

export const ItemInfo = ({ itemDetails, setItemDetails }: ItemInfoProps) => {
  const setItemDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemDetails({
      ...itemDetails,
      ['descripcion']: e.currentTarget.value,
    });
  };

  const setItemPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDetails({
      ...itemDetails,
      ['price']: Number(e.currentTarget.value),
    });
  };

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

        {/* Nombre item y input */}
        <div className="w-auto flex flex-col ml-8">
          <h1 className="text-5xl font-bold text-textGray w-full text-left">
            {itemDetails ? itemDetails.name : 'Item X'}
          </h1>
          <div className="flex flex-col mt-10 gap-4">
            <div className="w-10 h-10 rounded-md overflow-hidden">
              <img
                src="/images/coin.png"
                alt="Imagen item"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="text"
              name="price"
              id="InfoItems"
              placeholder="Enter the price"
              className="rounded-md p-2 w-3/4 placeholder-gray-500 text-xl font-bold"
              defaultValue={itemDetails.price}
              onChange={setItemPrice}
            />
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
          <AlertDialogSell buttonText="Sell" itemDetails={itemDetails} />
        </div>
      </div>
    </div>
  );
};
