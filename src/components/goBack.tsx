import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../assets/closeIcon";

export default function GoBack({ url }) {
	const navigate = useNavigate();

	return (
		<div
			className="close-button"
			onClick={() => navigate(url)}
			style={{
				position: "absolute",
				top: "10px",
				left: "10px",
				cursor: "pointer",
			}}
		>
			<CloseIcon width={40} height={40} />
		</div>
	);
}
