import { Time } from "../../../types/types";

interface RecordsInterface {
	records: Time[];
}

const Records = ({ records }: RecordsInterface) => {
	return (
		<div className='content__short'>
			<div className='content__title'>Records</div>
			<div className='content__description'>
				<div className='description'>
					<div className='description__data'>
						<ul>
							{records.map((value: Time, key: number) => (
								<li key={key}>
									[Lap: {key + 1}] {String(value.minutes).padStart(2, "0")}:
									{String(value.seconds).padStart(2, "0")}:
									{String(value.miliseconds).padStart(3, "0")}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Records };
