import { AlertDialogDemo } from '@/app/alertDialog';
import Navbarr from '../../componentes/navbarR';
import { AlertDialog } from '@radix-ui/react-alert-dialog';




async function getItem(id: number) {
  // const res = await fetch(`http://localhost:8080/sales/items/${id}`);
  const res = await fetch(`http://localhost:8080/sales/items/${id}`, {
    method: 'GET',
  });

  const data = await res.json();
  return data;
}

interface ItemViewRouteParams {
  id: number; 
}

async function ItemViewPage({ params }: { params: { id: number } }) {
  const item = await getItem(params.id);

  return (
    <div className="bg-backgroundBlue min-h-screen w-screen flex flex-col mx-auto p-0 overflow-y-auto">
      <Navbarr />
      <div className="flex bg-backgroundPurple h-96 w-5/6 mx-auto mt-12 rounded-md">
        {/* Lado izquierdo */}
        <div className="w-1/2 flex flex-col p-8">
          <label htmlFor="titleItem" className="text-textGray text-3xl ">
            {item.item.name}
          </label>
          {/* Imagen item */}
          <div className="h-3/4 mx-auto">
            <div className="h-full rounded-md overflow-hidden">
              <img src={item.item.imagePath} alt="Imagen item" />
            </div>
          </div>
        </div>
        {/* Lado derecho */}
        <div className="w-1/2 p-8 flex flex-col">
          {/* Descripcion item */}
          <div className="h-1/2 w-full mx-auto flex flex-col mt-6 gap-4">
            <label
              htmlFor="descripcionItem"
              className="text-textGray text-3xl "
            >
              Description
            </label>
            <div className="w-full h-full">
              <textarea
                id="descripcionItem"
                className="w-full h-full rounded-md resize-none"
                value={item.description}
                readOnly
              ></textarea>
            </div>
          </div>
          {/* Precio y botón Buy */}
          <div className="flex flex-row justify-between items-end mt-6">
            {/* Precio */}
            <div>
              <div className="flex items-center gap-4">
                <div className="h-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-md overflow-hidden">
                    <img
                      src="/images/coin.png"
                      alt="Imagen item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-white text-xl">{item.price}</p>
              </div>
            </div>
            {/* Boton buy */}
            <div>
              <AlertDialogDemo buttonText="Buy" idItem={String(params.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemViewPage;
