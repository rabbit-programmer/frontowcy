import {LoginFormInterface} from "../interfaces/forms.ts";
import axios from "axios";

class UserService {
    async login(data: LoginFormInterface): Promise<boolean> {
        console.log(process.env.API_URL + '/login_check');
        return await axios.post(process.env.API_URL + '/login_check', data, {withCredentials: true})
            .then(function () {
                return true;
            })
            .catch(function () {
                return false;
            });
    }

    //@TODO zrobic rejestracje
}

export default UserService;