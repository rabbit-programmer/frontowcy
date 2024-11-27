import { useEffect, useState } from "react";
import { Time } from "../../../types/types";
import { StopWatchActionEnum } from "../../../enums/StopWatchActionEnum";

interface MainTimerInterface {
	action: StopWatchActionEnum;
	lapResultSetter?: (time: Time) => void;
}

const MainTimer = ({ action, lapResultSetter }: MainTimerInterface) => {
	const [time, setTime] = useState<Time>({
		minutes: 0,
		seconds: 0,
		miliseconds: 0,
	});

	const [intervalId, setIntervalId] = useState<number | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const [startTimestamp, setStartTimestamp] = useState<number | null>(null);

	useEffect(() => {
		if (action === StopWatchActionEnum.START) {
			startTimer();
		}

		if (action === StopWatchActionEnum.STOP) {
			stopTimer();
		}

		if (action === StopWatchActionEnum.RESET) {
			resetTimer();
		}

		if (action === StopWatchActionEnum.LAP && lapResultSetter) {
			lapResultSetter(time);
			stopTimer();
			resetTimer();
		}

		if (action === StopWatchActionEnum.WAIT) {
			startTimer();
		}

		return () => {
			intervalId && clearInterval(intervalId);
			setIntervalId(null);
		};
	}, [action]);

	const resetTimer = () => {
		if (intervalId) {
			clearInterval(intervalId); // Zatrzymaj interval, jeśli działa
			setIntervalId(null);
		}

		setStartTimestamp(null);
		setElapsedTime(0); // Wyzeruj czas
		setTime({
			minutes: 0,
			seconds: 0,
			miliseconds: 0,
		});
	};

	const startTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
		const newStartTimestamp = Date.now() - elapsedTime;
		setStartTimestamp(newStartTimestamp);
		const newIntervalId = setInterval(() => {
			const delta = Date.now() - newStartTimestamp;
			setTime({
				minutes: Math.floor(delta / 60000),
				seconds: Math.floor((delta % 60000) / 1000),
				miliseconds: delta % 1000,
			});
		}, 10);
		setIntervalId(newIntervalId);
	};

	const stopTimer = () => {
		if (!intervalId) return;
		if (startTimestamp !== null) {
			const delta = Date.now() - startTimestamp;
			setElapsedTime(delta);
		}

		clearInterval(intervalId);
		setIntervalId(null);
	};

	return (
		<h1>
			{String(time.minutes).padStart(2, "0")}:
			{String(time.seconds).padStart(2, "0")}:
			{String(time.miliseconds).padStart(3, "0")}
		</h1>
	);
};

export { MainTimer };
