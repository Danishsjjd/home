export const sortOptions = [
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Reset", href: "#", current: false },
]
export const subCategories = [
  // top
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "WishList", href: "/wishlist" },
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]

export const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "living room", label: "Living room" },
      { value: "bedroom", label: "Bedroom" },
      { value: "kitchen", label: "Kitchen" },
      { value: "bathroom", label: "Bathroom" },
      { value: "accessories", label: "accessories" },
      { value: "workspace", label: "Workspace" },
    ],
  },
]
