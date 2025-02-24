import {useForm, SubmitHandler} from "react-hook-form"
import { Navigate } from "react-router-dom";
import './LoginForm.scss';
import {LoginFormInterface} from "../../../interfaces/forms.ts";
import UserService from "../../../services/userService.ts";
import {useState} from "react";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInterface>()

    const [hasInvalidCredential, setHasInvalidCredential] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
        const userService = new UserService();
        const isLogged = await userService.login(data);
        setIsLogged(isLogged);
        if (!isLogged) {
            setHasInvalidCredential(!isLogged);
            return;
        }
    }

    if (isLogged) {
        return <Navigate to="/modules" replace={true} />
    }

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form__field">
                <input type='email' {...register("username", {required: true})} className="text-input" placeholder='Podaj email...'/>
                {errors.username && <div className='validation-message'>To pole jest wymagane</div>}
            </div>
            <div className="login-form__field">
                <input type="password" {...register("password", {required: true})} className="text-input" placeholder='Podaj hasło...'/>
                {errors.password && <div className='validation-message'>To pole jest wymagane</div>}
            </div>
            {hasInvalidCredential && <div className='validation-message'>Błędne dane logowania</div>}
            <div className="login-form__buttons">
                <button className="submit-btn" type="submit">
                    Zaloguj
                </button>
            </div>
        </form>
    );
}

export default LoginForm;