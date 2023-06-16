import React from "react"

import FormButton from "../components/form/Button"

import bg from "../assets/images/Blog_image.jpg"
import { Form, Input } from "../components"
import CountDown from "./CountDown"

import * as Yup from "yup"

const ComingSoon = ({ title, desc, date }) => {
  const initialValues = {
    email: "",
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  })
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover pt-20 text-white "
      style={{ background: `url(${bg}) center black no-repeat` }}
    >
      <div className="mx-auto grid w-full max-w-2xl items-center justify-center gap-8 px-4">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold sm:text-4xl">{title}</h2>
          <p className="text-sm sm:text-base">{desc}</p>
        </div>
        <CountDown date={date} />
        <div>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm()
            }}
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  name="email"
                  app
                  className="flex-1 flex-grow !bg-transparent focus:border-secondary-darker focus:text-secondary-darker"
                  placeholder="Enter Your Email"
                />
              </div>
              <div>
                <FormButton app>Submit</FormButton>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
