const SERVICES = {
  // admin - user routes
  deleteUser: { uri: "users/deleteUser", method: "delete" }, //P:id
  updateUserRole: { uri: "users/updateUserRole", method: "patch" }, // P:id
  getAllUsers: { uri: "users/getallusers", method: "GET" },
  getSingleUser: { uri: "users/getsingleuser", method: "GET" }, // P:id
  // admin - product
  createProduct: { uri: "products/create", method: "post" },
  deleteProduct: { uri: "products/delete", method: "delete" }, //P:id
  updateProduct: { uri: "products/update", method: "put" }, // P:id
  // admin - reviews delete
  deleteReview: { uri: "reviews", method: "delete" }, // Q:productId,id(rev)
  // user - user routes
  signUp: { uri: "users/auth/register", method: "post" },
  login: { uri: "users/auth/login", method: "post" },
  logout: { uri: "users/auth/logout", method: "get" },
  me: { uri: "users/me", method: "GET" },
  forgetPassword: { uri: "users/password/forget", method: "post" },
  resetPassword: { uri: "users/password/reset", method: "post" }, // Q:token
  updatePassword: { uri: "users/password/update", method: "post" },
  UpdateProfile: { uri: "users/profile/update", method: "post" },
  // user - wishlist
  updateWishList: { uri: "users/wishlist", method: "post" },
  removeItemFromWishList: { uri: "users/wishlist/remove", method: "post" },
  // anyone - products
  getSingleProduct: { uri: "products/", method: "get" }, //p:id
  getAllProduct: { uri: "products/", method: "get" },
  searchProduct: { uri: "products/search", method: "post" },
  // user - reviews
  createAndUpdateReview: { uri: "reviews", method: "post" },
  toggleLikeReview: { uri: "reviews/like", method: "post" },
  // user - cart
  createCart: { uri: "cart/", method: "post" },
  deleteCart: { uri: "cart/", method: "delete" },
  deleteProductCart: { uri: "cart/deleteProduct", method: "post" },
  getCart: { uri: "cart/", method: "get" },
  // user - orders
  createOrder: { uri: "orders/", method: "post" },
  buySingleProductOrder: { uri: "orders/buyProduct", method: "post" },
  getUserOrder: { uri: "orders/", method: "get" },
  // admin - orders
  getAllOrder: { uri: "orders/getAllOrders", method: "get" },
  deleteOrder: { uri: "orders/", method: "DELETE" }, // p:id
  updateOrderStatus: { uri: "orders/", method: "patch" }, // p:id
  getMonthlyIncome: { uri: "orders/income", method: "get" },
}

export default SERVICES
