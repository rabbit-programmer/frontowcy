import { createPortal } from "react-dom";
import styled from "styled-components";

export const ModalPortal = ({ title, isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const PortalWrapper = styled.div`
		position: fixed;
		overflow: hidden;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	`;

	const PortalContent = styled.div`
		display: flex;
		flex-flow: column;
		background-color: #cccccc;
		border: solid 3px black;
		padding: 20px;
		min-height: 400px;
		max-width: 500px;
		width: 100%;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	`;
	const PortalHeader = styled.div`
		display: flex;
		align-items: flex-start;
		justify-content: center;
		border-bottom: solid 3px black;
		padding: 20px;
		width: 100%;
	`;
	const PortalForm = styled.div`
		display: flex;
		flex-flow: column;
		align-items: justify-content;
		justify-content: center;
		padding: 20px;
		width: 100%;
	`;

	return createPortal(
		<PortalWrapper onClick={onClose}>
			<PortalContent onClick={(e) => e.stopPropagation()}>
				<PortalHeader>{title}</PortalHeader>
				<PortalForm>{children}</PortalForm>
			</PortalContent>
		</PortalWrapper>,
		document.getElementById("modal-root")
	);
};
