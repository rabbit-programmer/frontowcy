import { useForm, SubmitHandler } from "react-hook-form";
import { RequestPlayer } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";



const PlayerForm = (mode: string) => {
	const { register, handleSubmit } = useForm<RequestPlayer>();
	const onSubmit: SubmitHandler<RequestPlayer> = (data) =>
		mode === "create"
			? footballApiService.createPlayer(data)
			: footballApiService.editPlayer(data);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input hidden {...register("id")} />
				<input {...register("firstName", { required: true, minLength: 5 })} />
				<input {...register("lastName", { required: true, minLength: 5 })} />
				<input type='submit' />
			</form>
		</div>
	);
};
