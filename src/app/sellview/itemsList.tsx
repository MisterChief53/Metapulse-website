import { ButtonInventory } from './buttonInventory';

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
