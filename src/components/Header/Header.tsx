import './Header.scss';
const Header = ({children}) => {
    return (
        <header className="header">
            {children}
        </header>
    );
}

export {Header}