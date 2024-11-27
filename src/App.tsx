import { useSelector } from "react-redux";
import { Home } from "./pages/home/Home";
import { RootState } from "./store";
import { BasicTemplate } from "./templates/basic/BasicTemplate";
import { GlobalMenuEnum } from "./enums/GlobalMenuEnum";
import { StopWatch } from "./pages/stopwatch/StopWatch";

const App = () => {
	const option = useSelector(
		(state: RootState) => state.globalMenuSelector.option
	);

	return (
		<BasicTemplate>
			{option === GlobalMenuEnum.CV && <Home />}
			{option === GlobalMenuEnum.STOPWATCH && <StopWatch />}
		</BasicTemplate>
	);
};

export { App };
