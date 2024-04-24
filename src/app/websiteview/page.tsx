'use client';
import NavbarR from '../componentes/navbarR';
import Items from '../componentes/items';
import { useEffect, useState } from 'react';

type Item = {
  id: number;
  price: number;
  item: {
    name: string;
    imagePath: string;
  };
};

function Page() {
  const [itemsSell, setItemsSell] = useState<Item[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8080/sales/items`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache', // Solicitar que no se almacene en caché en el navegador
            Pragma: 'no-cache', // Para evitar la caché en versiones antiguas de HTTP/1.0
          },
          cache: 'no-cache',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await res.json();
        setItemsSell(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }, 5000); // 5000 milliseconds is 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <NavbarR />
      <div className="container flex flex-1 mb-16 mx-auto mt-8 gap-11">
        <Items items={itemsSell} />
      </div>
    </div>
  );
}

export default Page;