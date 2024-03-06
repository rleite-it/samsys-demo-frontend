import { useState } from "react";
import { Input } from "reactstrap";

export default function FilterInput({ filterChange }) {
	const [value, setValue] = useState<string>("");

	const handleChange = (val: string) => {
		setValue(val);
		filterChange(val);
	};

	return (
		<Input
			type="text"
			placeholder="Search clients..."
			style={{ maxWidth: "400px" }}
			value={value}
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
}
