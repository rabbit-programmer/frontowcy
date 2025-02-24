import React from "react";
import './Lesson.scss';

type LessonProps = {
    title: string;
}

export const Lesson: React.FC<LessonProps> = ({title}) => {
    return (
        <div className="lesson">
            <h1 className="lesson__title">{title}</h1>
        </div>
    );
}

export default Lesson;

