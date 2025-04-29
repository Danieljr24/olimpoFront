import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/image/logo/logo-black.png";


export default function LogoBlack() {
  return (
    <>
      <div className="flex justify-between ">
          <Link className="mb-5.5 inline-block" href="/dashboard">
            <div className="hidden dark:block ">
              <Image
                className="w-24	"
                src={Logo}
                alt="Logo"
                
              />
              <div className="flex flex-col flex-wrap justify-center content-center pl-4 text-darkBlue">
                <p className='text-darkBlue text-4xl'>
                  Olimpo
                </p>
                <p>
                  Descubre tu grandeza
                </p>
              </div>
            </div>
            <div className='dark:hidden flex justify-between content-center'>
              <Image
                className="w-24	"
                src={Logo}
                alt="Logo"
                
              />
              <div className="flex flex-col flex-wrap justify-center content-center pl-4 text-darkBlue">
                <p className='text-4xl'>
                  Olimpo
                </p>
                <p>
                  Descubre tu grandeza
                </p>
              </div>
            </div>
          </Link>
      </div>
    </>
  )
}
