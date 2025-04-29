import React from 'react';
import Button from './Button';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    titleBut?: string;
    children: React.ReactNode;
    onConfirm: () => void;
}


export default function Modal({ isOpen, onClose, title, children, onConfirm, titleBut="Ingresar"}: ModalProps) {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 lg:pr-20 lg:justify-end xl:justify-center z-40">
            <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 xl:w-2/5">
                <div className="px-4 py-5 sm:px-6 flex flex-col justify-center items-center w-full h-auto">
                    <h1 className="text-center overflow-hidden text-ellipsis text-3xl font-semibold text-black">{title}</h1>
                    <hr className='h-1.5 mt-2 w-1/4 rounded bg-darkBlue' />
                </div>
                
                <div className="bg-white px-4 py-5 sm:px-6 overflow-y-auto max-h-96">
                    {children}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between flex-wrap">
                    <Button color='red' onClick={onClose}>Cancelar</Button>
                    <Button onClick={onConfirm}>{titleBut}</Button>
                </div>
            </div>
        </div>

  )
}
