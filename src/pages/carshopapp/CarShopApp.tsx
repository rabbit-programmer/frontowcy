import { useNavigate } from "react-router-dom";
import { LinkButton } from "../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { CarShopCacheKeysEnum } from "../../enums/CarShopCacheKeysEnum";
import { carShopApiService } from "../../services/carShopApiService";
import getStoreLinkIdentifier from "./helpers/getStoreLinkIdentifier";

const CarShopApp = () => {
	const navigate = useNavigate();

	const { isPending, error, data } = useQuery({
		queryKey: [CarShopCacheKeysEnum.CATEGORIES],
		queryFn: () => carShopApiService.getAllCategories(),
	});

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<>
			<div className='content__long'>
				<LinkButton
					primary={false}
					onClick={() => navigate("categories")}>
					<div className='menu'>Categories</div>
				</LinkButton>
				<LinkButton
					primary={false}
					onClick={() => navigate("items")}>
					<div className='menu'>Items in categories</div>
				</LinkButton>
				<LinkButton
					primary={false}
					onClick={() => navigate(`buy/${getStoreLinkIdentifier(data)}`)}>
					<div className='menu'>Buy a car</div>
				</LinkButton>
			</div>
		</>
	);
};

export { CarShopApp };
