import {useForm} from "react-hook-form"
import {useState} from "react";
import "./AddLesson.scss";
import QuestionService from "../../../../../../services/questionService.ts";
import {Link, useParams} from "react-router-dom";

const AddLesson = () => {

    const {register, reset, handleSubmit} = useForm();
    const [answers, setAnswers] = useState<string[]>(['', '']);
    const {id, lessonId} = useParams();
    const [isAdd, setIsAdd] = useState(null);

    const onSubmit = async (data: any) => {
        console.log(data);

        const questionAnswers = [];

        for (let i = 0; i < answers.length; i++) {
            questionAnswers.push({
                answer: data[`answer-${i}`],
                isCorrect:  data[`correct-${i}`]
            });
        }

        const question = {
            question: data.question,
            type: data.type,
            answers: questionAnswers,
            note: data.note
        }


        const questionService = new QuestionService();
        const isAdd = await questionService.addQuestion(lessonId, question);
        // @ts-ignore
        setIsAdd(isAdd);
        if (isAdd) {
            reset()
        }
        return;
    }

    // @ts-ignore
    return (
        <>
            <Link to={`/modules/${id}/lesson/${lessonId}`}>
                <button>Wroc do lekcji</button>
            </Link>
            <form className='add-lesson-form' onSubmit={handleSubmit(onSubmit)}>
                <textarea rows={5} cols={50} {...register('question')} placeholder={'Wpisz pytanie'}/>
                <textarea rows={5} cols={50} {...register('note')} placeholder={'Wpisz notatke jak masz'}/>
                <select {...register('type')}>
                    <option value='one_choice'>Jednokrotne</option>
                    <option value='multiple_choice'>Wielokrotne</option>
                </select>
                {
                    answers.map((_a, index) =>
                        <div>
                            <input {...register(`correct-${index}`)} type={"checkbox"} name={`correct-${index}`} />
                            <textarea rows={5} {...register(`answer-${index}`)} name={`answer-${index}`} placeholder={'Treść odpowiedzi'}/>
                        </div>
                    )
                }
                <button type='button' onClick={() => setAnswers([...answers, ''])}>Dodaj kolejna odpowiedz</button>
                {answers.length > 2 && <button type='button' onClick={() =>{
                   answers.pop();
                   setAnswers([...answers]);
                }}>Usun ostatnia odpowiedz</button>}

                <input type="submit" />
                {isAdd === false && <div>Nie dodano, zawołaj pitka albo spróbuj ponownie</div>}
                {isAdd === true && <div>Dodano, dodawaj dalej</div>}
            </form>
        </>
    )

}

export default AddLesson