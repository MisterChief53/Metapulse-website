'use client';
import { useRouter } from 'next/navigation';


type Item = {
  id: number; 
  price: number; 
  item: {
    name: string;
    imagePath: string;
    
  };
  
};

type Props = {
  items: Item[]; // Especifica que items es un array de objetos del tipo Item
};

function Items({ items }: Props) {
  console.log(items);
  const router = useRouter(); 

  const handleClick = (itemId: number) => {
    router.push(`/itemview/${itemId}`); 
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center bg-customColor cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          style={{ width: '310px', height: '260px', boxShadow: '0px 0px 15px 7px rgba(0, 0, 255, 0.5)'}}
           
          onClick={() => handleClick(item.id)}
        >
          <img
            src={item.item.imagePath}
            style={{ width: '288px', height: '180px', padding: '16px' }} alt={''}          />
          <div>
              <div className="flex items-center gap-4">
                <div className="h-1/2 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-md overflow-hidden">
                    <img
                      src="/images/coin.png"
                      alt="Imagen item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-white">{item.price}</p>
                <p className="text-white">{item.id}</p>
              </div>
            </div>
          
          <h5 className="text-white">{item.item.name}</h5>
          
        </div>
      ))}

    </div>
  );
}

export default Items;