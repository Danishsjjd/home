import { AiFillHome, AiFillSetting, AiOutlineAreaChart, AiOutlineDollarCircle, AiOutlineEye } from "react-icons/ai"
import { BsCart2 } from "react-icons/bs"
import { FaRegComments, FaUsers } from "react-icons/fa"
import { MdCreateNewFolder } from "react-icons/md"

import { logout } from "./functions"

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
]

// admin - dashboard cards - title
export const cardContent = [
  {
    title: "Daily sales",
    number: "80",
    icon: <AiOutlineEye className="text-6xl text-lightBlack group-hover:text-white" />,
  },
  {
    title: "Sales",
    number: "1,504",
    icon: <BsCart2 className="text-6xl text-lightBlack group-hover:text-white" />,
  },
  {
    title: "reviews",
    number: "284",
    icon: <FaRegComments className="text-6xl text-lightBlack group-hover:text-white" />,
  },
  {
    title: "products",
    number: "59",
    icon: <AiOutlineDollarCircle className="text-6xl text-lightBlack group-hover:text-white" />,
  },
]
// admin - table
export const tableContent = [
  {
    email: "danish@gmail.com",
    price: "$33",
    payment: "paid",
    status: "delivered",
  },
]
// admin - user profile dropdown - title
export const DropDownData = [
  {
    title: "Logout",
    Icon: AiFillHome,
    onClick: logout,
  },
]
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
]
