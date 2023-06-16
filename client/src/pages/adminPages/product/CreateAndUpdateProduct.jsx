import { BsFillTrashFill } from "react-icons/bs"
import { IoMdAddCircle } from "react-icons/io"
import { Swiper, SwiperSlide } from "swiper/react"

import MountTransition from "../../../utils/MountTransition"

import LoadingDialog from "../../../components/LoadingDialog"
import Button from "../../../components/form/Button"

import { AreaTextField, ErrorMessage, FormList, Input } from "../../../components"
import useCreateUpdateProduct from "./useCreateUpdateProduct"

import IconButton from "@mui/material/IconButton"
import { Formik } from "formik"
import { Pagination } from "swiper"
import "swiper/css/pagination"

const CreateProducts = () => {
  const {
    images,
    onImagesChange,
    validationSchema,
    onSubmit,
    loading,
    findLoading,
    deleteImg,
    isProduct,
    initialValues,
    productCategory,
  } = useCreateUpdateProduct()

  return (
    <MountTransition dashboard className="p-4">
      <LoadingDialog loading={loading} />
      {findLoading ? (
        <LoadingDialog loading={findLoading} className="bg-white" />
      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, setFieldTouched, touched, setFieldValue, values, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="h-96 rounded">
                {images.length < 1 ? (
                  <div className="flex h-full w-full items-center justify-center rounded bg-accent text-xl font-medium text-white dark:bg-black sm:text-4xl">
                    Please select images
                  </div>
                ) : images?.length === 1 ? (
                  <img
                    src={images[0].url || images[0]}
                    alt="not found"
                    className="h-full w-full overflow-hidden rounded object-cover"
                  />
                ) : (
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper h-full w-full"
                  >
                    {images.map((buffer, index) => (
                      <SwiperSlide className="relative h-full w-full" key={index}>
                        <img
                          src={buffer.url || buffer}
                          alt="product"
                          className="h-full w-full overflow-hidden rounded object-cover"
                        />
                        <IconButton
                          onClick={() => deleteImg(index, setFieldValue)}
                          className="!absolute right-3 top-3 "
                          color="error"
                        >
                          <BsFillTrashFill className="text-secondary-darker" />
                        </IconButton>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              {images.length < 1 && <ErrorMessage err={errors["images"]} visible={touched["images"]} />}
              <div className="my-3 flex flex-col gap-3 sm:flex-row">
                <label>
                  <IoMdAddCircle className="text-5xl text-accent" />
                  <input
                    type="file"
                    name="images"
                    id="images"
                    className="pointer-events-none hidden max-w-0 select-none bg-transparent"
                    accept="image/png, image/jpeg"
                    onChange={(e) => onImagesChange(e, setFieldValue)}
                    multiple
                    onBlur={(e) => setFieldTouched(e.target.name)}
                  />
                </label>
                <div className="flex-1">
                  <Input
                    type="text"
                    name={"title"}
                    placeholder="Title of Product"
                    className={"bg-transparent dark:text-white"}
                  />
                </div>
                <div>
                  <Button className={"dark:bg-black"}>{isProduct ? "Update Product" : "Add Product"}</Button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="flex max-w-[50px] justify-center">
                    <button
                      className="flex items-center justify-center p-4 text-lg dark:text-white"
                      onClick={() => {
                        const number = Number(values.inStock - 1)
                        if (number < 1) return setFieldValue("inStock", Number(values.inStock))
                        setFieldValue("inStock", number)
                      }}
                    >
                      -
                    </button>
                    <Input
                      name={"inStock"}
                      className={"min-w-[60px] max-w-[60px] bg-transparent text-center dark:text-white"}
                      type="number"
                      placeholder="stock"
                      notShowError
                      min="0"
                    />
                    <button
                      className="flex items-center justify-center p-4 text-lg dark:text-white"
                      onClick={() => {
                        setFieldValue("inStock", Number(values.inStock + 1))
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-14">
                    <FormList list={productCategory} name={"category"} />
                  </div>
                </div>
                <ErrorMessage err={errors["inStock"]} visible={touched["inStock"]} additionalClasses="text-center" />
                <h2 className="heading mt-3 text-center ">Select stock and category</h2>
              </div>
              <div className="my-4 flex gap-6">
                <div className="flex-grow ">
                  <Input
                    name="price"
                    type="number"
                    className={"flex-grow bg-transparent dark:text-white"}
                    placeholder="Price"
                    min={0}
                  />
                </div>
                <Input
                  name="offerPrice"
                  type="number"
                  className={"flex-grow bg-transparent dark:text-white"}
                  placeholder="offerPrice"
                  min={0}
                />
              </div>
              <h2 className="heading my-2 mt-4">Descriptions</h2>
              <AreaTextField
                name={"description"}
                placeholder="Enter Your product descriptions"
                className={"text-xl font-medium dark:bg-transparent dark:text-white"}
              />
            </form>
          )}
        </Formik>
      )}
    </MountTransition>
  )
}

export default CreateProducts
