import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "jan", total: 33 },
	{ name: "feb", total: 99 },
	{ name: "march", total: 55 },
	{ name: "aug", total: 44 },
];

const Chart = ({ title, aspect }) => {
	return (
		<div className="w-full">
			<div className="mb-5 heading">{title}</div>
			<ResponsiveContainer width="100%" aspect={aspect}>
				<AreaChart
					width={730}
					height={250}
					data={data}
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
