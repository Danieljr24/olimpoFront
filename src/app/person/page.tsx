
import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Persons from '@/components/Person/person';


export const metadata = {
    title: 'Personas | Olimpo',
  }

export default function page() {
  return (
    <>
      <DefaultLayout>
        <Persons />
      </DefaultLayout>
    </>
  )
}