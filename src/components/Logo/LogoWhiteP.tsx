import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/image/logo/logo-white.png";


export default function LogoBlack() {
  return (
    <>
      <div className="flex justify-between ">
          <Link className="mb-5.5 inline-block" href="/dashboard">
            <div className='flex justify-between content-center'>
              <Image
                className="w-14 h-auto"
                src={Logo}
                alt="Logo"
                
              />
              <div className="flex flex-col flex-wrap justify-center content-center pl-4 text-white">
                <p className=' text-2xl'>
                  Olimpo
                </p>
                <p className='text-xs'>
                  Descubre tu grandeza
                </p>
              </div>
            </div>
          </Link>
      </div>
    </>
  )
}
