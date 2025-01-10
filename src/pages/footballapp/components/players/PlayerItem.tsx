import { useQuery } from "@tanstack/react-query";
import { PlayerInterface } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { PlayerForm } from "./PlayerForm";
import { LinkButton } from "../../../../components/Form/LinkButton";
import styled from "styled-components";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { useEffect, useState } from "react";

interface PlayerItem {
	player: PlayerInterface;
}

const StyledPlayerItem = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-start;
`;

const PlayerItem = ({ player }: PlayerItem) => {
	const [team, setTeam] = useState(null);
	const [isOpenEditForm, setIsOpenEditForm] = useState(false);
	const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
	const handleCloseEditForm = () => setIsOpenEditForm(false);
	const handleCloseDeleteForm = () => setIsOpenDeleteForm(false);

	const { isPending, error, data } = useQuery({
		queryKey: [`teamData-${player?.teamId}`],
		queryFn: () => footballApiService.getTeamById(player?.teamId || null),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<StyledPlayerItem>
			{!player?.teamId && (
				<LinkButton
					onClick={() => setIsOpenDeleteForm(true)}
					primary={false}>
					[DELETE]
				</LinkButton>
			)}
			<LinkButton onClick={() => setIsOpenEditForm(true)}>
				<StyledPlayerItem>
					<div>First Name: {player.firstName}</div>
					<div>Last Name: {player.lastName}</div>
					<div>Team: {data?.name || "None"}</div>
				</StyledPlayerItem>
			</LinkButton>
			<ModalPortal
				title={"Edit player"}
				isOpen={isOpenEditForm}
				onClose={() => setIsOpenEditForm(false)}>
				<PlayerForm
					mode='edit'
					onClose={handleCloseEditForm}
					player={player}
				/>
			</ModalPortal>
			<ModalPortal
				title={"Delete player"}
				isOpen={isOpenDeleteForm}
				onClose={() => setIsOpenDeleteForm(false)}>
				<PlayerForm
					mode='delete'
					onClose={handleCloseDeleteForm}
					player={player}
				/>
			</ModalPortal>
		</StyledPlayerItem>
	);
};

export { PlayerItem };
