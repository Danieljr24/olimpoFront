
import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MacroRegions from '@/components/Tools/MacroRegions/macroRegions';


export const metadata = {
    title: 'Herramientas - MacroRegiones',
  }

export default function page() {
  return (
    <>
      <DefaultLayout>
        <MacroRegions />
      </DefaultLayout>
    </>
  )
}