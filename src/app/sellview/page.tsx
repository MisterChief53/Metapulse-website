//Necessary imports
import { Inventory } from './inventory';
import NavbarR from '../componentes/navbarR';

// Define functional component Page
const Page = () => {
  // Return JSX for rendering the page
  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <NavbarR />
      <div className="container flex flex-1 mb-16 mx-auto mt-8 gap-11">
        <Inventory />
      </div>
    </div>
  );
};

export default Page;
