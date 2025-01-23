import styled from "styled-components";

export const LongContent = ({ children }) => {
	const StyledLongContent = styled.div`
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		margin: 32px;
		width: 100%;
		min-height: calc(100vh - 132px);
	`;
	return <StyledLongContent>{children}</StyledLongContent>;
};
