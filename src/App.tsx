import { useSelector } from "react-redux";
import { Home } from "./pages/home/Home";
import { RootState } from "./store";
import { BasicTemplate } from "./templates/basic/BasicTemplate";
import { GlobalMenuEnum } from "./enums/GlobalMenuEnum";
import { StopWatch } from "./pages/stopwatch/StopWatch";
import { FootballApp } from "./pages/footballapp/FootballApp";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
	const option = useSelector(
		(state: RootState) => state.globalMenuSelector.option
	);

	return (
		<BasicTemplate>
			{option === GlobalMenuEnum.CV && <Home />}
			{option === GlobalMenuEnum.STOPWATCH && <StopWatch />}
			{option === GlobalMenuEnum.FOOTBALLAPP && (
				<QueryClientProvider client={queryClient}>
					<FootballApp />
				</QueryClientProvider>
			)}
		</BasicTemplate>
	);
};

export { App };
