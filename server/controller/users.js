const crypto = require("crypto")

const cloudinary = require("../utils/cloudinary.js")
const ErrorHandler = require("../utils/ErrorHandler")
const sendMail = require("../utils/sendMail")
const sendToken = require("../utils/sendToken")
const { User } = require("../models/users")

// register - user
exports.register = async (req, res, next) => {
  const uniqueEmail = await User.findOne({ email: req.body.email })
  if (uniqueEmail?.fromGoogle == true) return next(new ErrorHandler("Email is linked with google account", 400))

  if (uniqueEmail) return next(new ErrorHandler("Email already register", 400))

  let myCloud

  if (req.body.avatar) {
    myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "Home/avatars",
      width: 150,
      crop: "scale",
    })
  }

  const user = await User.create({
    ...req.body,
    ...(myCloud
      ? {
          avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
        }
      : {}),
  })

  sendToken(user, res, 201)
}

// login - user
exports.login = async (req, res, next) => {
  const { password, email } = req.body
  const user = await User.findOne({ email }).select("+password").populate("wishlist")
  if (user?.fromGoogle == true) return next(new ErrorHandler("Email is linked with google account", 400))

  if (!user) return next(new ErrorHandler("email is not register", 400))

  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched) return next(new ErrorHandler("incorrect password", 400))

  sendToken(user, res)
}

// on refresh check if authenticated
exports.refreshCheck = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist")

  sendToken(user, res)
}

exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return next(new ErrorHandler("no user found with this email", 404))

  if (user.fromGoogle == true) return next(new ErrorHandler("user linked with google"))

  const resetToken = user.getResetToken()
  await user.save()

  const resetURL = `${process.env.CLIENT_URL}/?pass=reset&token=${resetToken}`

  try {
    await sendMail({
      subject: "HOME - Recover Your Password",
      email: user.email,
      message: `<p>please don't share your token with other and also your token will expire in few minutes and can only be use one time</p><br />
			<b>Your reset token is:-</b><br />
			<span> ${resetURL}</span>`,
    })
    res.json({
      message: "Reset password url send to your email",
    })
  } catch (e) {
    user.resetPasswordToken = null
    user.resetPasswordTime = null
    await user.save()

    next(new ErrorHandler(e, 500))
  }
}

exports.resetPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body

  if (password !== confirmPassword) return next(new ErrorHandler("password is not match with confirm password", 400))

  const { token } = req.params

  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  })

  if (!user) return next(new ErrorHandler("Reset password url is invalid or has been expired", 400))

  user.password = req.body.password
  user.resetPasswordToken = null
  user.resetPasswordTime = null

  await user.save()

  sendToken(user, res)
}

// Update User Password
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user.fromGoogle == true) return next(new ErrorHandler("user linked with google"))

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
  if (!isPasswordMatched) return next(new ErrorHandler("Old Password is incorrect", 400))

  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Password not matched with each other", 400))

  user.password = req.body.newPassword
  await user.save()

  sendToken(user, res)
}

// Update User Profile
exports.updateProfile = async (req, res, next) => {
  const { username } = req.body

  let user = await User.findById(req.user._id)

  if (req.body?.avatar?.length > 2) {
    const imageId = user.avatar.public_id

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "Home/avatars",
      width: 150,
      crop: "scale",
    })

    await cloudinary.uploader.destroy(imageId)

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  user.username = username || user.username

  const updatedUser = await (
    await user.save({
      validateBeforeSave: true,
      validateModifiedOnly: true,
    })
  ).populate("wishlist")

  res.status(200).json({
    success: true,
    updatedUser,
  })
}

exports.createAndUpdateWishList = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const isInWishList = user.wishlist.find((wishes) => wishes._id == req.body._id)

  if (isInWishList) return next(new ErrorHandler("Already in wishlist", 400))

  user.wishlist.push(req.body._id)
  await user.save()

  res.status(200).json({ message: "successfully saved to wishlist" })
}

exports.deleteItemFromWishList = async (req, res, next) => {
  const user = await User.findById(req.user._id)

  const updatedWishlist = user.wishlist.filter((wishes) => {
    return wishes._id != req.body._id
  })

  user.wishlist = updatedWishlist

  await user.save()

  res.status(200).json({ message: "successfully removed from wishlist" })
}

// Get All users ---Admin
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
}

// Get Single User Details ---Admin
exports.getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) return next(new ErrorHandler("User is not found", 404))

  res.status(200).json({
    success: true,
    user,
  })
}

// Change user Role --Admin
exports.updateUserRole = async (req, res, next) => {
  const { id } = req.params

  const newUserData = {
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    user,
  })
}

// Delete User --- Admin
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user?.avatar) {
    const imageId = user.avatar.public_id
    await cloudinary.uploader.destroy(imageId)
  }

  await user.remove()

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
}
