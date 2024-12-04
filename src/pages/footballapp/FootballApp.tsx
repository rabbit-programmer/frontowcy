import { PlayerList } from "./components/players/PlayersList";

const FootballApp = () => {
	return (
		<>
			<div className='content__long'>
				<div className='menu'>Players</div>
			</div>
			<PlayerList />
		</>
	);
};

export { FootballApp };
