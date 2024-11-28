import { PlayerInterface } from "../../../../interfaces/playerInterface";
import { PlayerItem } from "./PlayerItem";

interface PlayerList {
	players: PlayerInterface[];
}

const PlayerList = ({ players }: PlayerList) => {
	return (
		<div className='content__short'>
			<div className='content__title'>Players</div>
			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{players.map((player) => (
								<li key={player.id}>
									<PlayerItem player={player} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export { PlayerList };
