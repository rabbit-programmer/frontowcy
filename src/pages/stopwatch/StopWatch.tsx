import { useState } from "react";
import { Records } from "./components/Records";
import { Time } from "../../types/types";
import { MainTimer } from "./components/MainTimer";
import { StopWatchActionEnum } from "../../enums/StopWatchActionEnum";

const StopWatch = () => {
	const [action, setAction] = useState<StopWatchActionEnum>(
		StopWatchActionEnum.STOP
	);
	const [lapTimerAction, setLapTimerAction] = useState<StopWatchActionEnum>(
		StopWatchActionEnum.STOP
	);
	const [results, setResults] = useState<Time[]>([]);
	const handleLapResultSetter = (lap: Time) => {
		setResults((prev) => [...prev, lap]);
		setLapTimerAction(StopWatchActionEnum.WAIT);
	};

	const handleStopStart = () => {
		console.log(lapTimerAction);
		if (action === StopWatchActionEnum.START) {
			handleStop();
		} else {
			handleStart();
		}
	};
	const handleStart = () => {
		setAction(StopWatchActionEnum.START);
		setLapTimerAction(StopWatchActionEnum.START);
	};

	const handleStop = () => {
		setAction(StopWatchActionEnum.STOP);
		setLapTimerAction(StopWatchActionEnum.STOP);
	};

	const handleReset = () => {
		setAction(StopWatchActionEnum.RESET);
		setLapTimerAction(StopWatchActionEnum.RESET);
	};

	const handleLap = () => {
		if (action === StopWatchActionEnum.STOP) return;
		setLapTimerAction(StopWatchActionEnum.LAP);
	};

	return (
		<>
			<div className='content__long'>
				<MainTimer action={action} />
				<MainTimer
					action={lapTimerAction}
					lapResultSetter={handleLapResultSetter}
				/>
				<div className='menu'>
					<div className='menu__buttons'>
						<button onClick={handleStopStart}>
							{action === StopWatchActionEnum.START ? "Stop" : "Start"}
						</button>
						<button onClick={handleReset}>Reset</button>
						<button onClick={handleLap}>Lap</button>
					</div>
				</div>
			</div>
			<Records records={results} />
		</>
	);
};

export { StopWatch };
