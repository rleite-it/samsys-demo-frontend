import { Col, Container, Row } from "reactstrap";
import ClientCard from "./clientCard";
import { ClientDTO } from "../../models/client/clientDTO";

interface Props {
	clients: ClientDTO[];
}

export default function ClientList({ clients }: Props) {
	return (
		<div
			style={{
				maxHeight: "650px",
				overflowY: "auto",
			}}
		>
			<Container>
				<Row xs={1} sm={2} md={3} lg={4} xl={5}>
					{/* Map over the clients array and render a ClientCard for each */}
					{clients.map((client, index) => (
						<Col key={index} className="mb-3">
							<ClientCard client={client} />
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}
