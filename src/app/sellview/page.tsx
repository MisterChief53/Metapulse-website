import { Inventory } from './inventory';
import { ItemInfo } from './iteminfo';
import NavbarR from '../componentes/navbarR';


const Page = () => {
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
