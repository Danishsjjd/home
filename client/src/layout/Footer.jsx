import React, { useId } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Facebook } from "../assets/icons/social/ic-facebook.svg";
import { ReactComponent as Google } from "../assets/icons/social/ic-google.svg";
import { ReactComponent as Instagram } from "../assets/icons/social/ic-instagram.svg";
import { ReactComponent as Twitter } from "../assets/icons/social/ic-twitter.svg";
import { ReactComponent as Letterhead } from "../assets/icons/social/letterhead-arrow.svg";
import MasterCard from "../assets/icons/social/MasterCard.png";
import Visa from "../assets/icons/social/Visa.png";
import { ReactComponent as Logo } from "../assets/logo-white.svg";
import { contactInfo } from "../constants/data";
import MountTransition from "../utils/MountTransition";

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
];

const Footer = () => {
	const id = useId();
	return (
		<MountTransition>
			<Outlet />
			<div className="bg-neutral-darkest text-white w-full space-y-3 divide-y divide-white/10 px-4 mt-7">
				<div className="md:max-w-7xl mx-auto grid md:grid-cols-3 gap-8 py-12 max-w-sm">
					<div className="space-y-6 text-secondary-lightest grid place-items-center md:block">
						<Logo className="w-28" />
						{contactInfo.map(({ Icon, title, href, link }) => (
							<a
								className="text-secondary-lightest flex gap-2 justify-center md:justify-start items-start text-center"
								href={href || link}
								key={title}
							>
								<Icon className="min-w-[24px] max-w-[24px]" />
								<span>{title}</span>
							</a>
						))}
						<div className="flex gap-2">
							<a
								href="https://www.facebook.com/danishsjjd"
								target={"_blank"}
								rel="noreferrer"
							>
								<Facebook />
							</a>
							<Link to={"/"}>
								<Google />
							</Link>
							<a
								href="https://twitter.com/Danishsjjd"
								target={"_blank"}
								rel="noreferrer"
							>
								<Twitter />
							</a>
							<a
								href="https://www.instagram.com/danishsjjd/"
								target={"_blank"}
								rel="noreferrer"
							>
								<Instagram />
							</a>
						</div>
					</div>
					<div className="text-center">
						<h3 className="text-2xl text-white pt-3 mb-3 font-medium">
							Company
						</h3>
						<ul className="text-secondary-lightest space-y-4 grid grid-rows-5 grid-cols-2 items-center    ">
							{links.map(({ title, to }, index) => (
								<Link to={to} key={title}>
									<li key={`${id}-${index}`}>{title}</li>
								</Link>
							))}
						</ul>
					</div>
					<div className="space-y-5 text-center md:text-left">
						<h3 className="text-2xl text-white pt-3 mb-3 font-medium">
							Newsletter
						</h3>
						<p>
							Sign up for our Newsletter to get more events, promotions & news
							from us!
						</p>
						<div className="w-full relative">
							<input
								type="text"
								className="w-full p-2 px-4 rounded-full bg-white/10 text-secondary-lightest focus:outline-none focus:ring-0 focus:border-secondary-darker"
								placeholder="Enter Your Email"
							/>
							<div className="absolute right-0 cursor-pointer">
								<Letterhead className="absolute right-0 top-[-42px]" />
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto flex justify-between px-4 pt-6 pb-2 sm:text-base text-xs">
					<p>Copyright © All rights Reserved</p>
					<div className="flex gap-1 sm:gap-5">
						<img src={Visa} alt="visa" className="sm:w-10 object-contain" />
						<img
							src={MasterCard}
							alt="master card"
							className="sm:w-10 object-contain"
						/>
					</div>
				</div>
			</div>
		</MountTransition>
	);
};

export default Footer;
