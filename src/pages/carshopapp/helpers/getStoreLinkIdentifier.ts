import { CategoryInterface } from "../../../interfaces/categoryInterface";
import { carShopApiService } from "../../../services/carShopApiService";

const getStoreLinkIdentifier = (
	categories: CategoryInterface[],
	actualCategory: CategoryInterface | null = null
) => {
	if (categories.length === 0) {
		carShopApiService.buyCart();
		console.log("buyCart");
		return "finish";
	}

	if (!actualCategory) {
		return categories[0].identifier;
	}

	const currentCategoryIndex = categories.findIndex(
		(category) => category.id === actualCategory.id
	);
	const nextCategory = categories[currentCategoryIndex + 1];

	if (nextCategory) {
		return nextCategory.identifier;
	}

	return "finish";
};

export default getStoreLinkIdentifier;
