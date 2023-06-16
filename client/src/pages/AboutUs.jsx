import React from "react"

import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

import aboutUs from "../assets/images/aboutUs.png"
import insta1 from "../assets/images/home/insta1.png"
import insta2 from "../assets/images/home/insta2.png"
import { Sponsors } from "../components"
import { aboutCard } from "../constants/data"

const AboutUs = () => {
  return (
    <MountTransition>
      <MetaData title={"About Us"} />
      <div className="mx-auto mt-20 grid max-w-7xl gap-8 p-9 text-center lg:grid-cols-2 lg:p-3 lg:text-left">
        <div className="flex justify-center">
          <img src={aboutUs} alt="About us " />
        </div>
        <div className="space-y-2">
          <h5 className="text-secondary-darker ">ABOUT US</h5>
          <h2 className="text-2xl font-medium text-neutral-darkest">Just Stay Home & Enjoy Your Shopping Time</h2>
          <p className="text-neutral-darker">
            The Expression Agenda is our global human rights strategy. Through it, we target the best means of
            protecting rights and freedoms on the ground, while enhancing international instruments that protect freedom
            of expression and the right to information around the world.
          </p>
          <br />
          <p className="text-neutral-darker">
            The Expression Agenda is our global human rights strategy. Through it, we target the best means of
            protecting rights and freedoms on the ground, while enhancing international instruments that protect freedom
            of expression and the right to information around the world.
          </p>
          <div className="grid grid-cols-2 justify-between space-y-2">
            {aboutCard.map(({ Icon, t2, title }) => (
              <div key={title} className="flex flex-col items-center gap-2 lg:flex-row">
                <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-secondary-darker">
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
      <div className="mx-auto max-w-3xl space-y-2 p-4 text-center">
        <h2 className="text-4xl font-medium text-neutral-darkest ">
          Makes Everything So Much Eastier It’s Even More With Melor
        </h2>
        <p className="text-neutral-darker">
          We believe that when we take care of our home, it takes care of us. That’s why we make premium quality sheets,
          towels, robes, rugs and all things soft and wonderful.
        </p>
        <div className="flex flex-wrap justify-center  gap-8 rounded">
          <img src={insta1} alt="insta pic 1" />
          <img src={insta2} alt="insta pic 1" />
        </div>
        <br />
        <p className="text-neutral-darker">
          Sed vulputate elit vitae magna lacinia, vel bibendum neque faucibus. Aliquam sed volutpat turpis. Phasellus
          nisl arcu, pretium eu faucibus sed, aliquet in lacus. Pellentesque sed lacus et ipsum rutrum dignissim.
          Praesent ultrices posuere eros ac tristique. Lorem ipsum dolor sit amet isse potenti. Vesquam ante aliquet
          lacusemper elit. Cras neque nulla, convallis non commodo et, euismod nonsese. At vero eos et accusamus et
          iusto odio dignissimos ducimus qui blanditiis praesentium. Sed vulputate elit vitae magna lacinia, vel
          bibendum neque faucibus. Aliquam sed volutpat turpis. Phasellus nisl arcu, pretium eu faucibus sed, aliquet in
          lacus. Pellentesque sed lacus et ipsum rutrum dignissim. Praesent ultrices posuere eros ac tristique.
        </p>
      </div>
      <Sponsors />
    </MountTransition>
  )
}

export default AboutUs
