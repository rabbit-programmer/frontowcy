import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import QuestionService from "../../../../../services/questionService.ts";
import {Question} from "../../../../../interfaces/responses.ts";
import LearnQuestion from "../../../../../components/LearnQuestion/LearnQuestion.tsx";
import Test from "./Test/Test.tsx";

const Lesson = () => {

    const [isTestMode, setIsTestMode] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[] | null>(null)
    const {lessonId, id} = useParams();
    const getQuestions = async () => {
        const questionService: QuestionService = new QuestionService();

        if (!lessonId) {
            return;
        }
        const {questions} = await questionService.getQuestions(lessonId);
        setQuestions(questions);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    if (!questions) {
        return <div>Brak pytań</div>
    }


    if (isTestMode) {
        return <Test questions={questions}/>
    }

    return (
        <>
            <Link to={`/modules/${id}`}>
                <button>Wroc do listy lekcji</button>
            </Link>
            <div className="lessons-list">
                <h1 className="lessons-list__title">
                    Tryby nauki
                </h1>
                <div>
                    <Link to={`add`}>
                        <button onClick={() => setIsTestMode(true)}>Dodaj pytania</button>
                    </Link>
                    <button onClick={() => setIsTestMode(true)}>Test</button>
                </div>
                <h1>Materiały do nauki: </h1>
                <div className="lessons-list__lessons">
                    {questions.map((question) =>
                        <LearnQuestion question={question}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Lesson;