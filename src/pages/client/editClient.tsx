import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientEditDTO } from "../../models/client/clientEditDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";
import { CloseIcon } from "../../assets/closeIcon";

export default function EditClient() {
	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();
	const [clientToUpdate, setClientToUpdate] = useState<ClientEditDTO>();
	const [isActive, setIsActive] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	const clientService = new ClientService();

	const get = async () => {
		const resultGetClient: MessagingHelper<ClientDTO | null> =
			await clientService.Get(Number(id));

		if (!resultGetClient.success) {
			setErrorMessage(resultGetClient.message);
			setSuccessMessage("");
			return;
		}

		const client: ClientEditDTO = {
			name: resultGetClient.obj!.name,
			phoneNumber: resultGetClient.obj!.phoneNumber,
			concurrencyToken: resultGetClient.obj!.concurrencyToken,
		};

		setErrorMessage("");
		setClientToUpdate(client);
		setIsActive(resultGetClient.obj!.isActive);
	};

	const update = async () => {
		const resultUpdate: MessagingHelper<ClientDTO | null> =
			await clientService.Update(Number(id), clientToUpdate!);

		if (!resultUpdate.success) {
			setErrorMessage(resultUpdate.message);
			setSuccessMessage("");
			return;
		}

		setSuccessMessage("Cliente atualizado com sucesso");
		setErrorMessage("");
		setClientToUpdate(resultUpdate.obj!);
	};

	useEffect(() => {
		get();
	}, []);

	return (
		<div
			className="edit-client-container"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h1 className="text-center">Editar Cliente</h1>
			<div className="form-container">
				<Form style={{ maxWidth: "600px", marginTop: "3rem" }}>
					<FormGroup style={{ textAlign: "left" }}>
						<Label for="name">Nome:</Label>
						<Input
							type="text"
							id="name"
							value={clientToUpdate?.name ?? ""}
							onChange={(e) =>
								setClientToUpdate({ ...clientToUpdate, name: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup style={{ textAlign: "left" }}>
						<Label for="phoneNumber">Contacto:</Label>
						<Input
							type="text"
							id="phoneNumber"
							value={clientToUpdate?.phoneNumber ?? ""}
							onChange={(e) =>
								setClientToUpdate({
									...clientToUpdate,
									phoneNumber: e.target.value,
								})
							}
						/>
					</FormGroup>
					<Button color="primary" onClick={update}>
						Atualizar
					</Button>
				</Form>
			</div>
			<div
				style={{
					marginTop: "3rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<ClientStatusComponent
					xl={12}
					id={Number(id)}
					isActive={isActive}
					style={{ marginTop: "1em" }}
					setErrorMessage={setErrorMessage}
					setSuccessMessage={setSuccessMessage}
				/>
				{errorMessage && (
					<Alert color="danger" className="alert">
						{errorMessage}
					</Alert>
				)}
				{successMessage && (
					<Alert color="success" className="alert">
						{successMessage}
					</Alert>
				)}
				{/* Clickable div with CloseIcon */}
				<div
					className="close-button"
					onClick={() => navigate("/clients")}
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						cursor: "pointer",
					}}
				>
					<CloseIcon width={40} height={40} />
				</div>
			</div>
		</div>
	);
}
