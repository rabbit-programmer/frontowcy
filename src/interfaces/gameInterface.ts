export interface GameInterface {
	id: string;
	homeTeam: string;
	awayTeam: string;
	homeGoals: number;
	awayGoals: number;
	location: string;
	minutes: number;
	date: string;
}

export type RequestGame = GameInterface;
