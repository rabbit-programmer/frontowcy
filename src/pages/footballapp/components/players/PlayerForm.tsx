import { useForm, SubmitHandler } from "react-hook-form";
import { RequestPlayer } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { LinkButton } from "../../../../components/Form/LinkButton";

export const PlayerForm = ({ mode, onClose, player = null }) => {
	const StyledForm = styled.form`
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		.field {
			padding: 20px;
		}
		.actions {
			display: flex;
			padding: 50px;
		}
		label {
			font-size: 12px;
		}
	`;

	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm<RequestPlayer>();
	const onSubmit: SubmitHandler<RequestPlayer> = async (data) => {
		if (mode === "create") {
			await footballApiService.createPlayer(data);
		}
		if (mode === "edit") {
			await footballApiService.editPlayer(data);
		}

		if (mode === "delete") {
			await footballApiService.deletePlayer(data);
		}

		queryClient.invalidateQueries();

		onClose();
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			{(mode === "edit" || mode === "delete") && (
				<TextInput
					type='hidden'
					{...register("id", {
						required: true,
						value: player?.id,
					})}
				/>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>First name</label>
					<TextInput
						{...register("firstName", {
							required: true,
							minLength: 1,
							value: player?.firstName,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Last name</label>
					<TextInput
						{...register("lastName", {
							required: true,
							minLength: 1,
							value: player?.lastName,
						})}
					/>
				</div>
			)}
			{mode === "delete" && (
				<div className='field'>
					Are you sure, to remove {player.firstName} {player.lastName}?
				</div>
			)}
			<div className='actions'>
				<LinkButton onClick={onClose}>Cancel</LinkButton>
				<Button type='submit'>{mode === "delete" ? "Delete" : "Save"}</Button>
			</div>
		</StyledForm>
	);
};
