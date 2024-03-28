"use client"
import {useRouter} from 'next/navigation'
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/accordion';

import { useState, useEffect } from 'react';

const Navbarr = () => {
  const router = useRouter()
  const [userData, setUserData] = useState({ nombre: '', dinero: 0 });
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const respuesta = await fetch('http://localhost:8080/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setUserData(datos);
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        }
    };

    obtenerDatosUsuario();
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
        
        </Link >
      </div>
      <div className="flex w-1/2 items-center justify-end gap-16 mr-8">
        <div className="flex items-center gap-4">
          <img src="/images/coin.png" alt="monedas jugador" className="w-10" />
          <div className="text-white">{userData.dinero}</div>
        </div>

        <Accordion type="multiple"> 
        <AccordionItem value="1">
            <AccordionTrigger></AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href="/sellview">
        <button className="bg-blueButton px-4 py-2 text-white font-bold rounded-lg">
          Sell
        </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbarr;