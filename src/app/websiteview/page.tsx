import NavbarR from '../componentes/navbarR';
import Items from '../componentes/items';

async function fetchItems() {
  const res = await fetch(`http://localhost:8080/sales/items`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache', // Solicitar que no se almacene en caché en el navegador
      'Pragma': 'no-cache', // Para evitar la caché en versiones antiguas de HTTP/1.0
    },
  });

  const data = await res.json();
  return data;
}


async function Page() {
  const items = await fetchItems();
  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <NavbarR />
      <div className="container flex flex-1 mb-16 mx-auto mt-8 gap-11">
        <Items items={items} />
      </div>
    </div>
  );
}

export default Page;