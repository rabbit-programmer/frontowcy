import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LinkButton } from "../../../../../components/Form/LinkButton";
import { CarShopCacheKeysEnum } from "../../../../../enums/CarShopCacheKeysEnum";
import { carShopApiService } from "../../../../../services/carShopApiService";
import getStoreLinkIdentifier from "../../../helpers/getStoreLinkIdentifier";
import { useState } from "react";
import { CategoryInterface } from "../../../../../interfaces/categoryInterface";
import { StoreItem } from "./StoreItem";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Store = () => {
	const chooseOptions = useSelector(
		(state: RootState) => state.storeSelector.chooseOptions
	);

	const getCartValue = () => {
		return chooseOptions.reduce((acc, item) => acc + item.price, 0);
	};

	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const [actualCategoryName, setActualCategoryName] = useState<string>(
		location.pathname.split("/").pop() || ""
	);

	const [categories, setCategories] = useState<CategoryInterface[]>([]);
	const [actualCategory, setActualCategory] =
		useState<CategoryInterface | null>(null);

	const StyledCart = styled.div`
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
		margin-top: 20px;
		ul {
			list-style-type: square;
			margin: 40px 0;
		}
		li {
			margin-top: 5px;
			padding: 0;
		}
		justify-content: center;
	`;

	const {
		isPending,
		error,
		data: items,
	} = useQuery({
		queryKey: [CarShopCacheKeysEnum.CATEGORIES],
		queryFn: () =>
			carShopApiService.getAllCategories().then((categories) => {
				const actualCategory = categories.find((category) => {
					if (category.identifier === actualCategoryName) {
						setActualCategory(category);
						return category;
					}
				});
				setCategories(categories);
				return carShopApiService.getAllItemsWithCategoryId(actualCategory?.id);
			}),
	});

	if (actualCategoryName === "finish") {
		return <StyledCart>Thank you for purchase</StyledCart>;
	}

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const nextCategoryIdentifier = getStoreLinkIdentifier(
		categories,
		actualCategory
	);

	return (
		<>
			<div className='content__long'>
				<div>Actual category: {actualCategory?.name}</div>
				<div>
					{items.map((item) => (
						<StoreItem
							item={item}
							key={item.id}
						/>
					))}
				</div>
				<div>
					<LinkButton
						onClick={() => {
							setActualCategoryName(nextCategoryIdentifier);
							setActualCategory(null);
							navigate(`${location.pathname}/${nextCategoryIdentifier}`);
							setTimeout(() => {
								queryClient.invalidateQueries();
							}, 100);
						}}>
						Next step
					</LinkButton>
				</div>
			</div>
			<StyledCart>
				<div>Cart:</div>
				<ul>
					{chooseOptions.map((option) => (
						<li key={option.id}>
							{option.name}: {option.price} zł
						</li>
					))}
				</ul>
				<div>Summary: {getCartValue()} zł</div>
			</StyledCart>
		</>
	);
};

export { Store };
