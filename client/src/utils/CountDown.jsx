import { useState, useEffect } from "react";

const CountDown = ({ date }) => {
	const [remainingTime, setRemainingTime] = useState({});

	const titles = ["days", "hours", "minutes", "seconds"];

	useEffect(() => {
		const obj = setInterval(() => {
			const timeInS = Math.floor(
				(new Date(date) - new Date().getTime()) / 1000
			);
			const seconds = timeInS % 60;
			const minutes = Math.floor((timeInS / 60) % 60);
			const hours = Math.floor((timeInS / 60 / 60) % 24);
			const days = Math.floor(timeInS / 60 / 60 / 24);
			setRemainingTime({ seconds, minutes, hours, days });
		}, 1000);

		return () => {
			clearInterval(obj);
		};
	}, [date]);
	return (
		<div className="grid grid-flow-col justify-center gap-4 sm:gap-14 text-center auto-cols-max text-white">
			{titles.map((title) => (
				<div className="flex flex-col" key={title}>
					<span className="countdown text-2xl flex justify-center sm:text-7xl">
						<span style={{ "--value": remainingTime[title] }}></span>
					</span>
					<span className="mt-3">{title.toUpperCase()}</span>
				</div>
			))}
		</div>
	);
};

export default CountDown;
