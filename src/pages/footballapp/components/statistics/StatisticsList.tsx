import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { footballApiService } from "../../../../services/footballApiService";
import { FootballCacheKeysEnum } from "../../../../enums/FootballCacheKeysEnum";
import { GameItem } from "../games/GameItem";
import { TeamItem } from "../teams/TeamItem";

const StatisticsList = () => {
	const { isPending, error, data } = useQuery({
		queryKey: [FootballCacheKeysEnum.LIST_GAMES],
		queryFn: () => footballApiService.getAllGames(),
	});
	const {
		isPending: isPendingTeam,
		error: errorTeam,
		data: dataTeams,
	} = useQuery({
		queryKey: [FootballCacheKeysEnum.TOP_TEAM],
		queryFn: () => footballApiService.getTopTeamsByGoals(),
	});

	if (isPending || isPendingTeam) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	if (errorTeam) return "An error has occurred: " + errorTeam.message;

	console.log(dataTeams);
	const lastGame = footballApiService.getLastGame(data);
	const gamesInWeek = footballApiService.countGamesByPeriod(data, "week");
	const gamesInMonth = footballApiService.countGamesByPeriod(data, "month");
	const gamesInYear = footballApiService.countGamesByPeriod(data, "year");

	return (
		<div className='content__short'>
			<div className='content__title'>Games statistics</div>
			<div className='content__description'>
				<div className='description'>
					<ul className='description__data--column'>
						<li>
							<div>Games in this week: {gamesInWeek}</div>
							<div>Games in this month: {gamesInMonth}</div>
							<div>Games in this year: {gamesInYear} </div>
						</li>
						<li>
							<div>Last game</div>
							<GameItem game={lastGame} />
						</li>
						<li>
							<li>TOP 3 Team with the most goals:</li>
							<ul>
								{dataTeams.map((dataTeam) => (
									<li>
										<div>Goals: {dataTeam.goals}</div>
										<TeamItem team={dataTeam.team} />
									</li>
								))}
							</ul>
							{/* <TeamItem team={dataTeam.team} /> */}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export { StatisticsList };
