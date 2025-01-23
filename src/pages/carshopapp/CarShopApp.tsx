import { useNavigate } from "react-router-dom";
import { LinkButton } from "../../components/Form/LinkButton";

const CarShopApp = () => {
	const navigate = useNavigate();

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
					onClick={() => navigate("buy")}>
					<div className='menu'>Buy a car</div>
				</LinkButton>
			</div>
		</>
	);
};

export { CarShopApp };
