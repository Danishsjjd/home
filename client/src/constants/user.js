import { logout, updatePassword, updateProfile } from "./functions";
import offer1 from "../assets/images/header/offer 1.jpg";
import offer2 from "../assets/images/header/offer 2.jpg";

//user - header - name is unique
export const shope = {
  // name
  categories: [
    {
      name: "Shop",
      // name
      featured: [
        {
          name: "New Arrivals",
          to: "/shope?category",
          imageSrc: offer1,
          imageAlt: "feature offer no.1",
        },
        {
          name: "Artwork Tees",
          to: "/shope?category",
          imageSrc: offer2,
          imageAlt: "feature offer no.2",
        },
      ],
      // name
      sections: [
        {
          name: "Bath",
          items: [
            { name: "View All", to: "/shope?category=bathroom" },
            { name: "Cost iron baths", to: "/shope?category=Cost iron baths" },
            { name: "Copper Baths", to: "/shope?category=Copper Baths" },
            {
              name: "Bath Tops & Mixers",
              to: "/shope?category=Bath Tops & Mixers",
            },
            { name: "Bath wastes", to: "/shope?category=Bath wastes" },
          ],
        },
        {
          name: "Living Room",
          items: [
            { name: "View All", to: "/shope?category=living+room" },
            {
              name: "freestanding Showers",
              to: "/shope?category=freestanding Showers",
            },
            {
              name: "Showers Sets & Controls",
              to: "/shope?category=Showers Sets & Controls",
            },
            {
              name: "Showers Heads & Arms",
              to: "/shope?category=Showers Heads & Arms",
            },
            {
              name: "Shower Accessories",
              to: "/shope?category=Shower Accessories",
            },
          ],
        },
        {
          name: "Kitchen",
          items: [
            { name: "View All", to: "/shope?category=kitchen" },
            { name: "Lightings", to: "/shope?category=Lightings" },
            { name: "Mirrors", to: "/shope?category=Mirrors" },
            { name: "Organizers", to: "/shope?category=Organizers" },
            {
              name: "Living Room Accessories",
              to: "/shope?category=Living Room Accessories",
            },
          ],
        },
        {
          name: "Workspace",
          items: [
            { name: "View All", to: "/shope?category=workspace" },
            {
              name: "Complete WC Suites",
              to: "/shope?category=Complete WC Suites",
            },
            { name: "Loo Seats", to: "/shope?category=Loo Seats" },
            {
              name: "Bidets & WC Accessories",
              to: "/shope?category=Bidets & WC Accessories",
            },
          ],
        },
        {
          name: "Bedroom",
          items: [
            { name: "View All", to: "/shope?category=bedroom" },
            { name: "Bed Accessories", to: "/shope?category=Bed Accessories" },
            { name: "Curtains", to: "/shope?category=Curtains" },
            { name: "Chets", to: "/shope?category=Chets" },
            { name: "Mattresses", to: "/shope?category=Mattresses" },
          ],
        },
        {
          name: "More",
          items: [
            {
              name: "Kitchen Taps & Lighting",
              to: "/shope?category=Kitchen Taps & Lighting",
            },
            {
              name: "Archive Collection",
              to: "/shope?category=Archive Collection",
            },
            {
              name: "Ex-Display Collection",
              to: "/shope?category=Ex-Display Collection",
            },
          ],
        },
      ],
    },
  ],
  // name
  pages: [
    { name: "Home", to: "/", className: "order-0" },
    { name: "Contact", to: "/contact", className: "order-2" },
    { name: "About Us", to: "/about", className: "order-2" },
    { name: "Blog", to: "/blog", className: "order-2" },
    {
      name: "Sale",
      to: "/sale",
      className: "order-2 !text-accent-red",
    },
  ],
};
// user - header dropdown - title
export const userDropdown = [
  {
    title: "update Profile",
    onClick: updateProfile,
    className: "",
  },
  {
    title: "update password",
    onClick: updatePassword,
    className: "",
  },
  {
    title: "Logout",
    onClick: logout,
    className:
      "grid place-items-center text-lg font-medium bg-secondary-darker shadow-[0px_1px_6px_var(--secondary-darker)] w-[96%] text-white mx-auto mb-2",
  },
];
