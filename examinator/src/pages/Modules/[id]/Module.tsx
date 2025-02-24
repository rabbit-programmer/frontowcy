import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import LessonService from "../../../services/lessonService.ts";
import {LessonResponse} from "../../../interfaces/responses.ts";
import {Lesson} from "../../../components/Lesson/Lesson.tsx";

const Module = () => {

    const [lessons, setLessons] = useState<LessonResponse|null>(null)
    const {id} = useParams();
    const getLessons = async () => {
        const lessonService: LessonService = new LessonService();

        if (!id) {
            return;
        }
        const lessons = await lessonService.getLessons(id);
        setLessons(lessons);
    }

    useEffect(() => {
        getLessons();
    }, []);

    if (!lessons || lessons.items.length === 0) {
        return <div>Brak lekcji</div>
    }

    return (
        <>
            <Link to={`/modules`}>
                <button>Wroc do listy modułów</button>
            </Link>
            <div className="lessons-list">
                <h1 className="lessons-list__title">
                    Lista lekcji
                </h1>
                <div className="lessons-list__lessons">
                    {lessons.items.map((lesson) =>
                        <Link to={`lesson/${lesson.id}`}>
                            <div key={lesson.id} className="lessons-list__lesson">
                                <Lesson title={lesson.name} />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default Module;