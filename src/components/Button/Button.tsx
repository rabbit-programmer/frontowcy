import './Button.scss';
const Button = ({children, onClick, isActive}) => {
    return (
        <button className={`button ${isActive && 'button--isActive'}`} onClick={onClick}>
            {children}
        </button>
    )
}

export {Button}