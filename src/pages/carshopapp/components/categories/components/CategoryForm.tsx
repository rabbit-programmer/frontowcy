import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryInterface } from "../../../../../interfaces/categoryInterface";
import { LinkButton } from "../../../../../components/Form/LinkButton";
import { TextInput } from "../../../../../components/Form/TextInput";
import { Button } from "../../../../../components/Form/Button";
import { carShopApiService } from "../../../../../services/carShopApiService";

export const CategoryForm = ({ mode, onClose, category = null }) => {
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
	const { register, handleSubmit } = useForm<CategoryInterface>();
	const onSubmit: SubmitHandler<CategoryInterface> = async (data) => {
		if (mode === "create") {
			await carShopApiService.createCategory(data);
		}
		if (mode === "edit") {
			await carShopApiService.editCategory(data);
		}

		if (mode === "delete") {
			await carShopApiService.deleteCategory(data);
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
						value: category?.id,
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
							value: category?.name,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Identifier</label>
					<TextInput
						{...register("identifier", {
							required: true,
							minLength: 1,
							value: category?.identifier,
						})}
					/>
				</div>
			)}
			{mode !== "delete" && (
				<div className='field'>
					<label>Position</label>
					<TextInput
						{...register("position", {
							valueAsNumber: true,
							validate: (value) => value > 0,
							required: true,
							value: category?.position,
						})}
					/>
				</div>
			)}
			{mode === "delete" && (
				<div className='field'>Are you sure, to remove {category?.name} with all connected items?</div>
			)}
			<div className='actions'>
				<LinkButton onClick={onClose}>Cancel</LinkButton>
				<Button type='submit'>{mode === "delete" ? "Delete" : "Save"}</Button>
			</div>
		</StyledForm>
	);
};
