import { Metadata } from "next";
import React from 'react'
import Login from '@/app/Auth/Login'

export const metadata = {
    title: 'Login',
  }

export default function page() {
  return (
    <>
      <Login></Login>
    </>
  )
}
