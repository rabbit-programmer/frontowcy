import axios from "axios";
import {QuestionsResponse} from "../interfaces/responses.ts";
import {CreateQuestionFormInterface} from "../interfaces/forms.ts";

class QuestionService {
    async getQuestions(lessonId: string): Promise<QuestionsResponse>
    {
        return await axios.get(process.env.API_URL + `/questions/${lessonId}`, {withCredentials: true})
            .then(function ({data}) {
                const questions: QuestionsResponse = data;
                return questions;
            })
    }

    async addQuestion(lessonId: string | undefined, question: CreateQuestionFormInterface) {
        axios.defaults.withCredentials = true
        return await axios.post(process.env.API_URL + `/questions/${lessonId}`, question)
            .then(() => true)
            .catch(() => false)
    }
}

export default QuestionService;