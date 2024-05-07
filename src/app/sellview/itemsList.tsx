import { ButtonInventory } from './buttonInventory';

// Define interface for user item
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

// Define interface for ItemsListProps
interface ItemsListProps {
  userItems: UserItem[];
}

// Define functional component ItemsList
const ItemsList = ({
  itemsList,
  setItemDetails,
}: {
  itemsList: UserItem[];
  setItemDetails: React.Dispatch<React.SetStateAction<any>>;// Function to set item details
}) => {
  // Return JSX for rendering the list of user items
  return (
    <>
    {/* Map through user items and render ButtonInventory component for each item */}
      {itemsList.map((item) => {
        return (
          <ButtonInventory
            key={item.id} // Unique key for each item
            item={item} // Item details
            setItemDetails={setItemDetails} // Function to set item details
          />
        );
      })}
    </>
  );
};

export default ItemsList;
