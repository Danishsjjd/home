// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const storeItems = new Map([
// 	[1, { priceInCents: 10000, name: "Learn React Today" }],
// 	[2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

// router.post("/payment", async (req, res) => {
// 	try {
// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ["card"],
// 			mode: "payment",
// 			line_items: req.body.items.map((item) => {
// 				const storeItem = storeItems.get(item.id);
// 				return {
// 					price_data: {
// 						currency: "usd",
// 						product_data: {
// 							name: storeItem.name,
// 						},
// 						unit_amount: storeItem.priceInCents,
// 					},
// 					quantity: item.quantity,
// 				};
// 			}),
// 			success_url: `${process.env.CLIENT_URL}success`,
// 			cancel_url: `${process.env.CLIENT_URL}`,
// 		});
// 		res.json({ url: session.url });
// 	} catch (e) {
// 		res.status(500).json({ error: e.message });
// 	}
// });

// module.exports = router;

// const router = require("express").Router();
// const KEY = process.env.STRIPE_KEY;
// const stripe = require("stripe")(KEY);

// router.post("/payment", (req, res) => {
// 	stripe.charges.create(
// 		{
// 			source: req.body.tokenId,
// 			amount: req.body.amount,
// 			currency: "usd",
// 		},
// 		(stripeErr, stripeRes) => {
// 			if (stripeErr) {
// 				res.status(500).json(stripeErr);
// 			} else {
// 				res.status(200).json(stripeRes);
// 			}
// 		}
// 	);
// });

// module.exports = router;
