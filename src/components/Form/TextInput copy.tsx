import { forwardRef } from "react";
import styled from "styled-components";

export const TextInput = forwardRef((props, ref) => {
	const StyledInput = styled.input`
		display: flex;
		background-color: #cccccc;
		border: solid 3px black;
		padding: 20px;
		height: 30px;
		width: 100%;
		&:hover,
		&:active,
		&:focus {
			background-color: #34cccc;
			border: solid 3px black;
			border-radius: 0px;
			outline: none;
		}
	`;

	return (
		<StyledInput
			{...props}
			ref={ref}
		/>
	);
});
