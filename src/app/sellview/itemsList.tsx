import { ButtonInventory } from './buttonInventory';

interface UserItem {
  id: number;
  name: string;
  description: string;
  code: string;
  username: string;
  imagePath: string;
  ip: string;
  tradableStatus: boolean;
}

interface ItemsListProps {
  userItems: UserItem[];
}

const ItemsList = ({
  itemsList,
  setItemDetails,
}: {
  itemsList: UserItem[];
  setItemDetails: React.Dispatch<React.SetStateAction<any>>;
}) => {
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
