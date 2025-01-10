import { PlayerInterface, RequestPlayer } from "../interfaces/playerInterface";
import { TeamInterface, TeamRequest } from "../interfaces/teamInterface";

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
	async getPlayersWithoutTeam(): Promise<PlayerInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/players?teamId=null`);
			const players: PlayerInterface[] = await response.json();
			return players;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async createPlayer(player: RequestPlayer): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/players`, {
				method: "POST",
				body: JSON.stringify(player),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async editPlayer(player: RequestPlayer): Promise<PlayerInterface> {
		try {
			const response = await fetch(`${this.API_URL}/players/${player.id}`, {
				method: "PATCH",
				body: JSON.stringify(player),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async deletePlayer(player: RequestPlayer): Promise<PlayerInterface> {
		try {
			const response = await fetch(`${this.API_URL}/players/${player.id}`, {
				method: "DELETE",
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async getAllTeams(): Promise<TeamInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/teams`);
			const teams: TeamInterface[] = await response.json();
			return teams;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async getTeamById(id: string): Promise<TeamInterface> {
		if (!id) return null;
		try {
			const response = await fetch(`${this.API_URL}/teams/${id}`);
			const team: TeamInterface = await response.json();
			console.log(team);
			return team;
		} catch (e: unknown) {
			console.log(e);
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async createTeam(team: TeamRequest): Promise<TeamInterface> {
		try {
			const response = await fetch(`${this.API_URL}/teams`, {
				method: "POST",
				body: JSON.stringify(team),
			});
			const teamResponse = await response.json();

			for (const player of team?.players || []) {
				await this.editPlayer({ id: player.value, teamId: teamResponse.id });
			}

			return teamResponse;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async editTeam(team: TeamRequest): Promise<TeamInterface> {
		try {
			const oldTeam = await this.getTeamById(team.id);
			const response = await fetch(`${this.API_URL}/teams/${team.id}`, {
				method: "PATCH",
				body: JSON.stringify(team),
			});
			const teamResponse = await response.json();

			for (const player of oldTeam?.players || []) {
				await this.editPlayer({ id: player.value, teamId: null });
			}

			for (const player of team?.players || []) {
				await this.editPlayer({ id: player.value, teamId: team.id });
			}

			return teamResponse;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
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
