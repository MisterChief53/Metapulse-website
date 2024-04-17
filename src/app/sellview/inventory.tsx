'use client';
import { useEffect, useState } from 'react';
import ItemsList from '../sellview/itemsList';
import { ItemInfo } from './iteminfo';

export const Inventory = () => {
  const [itemDetails, setItemDetails] = useState({});
  const [userData, setUserData] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [tokenState, setTokenState] = useState('');

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

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setTokenState(token);
        try {
          if (token) {
            const response = await fetch(
              'http://localhost:8080/auth/userInfo',
              {
                headers: {
                  Authorization: token,
                },
              }
            );

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

    fetchUserInfo();
  }, []);

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
