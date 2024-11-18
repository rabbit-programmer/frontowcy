const Facts = () => {
	return (
		<div className='content__short'>
			<div className='content__title'>Description</div>
			<div className='content__description'>
				<div className='description'>
					<ul>
						<li>
							<p className='description__paragraph'>[Hobbies]</p>
							<p>Ride a bike, play football</p>
						</li>
						<li>
							<p className='description__paragraph'>[Visited Places]</p>
							<p>Berlin, Vienna, Roma, Paris, Barcelona, Gibraltar, Monaco</p>
						</li>
						<li>
							<p className='description__paragraph'>[favourite food]</p>
							<p>
								Pizza, Lasagne, Pasta, Seafood, Chips and <br />
								the best ever coke
							</p>
						</li>
						<li>
							<p className='description__paragraph'>[Best tv series]</p>
							<p>
								Friends, Big bang theory, two and half man,
								<br />
								the crown
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export { Facts };
