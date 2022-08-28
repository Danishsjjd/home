const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tryCatch = require("./utils/tryCatch");
const { User } = require("./models/users");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/users/google/callback",
		},
		function (accessToken, refreshToken, profile, cb) {
			const getUser = async () => {
				const [user] = await tryCatch(
					User.findOne({ email: profile._json.email })
				);
				if (user?.fromGoogle == false) {
					return cb(null, false, {
						message: "already sign with email password",
					});
				}
				if (user?.fromGoogle) {
					const token = jwt.sign(
						{ _id: user.id, role: user.role },
						process.env.ACCESS_TOKEN_KEY
					);
					cb(null, token);
					return;
				}
				const [newUser, newErr] = await tryCatch(
					User.create({
						email: profile._json.email,
						fromGoogle: true,
						googleAvatar: profile._json.picture,
						username: profile.displayName,
					})
				);
				if (!newUser) return cb(newErr || "something failed");
				const token = jwt.sign(
					{ _id: newUser.id, role: newUser.role },
					process.env.ACCESS_TOKEN_KEY
				);
				cb(null, token);
			};
			getUser();
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
