import { CategoryInterface } from "../interfaces/categoryInterface";
import { GameInterface, RequestGame } from "../interfaces/gameInterface";
import { PlayerInterface, RequestPlayer } from "../interfaces/playerInterface";
import { TeamInterface, TeamRequest } from "../interfaces/teamInterface";

class CarShopApiService {
	private API_URL = "http://localhost:3000";

	async getAllCategories(): Promise<CategoryInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/categories`);
			const categories: CategoryInterface[] = await response.json();
			return categories;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async createCategory(category: CategoryInterface): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/categories`, {
				method: "POST",
				body: JSON.stringify(category),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async editCategory(category: CategoryInterface): Promise<void> {
		try {
			const response = await fetch(
				`${this.API_URL}/categories/${category.id}`,
				{
					method: "PATCH",
					body: JSON.stringify(category),
				}
			);
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

	private logApiError(e: Error) {
		console.error(
			`Problem with query, message: ${e.message}, 
			stack: ${e.stack}`
		);
	}
}

export const carShopApiService = new CarShopApiService();
