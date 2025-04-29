
import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Users from '@/components/Users/user';


export const metadata = {
    title: 'Usuarios | Olimpo',
  }

export default function page() {
  return (
    <>
      <DefaultLayout>
        <Users />
      </DefaultLayout>
    </>
  )
}
