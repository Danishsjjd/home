import React, { useId } from "react"
import { Link, Outlet } from "react-router-dom"

import MountTransition from "../utils/MountTransition"

import MasterCard from "../assets/icons/social/MasterCard.png"
import Visa from "../assets/icons/social/Visa.png"
import { ReactComponent as Facebook } from "../assets/icons/social/ic-facebook.svg"
import { ReactComponent as Google } from "../assets/icons/social/ic-google.svg"
import { ReactComponent as Instagram } from "../assets/icons/social/ic-instagram.svg"
import { ReactComponent as Twitter } from "../assets/icons/social/ic-twitter.svg"
import { ReactComponent as Letterhead } from "../assets/icons/social/letterhead-arrow.svg"
import { ReactComponent as Logo } from "../assets/logo-white.svg"
import { contactInfo } from "../constants/data"

const links = [
  { title: "About Us", to: "/about" },
  { title: "Shop", to: "/shop" },
  { title: "Features", to: "/" },
  { title: "Sale", to: "/sale" },
  { title: "Contact", to: "/contact" },
  { title: "Shipping", to: "/" },
  { title: "Help", to: "/" },
  { title: "Privacy Policy", to: "/" },
  { title: "FAQs", to: "/contact#faqs" },
]

const Footer = () => {
  const id = useId()
  return (
    <MountTransition>
      <Outlet />
      <div className="mt-7 w-full space-y-3 divide-y divide-white/10 bg-neutral-darkest px-4 text-white">
        <div className="mx-auto grid max-w-sm gap-8 py-12 md:max-w-7xl md:grid-cols-3">
          <div className="grid place-items-center space-y-6 text-secondary-lightest md:block">
            <Logo className="w-28" />
            {contactInfo.map(({ Icon, title, href, link }) => (
              <a
                className="flex items-start justify-center gap-2 text-center text-secondary-lightest md:justify-start"
                href={href || link}
                key={title}
              >
                <Icon className="min-w-[24px] max-w-[24px]" />
                <span>{title}</span>
              </a>
            ))}
            <div className="flex gap-2">
              <a href="https://www.facebook.com/danishsjjd" target={"_blank"} rel="noreferrer">
                <Facebook />
              </a>
              <Link to={"/"}>
                <Google />
              </Link>
              <a href="https://twitter.com/Danishsjjd" target={"_blank"} rel="noreferrer">
                <Twitter />
              </a>
              <a href="https://www.instagram.com/danishsjjd/" target={"_blank"} rel="noreferrer">
                <Instagram />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h3 className="mb-3 pt-3 text-2xl font-medium text-white">Company</h3>
            <ul className="grid grid-cols-2 grid-rows-5 items-center space-y-4 text-secondary-lightest    ">
              {links.map(({ title, to }, index) => (
                <Link to={to} key={title}>
                  <li key={`${id}-${index}`}>{title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="space-y-5 text-center md:text-left">
            <h3 className="mb-3 pt-3 text-2xl font-medium text-white">Newsletter</h3>
            <p>Sign up for our Newsletter to get more events, promotions & news from us!</p>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full rounded-full bg-white/10 p-2 px-4 text-secondary-lightest focus:border-secondary-darker focus:outline-none focus:ring-0"
                placeholder="Enter Your Email"
              />
              <div className="absolute right-0 cursor-pointer">
                <Letterhead className="absolute right-0 top-[-42px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl justify-between px-4 pb-2 pt-6 text-xs sm:text-base">
          <p>Copyright © All rights Reserved</p>
          <div className="flex gap-1 sm:gap-5">
            <img src={Visa} alt="visa" className="object-contain sm:w-10" />
            <img src={MasterCard} alt="master card" className="object-contain sm:w-10" />
          </div>
        </div>
      </div>
    </MountTransition>
  )
}

export default Footer
