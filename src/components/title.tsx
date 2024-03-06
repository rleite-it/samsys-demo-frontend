import React from "react";

interface Props {
	title: string;
}

export default function Title({ title }: Props) {
	return <h1 className="text-center">{title}</h1>;
}
