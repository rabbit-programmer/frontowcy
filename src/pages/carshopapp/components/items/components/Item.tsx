import styled from "styled-components";
import { ModalPortal } from "../../../../../components/Portal/Portal";
import { useState } from "react";
import { ItemInterface } from "../../../../../interfaces/itemInterface";
import { ItemForm } from "./ItemForm";

type Props = {
	item: ItemInterface;
};
export const Item = ({ item }: Props) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => {
		setIsOpenForm(false);
	};
	const handleOpen = () => {
		setIsOpenForm(true);
	};

	const StyledItem = styled.div`
		padding: 10px;
		&:hover {
			color: white;
			cursor: pointer;
		}
	`;
	return (
		<>
			<ModalPortal
				title={"edit item"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<ItemForm
					item={item}
					mode='edit'
					onClose={handleClose}
				/>
			</ModalPortal>
			<StyledItem
				onClick={
					handleOpen
				}>{`Name: ${item.name}, price: ${item.price}, identifier: ${item.part}`}</StyledItem>
		</>
	);
};
