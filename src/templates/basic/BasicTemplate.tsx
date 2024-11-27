import { Header } from "../../components/Header/Header.tsx";
import "./BasicTemplate.scss";
import { Button } from "../../components/Button/Button.tsx";
import { Footer } from "../../components/Footer/Footer.tsx";
import { TextArt } from "../../components/TextArt/TextArt.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { selectOption } from "../../reducers/globalMenuReducer.ts";
import { GlobalMenuEnum } from "../../enums/GlobalMenuEnum.ts";

type Props = {
	children: any;
};

const BasicTemplate = ({ children }: Props) => {
	const option = useSelector(
		(state: RootState) => state.globalMenuSelector.option
	);
	const dispatch = useDispatch();

	const github = ` 
 ██████  ██ ████████ ██   ██ ██    ██ ██████  
██       ██    ██    ██   ██ ██    ██ ██   ██ 
██   ███ ██    ██    ███████ ██    ██ ██████  
██    ██ ██    ██    ██   ██ ██    ██ ██   ██ 
 ██████  ██    ██    ██   ██  ██████  ██████ 
	`;

	return (
		<>
			<Header>
				<Button
					isActive={option === GlobalMenuEnum.CV}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.CV))}>
					CV PROJECT
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.STOPWATCH}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.STOPWATCH))}>
					StopWatch PROJECT
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.EXPERIENCE}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.EXPERIENCE))}>
					FOOTBALAPP PROJECT
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.SERVICES}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.SERVICES))}>
					CARSHOP PROJECT
				</Button>
			</Header>
			<main className='main'>
				<div className='content'>{children}</div>
			</main>
			<Footer>
				<TextArt text={github} />
			</Footer>
		</>
	);
};

export { BasicTemplate };
