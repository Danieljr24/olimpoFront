import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {faEnvelope, faHome, faIdCard, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const metadata: Metadata = {
  title: "Perfil | Olimpo",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Perfil" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="border-b border-stroke px-7 py-4 ">
                <h3 className="font-medium text-black ">
                  Informacion Personal
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <Label>Nombres</Label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} className="text-darkBlue"/>
                        </span>
                        <Input placeholder="Johan Dairon" style={{paddingLeft: "16%"}}/>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <Label>Apellidos</Label>
                      <Input placeholder="Martinez Rosario "/>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <Label>Tipo de Documento</Label>
                      <Input placeholder="Cedula Ciudadania"/>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <Label>Numero Documento</Label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faIdCard} className="text-darkBlue"/>
                        </span>
                        <Input placeholder="1016987523" style={{paddingLeft: "18%"}}/>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <Label>Direccion </Label>
                      <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FontAwesomeIcon icon={faHome} className="text-darkBlue"/>
                      </span>
                      <Input placeholder="Calle 123 #45-67" style={{paddingLeft: "18%"}}/>
                    </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <Label>Telefono</Label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faPhone} className="text-darkBlue"/>
                        </span>
                        <Input placeholder="321589720" style={{paddingLeft: "18%"}}/>
                      </div>
                    </div>
                  </div>

                
                  <div className="mb-5.5">
                    <Label>Correo Electronico</Label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FontAwesomeIcon icon={faEnvelope} className="text-darkBlue"/>
                      </span>
                      <Input placeholder="diego@example.com" style={{paddingLeft: "8%"}}/>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Guardar</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="border-b border-stroke px-7 py-4 ">
                <h3 className="font-medium text-black ">
                  Foto de Perfil
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <div className="h-auto w-auto rounded-full">
                      <Image
                        src={"/image/user/user_phono.png"}
                        width={200}
                        height={200}
                        alt="Usuario"
                      />
                    </div>

                    <p className="text-xl text-darkBlue">Johan Dairon Lopez Joto</p>

                    <div className="flex justify-between w-3/5 text-darkBlue text-xs mt-4 mb-4">
                      <p >C.C 1016985432</p>
                      <p>Diseñador UIX</p>
                    </div>

                    <div className="flex justify-between w-3/5 text-darkBlue text-xs mb-4">
                      <p >AB+</p>
                      <p>2005-11-23</p>
                    </div>
                  </div>
                  <div className="flex justify-end ">
                    <Button>Cambiar Rol</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
