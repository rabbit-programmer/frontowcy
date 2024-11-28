import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../services/footballApiService";
import { PlayerList } from "./components/players/PlayersList";

const FootballApp = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["repoData"],
		queryFn: () => footballApiService.getAllPlayers(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<>
			<div className='content__long'>
				<div className='menu'>Players</div>
			</div>
			<PlayerList players={data} />
		</>
	);
};

export { FootballApp };
