import { Inventory } from './inventory';
import { ItemInfo } from './iteminfo';
import NavbarR from '../componentes/navbarR';

const Page = async () => {
  const getUserItems = async (name) => {
    console.log('name getUserItems:');
    console.log(name);

    try {
      let formData = new FormData();
      formData.append('name', name);
      const res = await fetch('http://localhost:8080/items/getItemsUser', {
        method: 'post',
        body: formData,
      });

      console.log('Respuesta:');
      console.log(res.status);

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(
        'Ha ocurrido un error al obtener los items del usuario:' + error
      );
    }
  };

  const fetchUserData = async (token) => {
    try {
     // const token = localStorage.getItem('token');
     console.log('Token recibido en fetchUserData:', token); 
      if (token) {
        const response = await fetch('http://localhost:8080/auth/userInfo', {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          return userData;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userData = await fetchUserData();
  console.log(userData);
  const itemsList = await getUserItems(userData?.name);
  console.log(itemsList);

  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <NavbarR />
      <div className="container flex flex-1 mb-16 mx-auto mt-8 gap-11">
        <Inventory />
        <ItemInfo />
      </div>
    </div>
  );
};

export default Page;
