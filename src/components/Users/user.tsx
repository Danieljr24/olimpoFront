// Import necessary dependencies and components
"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Link from "next/link";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';


// Define the Users component
const Users: React.FC = () => {

    // Render the component
    return (
        <>
            <Breadcrumb pageName="Usuarios"/> 
            <div className="h-4/5 w-full flex flex-wrap p-4 bg-gray justify-center ">

                {/* We call the Card component and enclose it in a Link to redirect it */}
                <div className='w-full flex flex-wrap gap-8 pl-10 items-center'>
                    {/* Route to direct */}
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Super Administrador"
                            description="Es el responsable de que el sistema funcione a la perfección."
                            amount={7}
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Administrador Region"
                            description="Son líderes efectivos que poseen sólidas habilidades de gestión, planificación, comunicación y resolución de problemas"
                            amount={6}
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="SubDirector"
                            description="Encargado de apoyar y colaborar directamente con el Director Regional en la gestión y administración de un Centro del SENA."
                            amount={10}
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Coordinador"
                            description="Ayuda a preparar a las personas para trabajar en diferentes oficios y profesiones."
                            amount={10}
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Aprendizes"
                            description="Es una oportunidad única para adquirir formación profesional de calidad, experiencia laboral y las competencias necesarias para el éxito en el mercado laboral"
                            amount={200}           
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Instructores"
                            description="Son profesionales capacitados que juegan un papel fundamental en la formación y el desarrollo de aprendices en el Servicio Nacional de Aprendizaje (SENA)"
                            amount={4000}
                        />
                    </Link>
                    <Link
                        href="/users/superAdministrators" 
                        style={{width: '30%'}}
                    > 
                        <Card
                            title="Visitantes"
                            description="Son profesionales capacitados que juegan un papel fundamental en la formación y el desarrollo de aprendices en el Servicio Nacional de Aprendizaje (SENA)"
                            amount={200000}
                        />
                    </Link>
                </div>


            </div>
        </>
    );
};

// Export the Users component
export default Users;
