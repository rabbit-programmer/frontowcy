import {Question} from "../../interfaces/responses.ts";
import './LearnQuestion.scss';
const LearnQuestion = ({question}: { question: Question }) => {
    const correctAnswers = question.answers.filter((answer) => answer.isCorrect)

        return (
            <div className="learn-question-item">
                <div><b>Pytanie</b>: <span>{question.question}</span></div>
                <ul><b>Poprawne odpowiedzi:</b>
                    {correctAnswers.map((answer) =>
                        <li>{answer.answer}</li>
                    )}
                </ul>
                <div><b>Notatka:</b> <span>{question.note}</span></div>
            </div>
        );
}

export default LearnQuestion