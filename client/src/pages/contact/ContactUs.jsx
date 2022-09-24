import emailjs from "@emailjs/browser";
import { Formik } from "formik";
import { MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef } from "react";

import { ReactComponent as Facebook } from "../../assets/icons/social/ic-facebook.svg";
import { ReactComponent as Google } from "../../assets/icons/social/ic-google.svg";
import { ReactComponent as Instagram } from "../../assets/icons/social/ic-instagram.svg";
import { ReactComponent as Twitter } from "../../assets/icons/social/ic-twitter.svg";
import { AreaTextField, Input } from "../../components";
import Button from "../../components/form/Button";
import { contactInfo, faqData } from "../../constants/data";
import MetaData from "../../utils/MetaData";
import MountTransition from "../../utils/MountTransition";
import useContact from "./useContact";

const ContactUs = () => {
  const form = useRef();
  const { active, setActive, initialValues, validationSchema } = useContact();

  const sendEmail = (values, { resetForm }) => {
    emailjs
      .sendForm(
        "service_g3a0u92",
        "template_dfxqgnp",
        form.current,
        "5p66bB_WiHK1mjJkZ"
      )
      .then(
        (result) => {
          toast.success("Thank's for contacting");
          resetForm();
        },
        (e) => {
          toast.error(e.text);
        }
      );
  };

  return (
    <MountTransition>
      <MetaData title={"Contact Us"} />
      <div className="mt-20 space-y-4">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendEmail}
          >
            <form ref={form}>
              <div className="grid lg:grid-cols-2 items-center gap-10 max-w-7xl mx-auto px-8">
                <div className="space-y-3">
                  <h1 className="text-neutral-darkest text-4xl font-bold">
                    Contact Us
                  </h1>
                  <p className="text-neutral-darker">
                    We love to hear from you, so if there’s anything you’d like
                    to ask us, we’re right here and ready to help in every way
                    we can but please check our{" "}
                    <a
                      className="text-blue-400 cursor-pointer font-medium"
                      href="#faqs"
                    >
                      faq
                    </a>{" "}
                    section maybe you find your answer there
                  </p>
                  <div className="sm:grid grid-cols-2 gap-4 space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="sm:mb-2">Your Name</h3>
                      <Input name="name" placeholder="ex: Danish" app />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Email</h3>
                      <Input
                        name="email"
                        placeholder="ex: danish@dev.com"
                        app
                      />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Phone</h3>
                      <Input
                        name="phone"
                        placeholder="ex: +92011388034"
                        app
                        type="number"
                      />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Subject</h3>
                      <Input
                        name="subject"
                        placeholder="ex: how to track order"
                        app
                      />
                    </div>
                    <div className="col-span-2">
                      <h3 className="mb-2">Message:-</h3>
                      <AreaTextField name="message" className={""} app />
                    </div>
                  </div>
                </div>
                <div className="divide-y-1 divide-gray-200 text-center lg:text-left">
                  <div className="pb-2">
                    <h3 className="text-neutral-darkest font-bold">
                      WORKING HOURS
                    </h3>
                    <p>Monday – Friday, 9:00am – 5:00pm PST.</p>
                  </div>
                  <div className="space-y-2 py-2">
                    {contactInfo.map(({ Icon, title, link }) => (
                      <a
                        href={link}
                        className="flex gap-2 justify-center lg:justify-start"
                        key={title}
                      >
                        <Icon className="text-secondary-darker" /> {title}
                      </a>
                    ))}
                  </div>
                  <div className="space-y-2 py-2">
                    <h3 className="text-neutral-darkest font-bold">JOIN US</h3>
                    <p className="text-neutral-darker">
                      We are happily open new colloboration. You can ask any
                      questions and offer problems by phone, email, Instagram or
                      Facebook.
                    </p>
                    <div className="flex gap-2 text-white justify-center lg:justify-start">
                      <div className="w-8 h-8 rounded-full bg-neutral-grey grid place-items-center">
                        <a
                          href="https://www.facebook.com/danishsjjd"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Facebook />
                        </a>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-grey grid place-items-center">
                        <Link to={"/"}>
                          <Google />
                        </Link>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-grey grid place-items-center">
                        <a
                          href="https://twitter.com/Danishsjjd"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Twitter />
                        </a>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-grey grid place-items-center">
                        <a
                          href="https://www.instagram.com/danishsjjd/"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Instagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center my-3">
                <Button title={"Submit"} app />
              </div>
            </form>
          </Formik>
        </div>
        <div className="max-w-7xl mx-auto scroll-mt-16 px-8" id="faqs">
          <h1 className="text-4xl font-bold text-neutral-darkest">
            How Can We Help You?
          </h1>
          <p className="text-neutral-darker max-w-2xl">
            Below are answers to our most commonly asked questions. If you
            cannot find an answer here, please contact us.
          </p>
        </div>
        <div className="max-w-7xl mx-auto flex gap-6 flex-col px-6 rounded my-4">
          {faqData.map((data, index) => {
            return (
              <div
                className="cursor-pointer bg-neutral-lightest text-white rounded overflow-hidden w-full"
                onClick={() =>
                  setActive((pre) => (pre === index ? null : index))
                }
                key={index}
              >
                <div className="flex justify-between p-4 ">
                  <div
                    className="text-neutral-darker font-medium"
                    data-aos="fade-up"
                  >
                    <span className="text-neutral-darkest font-bold">
                      Question:{" "}
                    </span>
                    {data.que}
                  </div>
                  <div>
                    <MdPlayCircleFilled
                      className={`text-2xl text-neutral-darker transition-all duration-500 ease-linear ${
                        active === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
                <div
                  className={`text-white text-neutral-darkest  h-0 overflow-hidden transition-all duration-500 ease-linear bg-neutral-lightest border-neutral-darker ${
                    active === index
                      ? "lg:px-8 bg-neutral-lightest border-t-1 !h-auto"
                      : ""
                  }`}
                >
                  <p
                    className="mt-4 p-2 pr-10"
                    dangerouslySetInnerHTML={{ __html: data.ans }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MountTransition>
  );
};

export default ContactUs;
