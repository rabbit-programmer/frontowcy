import { forwardRef } from "react";
import styled from "styled-components";

export const LinkButton = forwardRef(({ children, ...props }, ref) => {
	const StyledLink = styled.a`
		display: flex;
		justify-content: center;
		align-items: center;
		color: #0000cc;
		border: none;
		padding: 10px;
		cursor: pointer;
		&:hover,
		&:active,
		&:focus {
			color: #ffffff;
			border: none;
			outline: none;
		}
	`;

	return (
		<StyledLink
			{...props}
			ref={ref}>
			{children}
		</StyledLink>
	);
});
