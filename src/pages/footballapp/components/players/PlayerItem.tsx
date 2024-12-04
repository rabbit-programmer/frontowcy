import { useQuery } from "@tanstack/react-query";
import { PlayerInterface } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { PlayerForm } from "./PlayerForm";
import { LinkButton } from "../../../../components/Form/LinkButton";
import styled from "styled-components";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { useState } from "react";

interface PlayerItem {
	player: PlayerInterface;
}

const PlayerItem = ({ player }: PlayerItem) => {
	let team = null;

	if (player.teamId) {
		const { data } = useQuery({
			queryKey: [`teamData-${player.teamId}`],
			queryFn: () => footballApiService.getTeamById(player.teamId),
		});

		team = data || "";
	}

	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);

	const StyledPlayerItem = styled.div`
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
	`;

	return (
		<StyledPlayerItem>
			<LinkButton onClick={() => setIsOpenForm(true)}>
				<StyledPlayerItem>
					<div>First Name: {player.firstName}</div>
					<div>Last Name: {player.lastName}</div>
					<div>Team: {team?.name || "None"}</div>
				</StyledPlayerItem>
			</LinkButton>
			<ModalPortal
				title={"Edit player"}
				isOpen={isOpenForm}
				onClose={() => setIsOpenForm(false)}>
				<PlayerForm
					mode='edit'
					onClose={handleClose}
					player={player}
				/>
			</ModalPortal>
		</StyledPlayerItem>
	);
};

export { PlayerItem };
