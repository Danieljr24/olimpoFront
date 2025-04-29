
import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SuperAdministrators from '@/components/Users/SuperAdministrator/superAdministrator';


export const metadata = {
    title: 'Usuarios - Super Administradores | Olimpo',
  }

export default function page() {
  return (
    <>
      <DefaultLayout>
        <SuperAdministrators />
      </DefaultLayout>
    </>
  )
}
