// Import necessary dependencies and components
"use client";
import React, { useState, useEffect } from 'react';
import DataTableBase from '@/components/ui/DataTable';
import AlertComponent from '@/components/ui/Alert';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {data} from '@/components/utils/dataSet'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

// Define the Users component
const SuperAdministrators: React.FC = () => {

    // Define the structure of a character object
    interface Character {
        id: number; // ID of the character
        name: string; // Nombre of the character
        lastName: string; // Apellido of the character
        noDocument: number; // noDocumento of the character (changed type to number)
        state: string; // Estado of the character (Activo, Inactivo, etc.)
        // Add any other properties here as needed
    }

   
    // Function to close options
    const cerrarOpciones = () => {
        const opcionesAbiertas = document.querySelectorAll('.opciones.mostrar');
        opcionesAbiertas.forEach(opcion => {
            opcion.classList.remove('mostrar');
        });
    };

    // Event listener to close options when clicking anywhere outside of them
    document.addEventListener('click', (event) => {
        const clicEnOpciones = (event.target as HTMLElement).closest('.opciones-container');
        if (!clicEnOpciones) {
            cerrarOpciones();
        }
    });

    // Function to show options
    const mostrarOpciones = (id: number) => {
        cerrarOpciones(); // Close all open options

        const opciones = document.querySelector(`#opciones-${id}`);
        if (opciones) {
            opciones.classList.toggle('mostrar');
        }
    }
    
    // Initialize state variables
    const [filterText, setFilterText] = useState(''); // Text for filtering characters

    // Define the columns for the data table
    const columns = [
        {
            name: 'ID', // Column header
            selector: (row: Character) => row.id, // Selector function to get the name from each row
            sortable: true, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Nombres', // Column header
            selector: (row: Character) => row.name, // Selector function to get the name from each row
            sortable: true, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '10px 15px' // Padding around the content
            }
        },
        {
            name: 'Apellidos', // Column header
            selector: (row: Character) => row.lastName, // Selector function to get the name from each row
            sortable: true, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '10px 15px' // Padding around the content
            }
        },
        {
            name: 'No. de Documento', // Column header
            selector: (row: Character) => row.noDocument, // Selector function to get the name from each row
            sortable: true, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '10px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: Character) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state === 'Activo') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state === 'Inactivo') {
                        background = 'rgba(255, 0, 0, 0.4)';
                        color = 'rgba(243, 0, 0)';
                    } else {
                        background = 'rgba(243, 175, 0, 0.4)';
                        color = 'rgba(243, 175, 0)';
                    }
                    
                    // Return the status wrapped in a styled span
                    return (
                        <span style={{ background: background, borderRadius: '20px', padding: '0px 8px', color: color }}>
                            {row.state}
                        </span>
                    );
            },
            sortable: true, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: Character)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id)}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
                            <button >Primera Opción</button>
                            <button >Segunda Opción</button>
                            <button >Tercera Opción</button>
                        </div>
                    </div>
                )
            },
            grow: 1,
            
        },   
    ];

    // Filter function to filter characters by name
    const filterFunction = (characters: Character[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

    // Render the component
    return (
        <>
            <Breadcrumb pageName="Super Administradores"/> 
            <div className="h-5/6 w-full p-4 bg-gray">
            <AlertComponent comment='Se registro correctamente' title='success' />
              <div className='bg-white rounded-xl ScrollTable' style={{ maxHeight: '670px', overflowY:'auto' }}>
                {/* Input field for filtering */}
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)} // Update filterText state on change
                    className='my-4 ml-4 px-2 py-1 border-2 border-gray text-black'
                />
                <hr className='h-0.5 w-full bg-gray'/>
                {/* Data table */}
                <DataTableBase<Character>
                  columns={columns}
                  data={filterFunction(data)} // Apply the filter function to the data
                  filterFunction={filterFunction}              
                  pagination
                  responsive 
                />
              </div>
            </div>
        </>
    );
};

// Export the Users component
export default SuperAdministrators;
