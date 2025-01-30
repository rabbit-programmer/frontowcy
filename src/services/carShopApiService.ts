import { CategoryInterface } from "../interfaces/categoryInterface";
import { ItemInterface } from "../interfaces/itemInterface";
import { PlayerInterface, RequestPlayer } from "../interfaces/playerInterface";

class CarShopApiService {
	private API_URL = "http://localhost:3000";

	async getAllItems(): Promise<ItemInterface[]> {
		try {
			const response = await fetch(`${this.API_URL}/items`);
			const items: ItemInterface[] = await response.json();
			return items;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async getAllItemsWithCategoryId(
		categoryId: string
	): Promise<ItemInterface[]> {
		try {
			const response = await fetch(
				`${this.API_URL}/items?categoryId=${categoryId}`
			);
			const items: ItemInterface[] = await response.json();
			return items;
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async createItem(item: ItemInterface): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/items`, {
				method: "POST",
				body: JSON.stringify(item),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async editItem(item: ItemInterface): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/items/${item.id}`, {
				method: "PATCH",
				body: JSON.stringify(item),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

	async deleteItem(item: ItemInterface): Promise<void> {
		try {
			const response = await fetch(`${this.API_URL}/items/${item.id}`, {
				method: "DELETE",
				body: JSON.stringify(item),
			});
			return await response.json();
		} catch (e: unknown) {
			this.logApiError(e as Error);
			throw new Error((e as Error).message);
		}
	}

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

	async deleteCategory(category: CategoryInterface): Promise<void> {
		try {
			const response = await fetch(
				`${this.API_URL}/categories/${category.id}`,
				{
					method: "DELETE",
					body: JSON.stringify(category),
				}
			);

			const items = await this.getAllItemsWithCategoryId(category?.id);
			for (const item of items) {
				await this.deleteItem(item);
			}

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
