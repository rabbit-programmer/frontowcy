import styled from "styled-components";
import { ModalPortal } from "../../../../../components/Portal/Portal";
import { useState } from "react";
import { ItemInterface } from "../../../../../interfaces/itemInterface";
import { ItemForm } from "./ItemForm";
import { LinkButton } from "../../../../../components/Form/LinkButton";

type Props = {
	item: ItemInterface;
};
export const Item = ({ item }: Props) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
	const handleCloseDeleteForm = () => {
		setIsOpenDeleteForm(false);
	};
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
				title={"delete item"}
				isOpen={isOpenDeleteForm}
				onClose={() => setIsOpenDeleteForm(false)}>
				<ItemForm
					mode='delete'
					onClose={handleCloseDeleteForm}
					item={item}
				/>
			</ModalPortal>
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
			<LinkButton
				onClick={() => setIsOpenDeleteForm(true)}
				primary={false}>
				[DELETE]
			</LinkButton>
			<StyledItem
				onClick={
					handleOpen
				}>{`Name: ${item.name}, price: ${item.price}, identifier: ${item.part}`}</StyledItem>
		</>
	);
};
