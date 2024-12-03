import { useQuery } from "@tanstack/react-query";
import { PlayerInterface } from "../../../../interfaces/playerInterface";
import { footballApiService } from "../../../../services/footballApiService";
import { PlayerForm } from "./PlayerForm";

interface PlayerItem {
	player: PlayerInterface;
}

const PlayerItem = ({ player }: PlayerItem) => {
	let team = null;

	if (player.teamId) {
		const { data } = useQuery({
			queryKey: [`teamData-${player.teamId}`],
			queryFn: () => footballApiService.getTeamById(player.teamId),
		});

		team = data || "";
	}

	return (
		<div>
			<div>First Name: {player.firstName}</div>
			<div>Last Name: {player.lastName}</div>
			<div>Team: {team?.name || "don't has team"}</div>
		</div>
	);
};

export { PlayerItem };
