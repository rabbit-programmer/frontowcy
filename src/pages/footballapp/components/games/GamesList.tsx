import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { GameForm } from "./GameForm";
import { GameItem } from "./GameItem";

const GamesList = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_GAMES],
		queryFn: () => footballApiService.getAllGames(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className='content__short'>
			<div className='content__title'>
				Games list
				<LinkButton
					onClick={() => {
						setIsOpenForm(true);
					}}>
					[Add game]
				</LinkButton>
			</div>
			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{data.map((game) => (
								<li key={game.id}>
									<div style={{ display: "flex" }}>
										<GameItem game={game} />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<ModalPortal
				title={"Add game"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<GameForm
					mode='create'
					onClose={handleClose}
				/>
			</ModalPortal>
		</div>
	);
};

export { GamesList };
