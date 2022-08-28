import {
	AiOutlineEye,
	AiOutlineDollarCircle,
	AiFillHome,
	AiFillSetting,
	AiOutlineAreaChart,
} from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { FaRegComments, FaUsers } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

import offer1 from "../assets/images/header/offer 1.jpg";
import offer2 from "../assets/images/header/offer 2.jpg";
import { ReactComponent as Accessories } from "../assets/icons/category/Accessories.svg";
import { ReactComponent as Bathroom } from "../assets/icons/category/Bathroom.svg";
import { ReactComponent as Bedroom } from "../assets/icons/category/Bedroom.svg";
import { ReactComponent as Kitchen } from "../assets/icons/category/Kitchen.svg";
import { ReactComponent as LivingRoom } from "../assets/icons/category/Living room.svg";
import { ReactComponent as Workspace } from "../assets/icons/category/Workspace.svg";
import sofa from "../assets/images/home/sofa.png";
import smallTree from "../assets/images/home/small-tree.png";
import lamps from "../assets/images/home/lamps.png";

import { ReactComponent as Dollar } from "../assets/icons/aboutUs/dollar.svg";
import { ReactComponent as Gift } from "../assets/icons/aboutUs/gift.svg";
import { ReactComponent as Plane } from "../assets/icons/aboutUs/ic-plane.svg";
import { ReactComponent as Phone } from "../assets/icons/aboutUs/ic-phone.svg";
import { ReactComponent as House } from "../assets/icons/contactUs/ic-house.svg";
import { ReactComponent as Mail } from "../assets/icons/contactUs/ic-mail.svg";
import { logout, updatePassword, updateProfile } from "./functions";

// admin - sidebar - title
export const NavLinks = [
	{
		title: "Home",
		icon: <AiFillHome />,
		to: "/",
		style: "mb-10",
	},
	{
		title: "Dashboard",
		icon: <AiOutlineAreaChart />,
		to: "/admin",
	},
	{
		title: "Create Product",
		icon: <MdCreateNewFolder />,
		to: "createProduct",
	},
	{
		title: "Customers",
		icon: <FaUsers />,
		to: "customers",
	},
	{
		title: "Settings",
		icon: <AiFillSetting />,
		to: "settings",
	},
];

// admin - dashboard cards - title
export const cardContent = [
	{
		title: "Daily Views",
		number: "1,504",
		icon: (
			<AiOutlineEye className="text-6xl text-lightBlack group-hover:text-white" />
		),
	},
	{
		title: "Sales",
		number: "80",
		icon: (
			<BsCart2 className="text-6xl text-lightBlack group-hover:text-white" />
		),
	},
	{
		title: "comments",
		number: "284",
		icon: (
			<FaRegComments className="text-6xl text-lightBlack group-hover:text-white" />
		),
	},
	{
		title: "products",
		number: "59",
		icon: (
			<AiOutlineDollarCircle className="text-6xl text-lightBlack group-hover:text-white" />
		),
	},
];
// admin - table
export const tableContent = [
	{
		email: "danish@gmail.com",
		price: "$33",
		payment: "paid",
		status: "delivered",
	},
];
// admin - users - email
export const usersContent = [
	{
		name: "danish",
		email: "this@that.com",
		img: require("../assets/images/julian-wan-WNoLnJo7tS8-unsplash.jpg"),
	},
];

// admin - user profile dropdown - title
export const DropDownData = [
	{
		title: "Logout",
		Icon: AiFillHome,
		onClick: () => console.log("logout"),
	},
];
// admin - category picker dropdown - title
export const productCategory = [
	{
		title: "living room",
		onClick: (setFieldValue, name) => setFieldValue(name, "living room"),
	},
	{
		title: "bedroom",
		onClick: (setFieldValue, name) => setFieldValue(name, "bedroom"),
	},
	{
		title: "kitchen",
		onClick: (setFieldValue, name) => setFieldValue(name, "kitchen"),
	},
	{
		title: "workspace",
		onClick: (setFieldValue, name) => setFieldValue(name, "workspace"),
	},
	{
		title: "accessories",
		onClick: (setFieldValue, name) => setFieldValue(name, "accessories"),
	},
];

