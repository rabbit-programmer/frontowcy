import styled from "styled-components";
import { CategoryInterface } from "../../../../../interfaces/categoryInterface";
import { ModalPortal } from "../../../../../components/Portal/Portal";
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";

type Props = {
	category: CategoryInterface;
};
export const CategoryItem = ({ category }: Props) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => {
		setIsOpenForm(false);
	};
	const handleOpen = () => {
		setIsOpenForm(true);
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
				title={"edit category"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<CategoryForm
					category={category}
					mode='edit'
					onClose={handleClose}
				/>
			</ModalPortal>
			<StyledCategoryItem
				onClick={
					handleOpen
				}>{`Position: ${category.position}, name: ${category.name}, identifier: ${category.identifier}`}</StyledCategoryItem>
		</>
	);
};
