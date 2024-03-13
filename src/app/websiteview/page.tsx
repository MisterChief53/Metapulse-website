import NavbarR from '../components/navbarR';
import Items from '../components/items';

async function fetchItems() {
  const res = await fetch('https://fakestoreapi.com/products/');
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
