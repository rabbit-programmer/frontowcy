import './TextArt.scss'

const TextArt = ({text}) => {
    return (
        <pre
            // aria-label={label}
            className="text-art"
        >{text}</pre>
    )
}

export {TextArt}