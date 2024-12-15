import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<div className='ml-5'>
			<button
				className='flex items-center gap-2 h-10 text-gray-300 hover:text-white font-semibold'
				onClick={() => void navigate(-1)}>
				<ArrowLeft
					strokeWidth={2}
					className='h-5 w-5'
				/>
				back
			</button>
		</div>
	);
};

export default BackButton;
