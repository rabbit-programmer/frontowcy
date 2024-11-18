import './Footer.scss';
const Footer = ({children}) => {
    return (
        <footer className="footer">
            {children}
        </footer>
    );
}

export {Footer}