import { Link } from "react-router";
import { Film, Search } from "lucide-react";
import { siteConfig } from "../../config/site";
// import BackButton from "./BackButton";

const Header = () => {
	return (
		<>
			<nav className='sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75'>
				<div className='container flex h-16 items-center'>
					<Link
						to='/'
						className='flex items-center gap-2 text-xl font-bold text-white'>
						<Film className='h-6 w-6' />
						{siteConfig.name}
					</Link>
					<div className='ml-auto'>
						<Link
							to='/search'
							className='flex items-center gap-2 text-gray-300 hover:text-white'>
							<Search
								strokeWidth={3}
								className='h-5 w-5'
							/>
							<span className='hidden md:inline font-semibold'>Search</span>
						</Link>
					</div>
				</div>
			</nav>
			{/* <BackButton /> */}
		</>
	);
};

export default Header;
