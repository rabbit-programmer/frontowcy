import { forwardRef } from "react";
import styled, { css } from "styled-components";

export const LinkButton = forwardRef(
	({ primary = true, children, ...props }, ref) => {
		const StyledLink = styled.a<{ $primary?: boolean }>`
			display: flex;
			justify-content: center;
			align-items: center;
			${(props) =>
				props.$primary
					? css`
							color: #0000cc;
					  `
					: css`
							color: black;
					  `}
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
				$primary={primary}
				{...props}
				ref={ref}>
				{children}
			</StyledLink>
		);
	}
);
