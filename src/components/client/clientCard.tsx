import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { AvatarIcon } from "../../assets/avatarIcon";

interface Props {
	client: ClientDTO;
}

export default function ClientCard({ client }: Props) {
	const navigate = useNavigate();

	return (
		<Card
			className="d-flex flex-column align-items-center justify-content-center mb-3"
			style={{ width: "200px", height: "100%" }}
		>
			<AvatarIcon width={100} height={100} />
			<CardBody
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div>
					<CardTitle tag="h5" className="font-weight-bold">
						{client.name}
					</CardTitle>
					<CardText className="text-center">{client.phoneNumber}</CardText>
					<CardText className="text-center">
						{formatDate(client.birthDate)}
					</CardText>
				</div>
				<button onClick={() => navigate(`/client/edit/${client.id}`)}>
					Edit
				</button>
			</CardBody>
		</Card>
	);
}
