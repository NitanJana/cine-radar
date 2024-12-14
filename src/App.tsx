import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/layout/Header";
import { HomePage, MoviePage, PersonPage, SearchPage } from "./pages";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className='bg-gray-900 min-h-screen text-white'>
					<Header />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/movie/:id' element={<MoviePage />} />
						<Route path='/person/:id' element={<PersonPage />} />
						<Route path='/search' element={<SearchPage />} />
					</Routes>
				</div>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
