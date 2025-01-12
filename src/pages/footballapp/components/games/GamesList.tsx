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

	const openForm = () => setIsOpenForm(true);
	const closeForm = () => setIsOpenForm(false);

	const {
		isPending,
		error,
		data: games,
	} = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_GAMES],
		queryFn: () => footballApiService.getAllGames(),
	});

	if (isPending) return <div>Loading...</div>;
	if (error) return <div>An error has occurred: {error.message}</div>;

	return (
		<div className='content__short'>
			<div className='content__title'>
				Games list
				<LinkButton onClick={openForm}>[Add game]</LinkButton>
			</div>

			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{games.map((game) => (
								<li key={game.id}>
									<GameItem game={game} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<ModalPortal
				title='Add game'
				isOpen={isOpenForm}
				onClose={closeForm}>
				<GameForm
					mode='create'
					onClose={closeForm}
				/>
			</ModalPortal>
		</div>
	);
};

export { GamesList };
