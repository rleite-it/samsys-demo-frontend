export default function formatDate(dateString: Date): string {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
	const year = date.getFullYear().toString();
	return `${day}/${month}/${year}`;
}
