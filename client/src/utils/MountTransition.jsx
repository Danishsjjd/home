import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: -0, y: 20 },
};

const variantsDashboard = {
	hidden: { opacity: 0, x: 20, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 20, y: -0 },
};

const MountTransition = ({ children, className, dashboard }) => {
	return (
		<motion.article
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={
				dashboard
					? window.innerWidth > 1280
						? variantsDashboard
						: variants
					: variants
			}
			transition={{ duration: 0.4, type: "easeInOut" }}
			className={className}
		>
			{children}
		</motion.article>
	);
};
export default MountTransition;
