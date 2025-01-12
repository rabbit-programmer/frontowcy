import { LinkButton } from "../../../../components/Form/LinkButton";
import styled from "styled-components";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { useState } from "react";
import { GameInterface } from "../../../../interfaces/gameInterface";
import { GameForm } from "./GameForm";
import { footballApiService } from "../../../../services/footballApiService";
import { useQuery } from "@tanstack/react-query";

interface GameItemProps {
	game: GameInterface;
}

const GameItem = ({ game }: GameItemProps) => {
	const [isOpenEditForm, setIsOpenEditForm] = useState(false);
	const handleCloseEditForm = () => setIsOpenEditForm(false);

	const {
		isPending: isPendingHomeTeam,
		error: errorHomeTeam,
		data: dataHomeTeam,
	} = useQuery({
		queryKey: [`teamData-${game?.homeTeam}`],
		queryFn: () => footballApiService.getTeamById(game?.homeTeam || ""),
	});

	const {
		isPending: isPendingAwayTeam,
		error: errorAwayTeam,
		data: dataAwayTeam,
	} = useQuery({
		queryKey: [`teamData-${game?.awayTeam}`],
		queryFn: () => footballApiService.getTeamById(game?.awayTeam || ""),
	});

	if (isPendingHomeTeam || isPendingAwayTeam) return "Loading...";

	if (errorHomeTeam) return "An error has occurred: " + errorHomeTeam.message;
	if (errorAwayTeam) return "An error has occurred: " + errorAwayTeam.message;

	const StyledPlayerItem = styled.div`
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
	`;

	return (
		<StyledPlayerItem>
			<LinkButton onClick={() => setIsOpenEditForm(true)}>
				<StyledPlayerItem>
					<div>
						{`${dataHomeTeam?.name} (${game.homeGoals}) : (${game.awayGoals}) ${dataAwayTeam?.name}`}
					</div>
					<div>Minutes: {game.minutes}</div>
					<div>Location: {game.location}</div>
					<div>Date: {game.date}</div>
				</StyledPlayerItem>
			</LinkButton>
			<ModalPortal
				title={"Edit game"}
				isOpen={isOpenEditForm}
				onClose={() => setIsOpenEditForm(false)}>
				<GameForm
					mode='edit'
					onClose={handleCloseEditForm}
					game={game}
				/>
			</ModalPortal>
		</StyledPlayerItem>
	);
};

export { GameItem };
