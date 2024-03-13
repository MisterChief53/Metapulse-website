import { AlertDialog} from '@radix-ui/react-alert-dialog';
import { AlertDialogDemo } from '../alertDialog';

export const ItemInfo = () => {
  return (
    <div className="w-1/2 bg-backgroundPurple rounded-md flex flex-col p-6 h-full">
      {/* Flex-row 1 */}
      <div className="flex flex-row">
        {/* Imagen Item */}
        <div className="w-2/5">
          <div className="w-auto rounded-lg overflow-hidden">
            <img src="/images/logo_metapulse.png" alt="Imagen item" />
          </div>
        </div>

        {/* Nombre item y input */}
        <div className="w-auto flex flex-col ml-8">
          <h1 className="text-5xl font-bold text-textGray w-full text-left">
            Item X
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
              name="infoItem"
              id="InfoItems"
              placeholder="Enter the price"
              className="rounded-md p-2 w-3/4 placeholder-gray-500 text-xl font-bold"
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
        ></textarea>
      </div>

      {/* Flex-row 3 */}
      <div className="flex flex-grow justify-end">
       {/* Boton sell */}
       <div>
              <AlertDialogDemo buttonText="Sell" />
            </div>
      </div>
    </div>
  );
};
