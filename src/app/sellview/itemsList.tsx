import { ButtonInventory } from './buttonInventory';

const ItemsList = ({ itemsList }) => {
  return (
    <>
      {itemsList.map((item) => {
        return <ButtonInventory name={item.name} />;
      })}
    </>
  );
};

export default ItemsList;
