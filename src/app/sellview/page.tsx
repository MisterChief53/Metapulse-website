import { Inventory } from './inventory';
import { ItemInfo } from './iteminfo';
import NavbarR from '../componentes/navbarR';
import ClientComponent from './clientComponent';

const Page = ({ searchParams }: { searchParams: { token: string } }) => {
  // const [itemDetails, setItemDetails] = useState({
  //   id: 0,
  //   name: 'default',
  //   description: 'Default description',
  //   code: '0',
  //   username: '',
  //   imagePath: '',
  //   ip: '',
  //   tradableStatus: false,
  // });
  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <NavbarR />
      <div className="container flex flex-1 mb-16 mx-auto mt-8 gap-11">
        {/* <Inventory token={searchParams.token} /> */}
        <Inventory />
        {/* <ItemsList /> */}
        {/* <ItemInfo /> */}
      </div>
    </div>
  );
};

export default Page;
