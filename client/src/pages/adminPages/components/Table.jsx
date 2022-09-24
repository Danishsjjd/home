import React from "react";

const Table = ({ content }) => {
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
					const { email, price, payment, status } = items;
					let statusColor =
						status === "delivered"
							? "bg-green-500 text-white"
							: status === "pending"
							? "bg-yellow-500 text-white"
							: status === "in progress"
							? "bg-blue-700 text-white"
							: status === "cancel"
							? "bg-red-700 text-white"
							: "text-black";
					return (
						<tr className="border-lightBlack/20 border-b-1" key={email}>
							<td className="p-3 px-4 text-left">{email}</td>
							<td className="p-3 px-4 text-right">{price}</td>
							<td className="p-3 px-4 text-left">{payment}</td>
							<td className={`p-3 px-4 text-right`}>
								<span className={`${statusColor} p-1 rounded-lg`}>
									{status}
								</span>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
