import './Login.scss'
import LoginForm from "../../components/Form/LoginForm/LoginForm.tsx";

const Login = () => {
    return (
        <div className="login">
            <img className="login__logo" src="./examinator-logo.jpeg" alt="Logo application"/>
            <h3 className="login__title">Logowanie</h3>
            <div className="login__form">
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;