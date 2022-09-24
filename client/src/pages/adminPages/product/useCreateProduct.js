import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { API } from "../../../libs/axios";

const useCreateProduct = () => {
  const [images, setImage] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).label("Title"),
    description: Yup.string().required().min(5).label("Description"),
    images: Yup.array()
      .min(1, "Please provide at least 1 images")
      .required("images is required")
      .label("images"),
    inStock: Yup.number()
      .required("This product must be in stock")
      .min(1, "This product must be in stock"),
    category: Yup.string(),
    price: Yup.number().min(0).required(),
    offerPrice: Yup.number().min(0),
  });

  const createProductImagesChange = (e, setFiledValue) => {
    const files = Array.from(e.target.files);

    const finalBuffer = [];
    setImage([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const extension = reader.result?.split(";")[0]?.split("/")[1];
        if (reader.readyState === 2) {
          if (
            extension === "jpeg" ||
            extension === "png" ||
            extension === "jpg"
          ) {
            setImage((old) => [...old, reader.result]);
            finalBuffer.push(reader.result);
          } else return toast.error("Only images is valid for thumbnails");
        }
      };
      reader.readAsDataURL(file);
    });
    setFiledValue(e.target.name, finalBuffer);
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await API.createProduct({ data: values });
      toast.success(response?.data);
      resetForm();
      setImage([]);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  };

  return {
    images,
    validationSchema,
    createProductImagesChange,
    onSubmit,
  };
};

export default useCreateProduct;
