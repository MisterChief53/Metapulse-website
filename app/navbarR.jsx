"use client"
import {useRouter} from 'next/navigation'
import React from 'react';
import '../components/navbarR.css';
import Link from 'next/link';

const Navbarr = () => {

  const router = useRouter()

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
          <div className="text-white">20000</div>
        </div>

        <div className="bg-purple-300 rounded-full p-2 text-white cursor-pointer">
          RM
        </div>
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
