import { Formik } from "formik";
import { IoMdAddCircle } from "react-icons/io";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFillTrashFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";

import {
  AreaTextField,
  ErrorMessage,
  FormList,
  Input,
} from "../../../components";
import Button from "../../../components/form/Button";
import LoadingDialog from "../../../components/LoadingDialog";
import MountTransition from "../../../utils/MountTransition";
import useCreateUpdateProduct from "./useCreateUpdateProduct";

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
  } = useCreateUpdateProduct();

  return (
    <MountTransition dashboard className="p-4">
      <LoadingDialog loading={loading} />
      {findLoading ? (
        <LoadingDialog loading={findLoading} className="bg-white" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            values,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="h-96 rounded">
                {images.length < 1 ? (
                  <div className="w-full h-full dark:bg-black bg-accent rounded flex items-center justify-center text-xl sm:text-4xl font-medium text-white">
                    Please select images
                  </div>
                ) : images?.length === 1 ? (
                  <img
                    src={images[0].url || images[0]}
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
                      <SwiperSlide
                        className="w-full h-full relative"
                        key={index}
                      >
                        <img
                          src={buffer.url || buffer}
                          alt="product"
                          className="w-full h-full rounded object-cover overflow-hidden"
                        />
                        <IconButton
                          onClick={() => deleteImg(index, setFieldValue)}
                          className="!absolute top-3 right-3 "
                          color="error"
                        >
                          <BsFillTrashFill className="text-secondary-darker" />
                        </IconButton>
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
                  <Button className={"dark:bg-black"}>
                    {isProduct ? "Update Product" : "Add Product"}
                  </Button>
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
                          return setFieldValue(
                            "inStock",
                            Number(values.inStock)
                          );
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
            </form>
          )}
        </Formik>
      )}
    </MountTransition>
  );
};

export default CreateProducts;
