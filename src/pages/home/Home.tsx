import "./Home.scss";
import { Welcome } from "./components/Welcome.tsx";
import { useState } from "react";
import { HomeMenuEnum } from "./helpers/HomeMenuEnum.ts";
import { Education } from "./components/Education.tsx";
import { Facts } from "./components/Facts.tsx";

const Home = () => {
	const [option, setOption] = useState(HomeMenuEnum.WELCOME);

	return (
		<>
			<div className='content__long'>
				<div
					className='menu'
					onClick={() => setOption(HomeMenuEnum.WELCOME)}>
					<span
						className={`menu__item ${
							option === HomeMenuEnum.WELCOME && "menu__item--active"
						}`}>
						Welcome to my page
					</span>
				</div>
				<div
					className='menu'
					onClick={() => setOption(HomeMenuEnum.FACTS)}>
					<span
						className={`menu__item ${
							option === HomeMenuEnum.FACTS && "menu__item--active"
						}`}>
						Interesting facts about me
					</span>
				</div>
				<div
					className='menu'
					onClick={() => setOption(HomeMenuEnum.EDUCATION)}>
					<span
						className={`menu__item ${
							option === HomeMenuEnum.EDUCATION && "menu__item--active"
						}`}>
						My education
					</span>
				</div>
			</div>
			{option === HomeMenuEnum.WELCOME && <Welcome />}
			{option === HomeMenuEnum.FACTS && <Facts />}
			{option === HomeMenuEnum.EDUCATION && <Education />}
		</>
	);
};

export { Home };
