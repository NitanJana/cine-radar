import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

import Header from "./components/layout/Header";
import { HomePage, MoviePage, PersonPage, SearchPage } from "./pages";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className='bg-gray-900 min-h-screen'>
					<Header />
					<AnimatedRoutes />
				</div>
			</Router>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

function AnimatedRoutes() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location]);

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={location.pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}>
				<Routes location={location}>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/movie/:id'
						element={<MoviePage />}
					/>
					<Route
						path='/person/:id'
						element={<PersonPage />}
					/>
					<Route
						path='/search'
						element={<SearchPage />}
					/>
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
}

export default App;
