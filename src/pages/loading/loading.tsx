import { LoadingIcon } from "../../assets/loadingIcon";
import "./loading.css";

export default function Loading() {
	return (
		<div className="loading-container">
			<div className="loading-content">
				<LoadingIcon width="5rem" height="5rem" />
			</div>
		</div>
	);
}
