import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollReset = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		// Reset scroll position to top with smooth behavior when path changes
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return null;
};

export default ScrollReset;
