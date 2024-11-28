export interface PlayerInterface {
	id: string;
	firstName: string;
	lastName: string;
	teamId: string;
}

export type RequestPlayer = Omit<PlayerInterface, "teamId">;