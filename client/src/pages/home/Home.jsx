import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import gridImg1 from "../../assets/images/home/grid-banner-1.png";
import gridImg2 from "../../assets/images/home/grid-banner-2.png";
import hero from "../../assets/images/home/hero-home.png";
import insta1 from "../../assets/images/home/insta1.png";
import insta2 from "../../assets/images/home/insta2.png";
import insta3 from "../../assets/images/home/insta3.png";
import insta4 from "../../assets/images/home/insta4.png";
import insta5 from "../../assets/images/home/insta5.png";
import longBannerBtn from "../../assets/images/home/long-banner-with-btn.png";
import longBanner from "../../assets/images/home/long-banner.png";
import { Button, ResetPassword, Sponsors } from "../../components";
import { homeCards } from "../../constants/data";
import MetaData from "../../utils/MetaData";
import MountTransition from "../../utils/MountTransition";
import Categories from "./Categories";

const instaImages = [insta1, insta2, insta3, insta4, insta5];

const Home = () => {
  const [searchParams] = useSearchParams();
  const getToken = searchParams.get("token");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, [getToken]);
  return (
    <MountTransition>
      <MetaData title={"Welcome"} />
      {token && <ResetPassword token={token} />}
      <div className="space-y-11">
        <div className="relative grid place-items-center">
          <img
            src={hero}
            alt="hero"
            className="w-screen object-cover h-screen select-none"
          />
          <h1 className="absolute text-neutral-darkest text-4xl md:text-8xl font-bold text-center">
            AWESOME FURNITURE
          </h1>
          <Button
            app
            className={"absolute bottom-1/4"}
            onClick={() => navigate("/shope")}
          >
            Take This Look
          </Button>
        </div>
        <Categories />
        {/* gird items */}
        <div className="grid lg:grid-cols-4 lg:gap-8 max-w-7xl mx-auto ">
          <div className="lg:col-span-3">
            <img
              src={gridImg1}
              alt="grid large banner"
              className="w-full h-full object-cover"
              onClick={() => navigate("/shope")}
            />
          </div>
          <div className="lg:space-y-3 grid grid-cols-2 lg:grid-cols-none lg:grid-rows-4">
            <div className="lg:row-span-3">
              <img
                src={gridImg2}
                alt="grid small banner"
                className="lg:w-full h-full object-cover"
                onClick={() => navigate("/shope")}
              />
            </div>
            <div
              className="bg-neutral-darkest text-white flex justify-between items-center cursor-pointer lg:px-6 px-3 py-3"
              onClick={() => navigate("/shope")}
            >
              <h1>Find inspiration. Find profession</h1>
              <span>
                <AiOutlineArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={longBanner}
            alt="banner"
            className="w-full hidden md:block"
          />
          <Button
            className={"absolute right-[15%] top-1/2 hidden md:block"}
            app
            onClick={() => navigate("/shope")}
          >
            Explore Now
          </Button>
          <Link to="">
            <img
              src={longBannerBtn}
              alt="banner"
              className="w-full object-cover hidden sm:min-h-[200px] sm:block md:hidden"
            />
          </Link>
        </div>
        {/* three cards */}
        <div className="grid md:grid-cols-3 lg:p-0 p-4 max-w-7xl mx-auto gap-4 ">
          {/* card */}
          {homeCards.map(({ bgColor, img, imgAlt, position, desc }) => (
            <div
              className={
                "w-full h-52 p-4 overflow-hidden rounded-md text-white " +
                bgColor
              }
              key={imgAlt}
            >
              <div className="grid grid-cols-3 h-full">
                <div className="flex flex-col min-h-full  justify-between col-span-2 sm:col-span-2">
                  <h2 className="text-xl">{desc}</h2>
                  <h1 className="font-bold sm:text-2xl text-2xl">-30%</h1>
                  <div>
                    <Button cardBtn onClick={() => navigate("/shope")}>
                      Shope Now
                    </Button>
                  </div>
                </div>
                <div className="w-full h-full relative">
                  <img
                    src={img}
                    alt={imgAlt}
                    className={
                      "w-full h-full lg:w-60 lg:h-60 absolute " + position
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* instagram promotion */}
        <div className="text-center">
          <a
            className="text-center underline text-neutral-darkest font-medium text-3xl sm:text-5xl cursor-pointer"
            href={"https://instagram.com/danishsjjd"}
            rel="noreferrer"
            target="_blank"
          >
            Follow us on instagram
          </a>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:p-0 p-4 max-w-7xl mx-auto gap-4 sm:gap-1 lg:gap-4 mt-9">
            {instaImages.map((img, index) => (
              <a
                href={"https://instagram.com/danishsjjd"}
                key={index}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src={img}
                  alt="insta1"
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
        {/* sponsors */}
        <Sponsors />
      </div>
    </MountTransition>
  );
};

export default Home;
