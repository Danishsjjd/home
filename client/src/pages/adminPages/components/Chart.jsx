import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";

import { API } from "../../../libs/axios";
var mL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = [{ name: "January", total: 999 }];

const Chart = ({ title, aspect }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await API.getMonthlyIncome({});
        setChartData(
          response.data.map((item) => ({
            name: mL[item._id - 1],
            total: item.total,
          }))
        );
      } catch (e) {
        toast.error(e.response.data.message || e.message);
      }
    };
    getChartData();
    return () => {};
  }, []);

  return (
    <div className="w-full">
      <div className="mb-5 heading">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData.length > 0 ? chartData : data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="[stock:var(--accent)]" />
          <YAxis />
          <CartesianGrid
            strokeDasharray="3 3"
            className="[stock:var(--accent)]"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
