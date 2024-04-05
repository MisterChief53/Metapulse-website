import { useContext } from 'react';
import { ButtonInventory } from './buttonInventory';
import { useItemDetailContext } from '../context/itemContext';

const ItemsList = ({ itemsList, setItemDetails }) => {
  return (
    <>
      {itemsList.map((item) => {
        return (
          <ButtonInventory
            key={item.id}
            item={item}
            setItemDetails={setItemDetails}
          />
        );
      })}
    </>
  );
};

export default ItemsList;
