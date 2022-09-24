import { Formik } from "formik";
import { IoMdAddCircle } from "react-icons/io";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  AreaTextField,
  ErrorMessage,
  FormList,
  Input,
} from "../../../components";
import Button from "../../../components/form/Button";
import { productCategory } from "../../../constants/admin";
import MountTransition from "../../../utils/MountTransition";
import useCreateProduct from "./useCreateProduct";

const CreateProducts = () => {
  const { images, createProductImagesChange, validationSchema, onSubmit } =
    useCreateProduct();
  return (
    <MountTransition dashboard className="p-4">
      <Formik
        initialValues={{
          title: "",
          images: [],
          category: productCategory[0],
          description: "",
          price: 0,
          offerPrice: 0,
          inStock: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, setFieldTouched, touched, setFieldValue, values }) => (
          <>
            <div className="h-96 rounded">
              {images.length < 1 ? (
                <div className="w-full h-full dark:bg-black bg-accent rounded flex items-center justify-center text-xl sm:text-4xl font-medium text-white">
                  Please select images
                </div>
              ) : images?.length === 1 ? (
                <img
                  src={images[0]}
                  alt="not found"
                  className="w-full h-full rounded object-cover overflow-hidden"
                />
              ) : (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={true}
                  modules={[Pagination]}
                  className="mySwiper w-full h-full"
                >
                  {images.map((buffer, index) => (
                    <SwiperSlide className="w-full h-full" key={index}>
                      <img
                        src={buffer}
                        alt="not found"
                        className="w-full h-full rounded object-cover overflow-hidden"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            {images.length < 1 && (
              <ErrorMessage
                err={errors["images"]}
                visible={touched["images"]}
              />
            )}
            <div className="flex flex-col sm:flex-row gap-3 my-3">
              <label>
                <IoMdAddCircle className="text-5xl text-accent" />
                <input
                  type="file"
                  name="images"
                  id="images"
                  className="hidden pointer-events-none select-none max-w-0 bg-transparent"
                  accept="image/png, image/jpeg"
                  onChange={(e) => createProductImagesChange(e, setFieldValue)}
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
                <Button title="Add Product" ClassName={"dark:bg-black"} />
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center">
                <div className="flex justify-center max-w-[50px]">
                  <button
                    className="p-4 flex justify-center items-center text-lg dark:text-white"
                    onClick={() => {
                      const number = Number(values.inStock - 1);
                      if (number < 1)
                        return setFieldValue("inStock", Number(values.inStock));
                      setFieldValue("inStock", number);
                    }}
                  >
                    -
                  </button>
                  <Input
                    name={"inStock"}
                    className={
                      "max-w-[60px] min-w-[60px] text-center dark:text-white bg-transparent"
                    }
                    type="number"
                    placeholder="stock"
                    notShowError
                    min="0"
                  />
                  <button
                    className="p-4 flex justify-center items-center text-lg dark:text-white"
                    onClick={() => {
                      setFieldValue("inStock", Number(values.inStock + 1));
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="ml-14">
                  <FormList list={productCategory} name={"category"} />
                </div>
              </div>
              <ErrorMessage
                err={errors["inStock"]}
                visible={touched["inStock"]}
                additionalClasses="text-center"
              />
              <h2 className="heading text-center mt-3 ">
                Select stock and category
              </h2>
            </div>
            <div className="flex gap-6 my-4">
              <div className="flex-grow ">
                <Input
                  name="price"
                  type="number"
                  className={"flex-grow dark:text-white bg-transparent"}
                  placeholder="Price"
                  min={0}
                />
              </div>
              <Input
                name="offerPrice"
                type="number"
                className={"flex-grow dark:text-white bg-transparent"}
                placeholder="offerPrice"
                min={0}
              />
            </div>
            <h2 className="heading my-2 mt-4">Descriptions</h2>
            <AreaTextField
              name={"description"}
              placeholder="Enter Your product descriptions"
              className={
                "text-xl font-medium dark:bg-transparent dark:text-white"
              }
            />
          </>
        )}
      </Formik>
    </MountTransition>
  );
};

export default CreateProducts;
