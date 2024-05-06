'use client';
import NavbarR from '../componentes/navbarR';
import Items from '../componentes/items';
import { useEffect, useState } from 'react';


// Define the structure of an item
type Item = {
  id: number;
  price: number;
  item: {
    name: string;
    imagePath: string;
  };
};

// Page component to display items
function Page() {
  // State to store items available for sale
  const [itemsSell, setItemsSell] = useState<Item[]>([]);

  // Effect hook to fetch items on component mount and refresh every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Fetch items from the server
      try {
        const res = await fetch(`http://localhost:8080/sales/items`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache', // Request not to cache in browser
            Pragma: 'no-cache', // To avoid caching in older versions of HTTP/1.0
          },
          cache: 'no-cache',
        });
        // Check if fetching items was successful
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }

        // Parse the response as JSON and update state with fetched items
        const data = await res.json();
        setItemsSell(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }, 5000); 

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Render the page with navbar and items for sale
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