const sendToken = (user, res, statusCode) => {
  const jwtToken = user.getAccessToken()
  const { email, role, username, wishlist, avatar, googleAvatar, _id } = user
  res
    .status(statusCode || 200)
    .header("Access-Control-Expose-Headers", "x-auth-token")
    .header("x-auth-token", jwtToken)
    .json({ email, role, username, wishlist, avatar, googleAvatar, _id })
}

module.exports = sendToken
