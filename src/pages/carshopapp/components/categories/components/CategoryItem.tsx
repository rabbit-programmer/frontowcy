import styled from "styled-components";
import { CategoryInterface } from "../../../../../interfaces/categoryInterface";
import { ModalPortal } from "../../../../../components/Portal/Portal";
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";
import { LinkButton } from "../../../../../components/Form/LinkButton";

type Props = {
	category: CategoryInterface;
};
export const CategoryItem = ({ category }: Props) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
	const handleClose = () => {
		setIsOpenForm(false);
	};
	const handleOpen = () => {
		setIsOpenForm(true);
	};

	const handleCloseDeleteForm = () => {
		setIsOpenForm(false);
	};
	const StyledCategoryItem = styled.div`
		padding: 10px;
		&:hover {
			color: white;
			cursor: pointer;
		}
	`;
	return (
		<>
			<ModalPortal
				title={"delete category"}
				isOpen={isOpenDeleteForm}
				onClose={() => setIsOpenDeleteForm(false)}>
				<CategoryForm
					category={category}
					mode='delete'
					onClose={handleCloseDeleteForm}
				/>
			</ModalPortal>
			<ModalPortal
				title={"edit category"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<CategoryForm
					category={category}
					mode='edit'
					onClose={handleClose}
				/>
			</ModalPortal>
			<LinkButton
				onClick={() => setIsOpenDeleteForm(true)}
				primary={false}>
				[DELETE]
			</LinkButton>
			<StyledCategoryItem onClick={handleOpen}>
				{`Position: ${category.position}, name: ${category.name}, identifier: ${category.identifier}`}
			</StyledCategoryItem>
		</>
	);
};
