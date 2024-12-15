import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

const SearchPaginationButton = ({
	disabled,
	onClick,
	children,
}: {
	disabled?: boolean;
	onClick: () => void;
	children: JSX.Element;
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`bg-gray-800 py-2 px-4 rounded-lg text-white hover:bg-gray-700 ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}>
			{children}
		</button>
	);
};

const SearchPagination = ({
	page,
	totalPages,
	onPageChange,
}: {
	page: number;
	totalPages: number | undefined;
	onPageChange: (page: number) => void;
}) => {
	return (
		<div className='flex items-center gap-2 mb-6'>
			<SearchPaginationButton
				disabled={page === 1}
				onClick={() => onPageChange(1)}
			>
				<ChevronsLeft className='h-5 w-5' />
			</SearchPaginationButton>

			<SearchPaginationButton
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
			>
				<ChevronLeft className='h-5 w-5' />
			</SearchPaginationButton>

			<p className='text-sm text-white'>
				Page {page} of {totalPages}
			</p>

			<SearchPaginationButton
				disabled={page === totalPages}
				onClick={() => onPageChange(page + 1)}
			>
				<ChevronRight className='h-5 w-5' />
			</SearchPaginationButton>

			<SearchPaginationButton
				disabled={page === totalPages}
				onClick={() => onPageChange(totalPages!)}
			>
				<ChevronsRight className='h-5 w-5' />
			</SearchPaginationButton>
		</div>
	);
};

export default SearchPagination;

