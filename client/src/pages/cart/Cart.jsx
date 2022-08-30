import { Image } from "cloudinary-react";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

import { ReactComponent as CartImg } from "../../assets/icons/cart_center.svg";
import { ReactComponent as IcClose } from "../../assets/icons/ic-close.svg";
import MasterCard from "../../assets/icons/social/MasterCard.png";
import Visa from "../../assets/icons/social/Visa.png";
import HomeLogo from "../../assets/logo-black.svg";
import { Button, Input } from "../../components";
import LoadingDialog from "../../components/LoadingDialog";
import { API } from "../../libs/axios";
import { getUser } from "../../store/authSlice";
import { getCart, setCart } from "../../store/cartSlice";
import MetaData from "../../utils/MetaData";
import MountTransition from "../../utils/MountTransition";

const Cart = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const cart = useSelector(getCart);
	const user = useSelector(getUser);
	const totalPrice = cart
		.map(({ productId, quantity }) => {
			const { price, offerPrice } = productId;
			if (offerPrice > 0) return offerPrice * quantity;
			return price * quantity;
		})
		.reduce((acc, cur) => {
			return (acc += cur);
		}, 0);
	const subtotalPrice = cart
		.map(({ productId, quantity }) => {
			const { price } = productId;
			return price * quantity;
		})
		.reduce((acc, cur) => {
			return (acc += cur);
		}, 0);

	const onToken = async (token) => {
		if (cart?.length < 1) return toast.error("no item in cart");

		setLoading(true);
		try {
			await API.createOrder({
				data: {
					token: token,
					amount: totalPrice * 100,
					userId: user._id,
				},
			});
			dispatch(setCart([]));
		} catch (e) {
			toast.error(e?.response?.data?.message || e?.message);
		} finally {
			setLoading(false);
		}
	};

	const removeFromCart = async (productId) => {
		try {
			await API.deleteProductCart({
				data: { userId: user._id, productId },
			});
			const bucket = cart.filter(
				(singleProduct) => singleProduct.productId._id !== productId
			);
			dispatch(setCart(bucket));
			toast.success("removed from cart!");
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	};

	return (
		<MountTransition>
			<MetaData title={"Cart"} />
			{loading ? <LoadingDialog loading={loading} /> : null}
			{cart.length > 0 ? (
				<div className="max-w-7xl md:min-h-[calc(422px-100%)] min-h-[calc(924px-100%)] mx-auto mt-20 px-3">
					<h1 className="text-4xl font-medium pt-4 pb-2">
						Shopping Cart ({cart.length})
					</h1>
					<div className="flex flex-col-reverse lg:grid grid-cols-4 gap-6 mt-6">
						<div className="col-span-3 w-full ">
							<div className="overflow-x-auto w-full">
								<table className="table-fixed w-full border-collapse rounded min-w-[440px]">
									<thead className="text-neutral-darker border-1 border-neutral-lighter !font-normal">
										<tr>
											<th className="p-2">Product</th>
											<th></th>
											<th>Quantity</th>
											<th>Total</th>
										</tr>
									</thead>
									<tbody className="text-center">
										{cart.map(({ productId, quantity }) => {
											return (
												<tr
													key={productId._id}
													className="border-1 border-neutral-lighter"
												>
													<td colSpan={2}>
														<div className="flex items-center space-x-3 text-left p-4">
															<span
																className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
																onClick={() => removeFromCart(productId._id)}
															>
																<IcClose className="text-neutral-darker" />
															</span>
															<div>
																<Link
																	to={`/product/${productId._id}`}
																	className="avatar block"
																>
																	<div className="mask mask-squircle w-20 h-20">
																		<Image
																			cloudName={
																				process.env.REACT_APP_CLOUD_NAME
																			}
																			alt="item pic"
																			className="w-full object-cover"
																			width="80"
																			height="80"
																			publicId={productId.images[0].public_id}
																		/>
																	</div>
																</Link>
															</div>
															<div>
																<Link
																	to={`/product/${productId._id}`}
																	className="block space-y-1"
																>
																	<div className="font-bold line-clamp-1">
																		{productId.title}
																	</div>
																	<div className="text-sm opacity-50 line-clamp-1">
																		Category: {productId.category}
																	</div>
																</Link>
															</div>
														</div>
													</td>
													<td className="">
														<span className="max-w-[60px] lg:max-w-[150px] mx-auto rounded-full border-1 border-neutral-lighter py-2 px-3 flex text-neutral-darker font-bold">
															<input
																type="number"
																className="max-w-[60px] lg:max-w-[150px] w-full text-center focus:outline-none outline-none border-none focus:border-none focus:ring-0"
																placeholder="1"
																value={quantity}
																min={1}
																max={productId.inStock}
																disabled
															/>
														</span>
													</td>
													<td className="text-lg font-medium space-y-2">
														<span>Price: ${productId.price}</span>
														<br />
														<span>
															Total: $
															{productId?.offerPrice < 1
																? Number(productId.price)
																: Number(productId.offerPrice) * quantity}
														</span>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="bg-white">
							<div className="border-neutral-lighter border-1 divide-y-2 rounded divide-neutral-lighter p-2">
								<div className="p-2 space-y-3">
									<h2 className="font-medium text-lg mb-2">Summery</h2>
									<div className="flex justify-between">
										<p className="text-neutral-darker">Subtotal</p>
										<p className="font-medium">${subtotalPrice}</p>
									</div>
									<div className="flex justify-between">
										<p className="text-neutral-darker">Shipping</p>
										<p className="font-medium">Free</p>
									</div>
								</div>
								<div className="p-2 space-y-1">
									<span className="font-medium text-lg">Discount Code</span>
									<Formik initialValues={{ coupon: "" }}>
										<div className="flex gap-1">
											<Input placeholder="Enter coupon" name="coupon" />
											<Button title={"Apply"} app />
										</div>
									</Formik>
								</div>
								<div className="p-2 space-y-3">
									<div className="flex justify-between">
										<span className="font-medium">Total</span>
										<h3 className="font-bold text-lg">${totalPrice}</h3>
									</div>
									<StripeCheckout
										name="Home"
										image={HomeLogo}
										billingAddress
										shippingAddress
										description={`Total $${totalPrice}`}
										amount={totalPrice * 100}
										token={onToken}
										stripeKey={process.env.REACT_APP_STRIPE_TOKEN}
									>
										<Button
											title={"Proceed to Checkout"}
											ClassName="lg:w-full text-center bg-neutral-darkest hover:bg-neutral-darker text-white"
										/>
									</StripeCheckout>
									<div className="flex gap-1 sm:gap-5 justify-center">
										<img
											src={Visa}
											alt="visa"
											className="sm:w-10 object-contain grayscale hover:grayscale-0 transition-all duration-500"
										/>
										<img
											src={MasterCard}
											alt="master card"
											className="sm:w-10 object-contain grayscale hover:grayscale-0 transition-all duration-500"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="w-screen h-screen flex justify-center items-center">
					<div className="max-w-lg w-full space-y-4 mx-auto grid place-items-center">
						<CartImg />
						<p className="font-medium text-lg">Your shopping cart is empty</p>
						<Link to="/shope" className="block">
							<Button title="Continue Shopping" app />
						</Link>
					</div>
				</div>
			)}
		</MountTransition>
	);
};

export default Cart;
