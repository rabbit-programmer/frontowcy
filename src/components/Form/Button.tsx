import { forwardRef } from "react";
import styled from "styled-components";

export const Button = forwardRef(({ children, ...props }, ref) => {
	const StyledButton = styled.button`
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #cccccc;
		color: #0000cc;
		border: solid 3px black;
		padding: 20px;
		height: 30px;
		width: 180px;
		cursor: pointer;
		&:hover,
		&:active,
		&:focus {
			background-color: #0000cc;
			color: #cccccc;
			border-radius: 0px;
			outline: none;
		}
	`;

	return (
		<StyledButton
			{...props}
			ref={ref}>
			{children}
		</StyledButton>
	);
});
