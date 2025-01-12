import { GameInterface, RequestGame } from "../interfaces/gameInterface";
import { PlayerInterface, RequestPlayer } from "../interfaces/playerInterface";
import { TeamInterface, TeamRequest } from "../interfaces/teamInterface";

type TopTeam = {
	team: TeamInterface;
	goals: number;
};

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
	async getAllGames(): Promise<GameInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/games`);
			const games: GameInterface[] = await response.json();
			return games;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async createGame(game: RequestGame): Promise<GameInterface> {
		try {
			const response = await fetch(`${this.API_URL}/games`, {
				method: "POST",
				body: JSON.stringify(game),
			});

			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}
	async editGame(game: RequestGame): Promise<GameInterface> {
		try {
			const response = await fetch(`${this.API_URL}/games/${game.id}`, {
				method: "PATCH",
				body: JSON.stringify(game),
			});

			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	getLastGame = (games: GameInterface[]): GameInterface | null =>
		games.reduce(
			(latest, game) =>
				new Date(game.date) > new Date(latest.date) ? game : latest,
			games[0]
		);

	countGamesByPeriod = (
		games: GameInterface[],
		period: string,
		referenceDate: Date = new Date()
	): number => {
		return games.filter((game) => {
			const gameDate = new Date(game.date);

			if (period === "week") {
				const weekStart = new Date(referenceDate);
				weekStart.setDate(referenceDate.getDate() - referenceDate.getDay());
				const weekEnd = new Date(weekStart);
				weekEnd.setDate(weekEnd.getDate() + 6);
				return gameDate >= weekStart && gameDate <= weekEnd;
			}

			if (period === "month") {
				return (
					gameDate.getFullYear() === referenceDate.getFullYear() &&
					gameDate.getMonth() === referenceDate.getMonth()
				);
			}

			if (period === "year") {
				return gameDate.getFullYear() === referenceDate.getFullYear();
			}

			return false;
		}).length;
	};

	getTopTeamsByGoals = async (): Promise<TopTeam[]> => {
		const games = await this.getAllGames();
		const teamGoals: Record<string, number> = {};

		console.log(games);
		games.forEach((game) => {
			teamGoals[game.homeTeam] =
				(teamGoals[game.homeTeam] || 0) + game.homeGoals;
			teamGoals[game.awayTeam] =
				(teamGoals[game.awayTeam] || 0) + game.awayGoals;
		});

		const topTeams = Object.entries(teamGoals)
			.map(([teamId, goals]) => ({ teamId, goals }))
			.sort((a, b) => b.goals - a.goals)
			.slice(0, 3);

		const teams = [];
		for (const topTeam of topTeams) {
			const team = await this.getTeamById(topTeam.teamId);
			teams.push({ team, goals: topTeam.goals });
		}

		return teams;
	};

	private logApiError(e: Error) {
		console.error(
			`Problem with query, message: ${e.message}, 
			stack: ${e.stack}`
		);
	}
}

export const footballApiService = new FootballApiService();
