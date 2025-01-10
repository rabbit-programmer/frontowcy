import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { TeamForm } from "./TeamForm";
import { LinkButton } from "../../../../components/Form/LinkButton";
import styled from "styled-components";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { useState } from "react";
import { TeamInterface } from "../../../../interfaces/teamInterface";

interface TeamItemProps {
	team: TeamInterface;
}

const TeamItem = ({ team }: TeamItemProps) => {
	const [isOpenEditForm, setIsOpenEditForm] = useState(false);
	const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
	const handleCloseEditForm = () => setIsOpenEditForm(false);
	const handleCloseDeleteForm = () => setIsOpenDeleteForm(false);

	const StyledPlayerItem = styled.div`
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
	`;

	return (
		<StyledPlayerItem>
			{!team && (
				<LinkButton
					onClick={() => setIsOpenDeleteForm(true)}
					primary={false}>
					[DELETE]
				</LinkButton>
			)}
			<LinkButton onClick={() => setIsOpenEditForm(true)}>
				<StyledPlayerItem>
					<div>Team Name: {team.name}</div>
					<div>City: {team.city}</div>
					<div>Start Year: {team.startYear}</div>
				</StyledPlayerItem>
			</LinkButton>
			<ModalPortal
				title={"Edit team"}
				isOpen={isOpenEditForm}
				onClose={() => setIsOpenEditForm(false)}>
				<TeamForm
					mode='edit'
					onClose={handleCloseEditForm}
					team={team}
				/>
			</ModalPortal>
			<ModalPortal
				title={"Delete player"}
				isOpen={isOpenDeleteForm}
				onClose={() => setIsOpenDeleteForm(false)}>
				<TeamForm
					mode='delete'
					onClose={handleCloseDeleteForm}
					team={team}
				/>
			</ModalPortal>
		</StyledPlayerItem>
	);
};

export { TeamItem };
