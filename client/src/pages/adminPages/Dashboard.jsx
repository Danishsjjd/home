import React, { useEffect } from "react";

import { useState } from "react";
import { toast } from "react-toastify";
import { cardContent } from "../../constants/admin";
import { API } from "../../libs/axios";
import MountTransition from "../../utils/MountTransition";
import { Card, Chart, Table } from "./components";

const Dashboard = () => {
  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    const getTableContent = async () => {
      try {
        const content = await API.getAllOrder({});
        setTableContent(content?.data);
      } catch (e) {
        toast.error(e?.response?.data?.message || e?.message);
      }
    };
    getTableContent();
    return () => {};
  }, []);

  return (
    <MountTransition dashboard>
      {/* cards */}
      <div className="lg:grid-cols-4 lg:gap-7 grid sm:grid-cols-2 gap-4 my-3 h-full mb-10">
        {cardContent.map(({ icon, number, title }) => (
          <Card icon={icon} number={number} title={title} key={title} />
        ))}
      </div>
      <Chart aspect={1 / 0.3} title={"Monthly Earning"} />
      {/* table */}
      <div>
        <div className="lg:col-span-2 shadow-light max-h-[600px] overflow-auto relative">
          <div className="flex p-4 justify-between w-full rounded-lg mb-4 sticky top-0 bg-white dark:bg-black min-w-[500px]">
            <span className="heading">Recent Orders</span>
            <button className="bg-accent dark:bg-dark text-white p-2 text-md rounded">
              View All
            </button>
          </div>
          {tableContent.length > 0 && (
            <Table content={tableContent} setTableContent={setTableContent} />
          )}
        </div>
      </div>
    </MountTransition>
  );
};

export default Dashboard;
