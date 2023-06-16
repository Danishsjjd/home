import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { productCategory } from "../../../constants/admin"
import { API } from "../../../libs/axios"

import * as Yup from "yup"

const useCreateUpdateProduct = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [findLoading, setFindLoading] = useState(false)
  const [product, setProduct] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()
  const isProduct = Object.keys(product).length > 0

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).label("Title"),
    description: Yup.string().required().min(5).label("Description"),
    images: Yup.array().min(1, "Please provide at least 1 images").required("images is required").label("images"),
    inStock: Yup.number().required("This product must be in stock").min(1, "This product must be in stock"),
    category: Yup.string(),
    price: Yup.number().min(0).required(),
    offerPrice: Yup.number().min(0),
  })

  const { title, images: fetchImages, category, description, price, offerPrice, inStock } = product

  const initialValues = {
    title: title || "",
    images: fetchImages || [],
    category: category || productCategory[0].title,
    description: description || "",
    price: price || 0,
    offerPrice: offerPrice || 0,
    inStock: inStock || 1,
  }

  const onImagesChange = (e, setFiledValue) => {
    const files = Array.from(e.target.files)

    const finalBuffer = [...images]

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const extension = reader.result?.split(";")[0]?.split("/")[1]
        if (reader.readyState === 2) {
          if (extension === "jpeg" || extension === "png" || extension === "jpg") {
            setImages((old) => [...old, reader.result])
            finalBuffer.push(reader.result)
          } else return toast.error("Only images is valid for thumbnails")
        }
      }
      reader.readAsDataURL(file)
    })
    setFiledValue(e.target.name, finalBuffer)
  }

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true)
    if (!isProduct) {
      try {
        const response = await API.createProduct({ data: values })
        toast.success(response?.data)
        resetForm()
        setImages([])
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message)
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const response = await API.updateProduct({ data: values, params: `/${id}` })
        toast.success(response?.data)
        setImages([])
        navigate(`/product/${id}`, { replace: true })
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const deleteImg = (idx, setFieldValue) => {
    const filterImages = images.filter((img, index) => index !== idx)
    setImages(filterImages)
    setFieldValue("images", filterImages)
  }

  useEffect(() => {
    if (id) {
      const findProduct = async () => {
        setFindLoading(true)
        try {
          const product = await API.getSingleProduct({ params: id })
          setProduct(product.data.product)
          setImages(product.data.product.images)
          setFindLoading(false)
        } catch (e) {
          toast.error(e?.response?.data?.message || e?.message)
          setTimeout(() => {
            navigate(-1)
          }, 2000)
        }
      }
      findProduct()
    } else setFindLoading(false)
  }, [id, navigate])

  return {
    images,
    validationSchema,
    onImagesChange,
    onSubmit,
    loading,
    findLoading,
    deleteImg,
    product,
    isProduct,
    initialValues,
    productCategory,
  }
}

export default useCreateUpdateProduct
