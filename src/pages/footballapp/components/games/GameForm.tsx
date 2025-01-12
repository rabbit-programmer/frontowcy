import { useForm, SubmitHandler } from "react-hook-form";
import { footballApiService } from "../../../../services/footballApiService";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { RequestGame } from "../../../../interfaces/gameInterface";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";

export const GameForm = ({ mode, onClose, game = null }) => {
	const StyledResult = styled.div`
		display: flex;
		flex-flow: row;
	`;
	const StyledForm = styled.form`
		display: flex;
		width: 100%;
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

	const { register, handleSubmit } = useForm<RequestGame>({
		defaultValues: {
			homeTeam: game?.homeTeam,
			awayTeam: game?.awayTeam,
		},
	});

	const queryClient = useQueryClient();
	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_TEAMS],
		queryFn: () => footballApiService.getAllTeams(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	const onSubmit: SubmitHandler<RequestGame> = async (data) => {
		if (mode === "create") {
			await footballApiService.createGame(data);
		}
		if (mode === "edit") {
			await footballApiService.editGame(data);
		}

		queryClient.invalidateQueries();

		onClose();
	};

	console.log(data);
	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			{(mode === "edit" || mode === "delete") && (
				<TextInput
					type='hidden'
					{...register("id", {
						required: true,
						value: game?.id,
					})}
				/>
			)}
			<StyledResult>
				{mode !== "delete" && (
					<div className='field'>
						<label>Home Team</label>
						<select {...register("homeTeam")}>
							{data.map((team) => (
								<option value={team.id}>{team.name}</option>
							))}
						</select>
					</div>
				)}
				{mode !== "delete" && (
					<div className='field'>
						<TextInput
							{...register("homeGoals", {
								valueAsNumber: true,
								validate: (value) => value >= 0,
								required: true,
								value: game?.homeGoals,
							})}
						/>
					</div>
				)}
				<div>VS</div>
				{mode !== "delete" && (
					<div className='field'>
						<TextInput
							{...register("awayGoals", {
								valueAsNumber: true,
								validate: (value) => value >= 0,
								required: true,
								value: game?.awayGoals,
							})}
						/>
					</div>
				)}
				{mode !== "delete" && (
					<div className='field'>
						<label>Away Team</label>
						<select {...register("awayTeam")}>
							{data.map((team) => (
								<option value={team.id}>{team.name}</option>
							))}
						</select>
					</div>
				)}
			</StyledResult>

			{mode !== "delete" && (
				<div className='field'>
					<label>Match minutes</label>
					<TextInput
						{...register("minutes", {
							valueAsNumber: true,
							validate: (value) => value >= 90,
							required: true,
							value: game?.minutes,
						})}
					/>
				</div>
			)}

			{mode !== "delete" && (
				<div className='field'>
					<label>Location</label>
					<TextInput
						{...register("location", {
							required: true,
							minLength: 1,
							value: game?.location,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Date</label>
					<TextInput
						type='date'
						{...register("date", {
							required: true,
							minLength: 1,
							value: game?.date,
						})}
					/>
				</div>
			)}

			<div className='actions'>
				<LinkButton onClick={onClose}>Cancel</LinkButton>
				<Button type='submit'>{mode === "delete" ? "Delete" : "Save"}</Button>
			</div>
		</StyledForm>
	);
};
