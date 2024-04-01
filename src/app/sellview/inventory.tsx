export const Inventory = async () => {
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
          {/* Aquí se deberían de renderizar todos los items del usuario con un map */}
          {/* <ButtonInventory name="Item 1" />
          <ButtonInventory name="Item 2" />
          <ButtonInventory name="Item 3" />
          <ButtonInventory name="Item 4" />
          <ButtonInventory name="Item 5" />
          <ButtonInventory name="Item 6" />
          <ButtonInventory name="Item 7" />
          <ButtonInventory name="Item 8" /> */}
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  console.log('dentro de serverprops');

  try {
    const token = context.req.cookies.token; // Obtener el token de las cookies del servidor
    if (token) {
      const response = await fetch('http://localhost:8080/auth/userInfo', {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        const itemsList = await getUserItems(userData?.name);
        return {
          props: {
            user: userData,
            itemsList: itemsList || [],
          },
        };
      }
    }
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      user: null,
      itemsList: [],
    },
  };
};
