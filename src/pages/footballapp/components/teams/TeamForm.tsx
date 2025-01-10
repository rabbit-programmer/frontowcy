import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { footballApiService } from "../../../../services/footballApiService";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { LinkButton } from "../../../../components/Form/LinkButton";
import Select from "react-select";
import { TeamRequest } from "../../../../interfaces/teamInterface";

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

export const TeamForm = ({ mode, onClose, team = null }) => {
	const {
		register,
		handleSubmit,
		getValues,
		onChange,
		control,
		formState: { errors },
		watch,
	} = useForm<TeamRequest>({
		defaultValues: {
			players: [...(team?.players || [])],
		},
	});

	const queryClient = useQueryClient();

	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_PLAYERS_WITHOUT_TEAM],
		queryFn: () => footballApiService.getPlayersWithoutTeam(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;
	console.log(data);

	const teamPlayers = [...data, ...(team?.players || [])];

	console.log(team);
	console.log(teamPlayers);

	const onSubmit: SubmitHandler<TeamRequest> = async (data) => {
		console.log("submit");
		if (!data.players) {
			data = { ...data, players: [] };
		}
		console.log(data);
		if (mode === "create") {
			await footballApiService.createTeam(data);
		}
		if (mode === "edit") {
			await footballApiService.editTeam(data);
		}

		// if (mode === "delete") {
		// 	await footballApiService.deletePlayer(data);
		// }

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
						value: team?.id,
					})}
				/>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Name</label>
					<TextInput
						{...register("name", {
							required: true,
							minLength: 1,
							value: team?.name,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>City</label>
					<TextInput
						{...register("city", {
							required: true,
							minLength: 1,
							value: team?.city,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Start Year</label>
					<TextInput
						{...register("startYear", {
							valueAsNumber: true,
							validate: (value) => value > 1700,
							required: true,
							value: team?.startYear,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Players</label>
					<Controller
						control={control}
						name='players'
						rules={{ required: false }}
						render={(renderProps) => {
							const { ref, ...rest } = renderProps.field;

							return (
								<Select
									isMulti
									options={teamPlayers?.map((player) => {
										console.log(player);
										return {
											value: player?.value || player?.id,
											label:
												player?.label ||
												`${player?.firstName + " " + player?.lastName}`,
										};
									})}
									{...(register("players"), { required: false })}
									{...renderProps.field}
									onChange={(e) => {
										console.log(e);
										renderProps.field.onChange(e);
									}}
								/>
							);
						}}
					/>
				</div>
			)}
			{mode === "delete" && (
				<div className='field'>Are you sure, to remove {team.name}?</div>
			)}
			<div className='actions'>
				<LinkButton onClick={onClose}>Cancel</LinkButton>
				<Button type='submit'>{mode === "delete" ? "Delete" : "Save"}</Button>
			</div>
		</StyledForm>
	);
};
