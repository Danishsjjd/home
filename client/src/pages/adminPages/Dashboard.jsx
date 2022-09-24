import React from "react";

import { Card, Table, Users, Chart } from "./components";
import { cardContent, tableContent, usersContent } from "../../constants/admin";
import MountTransition from "../../utils/MountTransition";

const Dashboard = () => {
  return (
    <MountTransition dashboard>
      {/* cards */}
      <div className="lg:grid-cols-4 lg:gap-7 grid sm:grid-cols-2 gap-4 my-3 h-full mb-10">
        {cardContent.map(({ icon, number, title }) => (
          <Card icon={icon} number={number} title={title} key={title} />
        ))}
      </div>
      <Chart aspect={1 / 0.3} title={"Monthly Earning"} />
      {/* table and users */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 shadow-light max-h-[600px] overflow-auto relative">
          <div className="flex p-4 justify-between w-full rounded-lg mb-4 sticky top-0 bg-white dark:bg-black min-w-[500px]">
            <span className="heading">Recent Orders</span>
            <button className="bg-accent dark:bg-dark text-white p-2 text-md rounded">
              View All
            </button>
          </div>
          <Table content={tableContent} />
        </div>
        <div className="shadow-light overflow-auto max-h-[600px]">
          <h1 className="heading p-4 bg-white dark:bg-black sticky top-0">
            Recent Customers
          </h1>
          {usersContent.map(({ name, img, email }, index) => {
            return <Users name={name} img={img} email={email} key={index} />;
          })}
        </div>
      </div>
    </MountTransition>
  );
};

export default Dashboard;
