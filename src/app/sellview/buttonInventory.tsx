type Props = {
    name: string;
  };
  
  export const ButtonInventory = (props: Props) => {
    return (
      <button className=" border-black border-2 rounded-md w-10/12 mx-auto py-2 flex justify-start mt-4 hover:bg-slate-500">
        <span className="font-bold text-xl text-left w-full ml-5">
          {props.name}
        </span>
      </button>
    );
  };
  