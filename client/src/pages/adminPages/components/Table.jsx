import React from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components";
import { API } from "../../../libs/axios";

const Table = ({ content, setTableContent }) => {
  const nextOnClick = async (id, status) => {
    let nextStatus;
    if (status === "Pending") nextStatus = "Shipped";
    else if (status === "Shipped") nextStatus = "Delivered";

    try {
      await API.updateOrderStatus({ params: id, data: { status: nextStatus } });
      setTableContent((pre) =>
        pre.map((order) => {
          if (order._id === id) return { ...order, status: nextStatus };
          return order;
        })
      );
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };
  return (
    <table className="w-full border-collapse min-w-[500px] dark:text-white">
      <thead>
        <tr>
          <th className="p-3 px-4 text-left">Name</th>
          <th className="p-3 px-4 text-right">Price</th>
          <th className="p-3 px-4 text-left">Payment</th>
          <th className="p-3 px-4 text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {content.map((items) => {
          const { userId, amount, payment = "paid", status, _id } = items;
          const { email } = userId;
          let statusColor =
            status === "Delivered"
              ? "bg-green-500 text-white"
              : status === "Shipped"
              ? "bg-yellow-500 text-white"
              : status === "in progress"
              ? "bg-blue-700 text-white"
              : status === "Pending"
              ? "bg-red-700 text-white"
              : "text-black";
          return (
            <tr className="border-lightBlack/20 border-b-1" key={_id}>
              <td className="p-3 px-4 text-left">{email}</td>
              <td className="p-3 px-4 text-right">{amount}</td>
              <td className="p-3 px-4 text-left">{payment}</td>
              <td className={`p-3 px-4 text-right`}>
                <span className={`${statusColor} p-1 rounded-lg`}>
                  {status}
                </span>{" "}
                {status !== "Delivered" && (
                  <Button onClick={() => nextOnClick(_id, status)}>Next</Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
