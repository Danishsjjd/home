import { useRef } from "react"
import { MdPlayCircleFilled } from "react-icons/md"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import MetaData from "../../utils/MetaData"
import MountTransition from "../../utils/MountTransition"

import Button from "../../components/form/Button"

import { ReactComponent as Facebook } from "../../assets/icons/social/ic-facebook.svg"
import { ReactComponent as Google } from "../../assets/icons/social/ic-google.svg"
import { ReactComponent as Instagram } from "../../assets/icons/social/ic-instagram.svg"
import { ReactComponent as Twitter } from "../../assets/icons/social/ic-twitter.svg"
import { AreaTextField, Input } from "../../components"
import { contactInfo, faqData } from "../../constants/data"
import useContact from "./useContact"

import emailjs from "@emailjs/browser"
import { Formik } from "formik"

const ContactUs = () => {
  const form = useRef()
  const { active, setActive, initialValues, validationSchema } = useContact()

  const sendEmail = (values, { resetForm }) => {
    emailjs.sendForm("service_g3a0u92", "template_dfxqgnp", form.current, "5p66bB_WiHK1mjJkZ").then(
      (result) => {
        toast.success("Thank's for contacting")
        resetForm()
      },
      (e) => {
        toast.error(e.text)
      }
    )
  }

  return (
    <MountTransition>
      <MetaData title={"Contact Us"} />
      <div className="mt-20 space-y-4">
        <div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={sendEmail}>
            <form ref={form}>
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 lg:grid-cols-2">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold text-neutral-darkest">Contact Us</h1>
                  <p className="text-neutral-darker">
                    We love to hear from you, so if there’s anything you’d like to ask us, we’re right here and ready to
                    help in every way we can but please check our{" "}
                    <a className="cursor-pointer font-medium text-blue-400" href="#faqs">
                      faq
                    </a>{" "}
                    section maybe you find your answer there
                  </p>
                  <div className="grid-cols-2 gap-4 space-y-2 sm:grid sm:space-y-0">
                    <div>
                      <h3 className="sm:mb-2">Your Name</h3>
                      <Input name="name" placeholder="ex: Danish" app />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Email</h3>
                      <Input name="email" placeholder="ex: danish@dev.com" app />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Phone</h3>
                      <Input name="phone" placeholder="ex: +92011388034" app type="number" />
                    </div>
                    <div>
                      <h3 className="sm:mb-2">Your Subject</h3>
                      <Input name="subject" placeholder="ex: how to track order" app />
                    </div>
                    <div className="col-span-2">
                      <h3 className="mb-2">Message:-</h3>
                      <AreaTextField name="message" className={""} app />
                    </div>
                  </div>
                </div>
                <div className="divide-y-1 divide-gray-200 text-center lg:text-left">
                  <div className="pb-2">
                    <h3 className="font-bold text-neutral-darkest">WORKING HOURS</h3>
                    <p>Monday – Friday, 9:00am – 5:00pm PST.</p>
                  </div>
                  <div className="space-y-2 py-2">
                    {contactInfo.map(({ Icon, title, link }) => (
                      <a href={link} className="flex justify-center gap-2 lg:justify-start" key={title}>
                        <Icon className="text-secondary-darker" /> {title}
                      </a>
                    ))}
                  </div>
                  <div className="space-y-2 py-2">
                    <h3 className="font-bold text-neutral-darkest">JOIN US</h3>
                    <p className="text-neutral-darker">
                      We are happily open new colloboration. You can ask any questions and offer problems by phone,
                      email, Instagram or Facebook.
                    </p>
                    <div className="flex justify-center gap-2 text-white lg:justify-start">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-grey">
                        <a href="https://www.facebook.com/danishsjjd" target={"_blank"} rel="noreferrer">
                          <Facebook />
                        </a>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-grey">
                        <Link to={"/"}>
                          <Google />
                        </Link>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-grey">
                        <a href="https://twitter.com/Danishsjjd" target={"_blank"} rel="noreferrer">
                          <Twitter />
                        </a>
                      </div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-grey">
                        <a href="https://www.instagram.com/danishsjjd/" target={"_blank"} rel="noreferrer">
                          <Instagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-3 flex items-center justify-center">
                <Button app>Submit</Button>
              </div>
            </form>
          </Formik>
        </div>
        <div className="mx-auto max-w-7xl scroll-mt-16 px-8" id="faqs">
          <h1 className="text-4xl font-bold text-neutral-darkest">How Can We Help You?</h1>
          <p className="max-w-2xl text-neutral-darker">
            Below are answers to our most commonly asked questions. If you cannot find an answer here, please contact
            us.
          </p>
        </div>
        <div className="mx-auto my-4 flex max-w-7xl flex-col gap-6 rounded px-6">
          {faqData.map((data, index) => {
            return (
              <div
                className="w-full cursor-pointer overflow-hidden rounded bg-neutral-lightest text-white"
                onClick={() => setActive((pre) => (pre === index ? null : index))}
                key={index}
              >
                <div className="flex justify-between p-4 ">
                  <div className="font-medium text-neutral-darker" data-aos="fade-up">
                    <span className="font-bold text-neutral-darkest">Question: </span>
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
                  className={`h-0 overflow-hidden  border-neutral-darker bg-neutral-lightest text-neutral-darkest text-white transition-all duration-500 ease-linear ${
                    active === index ? "!h-auto border-t-1 bg-neutral-lightest lg:px-8" : ""
                  }`}
                >
                  <p className="mt-4 p-2 pr-10" dangerouslySetInnerHTML={{ __html: data.ans }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MountTransition>
  )
}

export default ContactUs
