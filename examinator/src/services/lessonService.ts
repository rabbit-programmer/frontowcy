import axios from "axios";
import {LessonResponse} from "../interfaces/responses.ts";

class LessonService {
    async getLessons(moduleId: string): Promise<LessonResponse>
    {
        return await axios.get(process.env.API_URL + `/lessons/${moduleId}`, {withCredentials: true})
            .then(function ({data}) {
                const lessons: LessonResponse = data;
                return lessons;
            })
    }
}

export default LessonService;