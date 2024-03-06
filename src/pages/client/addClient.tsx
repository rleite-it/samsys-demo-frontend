import { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/closeIcon";
import { ClientAddDTO } from "../../models/client/clientAddDTO";

export default function CreateClient() {
	const navigate = useNavigate();

	const [newClient, setNewClient] = useState<ClientAddDTO>({
		name: "",
		phoneNumber: "",
		birthDate: new Date(),
	});
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	const clientService = new ClientService();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setNewClient((prevClient) => ({
			...prevClient,
			[name]: value,
		}));
		setErrorMessage("");
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setNewClient((prevClient) => ({
			...prevClient,
			birthDate: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!newClient.phoneNumber!.match(/[0-9]/g)) {
			setErrorMessage("Número de telemóvel inválido");
			return;
		}

		const result: MessagingHelper<ClientDTO | null> =
			await clientService.Insert(newClient);
		if (result.success) {
			setSuccessMessage("Cliente criado com sucesso");
			setErrorMessage("");
			setNewClient({
				name: "",
				phoneNumber: "",
				birthDate: "",
			});
		} else {
			setErrorMessage(result.message);
			setSuccessMessage("");
		}
	};

	return (
		<div
			className="create-client-container"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h1 className="text-center">Editar Cliente</h1>
			<div className="form-container">
				<Form
					style={{ maxWidth: "600px", marginTop: "3rem" }}
					onSubmit={handleSubmit}
				>
					<FormGroup style={{ textAlign: "left" }}>
						<Label for="name">Nome:</Label>
						<Input
							type="text"
							id="name"
							name="name"
							value={newClient.name}
							onChange={handleInputChange}
						/>
					</FormGroup>
					<FormGroup style={{ textAlign: "left" }}>
						<Label for="phoneNumber">Contacto:</Label>
						<Input
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							value={newClient.phoneNumber}
							onChange={handleInputChange}
						/>
					</FormGroup>
					<FormGroup style={{ width: "100%" }}>
						<Label for="birthDate">Data de Nascimento:</Label>
						<Input
							type="date"
							id="birthDate"
							name="birthDate"
							value={newClient.birthDate}
							onChange={handleDateChange}
						/>
					</FormGroup>
					<Button color="primary" type="submit">
						Criar Cliente
					</Button>
				</Form>
				<div style={{ marginTop: "3rem" }}>
					{errorMessage && <Alert color="danger">{errorMessage}</Alert>}
					{successMessage && <Alert color="success">{successMessage}</Alert>}
				</div>
			</div>
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
	);
}
