// Import necessary dependencies and components
"use client";
import React, { useState, useEffect } from 'react';
import DataTableBase from '@/components/ui/DataTable';
import AlertComponent from '@/components/ui/Alert';
import {faEllipsisVertical, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Regiones, CentrosFormacion, Sedes, Ambientes} from '@/components/utils/dataSet'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import axios from 'axios';


// Define the Users component
const MacroRegions: React.FC = () => {

    // Initialize state variables
    const [filterText, setFilterText] = useState(''); // Text for filtering characters
    const [ubication, setUbication] = useState("macroRegions");
    const [foraneo, setForaneo] = useState("");
    const [macroRegion, setMacroRegion] = useState("");
    const [Region, setRegion] = useState("");
    const [trainingCente, setTrainingCenter] = useState("");
    const [infoText, setInfoText] = useState<String>("");
    var [ macroRegiones, setMacroRegiones ] = useState<any>([])
    var [Regions, setRegions] = useState<CharacterRegion[]>([])
    var [TrainingCenters, setTrainingCenters] = useState<CharacterTrainingCenter[]>([])
    var [Headquarters, setHeadquarters] = useState<CharacterHeadquarter[]>([])
    var [Environments, setEnvironments] = useState<CharacterEnvironment[]>([])



    // Define the structure of a character object
    interface CharacterMacroRegion {
        id: number; // ID of the character
        name: string; // Nombre of the character
        color: string; // Color of the character
        state: string; // Estado of the character (Habilitada, Deshabilitada, etc.)
        // Add any other properties here as needed
    }
    interface CharacterRegion {
        id: number; // ID of the character
        name: string; // Nombre of the character
        id_macror_region: string;
        color: string; // Color of the character
        longitude: number; // Longitud of the character
        latitude: number; // Latitud of the character
        state: string; // Estado of the character (Habilitada, Deshabilitada, etc.)
        // Add any other properties here as needed
    }
    interface CharacterTrainingCenter {
        id: number; // ID of the character
        name: string; // Nombre of the character
        id_region: string;
        color: string; // Color of the character
        address: string; // Direccion of the character
        state: string; // Estado of the character (Habilitada, Deshabilitada, etc.)
        // Add any other properties here as needed
    }
    interface CharacterHeadquarter {
        id: number; // ID of the character
        name: string; // Nombre of the character
        id_training_center: string;
        address: string; // Direccion of the character
        state: string; // Estado of the character (Habilitada, Deshabilitada, etc.)
        // Add any other properties here as needed
    }
    interface CharacterEnvironment {
        id: number; // ID of the character
        name: string; // Nombre of the character
        id_headquarter: string;
        floor: number; // Piso of the character
        capacity: number; // Capacidad of the character
        state: string; // Estado of the character (Habilitada, Deshabilitada, etc.)
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
    const mostrarOpciones = (id: number, table: string) => {
        cerrarOpciones(); // Close all open options

        const opciones = document.querySelector(`#${table}-opciones-${id}`);
        if (opciones) {
            opciones.classList.toggle('mostrar');
        }
    };




    // Define the columns for the data table
    const columnsMacroRegions = [
        {
            name: 'ID',
            cell: (row: CharacterMacroRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.id}
                    </a>
                );
            },
            sortable: false,
            style: {
                fontSize: '14px',
                padding: '20px 15px' // No padding here, as it's handled by the <a> element
            }
        },
        {
            name: 'Nombre', // Column header
            cell: (row: CharacterMacroRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.name}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Color', // Column header
            cell: (row: CharacterMacroRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.color}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: CharacterMacroRegion) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state.toLowerCase() === 'habilitada') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state.toLowerCase() === 'deshabilitada') {
                        background = 'rgba(255, 0, 0, 0.4)';
                        color = 'rgba(243, 0, 0)';
                    } else {
                        background = 'rgba(243, 175, 0, 0.4)';
                        color = 'rgba(243, 175, 0)';
                    }
                    
                    // Return the status wrapped in a styled span
                    return (
                        <a style={{
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            padding: '20px 15px', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                        onClick={() => change(row.name)}
                        >
                            <span style={{ background: background, borderRadius: '20px', padding: '0px 8px', color: color }}>
                                {row.state}
                            </span>
                        </a>
                    );
            },
            sortable: false, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: CharacterMacroRegion)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id, 'macroRegions')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`macroRegions-opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
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

    const columnsRegions = [
        {
            name: 'ID', // Column header
            cell: (row: CharacterRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.id}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Nombre', // Column header
            cell: (row: CharacterRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.name}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 2,
        },
        {
            name: 'Longitud', // Column header
            cell: (row: CharacterRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.longitude}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Latitud', // Column header
            cell: (row: CharacterRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.latitude}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Color', // Column header
            cell: (row: CharacterRegion) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.color}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: CharacterRegion) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state.toLowerCase() === 'habilitada') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state.toLowerCase() === 'deshabilitada') {
                        background = 'rgba(255, 0, 0, 0.4)';
                        color = 'rgba(243, 0, 0)';
                    } else {
                        background = 'rgba(243, 175, 0, 0.4)';
                        color = 'rgba(243, 175, 0)';
                    }
                    
                    // Return the status wrapped in a styled span
                    return (
                        <a style={{
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            padding: '20px 0px', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                        onClick={() => change(row.name)}
                        >
                            <span style={{ background: background, borderRadius: '20px', padding: '0px 8px', color: color }}>
                                {row.state}
                            </span>
                        </a>
                    );
            },
            sortable: false, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: CharacterRegion)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id, 'regions')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`regions-opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
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

    const columnsTrainingCenter = [
        {
            name: 'ID', // Column header
            cell: (row: CharacterTrainingCenter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.id}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Nombre', // Column header
            cell: (row: CharacterTrainingCenter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.name}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 3,
        },
        {
            name: 'Dirección', // Column header
            cell: (row: CharacterTrainingCenter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.address}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Color', // Column header
            cell: (row: CharacterTrainingCenter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.color}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: CharacterTrainingCenter) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state.toLowerCase() === 'habilitada') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state.toLowerCase() === 'deshabilitada') {
                        background = 'rgba(255, 0, 0, 0.4)';
                        color = 'rgba(243, 0, 0)';
                    } else {
                        background = 'rgba(243, 175, 0, 0.4)';
                        color = 'rgba(243, 175, 0)';
                    }
                    
                    // Return the status wrapped in a styled span
                    return (
                        <a style={{
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            padding: '20px 15px', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                        onClick={() => change(row.name)}
                        >
                            <span style={{ background: background, borderRadius: '20px', padding: '0px 8px', color: color }}>
                                {row.state}
                            </span>
                        </a>
                    );
            },
            sortable: false, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: CharacterTrainingCenter)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id, 'trainingCenter')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`trainingCenter-opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
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

    const columnsHeadquarters = [
        {
            name: 'ID', // Column header
            cell: (row: CharacterHeadquarter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.id}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Nombre', // Column header
            cell: (row: CharacterHeadquarter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.name}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Dirección', // Column header
            cell: (row: CharacterHeadquarter) => {
                return (
                    <a 
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }} 
                        onClick={() => change(row.name)}
                    >
                        {row.address}
                    </a>
                );
            },
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: CharacterHeadquarter) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state.toLowerCase() === 'habilitada') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state.toLowerCase() === 'deshabilitada') {
                        background = 'rgba(255, 0, 0, 0.4)';
                        color = 'rgba(243, 0, 0)';
                    } else {
                        background = 'rgba(243, 175, 0, 0.4)';
                        color = 'rgba(243, 175, 0)';
                    }
                    
                    // Return the status wrapped in a styled span
                    return (
                        <a style={{
                            cursor: 'pointer', 
                            display: 'block', 
                            width: '100%', 
                            height: '100%', 
                            padding: '20px 15px', 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                        onClick={() => change(row.name)}
                        >
                            <span style={{ background: background, borderRadius: '20px', padding: '0px 8px', color: color }}>
                                {row.state}
                            </span>
                        </a>
                    );
            },
            sortable: false, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: CharacterHeadquarter)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id, 'headquarters')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`headquarters-opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
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

    const columnsEnvironments = [
        {
            name: 'ID', // Column header
            selector: (row: CharacterEnvironment) => row.id, // Selector function to get the name from each row
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Nombre', // Column header
            selector: (row: CharacterEnvironment) => row.name, // Selector function to get the name from each row
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            },
            grow: 1,
        },
        {
            name: 'Piso', // Column header
            selector: (row: CharacterEnvironment) => row.floor, // Selector function to get the name from each row
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'capacidad', // Column header
            selector: (row: CharacterEnvironment) => row.capacity, // Selector function to get the name from each row
            sortable: false, // Indicates the column is sortable
            style: {
                fontSize: '14px', // Font size
                padding: '20px 15px' // Padding around the content
            }
        },
        {
            name: 'Estado', // Column header
            cell: (row: CharacterEnvironment) => { // Custom rendering function for the status column
                    let background = 'rgba(0, 239, 0, 0.4)'; // Default background color
                    let color = 'rgba(0, 171, 0)'; // Default text color
                    
                    // Change colors based on the character's status
                    if(row.state.toLowerCase() === 'habilitada') {
                        background = 'rgba(0, 239, 0, 0.4)';
                        color = 'rgba(0, 171, 0)';
                    } else if (row.state.toLowerCase() === 'deshabilitada') {
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
            sortable: false, // Indicates the column is sortable
        },
        {
            name: '',
            cell: (row: CharacterEnvironment)=>{
                return (
                    <div className="opciones-container" style={{ position: 'relative' }}>
                        <div className="icono" onClick={() => mostrarOpciones(row.id, 'environment')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                        <div id={`environment-opciones-${row.id}`} className="opciones" style={{ position: 'absolute', top: '0', left: '15px', marginTop: '-60px' }}>
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
    const filterFunction = (characters: CharacterMacroRegion[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

    const filterFunctionRegions = (characters: CharacterRegion[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

    const filterFunctionTrainingCenter = (characters: CharacterTrainingCenter[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

    const filterFunctionHeadquarters= (characters: CharacterHeadquarter[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

    const filterFunctionEnvironment= (characters: CharacterEnvironment[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };




    useEffect(()=>{

        let regionsTable= document.querySelector(".regions") as HTMLElement
        let trainingCenterTable= document.querySelector(".trainingCenter") as HTMLElement
        let headquartersTable= document.querySelector(".headquarters") as HTMLElement
        let environmentsTable= document.querySelector(".environments") as HTMLElement

        if (regionsTable) regionsTable.style.display = 'none';
        if (trainingCenterTable) trainingCenterTable.style.display = 'none';
        if (headquartersTable) headquartersTable.style.display = 'none';
        if (environmentsTable) environmentsTable.style.display = 'none';

        setInfoText('Hacer click para ver las regionales pertenecientes a la macro región')

        // consult the macroregions through the request
        axios.get('http://localhost:8089/api/v1/macroregion/all')
        .then(function (response){

            const dataArray = Object.values(response.data) as {
                map(arg0: (item: { id: number; name: string; color: string; state: string; }) => CharacterMacroRegion): any; id: number; name: string; color: string; state: string; 
            }[];

            setMacroRegiones(dataArray[2].map((item: { id: number; name: string; color: string; state: string; }) => {
                // Mapea los datos de respuesta a la estructura de CharacterMacroRegion
                const newItem: CharacterMacroRegion = {
                    id: item.id,
                    name: item.name,
                    color: item.color,
                    state: item.state
                };
                return newItem;
            }));
        }).catch(function (error){
            console.log(error)
        })
                    

    }, [])


    

    const change = (foraneo: string) => {
        const macroRegionsTable = document.querySelector(".macroRegions") as HTMLElement;
        const regionsTable = document.querySelector(".regions") as HTMLElement;
        const trainingCenterTable = document.querySelector(".trainingCenter") as HTMLElement;
        const headquartersTable = document.querySelector(".headquarters") as HTMLElement;
        const environmentsTable = document.querySelector(".environments") as HTMLElement;

        const hideTable = (table: HTMLElement) => {
            table.classList.remove("animate-slideInRight");
            table.classList.add("animate-slideOutLeft");
            setTimeout(() => {
                table.classList.remove("animate-slideOutLeft")
                table.style.display= 'none'
            }, 300);
        };
    
        const showTable = (table: HTMLElement) => {
            table.style.display = 'block';
            table.classList.remove("animate-slideOutLeft");
            table.classList.add("animate-slideInRight");
            setTimeout(() => {
                table.classList.remove("animate-slideInRight")
            }, 600);
        };

        if (ubication === 'macroRegions') {
            setUbication("regions");
            setForaneo(foraneo);
            setMacroRegion(foraneo)
            hideTable(macroRegionsTable);
            setTimeout(() => {
                showTable(regionsTable);
            }, 500);

            setRegions(Regiones.filter((region) => region.id_macror_region.toLowerCase()==foraneo.toLowerCase()));
            setInfoText('Hacer click para ver los centros pertenecientes a la regional');

            console.log(Regions);

        } else if (ubication === 'regions') {
            setUbication("trainingCenter");
            setForaneo(foraneo);
            setRegion(foraneo);
            hideTable(regionsTable);
            setTimeout(() => {
                showTable(trainingCenterTable);
            }, 500);

            setTrainingCenters(CentrosFormacion.filter((trainingCenter) => trainingCenter.id_region.toLowerCase()==foraneo.toLowerCase()))
            setInfoText('Hacer click para ver las sedes pertenecientes al centro');


        } else if (ubication === 'trainingCenter') {
            setUbication("headquarters");
            setForaneo(foraneo);
            setTrainingCenter(foraneo)
            hideTable(trainingCenterTable);
            setTimeout(() => {
                showTable(headquartersTable);
            }, 500);

            setHeadquarters(Sedes.filter((headquarter) => headquarter.id_training_center.toLowerCase()==foraneo.toLowerCase()))
            setInfoText('Hacer click para ver los ambientes perteneciente a la sede');


        } else if (ubication === 'headquarters') {
            setUbication("environments");
            setForaneo(foraneo);
            hideTable(headquartersTable);
            setTimeout(() => {
                showTable(environmentsTable);
            }, 500);

            setEnvironments(Ambientes.filter((environment) => environment.id_headquarter.toLowerCase()==foraneo.toLowerCase()))
            setInfoText('');

        }
        showText()
    };

    const retornar= ()=>{

        const macroRegionsTable = document.querySelector(".macroRegions") as HTMLElement;
        const regionsTable = document.querySelector(".regions") as HTMLElement;
        const trainingCenterTable = document.querySelector(".trainingCenter") as HTMLElement;
        const headquartersTable = document.querySelector(".headquarters") as HTMLElement;
        const environmentsTable = document.querySelector(".environments") as HTMLElement;

        const hideTableRetorno = (table: HTMLElement) => {
            table.classList.remove("animate-slideInRightRetorno");
            table.style.display= 'block'
            table.classList.add("animate-slideOutLeftRetorno");
            setTimeout(() => {
                table.classList.remove("animate-slideOutLeftRetorno")       
            }, 600);
        };

        const showTableRetorno = (table: HTMLElement) => {
            table.classList.remove("animate-slideOutLeftRetorno");
            table.classList.add("animate-slideInRightRetorno");
            setTimeout(() => {
                table.classList.remove("animate-slideInRightRetorno")
                table.style.display= 'none'
            }, 400);
        };

        if(ubication==='regions'){
            setUbication("macroRegions")
            setForaneo("")
            showTableRetorno(regionsTable);
            setTimeout(() => {
                hideTableRetorno(macroRegionsTable);
            }, 500);
            setInfoText('Hacer click para ver las regionales pertenecientes a la macro región')

        } else if(ubication==='trainingCenter'){
            setUbication("regions")
            setForaneo(macroRegion)
            showTableRetorno(trainingCenterTable);
            setTimeout(() => {
                hideTableRetorno(regionsTable);
            }, 500);

            setInfoText('Hacer click para ver los centros pertenecientes a la regional');


        } else if(ubication==='headquarters'){
            setUbication("trainingCenter")
            setForaneo(Region)
            showTableRetorno(headquartersTable);
            setTimeout(() => {
                hideTableRetorno(trainingCenterTable);
            }, 500);
            setInfoText('Hacer click para ver las sedes pertenecientes al centro');

        } else if(ubication==='environments'){
            setUbication("headquarters")
            setForaneo(trainingCente)
            showTableRetorno(environmentsTable);
            setTimeout(() => {
                hideTableRetorno(headquartersTable);
            }, 500);

            setInfoText('Hacer click para ver los ambientes perteneciente a la sede');
        }

        showText()
    }

    const showText = () => {
        const text = document.querySelector(".infoText") as HTMLElement;
        text.classList.add("animate-hideText");
        setTimeout(() => {
            text.classList.remove("animate-hideText");
            text.classList.add("animate-showText");
        }, 500);
        setTimeout(()=>{
            text.classList.remove("animate-showText");
        }, 1000)
    };



    
    // Render the component
    return (
        <>
            <div className='control h-28 flex flex-col justify-end items-start'>
                <FontAwesomeIcon 
                    onClick={()=>retornar()} 
                    icon={faArrowLeft} className='text-darkBlue' style={{ cursor: 'pointer', fontSize: '30px', marginBottom: '20px', display: ubication=='macroRegions' ? "none" : "" }} />
                <Breadcrumb pageName={(()=>{
                    var text: any;
                    if(ubication=='macroRegions'){
                        text = `MacroRegiones`;
                        
                    } else if(ubication=='regions'){
                        text = `Regiones ${(foraneo ? "-" : "")} ${foraneo}`;
                        
                    } else if(ubication=='trainingCenter'){
                        text = `Centros de Formación ${(foraneo ? "-" : "")} ${foraneo}`;
                        
                    } else if(ubication=='headquarters'){
                        text = `Sedes ${(foraneo ? "-" : "")} ${foraneo}`;
                        
                    } else if (ubication==='environments') {
                        text = `Ambientes ${(foraneo ? "-" : "")} ${foraneo}`;
                    }
                    return text.length > 60 ? text.substring(0, 65) + '...' : text;
                })()} /> 
            </div>
            <div className="h-5/6 w-full p-4 bg-gray ">
              <div className='bg-white rounded-xl ScrollTable macroRegions' style={{ maxHeight: '670px', overflowY:'auto' }}>
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
                <DataTableBase<CharacterMacroRegion>
                  columns={columnsMacroRegions}
                  data={filterFunction(macroRegiones)} // Apply the filter function to the data
                  filterFunction={filterFunction}              
                  pagination
                  responsive 
                />
              </div>
              <div className='bg-white rounded-xl ScrollTable regions' style={{ maxHeight: '670px', overflowY:'auto'}}>
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
                <DataTableBase<CharacterRegion>
                  columns={columnsRegions}
                  data={filterFunctionRegions(Regions)} // Apply the filter function to the data
                  filterFunction={filterFunctionRegions}              
                  pagination
                  responsive 
                />
              </div>
              <div className='bg-white rounded-xl ScrollTable trainingCenter' style={{ maxHeight: '670px', overflowY:'auto'}}>
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
                <DataTableBase<CharacterTrainingCenter>
                  columns={columnsTrainingCenter}
                  data={filterFunctionTrainingCenter(TrainingCenters)} // Apply the filter function to the data
                  filterFunction={filterFunctionTrainingCenter}              
                  pagination
                  responsive 
                />
              </div>
              <div className='bg-white rounded-xl ScrollTable headquarters' style={{ maxHeight: '670px', overflowY:'auto'}}>
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
                <DataTableBase<CharacterHeadquarter>
                  columns={columnsHeadquarters}
                  data={filterFunctionHeadquarters(Headquarters)} // Apply the filter function to the data
                  filterFunction={filterFunctionHeadquarters}              
                  pagination
                  responsive 
                />
              </div>
              <div className='bg-white rounded-xl ScrollTable environments' style={{ maxHeight: '670px', overflowY:'auto'}}>
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
                <DataTableBase<CharacterEnvironment>
                  columns={columnsEnvironments}
                  data={filterFunctionEnvironment(Environments)} // Apply the filter function to the data
                  filterFunction={filterFunctionEnvironment}              
                  pagination
                  responsive 
                />
              </div>
            <div className=''>
                <p className='text-darkBlue pt-4 infoText'>{infoText}</p>
            </div>
            </div>
        </>
    );
};

// Export the Users component
export default MacroRegions;
