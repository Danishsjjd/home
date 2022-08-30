export const sortOptions = [
	{ name: "Best Rating", href: "#", current: false },
	{ name: "Newest", href: "#", current: false },
	{ name: "Reset", href: "#", current: false },
];
export const subCategories = [
	// top
	{ name: "Orders", href: "/orders" },
	{ name: "Cart", href: "/cart" },
	{ name: "WishList", href: "/wishlist" },
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
];

export const filters = [
	{
		id: "category",
		name: "Category",
		options: [
			{ value: "living room", label: "Living room", checked: false },
			{ value: "bedroom", label: "Bedroom", checked: false },
			{ value: "kitchen", label: "Kitchen", checked: false },
			{ value: "bathroom", label: "Bathroom", checked: false },
			{ value: "accessories", label: "accessories", checked: false },
			{ value: "workspace", label: "Workspace", checked: false },
		],
	},
];
