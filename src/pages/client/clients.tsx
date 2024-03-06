import Title from "../../components/title";
import FilterInput from "../../components/filterInput";
import { Button, Col, Container, Row } from "reactstrap";
import ClientList from "../../components/client/clientList";
import { useEffect, useState } from "react";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientService } from "../../services/clientService";

export default function Clients() {
	const [clients, setClients] = useState<ClientDTO[]>([]);
	const [filteredClients, setFilteredClients] = useState<ClientDTO[] | []>([]);
	const clientService = new ClientService();

	const handleFilterChange = (value: string) => {
		if (!value) {
			setFilteredClients(clients);
			return;
		}

		const filtered = clients.filter((client) =>
			client.name.toLowerCase().includes(value.toLowerCase())
		);

		setFilteredClients(filtered);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await clientService.GetAll();
				if (result.success && result.obj) {
					setClients(result.obj);
					setFilteredClients(result.obj);
				}
			} catch (error) {
				console.error("Error fetching clients:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<Container>
			<Row className="mb-5">
				<Col>
					<Title title="List of Clients" />
				</Col>
			</Row>
			{/* Row for Filter Input and Add Button */}
			<Row className="mb-3 justify-content-center">
				<Col xs="auto" className="d-flex align-items-center">
					<FilterInput filterChange={handleFilterChange} />
				</Col>
				<Col xs="auto">
					<Button color="success">Add Client</Button>
				</Col>
			</Row>

			{/* Row for List of Cards */}
			<Row>
				<Col>
					<ClientList clients={filteredClients} />
				</Col>
			</Row>
		</Container>
	);
}
