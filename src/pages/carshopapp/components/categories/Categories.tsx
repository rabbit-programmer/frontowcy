import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { Table } from "../../../../components/List/Table";
import { LongContent } from "../../../../components/Content/LongContent";
import { CategoryForm } from "./components/CategoryForm";
import { carShopApiService } from "../../../../services/carShopApiService";
import { CarShopCacheKeysEnum } from "../../../../enums/CarShopCacheKeysEnum";
import { CategoryItem } from "./components/CategoryItem";

const Categories = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	const { isPending, error, data } = useQuery({
		queryKey: [CarShopCacheKeysEnum.CATEGORIES],
		queryFn: () => carShopApiService.getAllCategories(),
	});

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<LongContent>
			Categories list
			<LinkButton
				onClick={() => {
					setIsOpenForm(true);
				}}>
				[Add category]
			</LinkButton>
			<Table>
				<ul>
					{data.map((category) => (
						<CategoryItem
							key={category.id}
							category={category}
						/>
					))}
				</ul>
			</Table>
			<ModalPortal
				title={"Add category"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<CategoryForm
					mode='create'
					onClose={handleClose}
				/>
			</ModalPortal>
		</LongContent>
	);
};

export { Categories };
