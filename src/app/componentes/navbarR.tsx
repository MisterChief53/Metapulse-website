'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';

import { useState, useEffect } from 'react';

const Navbarr = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const token = localStorage.getItem('token');

  const handleSellClick = () => {
    // Verificar que el token esté definido antes de redirigir
    if (token) {
      // Redirigir a la página sellview con el token como parámetro de consulta
      router.push(`/sellview?token=${token}`);
    }
  };

  const [userData, setUserData] = useState({ name: '', money: 0 });
  useEffect(() => {
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
            setUserData(data);
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    const token = localStorage.getItem('token');
    fetchUserInfo(token); //Se pasa como parametrp
  }, []);

  return (
    <header className="flex bg-navbarPurple py-4">
      <div className="flex w-1/2 ml-8">
        <Link href="/websiteview">
          <button className="bg-white rounded-full px-4 py-2 border-2 border-blue-500 shadow-lg hover:shadow-blue-700">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-xl">
              Metapulse
            </span>
          </button>
        </Link>
      </div>
      <div className="flex w-1/2 items-center justify-end gap-16 mr-8">
        <div className="flex items-center gap-4">
          <Image src="/images/coin.png" alt="monedas jugador" className="w-10" />
          <div className="text-white">{userData.money}</div>
        </div>

        <Accordion type="multiple">
          <AccordionItem value="1">
            <AccordionTrigger userName={userData.name}></AccordionTrigger>
            <AccordionContent onClick={handleSignOut}></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link
          href={{
            pathname: '/sellview',
            // query: {
            //   token: token,
            // },
          }}
        >
          <button className="bg-blueButton px-4 py-2 text-white font-bold rounded-lg">
            Sell
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbarr;
