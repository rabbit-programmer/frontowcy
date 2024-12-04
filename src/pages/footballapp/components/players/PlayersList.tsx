import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { PlayerForm } from "./PlayerForm";
import { PlayerItem } from "./PlayerItem";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";

const PlayerList = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_PLAYERS],
		queryFn: () => footballApiService.getAllPlayers(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className='content__short'>
			<div className='content__title'>
				Players list
				<LinkButton
					onClick={() => {
						setIsOpenForm(true);
					}}>
					[Add player]
				</LinkButton>
			</div>
			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{data.map((player) => (
								<li key={player.id}>
									<div style={{ display: "flex" }}>
										<PlayerItem player={player} />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<ModalPortal
				title={"Add player"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<PlayerForm
					mode='create'
					onClose={handleClose}
				/>
			</ModalPortal>
		</div>
	);
};

export { PlayerList };
