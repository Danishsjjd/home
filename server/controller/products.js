const { Products } = require("../models/products")
const ErrorHandler = require("../utils/ErrorHandler.js")
const cloudinary = require("../utils/cloudinary")
const winston = require("winston")

const imgLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(winston.format.json(), winston.format.metadata()),
  transports: [
    new winston.transports.File({ filename: "notDeleted.log", level: "error" }),
    new winston.transports.MongoDB({
      db: process.env.DATABASE_URL,
      level: "error",
      options: { useUnifiedTopology: true },
      collection: "notDeleted.logs",
    }),
  ],
})

// create Product --Admin
exports.createProduct = async (req, res, next) => {
  const imagesLinks = []

  for (let i = 0; i < req.body.images.length; i++) {
    const result = await cloudinary.uploader.upload(req.body.images[i], {
      folder: "Home_assets/products",
    })

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks
  req.body.user = req.user._id

  const product = await Products.create(req.body)

  res.status(201).json({
    success: true,
    productId: product.id,
  })
}

// get All Products
exports.getAllProducts = async (req, res) => {
  const productsCount = await Products.countDocuments({ isDeleted: false })

  // pagination formula
  const resultPerPage = 10

  const pageN = Number(req?.query?.page)
  const currentPage = typeof pageN === "number" ? (pageN < 0 ? 1 : pageN) : 1

  const skip = resultPerPage * (currentPage - 1)

  const products = await Products.find({ isDeleted: false }).limit(resultPerPage).skip(skip)

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  })
}
// single Product details
exports.getSingleProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id).populate({
    path: "reviews",
    populate: { path: "user" },
  })

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
}

// Update Product ---Admin
exports.updateProduct = async (req, res, next) => {
  let product = await Products.findById(req.params.id)
  if (!product) return next(new ErrorHandler("Product is not found with this id", 404))

  const imageAlreadyUpload = []
  // const imageHaveToUpload = [];

  function imageExists(public_id) {
    return req.body.images.some((el) => el.public_id === public_id)
  }
  // Delete image from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    if (!imageExists(product.images[i].public_id)) {
      try {
        await cloudinary.uploader.destroy(product.images[i].public_id)
      } catch (e) {
        imgLogger.error({
          message: e.message,
          productImage: product.images[i],
        })
      }
    } else {
      // imageHaveToUpload.push(req.body.images[i]);
    }
  }

  const imagesLinks = []

  for (let i = 0; i < req.body.images.length; i++) {
    if (!req.body.images[i].public_id) {
      const result = await cloudinary.uploader.upload(req.body.images[i], {
        folder: "Home_assets/products",
      })
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    } else {
      imageAlreadyUpload.push(req.body.images[i])
    }
  }

  const bodyImage = [...imagesLinks, ...imageAlreadyUpload]

  req.body.images = bodyImage

  product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  })
  res.status(200).json({
    success: true,
    product,
  })
}

// delete Product - admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id)
  if (!product) return next(new ErrorHandler("Product is not found with this id", 404))

  // with for loop we can get exception as well but after that it will looping all the time
  // if we use try catch outside for loop than suppose there 3 image and 2nd for some reason
  // already deleted than 3rd also not gonna delete
  // with while loop we can achieve this behavior
  // Deleting images from cloudinary
  // let i = 0;
  // while (i < product.images.length) {
  //   try {
  //     await cloudinary.uploader.destroy(product.images[i].public_id);
  //   } catch (e) {
  //     imgLogger.error({ message: e.message, productImage: product.images[i] });
  //   } finally {
  //     i++;
  //   }
  // }

  // await product.remove();

  product.isDeleted = true

  await product.save()

  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  })
}

exports.searchProduct = async (req, res, next) => {
  const { word } = req.body
  let searchRegEx
  try {
    searchRegEx = new RegExp(word, "ig")
  } catch (e) {
    searchRegEx = word.toLowerCase()
  }

  const products = await Products.find({
    $or: [{ title: searchRegEx }, { description: searchRegEx }],
  })
    .limit(7)
    .select("title _id")

  res.json({ products })
}
