import React, { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"

import MountTransition from "../../utils/MountTransition"

import { cardContent } from "../../constants/admin"
import { API } from "../../libs/axios"
import { Card, Chart, Table } from "./components"

const Dashboard = () => {
  const [tableContent, setTableContent] = useState([])

  useEffect(() => {
    const getTableContent = async () => {
      try {
        const content = await API.getAllOrder({})
        setTableContent(content?.data)
      } catch (e) {
        toast.error(e?.response?.data?.message || e?.message)
      }
    }
    getTableContent()
    return () => {}
  }, [])

  return (
    <MountTransition dashboard>
      {/* cards */}
      <div className="my-3 mb-10 grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {cardContent.map(({ icon, number, title }) => (
          <Card icon={icon} number={number} title={title} key={title} />
        ))}
      </div>
      <Chart aspect={1 / 0.3} title={"Monthly Earning"} />
      {/* table */}
      <div>
        <div className="relative max-h-[600px] overflow-auto shadow-light lg:col-span-2">
          <div className="sticky top-0 mb-4 flex w-full min-w-[500px] justify-between rounded-lg bg-white p-4 dark:bg-black">
            <span className="heading">Recent Orders</span>
            <button className="text-md rounded bg-accent p-2 text-white dark:bg-dark">View All</button>
          </div>
          {tableContent.length > 0 && <Table content={tableContent} setTableContent={setTableContent} />}
        </div>
      </div>
    </MountTransition>
  )
}

export default Dashboard
