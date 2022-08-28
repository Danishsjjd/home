import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

export default function DropDown({ list, anchor, side, setFieldValue, name }) {
	const dispatch = useDispatch();
	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button>{anchor}</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={`absolute ${
						side === "right"
							? "left-0 origin-top-left"
							: "right-0 origin-top-right"
					} mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				>
					{list.map(({ title, Icon, onClick, className }) => (
						<Menu.Item key={title}>
							{({ active }) => (
								<button
									className={` ${
										active
											? "bg-accent dark:text-black text-white"
											: "text-gray-900 dark:text-white"
									} group flex w-full items-center rounded-md px-2 py-2 text-sm ${className}`}
									onClick={() =>
										setFieldValue
											? onClick(setFieldValue, name)
											: onClick(dispatch)
									}
								>
									{Icon && (
										<Icon
											className={`mr-2 h-5 w-5 text-violet-400 ${
												active ? "dark:text-black" : ""
											}`}
											aria-hidden="true"
										/>
									)}
									{title}
								</button>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
