import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<div className='bg-gray-900 h-screen flex items-center justify-center'>
				<h1 className='text-3xl text-white font-semibold'>Initial Commit</h1>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
