import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { PlayerItem } from "./PlayerItem";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { Table } from "../../../../components/List/Table";
import { LongContent } from "../../../../components/Content/LongContent";
import { carShopApiService } from "../../../../services/carShopApiService";
import { CarShopCacheKeysEnum } from "../../../../enums/CarShopCacheKeysEnum";
import { Item } from "./components/Item";
import { ItemForm } from "./components/ItemForm";

const Items = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	const { isPending, error, data } = useQuery({
		queryKey: [CarShopCacheKeysEnum.ITEMS],
		queryFn: () => carShopApiService.getAllItems(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<LongContent>
			Items list
			<LinkButton
				onClick={() => {
					setIsOpenForm(true);
				}}>
				[Add item]
			</LinkButton>
			{/* </div> */}
			<Table>
				<ul>
					{data.map((item) => (
						<Item
							key={item.id}
							item={item}
						/>
					))}
				</ul>
			</Table>
			<ModalPortal
				title={"Add item"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<ItemForm
					mode='create'
					onClose={handleClose}
				/>
			</ModalPortal>
		</LongContent>
	);
};

export { Items };
