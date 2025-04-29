import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from '@/components/Dashboard/E-commerce';

export const metadata = {
  title: 'Inicio | Olimpo',
}


export default function page() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  )
}
