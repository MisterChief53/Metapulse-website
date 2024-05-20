// Import necessary modules and components
'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';

import { useState, useEffect } from 'react';

// Define the functional component Navbar
const Navbarr = () => {
  // Initialize router
  const router = useRouter();

  // Define function to handle sign out
 /* const handleSignOut = async() => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to home page
    router.push('/');
  };*/

  const handleSignOut = async () => {
    const token = localStorage.getItem('token');
  
    try {
      // Verifica si el token no es nulo antes de hacer la solicitud fetch
      if (token) {
        const response = await fetch('http://localhost:8080/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: token,
          },
        });
  
        if (response.ok) {
          localStorage.removeItem('token');
          router.push('/');
        } else {
          console.error('Logout error:', response.statusText);
        }
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Logout error:');
    }
  };

// Check if token is available in local storage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Define function to handle sell click
  const handleSellClick = () => {
    // Check if token exists
    if (token) {
      // Redirect to sellview page with token as query parameter
      router.push(`/sellview?token=${token}`);
    }
  };

    // Initialize state for user data
  const [userData, setUserData] = useState({ name: '', money: 0 });
  // Fetch user info from server on component mount
  useEffect(() => {
    const fetchUserInfo = async (token: string) => {
      // Log token obtained in nav
      console.log('Token obtained in nav:', token);

      //if (token) {
      try {
         // Check if token exists
        if (token) {
          // Fetch user info from server
          const response = await fetch('http://localhost:8080/auth/userInfo', {
            headers: {
              Authorization: token,
            },
          });
          // If response is successful, update user data state
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        }
      } catch (error) {
        // Log error if encountered while fetching user info
        console.error('Error fetching user data:', error);
      }
    };

    // Get token from local storage and fetch user info if token exists
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token); //Se pasa como parametrp
    }
  }, []);

  // Return JSX for header component
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
          <img src="/images/coin.png" alt="monedas jugador" className="w-10" />
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
