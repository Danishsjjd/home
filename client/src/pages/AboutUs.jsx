import React from "react";

import aboutUs from "../assets/images/aboutUs.png";
import { aboutCard } from "../constants/data";
import MountTransition from "../utils/MountTransition";
import { Sponsors } from "../components";
import insta1 from "../assets/images/home/insta1.png";
import insta2 from "../assets/images/home/insta2.png";

const AboutUs = () => {
	return (
		<MountTransition>
			<div className="mt-20 mx-auto grid p-9 lg:p-3 text-center lg:text-left lg:grid-cols-2 gap-8 max-w-7xl">
				<div className="flex justify-center">
					<img src={aboutUs} alt="about us image" />
				</div>
				<div className="space-y-2">
					<h5 className="text-secondary-darker ">ABOUT US</h5>
					<h2 className="text-2xl text-neutral-darkest font-medium">
						Just Stay Home & Enjoy Your Shopping Time
					</h2>
					<p className="text-neutral-darker">
						The Expression Agenda is our global human rights strategy. Through
						it, we target the best means of protecting rights and freedoms on
						the ground, while enhancing international instruments that protect
						freedom of expression and the right to information around the world.
					</p>
					<br />
					<p className="text-neutral-darker">
						The Expression Agenda is our global human rights strategy. Through
						it, we target the best means of protecting rights and freedoms on
						the ground, while enhancing international instruments that protect
						freedom of expression and the right to information around the world.
					</p>
					<div className="grid grid-cols-2 justify-between space-y-2">
						{aboutCard.map(({ Icon, t2, title }) => (
							<div
								key={title}
								className="flex items-center gap-2 flex-col lg:flex-row"
							>
								<div className="rounded-full h-10 w-10 border-2 border-secondary-darker grid place-items-center">
									<Icon className="scale-x-125 text-secondary-darker" />
								</div>
								<div>
									<h3>{title}</h3>
									<h5>{t2}</h5>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="text-center max-w-3xl p-4 mx-auto space-y-2">
				<h2 className="text-4xl text-neutral-darkest font-medium ">
					Makes Everything So Much Eastier It’s Even More With Melor
				</h2>
				<p className="text-neutral-darker">
					We believe that when we take care of our home, it takes care of us.
					That’s why we make premium quality sheets, towels, robes, rugs and all
					things soft and wonderful.
				</p>
				<div className="flex flex-wrap gap-8  rounded justify-center">
					<img src={insta1} alt="insta pic 1" />
					<img src={insta2} alt="insta pic 1" />
				</div>
				<br />
				<p className="text-neutral-darker">
					Sed vulputate elit vitae magna lacinia, vel bibendum neque faucibus.
					Aliquam sed volutpat turpis. Phasellus nisl arcu, pretium eu faucibus
					sed, aliquet in lacus. Pellentesque sed lacus et ipsum rutrum
					dignissim. Praesent ultrices posuere eros ac tristique. Lorem ipsum
					dolor sit amet isse potenti. Vesquam ante aliquet lacusemper elit.
					Cras neque nulla, convallis non commodo et, euismod nonsese. At vero
					eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
					praesentium. Sed vulputate elit vitae magna lacinia, vel bibendum
					neque faucibus. Aliquam sed volutpat turpis. Phasellus nisl arcu,
					pretium eu faucibus sed, aliquet in lacus. Pellentesque sed lacus et
					ipsum rutrum dignissim. Praesent ultrices posuere eros ac tristique.
				</p>
			</div>
			<Sponsors />
		</MountTransition>
	);
};

export default AboutUs;
