import { Dialog, Popover, Tab, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Image } from "cloudinary-react"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { ReactComponent as CharIcon } from "../assets/icons/header/cart.svg"
import { ReactComponent as Heart } from "../assets/icons/header/heart.svg"
import { ReactComponent as SearchIcon } from "../assets/icons/header/search.svg"
import { ReactComponent as User } from "../assets/icons/header/user.svg"
import logo from "../assets/logo-black.svg"
import { DropDown, Search } from "../components"
import { shope, userDropdown } from "../constants/user"
import { getUser, setDialog } from "../store/authSlice"
import { getCart } from "../store/cartSlice"

import { LayoutGroup, motion } from "framer-motion"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(null)
  const [scrollY, setScrollY] = useState(window.pageYOffset)
  const [showHeader, setShowHeader] = useState(true)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [openSearch, setOpenSearch] = useState(false)

  const location = useLocation()

  const user = useSelector(getUser)
  const cart = useSelector(getCart)

  const userClickHandle = (link) => {
    if (!user?.email) return dispatch(setDialog(true))
    navigate(link)
  }

  const MotionLink = motion(NavLink)
  const MotionPopoverButton = motion(Popover.Button)
  const UserImage = user.avatar && (
    <Image
      alt={"user profile"}
      className="h-6 w-6 rounded-full"
      cloudName={import.meta.env.VITE_CLOUD_NAME}
      publicId={user.avatar.public_id}
      width="24"
      height="24"
    />
  )

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset

      setShowHeader(scrollY > moving)
      setScrollY(moving)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    setActiveIndex(null)
  }, [showHeader, setActiveIndex])

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveIndex(null)
  }, [location.pathname])

  return (
    <div
      className={`fixed top-0 z-30 w-full transition-transform duration-500 ${
        showHeader ? "translate-y-0" : "-translate-y-[70px]"
      } `}
    >
      <Search open={openSearch} setOpen={setOpenSearch} />
      <div className="mx-auto max-w-7xl">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50 bg-white lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Links */}
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {shope.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <NavLink
                          to={page.to}
                          className="-m-2 block p-2 font-medium text-gray-900"
                          onClick={() => setOpen(false)}
                        >
                          {page.name}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="flex space-x-8 px-4">
                        {shope.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? "border-accent-red text-accent-red" : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {shope.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-5 px-4 pt-10">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                </div>
                                <NavLink
                                  to={item.to}
                                  className="mt-6 block font-medium text-gray-900"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </NavLink>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 pt-3">
                            {category.sections.map((section, index) => (
                              <div key={section.name}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="cursor-pointer font-medium text-gray-900"
                                  onClick={() => setActive((pre) => (pre === index ? null : index))}
                                >
                                  {section.name}
                                </p>
                                <ul
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className={`mt-6 flex h-0 flex-col space-y-6 overflow-hidden transition-all duration-500 ease-linear ${
                                    active === index ? "!h-auto" : ""
                                  }`}
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <NavLink
                                        to={item.to}
                                        className="-m-2 block p-2 text-gray-500"
                                        onClick={() => setOpen(false)}
                                      >
                                        {item.name}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative">
          <nav aria-label="Top" className="mx-auto max-w-7xl bg-white px-4 shadow sm:px-6 lg:px-8 ">
            <div className="border-b border-gray-200 ">
              <div className="flex h-16 items-center lg:justify-between">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <NavLink to="/">
                    <span className="sr-only">Home</span>
                    <img className="h-8 w-auto" src={logo} alt="" />
                  </NavLink>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="mx-auto hidden lg:block lg:self-stretch">
                  <motion.div className="flex h-full gap-8 overflow-hidden" onMouseLeave={() => setActiveIndex(null)}>
                    <LayoutGroup>
                      {shope.pages.map((page, index) => {
                        if (user?.role !== "admin" && page.to === "/admin") return null
                        if (page.name === "shop")
                          return shope.categories.map((category) => {
                            const isBorderActive = index === activeIndex
                            return (
                              <Popover key={category.name} className="flex">
                                {({ close }) => (
                                  <>
                                    <div className="relative flex">
                                      <MotionPopoverButton
                                        className={`relative flex items-center text-sm font-medium focus:outline-none ${
                                          isBorderActive ? "text-neutral-darkest" : "text-neutral-darker"
                                        } ${classNames(location.pathname === "/shope" && "!text-neutral-darkest")}`}
                                        onHoverStart={() => setActiveIndex(index)}
                                        layout
                                      >
                                        {isBorderActive && (
                                          <motion.span
                                            layoutId="border"
                                            className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                          />
                                        )}
                                        {activeIndex === null && location.pathname === "/shope" && (
                                          <motion.span
                                            layoutId="border"
                                            className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                          />
                                        )}
                                        {category.name}
                                      </MotionPopoverButton>
                                    </div>

                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-200"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="transition ease-in duration-150"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Popover.Panel
                                        className="absolute inset-x-0 top-full text-sm text-gray-500"
                                        onMouseEnter={() => setActiveIndex(null)}
                                      >
                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                        <div className="relative bg-white">
                                          <div className="mx-auto max-w-7xl px-8">
                                            <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 py-16">
                                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                {category.featured.map((item) => (
                                                  <NavLink
                                                    to={item.to}
                                                    className="relative "
                                                    key={item.name}
                                                    onClick={() => close()}
                                                  >
                                                    <div className="h-full w-full overflow-hidden rounded-lg group-hover:opacity-75">
                                                      <img
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt}
                                                        className="object-cover object-center"
                                                      />
                                                    </div>
                                                  </NavLink>
                                                ))}
                                              </div>
                                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                {category.sections.map((section) => (
                                                  <div key={section.name}>
                                                    <p
                                                      id={`${section.name}-heading`}
                                                      className="font-medium text-gray-900"
                                                    >
                                                      {section.name}
                                                    </p>
                                                    <ul
                                                      aria-labelledby={`${section.name}-heading`}
                                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                      {section.items.map((item) => (
                                                        <li key={item.name} className="flex">
                                                          {item.name === "View All" ? (
                                                            <NavLink
                                                              to={item.to}
                                                              className="hover:text-gray-800"
                                                              onClick={() => close()}
                                                            >
                                                              {item.name}
                                                            </NavLink>
                                                          ) : (
                                                            <span
                                                              className="cursor-pointer hover:text-gray-800"
                                                              onClick={() =>
                                                                toast(
                                                                  `we don't have item in sub category click on view all`
                                                                )
                                                              }
                                                            >
                                                              {item.name}
                                                            </span>
                                                          )}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Popover>
                            )
                          })
                        return (
                          <MotionLink
                            key={index}
                            to={page.to}
                            className={({ isActive }) =>
                              `${
                                isActive && activeIndex === null
                                  ? "border-neutral-darkest text-neutral-darkest"
                                  : "text-neutral-darker hover:text-neutral-darkest"
                              } relative flex items-center text-sm font-medium  ${page.className}`
                            }
                            onHoverStart={() => setActiveIndex(index)}
                            layout
                          >
                            {({ isActive }) => {
                              const isBorderActive = index === activeIndex
                              return (
                                <>
                                  {isBorderActive && (
                                    <motion.span
                                      layoutId="border"
                                      className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                    />
                                  )}
                                  {activeIndex === null && isActive && (
                                    <motion.span
                                      layoutId="border"
                                      className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                    />
                                  )}
                                  {page.name}
                                </>
                              )
                            }}
                          </MotionLink>
                        )
                      })}
                    </LayoutGroup>
                  </motion.div>
                </Popover.Group>

                <div className="ml-auto flex items-center -space-x-2 sm:space-x-1 lg:ml-0">
                  {/* Search */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <span className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" onClick={() => setOpenSearch(true)} />
                    </span>
                  </div>

                  {/* heart */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <span className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Wishlist</span>
                      <Heart className="h-6 w-6" aria-hidden="true" onClick={() => userClickHandle("/wishlist")} />
                    </span>
                  </div>

                  {/* user */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <span className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Profile</span>
                      {user?.avatar ? (
                        <DropDown anchor={UserImage} list={userDropdown} side="left" />
                      ) : user.googleAvatar ? (
                        <DropDown
                          anchor={<img src={user.googleAvatar} alt="user profile" className="h-6 w-6 rounded-full" />}
                          list={userDropdown}
                          side="left"
                        />
                      ) : (
                        <User className="h-6 w-6 " fill="red" stock="blue" onClick={() => dispatch(setDialog(true))} />
                      )}
                    </span>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root rounded-md bg-white p-2 text-gray-400 lg:ml-6">
                    <span
                      className="group -m-2 flex cursor-pointer items-center p-2"
                      onClick={() => userClickHandle("/cart")}
                    >
                      <CharIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {cart?.length > 0 && (
                        <span className="ml-1 grid h-5 w-5 place-content-center rounded-full bg-secondary-darkest text-sm font-medium text-white">
                          {cart?.length}
                        </span>
                      )}
                      <span className="sr-only">items in cart, view bag</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}
