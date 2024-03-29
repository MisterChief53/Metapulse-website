'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

  async function buyItem({id}) {
    console.log(`el id es: ${id}`);

    const params = id;
    const headers = {
      Authorization: localStorage['token'],
    }

    console.log(params);
    console.log(headers);
    
    
    
    // const res = await fetch(`http://localhost:8080/sales/buy/${id}/${params}/${headers}`);

    const res = await fetch(`http://localhost:8080/sales/buy/${id}`, {
          method: 'POST',
          headers: {
            Authorization: localStorage['token'],
          },
        });


        console.log(res);
    const data = await res.text();
    
    return data;
  }
  
  export function AlertDialogDemo({ buttonText, idItem }) {
    
    return (
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {buttonText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-backgroundBlue border-2 border-blue-500 shadow-lg hover:shadow-blue-700 boxShadow = '0px 0px 15px 7px rgba(0, 0, 255, 0.5)'">
          <AlertDialogHeader >
            <AlertDialogTitle className="text-white text-xl">Do you want to continue?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{
              buyItem({ id: idItem });
              
            }}>Accept</AlertDialogCancel>
            <AlertDialogAction className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
