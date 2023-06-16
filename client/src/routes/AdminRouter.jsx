import React, { useId, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

import { Sidebar, TopBar } from "../pages/adminPages/components"

import { CreateAndUpdateProduct, Customers, Dashboard, Settings } from "../pages"

import { AnimatePresence } from "framer-motion"

const AdminRouter = () => {
  const id = useId()
  const location = useLocation()
  const [menu, setMenu] = useState(() => {
    const windowWidth = window.innerWidth
    if (windowWidth > 1280) return true
    return false
  })
  return (
    <MountTransition>
      <div className="relative w-full ">
        <MetaData title="Dashboard" />
        <Sidebar menu={menu} />
        <div
          className={`absolute min-h-screen w-full bg-white p-3 transition-all duration-500 dark:bg-dark ${
            menu
              ? "translate-x-[300px] xl:left-[300px] xl:w-[calc(100%-300px)] xl:translate-x-0"
              : "xl:left-20 xl:w-[calc(100%-80px)]"
          }`}
        >
          <TopBar setMenu={setMenu} />
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={id}>
              <Route path="/" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="createProduct" element={<CreateAndUpdateProduct />} />
              <Route path="updateProduct/:id" element={<CreateAndUpdateProduct />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </MountTransition>
  )
}

export default AdminRouter
