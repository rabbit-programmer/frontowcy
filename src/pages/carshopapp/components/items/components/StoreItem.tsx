import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeOption } from "../../../../../reducers/storeReducer";

export const StoreItem = ({ item }) => {
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();

	const StyledItem = styled.div<{ isActive: boolean }>`
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		max-width: 300px;
		margin-top: 5px;
		${({ isActive }) =>
			isActive &&
			`
		  color: white;
		`}
		&:hover {
			color: white;
			cursor: pointer;
		}
	`;

	const handleClick = () => {
		setIsActive((prev) => !prev);
		dispatch(changeOption(item));
	};

	return (
		<StyledItem
			isActive={isActive}
			onClick={handleClick}>
			<div>{item.name}</div>
			<div>
				{item.description}: {item.price} zł
			</div>
		</StyledItem>
	);
};
