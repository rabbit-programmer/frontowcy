import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { PlayerItem } from "./PlayerItem";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { Table } from "../../../../components/List/Table";
import { LongContent } from "../../../../components/Content/LongContent";

const Items = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	// const { isPending, error, data } = useQuery({
	// 	queryKey: [FootballCacheKeysEnum.LIST_PLAYERS],
	// 	queryFn: () => footballApiService.getAllPlayers(),
	// });

	// if (isPending) return "Loading...";

	// if (error) return "An error has occurred: " + error.message;

	return (
		<LongContent>
			{/* <div className='content__title'> */}
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
					<li>Item nr1</li>
					<li>Item nr2</li>
				</ul>
			</Table>
			<ModalPortal
				title={"Add category"}
				isOpen={isOpenForm}
				onClose={handleClose}></ModalPortal>
		</LongContent>
	);
};

export { Items };
