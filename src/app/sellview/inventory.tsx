'use client';
import { useEffect, useState } from 'react';
import ItemsList from '../sellview/itemsList';
import { ItemInfo } from './iteminfo';

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

// Define functional component Inventory
export const Inventory = () => {
  const [itemDetails, setItemDetails] = useState<{ id?: number }>({});
  const [userData, setUserData] = useState({});
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  const [tokenState, setTokenState] = useState('');

  // Fetch user's items and user info on component mount
  useEffect(() => {
    const getUserItems = async (name: string) => {
      try {
        let formData = new FormData();
        formData.append('name', name);
        const res = await fetch('http://localhost:8080/items/getItemsUser', {
          method: 'post',
          body: formData,
          cache: 'no-cache',
        });

        // If response is successful, update user items state
        if (res.ok) {
          const data = await res.json();
          setUserItems(data);
          return data;
        }
      } catch (error) {
        console.log(
          'Ha ocurrido un error al obtener los items del usuario:' + error
        );
      }
    };

    // Function to fetch user info
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setTokenState(token);
        try {
          if (token) {
            // Fetch user info from the server
            const response = await fetch(
              'http://localhost:8080/auth/userInfo',
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            // If response is successful, update user data state and fetch user items
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
              await getUserItems(data.name);
            }
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    };

    // Call fetchUserInfo function
    fetchUserInfo();
  }, []);

  // Return JSX for rendering the inventory
  return (
    <>
      <div className="w-1/2 flex flex-col">
        <h1 className="text-textGray font-bold text-4xl">Your inventory</h1>
        <form action="" className="mt-4 flex flex-col h-full">
          <input
            type="text"
            name="buscador"
            id="buscadorItems"
            placeholder="Search..."
            className="rounded-md p-2 w-full placeholder-gray-500 text-xl font-bold"
          />
          <div
            className="bg-white mt-1 rounded-sm flex flex-col flex-1 align-middle overflow-y-auto"
            style={{ maxHeight: '470px' }} //
            id="ContenedorItems"
          >
            {/* Render ItemsList component with userItems and setItemDetails prop */}
            <ItemsList itemsList={userItems} setItemDetails={setItemDetails} />
          </div>
        </form>
      </div>
      {itemDetails.id && (
        <ItemInfo itemDetails={itemDetails} setItemDetails={setItemDetails} />
      )}
    </>
  );
};
