// Define and export functional component ButtonInventory
export const ButtonInventory = ({ item, setItemDetails }: { item: any; setItemDetails: Function }) => {
  // Return JSX for rendering the button
  return (
    <button
      className=" border-black border-2 rounded-md w-10/12 mx-auto py-2 flex justify-start mt-4 hover:bg-slate-500"
      onClick={(e) => {
        e.preventDefault();
        setItemDetails(item);
      }}
    >
      {/* Render item name */}
      <span className="font-bold text-xl text-left w-full ml-5">
        {item.name}
      </span>
    </button>
  );
};


