import { useForm, SubmitHandler } from "react-hook-form";
import { RequestPlayer } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import styled from "styled-components";

export const PlayerForm = ({ mode }: { mode: string }) => {
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

	const { register, handleSubmit } = useForm<RequestPlayer>();
	const onSubmit: SubmitHandler<RequestPlayer> = (data) =>
		mode === "create"
			? footballApiService.createPlayer(data)
			: footballApiService.editPlayer(data);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			{mode === "edit" && (
				<TextInput
					hidden
					{...register("id")}
				/>
			)}
			<div className='field'>
				<label>First name</label>
				<TextInput
					{...register("firstName", { required: true, minLength: 5 })}
				/>
			</div>
			<div className='field'>
				<label>Last name</label>
				<TextInput
					{...register("lastName", { required: true, minLength: 5 })}
				/>
			</div>
			<div className='field'>
				<Button type='submit'>add player</Button>
			</div>
		</StyledForm>
	);
};
