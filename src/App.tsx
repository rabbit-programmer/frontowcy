import { useSelector } from "react-redux";
import { Home } from "./pages/home/Home";
import { RootState } from "./store";
import { BasicTemplate } from "./templates/basic/BasicTemplate";
import { GlobalMenuEnum } from "./enums/GlobalMenuEnum";
import { StopWatch } from "./pages/stopwatch/StopWatch";
import { FootballApp } from "./pages/footballapp/FootballApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CarShopApp } from "./pages/carshopapp/CarShopApp";
import { Categories } from "./pages/carshopapp/components/categories/Categories";
import { Items } from "./pages/carshopapp/components/items/Items";
import { Store } from "./pages/carshopapp/components/items/components/Store";

const queryClient = new QueryClient();

const App = () => {
	const option = useSelector(
		(state: RootState) => state.globalMenuSelector.option
	);

	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<BasicTemplate>
					<Routes>
						<Route
							path='/car-shop'
							element={<CarShopApp />}
						/>
						<Route
							path='/car-shop/categories'
							element={<Categories />}
						/>
						<Route
							path='/car-shop/items'
							element={<Items />}
						/>
						<Route
							path='/car-shop/buy/*'
							element={<Store />}
						/>
						<Route
							path='/car-shop/*'
							element={<div>Not found</div>}
						/>
					</Routes>
					<Routes>
						<Route
							path='/'
							element={
								<>
									{option === GlobalMenuEnum.CV && <Home />}
									{option === GlobalMenuEnum.STOPWATCH && <StopWatch />}
									{option === GlobalMenuEnum.FOOTBALLAPP && <FootballApp />}
								</>
							}
						/>
					</Routes>
				</BasicTemplate>
			</QueryClientProvider>
		</Router>
	);
};

export { App };
