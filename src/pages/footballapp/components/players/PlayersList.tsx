import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { PlayerInterface } from "../../../../interfaces/playerInterface";
import { PlayerForm } from "./PlayerForm";
import { PlayerItem } from "./PlayerItem";
import { LinkButton } from "../../../../components/Form/LinkButton";

interface PlayerList {
	players: PlayerInterface[];
}

const PlayerList = ({ players }: PlayerList) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	return (
		<div className='content__short'>
			<div className='content__title'>
				Players list
				<LinkButton
					onClick={() => {
						setIsOpenForm(true);
					}}>
					[Add player]
				</LinkButton>
			</div>
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
			<ModalPortal
				title={"Add player"}
				isOpen={isOpenForm}
				onClose={() => setIsOpenForm(false)}>
				<PlayerForm mode='create' />
			</ModalPortal>
		</div>
	);
};

export { PlayerList };
