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
	console.log(option);

	const linkedin =
		"" +
		"  ##      #           #                #     #          \n" +
		"   #                  #  #             #                \n" +
		"   #     ##    ###    # #     ##     ###    ##    ###   \n" +
		"   #      #    #  #   ###    # ##   #  #     #    #  #  \n" +
		"   #      #    #  #   #  #   ##     #  #     #    #  #  \n" +
		"  ###    ###   #  #   #  #    ###    ###    ###   #  #  \n";
	return (
		<>
			<Header>
				<Button
					isActive={option === GlobalMenuEnum.HOME}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.HOME))}>
					Home
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.SKILLS}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.SKILLS))}>
					Skills
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.EXPERIENCE}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.EXPERIENCE))}>
					Experience
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.SERVICES}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.SERVICES))}>
					Services
				</Button>
				<Button
					isActive={option === GlobalMenuEnum.CONTACT}
					onClick={() => dispatch(selectOption(GlobalMenuEnum.CONTACT))}>
					Contact
				</Button>
			</Header>
			<main className='main'>
				<div className='content'>{children}</div>
			</main>
			<Footer>
				<TextArt text={linkedin} />
			</Footer>
		</>
	);
};

export { BasicTemplate };
