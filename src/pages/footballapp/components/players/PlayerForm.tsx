import { useForm, SubmitHandler } from "react-hook-form";
import { RequestPlayer } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";

export const PlayerForm = ({ mode, onClose, player = null }) => {
	const StyledForm = styled.form`
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		.field {
			padding: 20px;
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
		} else {
			await footballApiService.editPlayer(data);
		}

		queryClient.invalidateQueries({
			queryKey: [FootballCacheKeysEnum.LIST_PLAYERS],
		});

		onClose();
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			{mode === "edit" && (
				<TextInput
					type='hidden'
					{...register("id", {
						required: true,
						value: player?.id,
					})}
				/>
			)}
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
			<div className='field'>
				<Button type='submit'>Save</Button>
			</div>
		</StyledForm>
	);
};
