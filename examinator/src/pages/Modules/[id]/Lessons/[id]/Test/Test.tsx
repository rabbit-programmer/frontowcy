import './Test.scss';
import {Question} from "../../../../../../interfaces/responses.ts";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form"

const Test = ({questions}: { questions: Question[] }) => {

    const {register, reset} = useForm();
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[] | null>(null);
    const [correctCounter, setCorrectCounter] = useState<number>(0)
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const shuffle = (arr: any[]) => {
        return arr
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
    }

    useEffect(() => {
        setShuffledQuestions([...shuffle(questions)])
        if (shuffledQuestions && shuffledQuestions.length > 0) {
            setCurrentQuestion(shuffledQuestions[0]);
        } else {
            setCurrentQuestion(null);
        }
    }, []);

    useEffect(() => {
        const correctsAnswers =
            currentQuestion?.answers.filter(answer => answer.isCorrect);
        console.log(correctsAnswers);
        //@ts-ignore
        if (correctsAnswers?.length > 0 ) {
            //@ts-ignore
            setCorrectAnswers([...correctsAnswers]);
        }
    }, [currentQuestion]);
    const handleChange = (e: any) => {
        const isChecked = e.target.checked;
        const {value} = e.target;

        const type = currentQuestion?.type;
        if (isChecked && type === 'one_choice') {
            //@ts-ignore
            setAnswers([parseInt(value)]);
            return;
        }

        if (isChecked) {
            //@ts-ignore
            setAnswers([...answers, parseInt(value)]);
        } else {
            const actualAnswers = answers.map((id) => id !== value);
            //@ts-ignore
            setAnswers([...actualAnswers]);
        }
    }

    const checkAnswer = (): void => {
        //@ts-ignore
        const isCorrect = correctAnswers.map((answer) => answer.id).every((id) => answers.includes(id));
        setIsCorrect(isCorrect);
        if (isCorrect) {
            setCorrectCounter(correctCounter + 1);
        }
        // setCorrectAnswer(correctAnswer!.answer);
    }

    const nextQuestion = (): void => {
        if (shuffledQuestions && shuffledQuestions.length > 0) {
            const shiftedArr = [...shuffledQuestions];
            shiftedArr.shift();
            setShuffledQuestions([...shiftedArr]);
        } else {
            setShuffledQuestions(null);
        }
        setAnswers([]);
        setIsCorrect(null);
        reset();
    }

    useEffect(() => {
        if (shuffledQuestions && shuffledQuestions.length > 0) {
            setCurrentQuestion(shuffledQuestions[0]);
        } else {
            setCurrentQuestion(null);
        }
    }, [shuffledQuestions]);

    if (!shuffledQuestions) {
        return 'Nie ma pytań';
    }

    if (!currentQuestion || shuffledQuestions.length === 0) {
        return <div className='test-question-item__result'>
            <div>
                {`Wyniki ${correctCounter} / ${questions.length}`}
            </div>
            <div className='test-question-item__back'>
                <button onClick={() => {
                    window.location.reload();
                }}>Wroć do lekcji
                </button>
            </div>
        </div>
    }
    return (
        <form className="test-question-item">
            <div className='test-question-item__question'><b>Pytanie</b>: <span>{currentQuestion.question}</span></div>
            <ul className="test-question-item__answers">
                <div className="test-question-item__answers-label"><b>Odpowiedzi:</b></div>
                {currentQuestion.answers.map((answer) =>
                    <div className='test-question-item__answer'>
                        <input {...register("answer")} onChange={handleChange}
                               type={currentQuestion.type === 'one_choice' ? "radio" : "checkbox"}
                               id={answer.id.toString()}
                               name='answer'
                               value={answer.id}/>
                        <label htmlFor={answer.id.toString()}>{answer.answer}</label>
                    </div>
                )}
            </ul>
            {isCorrect === false &&
                <div className="test-question-item__incorrect">
                    <div className='error'>Błędna odpowiedź</div>
                    <ul> Poprawna odpowiedź to:
                        {correctAnswers.map((answer) =>
                            //@ts-ignore
                            <li>{answer.answer}</li>
                        )}
                    </ul>
                </div>}
            {isCorrect && <div className="test-question-item__correct">Poprawna odpowiedz</div>}
            {isCorrect === null && <div>
                <button type='button' onClick={checkAnswer}>Odpowiedz</button>
            </div>}
            {isCorrect !== null &&
                <div className='test-question-item__note'><b>Notatka:</b> <span>{shuffledQuestions[0].note}</span>
                </div>}
            {isCorrect !== null && <div>
                <button type='button' onClick={nextQuestion}>Następne pytanie</button>
            </div>}
        </form>
    )
}

export default Test