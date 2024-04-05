'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';

type ItemDetails = {
  id: number;
  name: string;
  description: string;
  code: number;
  username: string;
  imagePath: string;
  ip: string;
  tradableStatus: boolean;
};

interface ContextProps {
  itemDetails: ItemDetails[];
  setItemDetails: Dispatch<SetStateAction<ItemDetails[]>>;
}

const ItemDetailContext = createContext<ContextProps>({
  itemDetails: [],
  setItemDetails: (): ItemDetails[] => [],
});

export const ItemDetailsProvider = ({ children }) => {
  const [itemDetails, setItemDetails] = useState<[] | ItemDetails[]>([]);

  return (
    <ItemDetailContext.Provider value={{ itemDetails, setItemDetails }}>
      {children}
    </ItemDetailContext.Provider>
  );
};

export const useItemDetailContext = () => useContext(ItemDetailContext);
