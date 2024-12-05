import { useState } from "react";
import { ModalPortal } from "../../../../components/Portal/Portal";
import { PlayerForm } from "./PlayerForm";
import { TeamItem } from "./TeamItem";
import { LinkButton } from "../../../../components/Form/LinkButton";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";

const TeamsList = () => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const handleClose = () => setIsOpenForm(false);
	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_TEAMS],
		queryFn: () => footballApiService.getAllTeams(),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className='content__short'>
			<div className='content__title'>
				Teams list
				<LinkButton
					onClick={() => {
						setIsOpenForm(true);
					}}>
					[Add team]
				</LinkButton>
			</div>
			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{data.map((team) => (
								<li key={team.id}>
									<div style={{ display: "flex" }}>
										<TeamItem team={team} />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<ModalPortal
				title={"Add player"}
				isOpen={isOpenForm}
				onClose={handleClose}>
				<PlayerForm
					mode='create'
					onClose={handleClose}
				/>
			</ModalPortal>
		</div>
	);
};

export { TeamsList };