//user - header - name is unique
export const shope = {
	// name
	categories: [
		{
			name: "Shop",
			// name
			featured: [
				{
					name: "New Arrivals",
					to: "/shope",
					imageSrc: offer1,
					imageAlt: "feature offer no.1",
				},
				{
					name: "Artwork Tees",
					to: "#",
					imageSrc: offer2,
					imageAlt: "feature offer no.2",
				},
			],
			// name
			sections: [
				{
					name: "Baths",
					items: [
						{ name: "View All", to: "#" },
						{ name: "Cost iron baths", to: "#" },
						{ name: "Copper Baths", to: "#" },
						{ name: "Bath Tops & Mixers", to: "#" },
						{ name: "Bath wastes", to: "#" },
					],
				},
				{
					name: "Showers",
					items: [
						{ name: "View All", to: "#" },
						{ name: "freestanding Showers", to: "#" },
						{ name: "Showers Sets & Controls", to: "#" },
						{ name: "Showers Heads & Arms", to: "#" },
						{ name: "Shower Accessories", to: "#" },
					],
				},
				{
					name: "Accessories & Lighting",
					items: [
						{ name: "View All", to: "#" },
						{ name: "Lightings", to: "#" },
						{ name: "Mirrors", to: "#" },
						{ name: "Organizers", to: "#" },
						{ name: "Living Room Accessories", to: "#" },
					],
				},
				{
					name: "WC Suites & Bidets",
					items: [
						{ name: "View All", to: "#" },
						{ name: "Complete WC Suites", to: "#" },
						{ name: "Loo Seats", to: "#" },
						{ name: "Bidets & WC Accessories", to: "#" },
					],
				},
				{
					name: "Bedroom",
					items: [
						{ name: "View All", to: "#" },
						{ name: "Bed Accessories", to: "#" },
						{ name: "Curtains", to: "#" },
						{ name: "Chets", to: "#" },
						{ name: "Mattresses", to: "#" },
					],
				},
				{
					name: "More",
					items: [
						{ name: "Kitchen Taps & Lighting", to: "#" },
						{ name: "Archive Collection", to: "#" },
						{ name: "Ex-Display Collection", to: "#" },
					],
				},
			],
		},
	],
	// name
	pages: [
		{ name: "Home", to: "/", className: "order-0" },
		{ name: "Contact", to: "/contact", className: "order-2" },
		{ name: "About Us", to: "/about", className: "order-2" },
		{ name: "Blog", to: "/blog", className: "order-2" },
		{
			name: "Sale",
			to: "/sale",
			className: "order-2 !text-accent-red",
		},
	],
};
// user - header dropdown - title
export const userDropdown = [
	{
		title: "update Profile",
		onClick: updateProfile,
		className: "",
	},
	{
		title: "update password",
		onClick: updatePassword,
		className: "",
	},
	{
		title: "Logout",
		onClick: logout,
		className:
			"grid place-items-center text-lg font-medium bg-secondary-darker shadow-[0px_1px_6px_var(--secondary-darker)] w-[96%] text-white mx-auto mb-2",
	},
];
// home - category - title
export const homeCategories = [
	{ Icon: LivingRoom, title: "LivingRoom" },
	{ Icon: Bedroom, title: "Bedroom" },
	{ Icon: Kitchen, title: "Kitchen" },
	{ Icon: Bathroom, title: "Bathroom" },
	{ Icon: Workspace, title: "Workspace" },
	{ Icon: Accessories, title: "Accessories" },
];
// home - cards - imgAlt
export const homeCards = [
	{
		bgColor: "bg-accent-red",
		img: sofa,
		imgAlt: "sofa",
		position: "-bottom-8",
		desc: "Accent Arm Chair",
	},
	{
		bgColor: "bg-neutral-lighter text-neutral-darkest",
		img: smallTree,
		imgAlt: "small trees",
		position: "",
		desc: "Rivet Geometric Ceramic Planter",
	},
	{
		bgColor: "bg-accent-yellow",
		img: lamps,
		imgAlt: "lamps",
		position: "-top-8",
		desc: "Ceramic Japanese Lamp",
	},
];

// about us - icon - title
export const aboutCard = [
	{ Icon: Plane, title: "Free World Delivery", t2: "Orders over $200" },
	{ Icon: Dollar, title: "Money Back Guarantee", t2: "Within 30 days" },
	{ Icon: Phone, title: "Online Support", t2: "Free support system 24/7" },
	{ Icon: Gift, title: "Member Gift", t2: "Coupon at weekend" },
];

// contact us faq - index (unique)
export const faqData = [
	{
		que: "What Shipping Methods Are Available?",
		ans: `Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue, eget tempor nibh dui in dolor. Donec sagittis scelerisque est. Nam tristique porta ligula, vel viverra sem eleifend nec. Nulla sed purus augue, eu euismod tellus. Nam mattis eros nec mi sagittis sagittis. Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum. Aliquam pulvinar iaculis justo, sit amet interdum sem hendrerit vitae. Vivamus vel erat tortor. Nulla facilisi. In nulla quam, lacinia eu aliquam ac, aliquam in nisl.
		<br />1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		<br />2. Maecenas ullamcorper est et massa mattis condimentum.
		<br />3. Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.
		<br />4. Etiam nec massa et lectus faucibus ornare congue in nunc.
		<br />5. Mauris eget diam magna, in blandit turpis.
		<br />
		<br />
		In cursus faucibus tortor eu vestibulum. Ut eget turpis ac justo porta varius. Donec vel felis ante, ac vehicula ipsum. Quisque sed diam metus. Quisque eget leo sit amet erat varius rutrum vitae dapibus lectus. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id.`,
	},
	{
		que: "Do You Ship Internationally?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "How to Track My Order?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "How Long Will It Take To Get My Package?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "What Payment Methods Are Accepted?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "What Happens If There Is A Pricing Error?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "How do I place an Order?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
	{
		que: "Who Should I Contact If I Have Any Queries?",
		ans: "Sed quis nunc efficitur, gravida orci sed, gravida felis. Quisque non euismod felis. Suspendisse consectetur, tellus in condimentum fringilla, turpis massa facilisis augue",
	},
];

// contact use & footer - title

export const contactInfo = [
	{
		Icon: House,
		title: "Gulberg C street #6 house #89, Faisalabad, Pakistan",
		href: "",
	},
	{
		Icon: Phone,
		title: "03011800058, 03061800058",
		link: "tel:+92011800058",
	},
	{
		Icon: Mail,
		title: "danishsjjd@gmail.com",
		link: "mailto:danishsjjd@gmail.com",
	},
];
