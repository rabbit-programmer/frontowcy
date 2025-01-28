import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryInterface } from "../../../../../interfaces/categoryInterface";
import { LinkButton } from "../../../../../components/Form/LinkButton";
import { TextInput } from "../../../../../components/Form/TextInput";
import { Button } from "../../../../../components/Form/Button";
import { carShopApiService } from "../../../../../services/carShopApiService";
import { ItemInterface } from "../../../../../interfaces/itemInterface";
import { CarShopCacheKeysEnum } from "../../../../../enums/CarShopCacheKeysEnum";

export const ItemForm = ({ mode, onClose, item = null }) => {
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
	const { register, handleSubmit } = useForm<ItemInterface>({
		defaultValues: {
			categoryId: item?.categoryId,
		},
	});
	const queryClient = useQueryClient();
	const { isPending, error, data } = useQuery({
		queryKey: [CarShopCacheKeysEnum.CATEGORIES],
		queryFn: () => carShopApiService.getAllCategories(),
	});

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	const onSubmit: SubmitHandler<ItemInterface> = async (data) => {
		if (mode === "create") {
			await carShopApiService.createItem(data);
		}
		if (mode === "edit") {
			await carShopApiService.editItem(data);
		}

		// if (mode === "delete") {
		// 	await footballApiService.deletePlayer(data);
		// }

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
						value: item?.id,
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
							value: item?.name,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Part</label>
					<TextInput
						{...register("part", {
							required: true,
							minLength: 1,
							value: item?.part,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Price</label>
					<TextInput
						{...register("price", {
							valueAsNumber: true,
							validate: (value) => value > 0,
							required: true,
							value: item?.price,
						})}
					/>
				</div>
			)}

			{mode !== "delete" && (
				<div className='field'>
					<label>Category</label>
					<select {...register("categoryId")}>
						{data.map((category) => (
							<option value={category.id}>{category.name}</option>
						))}
					</select>
				</div>
			)}
			{mode === "delete" && (
				<div className='field'>Are you sure, to remove {category?.name}?</div>
			)}
			<div className='actions'>
				<LinkButton onClick={onClose}>Cancel</LinkButton>
				<Button type='submit'>{mode === "delete" ? "Delete" : "Save"}</Button>
			</div>
		</StyledForm>
	);
};
