import styled from "styled-components";

export const Table = ({ children }) => {
	const StyledTable = styled.div`
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: #cccccc;
		color: #0000cc;
		border: solid 3px black;
		padding: 20px;
		height: 100%;
		width: 80%;
	`;

	return <StyledTable>{children}</StyledTable>;
};
