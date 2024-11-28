import { PlayerInterface } from "../interfaces/playerInterface";
import { TeamInterface } from "../interfaces/teamInterface";

class FootballApiService {
	private API_URL = "http://localhost:3000";

	async getAllPlayers(): Promise<PlayerInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/players`);
			const players: PlayerInterface[] = await response.json();
			return players;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async createPlayer(): Promise<void> {}
	async editPlayer(): Promise<void> {}
	async getAllTeams(): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/teams`);
			const teams: Player[] = await response.json();
			return teams;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async getTeamById(id: string): Promise<TeamInterface> {
		try {
			const response = await fetch(`${this.API_URL}/teams/${id}`);
			const team: TeamInterface = await response.json();
			return team;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async createTeam(): Promise<void> {}
	async editTeam(): Promise<void> {}
	async getAllGames(): Promise<void> {}
	async createGame(): Promise<void> {}
	async editGame(): Promise<void> {}
	private logApiError(e: Error) {
		console.error(
			`Problem with query, message: ${e.message}, 
			stack: ${e.stack}`
		);
	}
}

export const footballApiService = new FootballApiService();
