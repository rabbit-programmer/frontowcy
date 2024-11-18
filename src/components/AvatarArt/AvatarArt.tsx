import "./AvatarArt.scss";

const AvatarArt = ({ text }) => {
	return (
		<pre
			// aria-label={label}
			className='avatar-art'>
			{text}
		</pre>
	);
};

export { AvatarArt };
