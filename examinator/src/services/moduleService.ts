import axios from "axios";
import {ModulesResponse} from "../interfaces/responses.ts";

class ModuleService {
    async getModules(): Promise<ModulesResponse> {
        return await axios.get(process.env.API_URL + '/modules', {withCredentials: true})
            .then(function ({data}) {
                const modules: ModulesResponse = data;
                return modules;
            })
    }
}

export default ModuleService;