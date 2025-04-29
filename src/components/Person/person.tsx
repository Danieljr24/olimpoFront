// Import necessary dependencies and components
"use client";
import React, { useState, useEffect } from 'react';
import DataTableBase from '@/components/ui/DataTable';
import AlertComponent from '@/components/ui/Alert';
import {faUser,faEllipsisVertical,faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {data, Roles} from '@/components/utils/dataSet'
import Modal from '@/components/ui/Modal';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Select from 'react-select';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";



// Define the Users component
const Persons: React.FC = () => {

    //Modals
    const [modalAssignRole, setModalAssignRole] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [person, setPerson] = useState<Character | null>(null); // State to store the data of the selected person
    const [preselectedRoles, setPreselectedRoles] = useState<{ value: number; label: string }[]>([]); // State to store the roles selected for the person by the user


    useEffect(() => {
            // Obtain an array with the identifiers of the fields you want to update
            const fieldIds = ['name', 'lastName', 'documentType', 'noDocument', 'locality', 'dateBirth', 'bloodType', 'email', 'address', 'state', 'phone'];

            // We go through the list of identifiers
            fieldIds.forEach(fieldId => {
                const elements = document.querySelectorAll(`#${fieldId}`);
                if (elements) {
                    // Use forEach to assign the same value to all elements with the same ID
                    elements.forEach(element => {
                        // Check if the element is a <input>
                        if (element instanceof HTMLInputElement) {
                            // Set the input value
                            element.value = person? (person as any)[fieldId] || '' : '';
                        } else {
                            // For other elements, such as <p>, use textContent
                            element.textContent = person? (person as any)[fieldId] || '' : '';
                        }
                    });
                }
            });

            // Manage shortlisted roles here
            if (person) {
                const preselected = person.roles.map(roleId => 
                    Roles.find(role => role.value === roleId) as { value: number; label: string }
                );
                setPreselectedRoles(preselected);
            }
    }, [person]); // Run the effect every time the selected person changes


    // Function to open the modal to assign roles
    const openModal = (id: number, modal: string) => {

        const selectedPerson = data.find(item => item.id === id);
        if (selectedPerson) {
            setPerson(selectedPerson);
            cerrarOpciones(); // Close all open options
            modal === 'assignRole' ? setModalAssignRole(true) : setModalEdit(true); // Check what type of modal to show
            
        } else {
            console.log("Persona no encontrada");
        }

    };

    // Function to close the editing modal
    const closeModal = (modal: string) => {
        setPerson(null); // changes the person's status
        setPreselectedRoles([]) // Deselect previously selected roles
        modal === 'assignRole' ? setModalAssignRole(false) : setModalEdit(false); // Check what type of modal to show
    };

    // Function to handle confirmation of the role assignment modal
    const handleConfirmModal = (modal: string) => {

        // check the type of the modal
        if(modal === 'assignRole'){
            setPerson(null); // changes the person's status
            console.log("Los nuevos roles se recibieron de forma correcta son: ", preselectedRoles);
        } else {
            console.log("Se envio el fomulario de edicion");
        }
        
        
        closeModal(modal); // Close the modal after confirming
        
    };



    // Define the structure of a character object 
    interface Character {
        id: number; // ID of the character
        name: string; // name of the character
        lastName: string; // lastName of the character
        noDocument: number; // noDocument of the character
        state: string; // State of the character (Activo, Inactivo, etc.)
        phone: number; // phone of the character 
        roles: number[]; // roles of the character, depending on the role identifier
        documentType: string; // documentType of the character
        locality: string; // locality of the character
        bloodType: string; // bloodType of the character
        dateBirth: string; // dateBirth of the character
        email: string; // email of the character
        address: string; // address of the character
        // Add any other properties here as needed
    }

    // Function to close options - Option Table
    const cerrarOpciones = () => {
        const opcionesAbiertas = document.querySelectorAll('.opciones.mostrar');
        opcionesAbiertas.forEach(opcion => {
            opcion.classList.remove('mostrar');
        });
    };

    // Event listener to close options when clicking anywhere outside of them - Option Table
    document.addEventListener('click', (event) => {
        const clicEnOpciones = (event.target as HTMLElement).closest('.opciones-container');
        if (!clicEnOpciones) {
            cerrarOpciones(); // function for close options
        }
    });

    // Function for show the options - Option Table
    const mostrarOpciones = (id: number) => {
        cerrarOpciones(); // Close all open options

        const opciones = document.querySelector(`#opciones-${id}`);
        if (opciones) {
            opciones.classList.toggle('mostrar');
        }
    }
    
    // Initialize state variables - Filter Name Table
    const [filterText, setFilterText] = useState(''); // Text for filtering characters

    // Filter function to filter characters by name - Filter Name Table
    const filterFunction = (characters: Character[]) => {
        return characters.filter(character =>
           character.name.toLowerCase().includes(filterText.toLowerCase())); // Returns characters whose names include the filter text
    };

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
            name: 'Telefono', // Column header
            selector: (row: Character) => row.phone, // Selector function to get the name from each row
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
                            <button onClick={() => openModal(row.id, 'assignRole')}> 
                                <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px' }} /> 
                            </button>
                                    
                            <button onClick={() => openModal(row.id, 'editPerson')}> 
                                <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: '20px' }} /> 
                            </button>
                                    

                            <button > <FontAwesomeIcon icon={faTrash} style={{ fontSize: '20px' }} /> </button>
                        </div>
                    </div>
                )
            },
            grow: 1,
            
        },   
    ];

    // Render the component
    return (
        <>
            <Breadcrumb pageName="Personas"/> 
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

            {/* Modal for role assignment */}
            <Modal
                isOpen={modalAssignRole}
                onClose={ () => closeModal('assignRole')}
                title="Asignar Roles"
                onConfirm={ () => handleConfirmModal('assignRole')}
                titleBut='Asignar Rol'
                >
                <form action="">
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Nombres</Label>
                            <p className='text-darkBlue' id='name'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Apellidos</Label>
                            <p className='text-darkBlue' id='lastName'></p>

                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Tipo Documento</Label>
                            <p className='text-darkBlue' id='documentType'></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>No. Documento</Label>
                            <p className='text-darkBlue' id='noDocument'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Localidad</Label>
                            <p className='text-darkBlue' id='locality'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Fecha Nacimiento</Label>
                            <p className='text-darkBlue' id='dateBirth'></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Tipo de Sangre</Label>
                            <p className='text-darkBlue' id='bloodType'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Email</Label>
                            <p className='text-darkBlue' id='email'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Dirección</Label>
                            <p className='text-darkBlue' id='address'></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Estado</Label>
                            <p className='text-darkBlue' id='state'></p>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Telefono</Label>
                            <p className='text-darkBlue' id='phone'></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-full">
                            <Label style={{ fontWeight: 'bold' }}>Roles</Label>
                            <Select className='text-darkBlue' 
                                    options={Roles} 
                                    menuPlacement='top' 
                                    isMulti
                                    value={preselectedRoles}
                                    onChange={(selectedOptions) => setPreselectedRoles(selectedOptions as { value: number; label: string }[])}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
            {/* Modal for person editing */}
            <Modal
                isOpen={modalEdit}
                onClose={ () => closeModal('editPerson')}
                title="Editar Persona"
                onConfirm={ () => handleConfirmModal('editPerson')}
                >
                <form action="">
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Nombres</Label>
                            <Input 
                                placeholder="Nombre"  
                                id='name'
                                type='text'
                            />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Apellidos</Label>
                            <Input 
                                placeholder="Apellidos"
                                id='lastName'
                                type='text'    
                            />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Tipo Documento</Label>
                            <Input 
                                placeholder="Tipo de documento"
                                id='documentType'
                                type='text'   
                                disabled 
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>No. Documento</Label>
                            <Input 
                                placeholder="No. Documento"
                                id='noDocument'
                                type='number'
                                disabled
                                />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Localidad</Label>
                            <Input 
                                placeholder="Localidad"
                                id='locality'
                                type='text'
                                disabled
                                />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Fecha Nacimiento</Label>
                            <Input 
                                placeholder="Fecha de nacimiento"
                                id='dateBirth'
                                type='text'
                                disabled
                                />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Tipo de Sangre</Label>
                            <Input 
                                placeholder="Tipo de sangre"
                                id='bloodType'
                                type='text'
                                disabled
                                />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Email</Label>
                            <Input 
                                placeholder="Email"
                                id='email'
                                type='text'
                            />
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Dirección</Label>
                            <Input 
                                placeholder="Dirección"
                                id='address'
                                type='text'
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Estado</Label>
                            <Input placeholder='Estado' type='text' disabled id='state'/>
                        </div>
                        <div className="flex flex-col justify-start w-1/3">
                            <Label style={{ fontWeight: 'bold' }}>Telefono</Label>
                            <Input placeholder='Telefono' type='number' id='phone' />
                        </div>
                    </div>
                
                    
                </form>
            </Modal>
        </>
    );
};

// Export the Users component
export default Persons;
