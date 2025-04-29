"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoBlack from "@/components/Logo/LogoBlack";
import LogoWhite from "@/components/Logo/LogoWhite";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";


export default function Login() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <main className="h-screen">
    <div className=" bg-white shadow-default dark:bg-boxdark h-screen">
      <div className="flex flex-wrap items-center h-full">
        <div className="hidden w-full xl:block xl:w-1/2 h-full bg-cover bg-center flex content-end" style={{ backgroundImage: "url('/image/backgroundImg/CSF.png')" }}>
          <div className="px-26 py-17.5">
            <p className="text-white text-xl py-8 px-8" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
              ¡Únete a la comunidad educativa del SENA y potencia tu futuro! Regístrate ahora para acceder a una amplia gama de programas de formación y oportunidades de crecimiento profesional. 
            </p>
          </div>
          <div className="px-26 ">
            <LogoWhite/>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <div className="p-7 sm:p-12.5 xl:px-29 w-full">
            <LogoBlack/>
            <h2 className=" text-2xl font-bold text-darkBlue dark:text-white sm:text-title-xl2">
              Inicia Sesión
            </h2>
            <p className="my-4 text-darkBlue w-1/2">
              ¡Bienvenido de vuelta! Por favor, inicia sesión para acceder a tu cuenta.
            </p>
          </div>
          <div className="w-full px-7 sm:px-12.5 xl:px-29">
            <form>
              <div className="relative z-20 dark:bg-form-input mb-4">
                <Label>Tipo de Documento</Label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select
                    value={selectedOption}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke text-darkBlue bg-transparent px-6 py-3 outline-none transition focus:border-darkBlue active:border-darkBlue dark:border-form-strokedark dark:bg-form-input ${
                      isOptionSelected ? "text-darkBlue dark:text-darkBlue" : ""
                    }`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Tipo de Documento
                    </option>
                    <option value="T.I" className="text-body dark:text-bodydark">
                      Tarjeta Identidad
                    </option>
                    <option value="C.C" className="text-body dark:text-bodydark">
                      Cedula Ciudadania
                    </option>
                    <option value="C.E" className="text-body dark:text-bodydark">
                      Cedula Extranjeria
                    </option>
                    <option value="Pep" className="text-body dark:text-bodydark">
                      Pep
                    </option>
                  </select>

                  <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <Label>Numero de Documento</Label>
                <div className="relative">
                  <Input placeholder="Ingrese su Numero de Documento" type="number" id="numDoc"/>

                  <span className="absolute right-4 top-4">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill="#637381"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <Label>Contraseña</Label>
                <div className="relative">
                  <Input placeholder="Ingrese su contraseña" type="password"/>

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22" 
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill="#637381"
                        />
                        <path
                          d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                          fill="#637381"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Iniciar Sesion"
                  className="w-full cursor-pointer rounded-lg border border-darkBlue bg-darkBlue p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>

            <Link href="/dashboard" className="text-dark">Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}