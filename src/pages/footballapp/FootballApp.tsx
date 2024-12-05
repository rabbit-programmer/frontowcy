import { useState } from "react";
import { LinkButton } from "../../components/Form/LinkButton";
import { PlayerList } from "./components/players/PlayersList";
import { TeamsList } from "./components/teams/TeamsList";

const FootballApp = () => {
	const [activeOption, setActiveOption] = useState<string>("players");

	return (
		<>
			<div className='content__long'>
				<LinkButton
					primary={false}
					onClick={() => setActiveOption("players")}>
					<div className='menu'>Players</div>
				</LinkButton>
				<LinkButton
					primary={false}
					onClick={() => setActiveOption("teams")}>
					<div className='menu'>Teams</div>
				</LinkButton>
				<LinkButton
					primary={false}
					onClick={() => setActiveOption("games")}>
					<div className='menu'>Games</div>
				</LinkButton>
				<LinkButton
					primary={false}
					onClick={() => setActiveOption("statistics")}>
					<div className='menu'>Statistics</div>
				</LinkButton>
			</div>
			{activeOption === "players" && <PlayerList />}
			{activeOption === "teams" && <TeamsList />}
		</>
	);
};

export { FootballApp };
