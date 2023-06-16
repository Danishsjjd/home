import { Helmet, HelmetProvider } from 'react-helmet-async';
import logo from "../assets/logo-black.png";
// Todo: summary_large_image

export default function MetaData({ title, description, image }) {
	const t = `${title} - Home`;
	const d = "We are always here to make your house the Home.";
	return (
		<HelmetProvider>
			<Helmet>
				{/* <!-- Primary Meta Tags --> */}
				<title>{title ? t : "Home"}</title>
				<meta name="title" content={title ? t : "Home"} />
				<meta name="description" content={description ? description : d} />

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content={window.location.href} />
				<meta property="og:title" content={title ? t : "Home"} />
				<meta
					property="og:description"
					content={description ? description : d}
				/>
				<meta property="og:image" content={image || logo} />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={window.location.href} />
				<meta property="twitter:title" content={title ? t : "Home"} />
				<meta
					property="twitter:description"
					content={description ? description : d}
				/>
				<meta property="twitter:image" content={image || logo} />
			</Helmet>
		</HelmetProvider>
	);
}
