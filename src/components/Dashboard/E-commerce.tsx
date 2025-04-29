"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Select from 'react-select';
import { data, Locality, Gender, Blood_type, docuemnt_type } from '@/components/utils/dataSet';
import { Formik, Form } from 'formik';
import validationSchema from '@/components/utils/validationSchema';

const ECommerce: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar la confirmación del modal
  const handleConfirm = () => {
    console.log("Modal confirmado");
    closeModal(); // Cierra el modal después de confirmar
  };

  const initialValues = {
    name: '',
    lastname: '',
    documentType: null,
    document: '',
    email: '',
    phone: '',
    address: '',
    locality:  null,
    dateBirth: '',
    bloodType:  null,
    gender:  null,
  };

  return (
    <>
      <Breadcrumb pageName="Inicio" />
      <div className="">
        <button onClick={openModal}>Abrir Modal</button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Crear una nueva Persona"
          onConfirm={handleConfirm}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('Form data', values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
              <Form>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Nombre</Label>
                    <Input
                      placeholder="Nombre"
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {touched.name && errors.name && <div className="text-red">{errors.name}</div>}
                  </div>
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Apellido</Label>
                    <Input
                      placeholder="Apellido"
                      id="lastname"
                      type="text"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                    />
                    {touched.lastname && errors.lastname && <div className="text-red">{errors.lastname}</div>}
                  </div>
                </div>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Tipo de Documento</Label>
                    <Select
                      className='text-darkBlue'
                      options={docuemnt_type}
                      menuPlacement='top'
                      id="documentType"
                      name="documentType"
                      onChange={(option) => setFieldValue("documentType", option)}
                      onBlur={handleBlur("documentType")}
                      value={values.documentType}
                    />
                    {errors.documentType && touched.documentType && (
                      <div className="text-red">{errors.documentType}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Documento</Label>
                    <Input
                      placeholder="Documento"
                      id="document"
                      type="text"
                      name="document"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.document}
                    />
                    {touched.document && errors.document && <div className="text-red">{errors.document}</div>}
                  </div>
                </div>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Telefono</Label>
                    <Input
                      placeholder="Telefono"
                      id="phone"
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {touched.phone && errors.phone && <div className="text-red">{errors.phone}</div>}
                  </div>
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      id="email"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && <div className="text-red">{errors.email}</div>}
                  </div>
                </div>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="flex flex-col justify-start w-5/12">
                    <Label>Tipo de sangre</Label>
                    <Select
                      className='text-darkBlue'
                      options={Blood_type}
                      menuPlacement='top'
                      id="bloodType"
                      name="bloodType"
                      onChange={(option) => setFieldValue("bloodType", option)}
                      onBlur={handleBlur("bloodType")}
                      value={values.bloodType}
                    />
                    {errors.bloodType && touched.bloodType && (
                      <div className="text-red">{errors.bloodType}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center w-5/12">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <Input
                      id="dateBirth"
                      type="date"
                      name="dateBirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dateBirth}
                    />
                    {touched.dateBirth && errors.dateBirth && <div className="text-red">{errors.dateBirth}</div>}
                  </div>
                </div>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="flex flex-col justify-start w-5/12">
                    <Label>Genero</Label>
                    <Select
                      className='text-darkBlue'
                      options={Gender}
                      menuPlacement='top'
                      id="gender"
                      name="gender"
                      onChange={(option) => setFieldValue("gender", option)}
                      onBlur={handleBlur("gender")}
                      value={values.gender}
                    />
                    {errors.gender && touched.gender && (
                      <div className="text-red">{errors.gender}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-start w-5/12">
                    <Label>Localidad</Label>
                    <Select
                      className='text-darkBlue'
                      options={Locality}
                      menuPlacement='top'
                      id="locality"
                      name="locality"
                      onChange={(option) => setFieldValue("locality", option)}
                      onBlur={handleBlur("locality")}
                      value={values.locality}
                    />
                    {errors.locality && touched.locality && (
                      <div className="text-red">{errors.locality}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap justify-around mb-1">
                  <div className="flex flex-col justify-center w-5/12">
                    <Label>Dirección</Label>
                    <Input
                      placeholder="Dirección"
                      id="address"
                      name="address"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    {touched.address && errors.address && <div className="text-red">{errors.address}</div>}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export default ECommerce;
