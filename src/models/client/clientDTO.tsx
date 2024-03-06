export interface ClientDTO {
	id?: number;
	name: string;
	birthDate: Date;
	phoneNumber: string;
	isActive: boolean;
	concurrencyToken: string;
}
