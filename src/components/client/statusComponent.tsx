import { Button, Col } from "reactstrap";
import { ClientService } from "../../services/clientService";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { useEffect, useState } from "react";

export interface ClientStatusProps {
	id: number;
	isActive: boolean;
	xl: number;
	style: React.CSSProperties;
	setErrorMessage: (message: string) => void;
	setSuccessMessage: (message: string) => void;
}

export default function ClientStatusComponent({
	id,
	isActive,
	xl,
	style,
	setErrorMessage,
	setSuccessMessage,
}: ClientStatusProps) {
	const [isClientActive, setIsClientActive] = useState<boolean>(isActive);

	const clientService = new ClientService();

	const enableClient = async () => {
		const resultUpdate: MessagingHelper<null> = await clientService.Enable(
			Number(id)
		);

		if (resultUpdate.success == false) {
			setErrorMessage(resultUpdate.message);
			setSuccessMessage("");
			return;
		}

		setSuccessMessage("Cliente ativado com sucesso");
		setErrorMessage("");
		setIsClientActive(true);
	};

	useEffect(() => {
		setIsClientActive(isActive);
	}, [isActive]);

	const disableClient = async () => {
		const resultUpdate: MessagingHelper<null> = await clientService.Disable(
			Number(id)
		);

		if (resultUpdate.success == false) {
			setErrorMessage(resultUpdate.message);
			setSuccessMessage("");
			return;
		}

		setSuccessMessage("Cliente desativado com sucesso");
		setErrorMessage("");
		setIsClientActive(false);
	};

	return (
		<Col xl={xl}>
			{isClientActive ? (
				<Button color="danger" style={{ ...style }} onClick={disableClient}>
					Desativar
				</Button>
			) : (
				<Button color="success" style={{ ...style }} onClick={enableClient}>
					Ativar
				</Button>
			)}
		</Col>
	);
}
