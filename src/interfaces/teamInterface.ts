export interface TeamInterface {
	id: string;
	name: string;
	city: string;
	startYear: string;
}

interface TeamPlayerInterface {
	value: string;
	label: string;
}

export type TeamRequest = TeamInterface & { players: TeamPlayerInterface[] };
