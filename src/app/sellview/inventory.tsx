import ItemsList from '../sellview/itemsList';

export const Inventory = async ({ token }) => {
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

  const fetchUserInfo = async (token) => {
    //const token = localStorage.getItem('token');
    console.log('Token obtenido en nav:', token);

    //if (token) {
    try {
      if (token) {
        const response = await fetch('http://localhost:8080/auth/userInfo', {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        }
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const userInfo = await fetchUserInfo(token); //Se pasa como parametrp
  const itemsList = await getUserItems(userInfo.name);

  return (
    <div className="w-1/2 h-full flex flex-col">
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
          <ItemsList itemsList={itemsList} />
        </div>
      </form>
    </div>
  );
};
