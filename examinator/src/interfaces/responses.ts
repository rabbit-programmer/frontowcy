interface Module {
    id: number;
    name: string;
    description: string;
}

interface ModulesResponse {
    items: Module[];
    next?: number;
    previous?: number
}

interface Lesson {
    id: number;
    name: string
}

interface LessonResponse {
    items: Lesson[];
    next?: number;
    previous?: number
}

interface Answer {
    id: number;
    answer: string;
    isCorrect: boolean
}

interface Question {
    id: number;
    question: string;
    type: string;
    note: string|null;
    answers: Answer[];
}

interface QuestionsResponse {
    questions: Question[];
}

export type {ModulesResponse, LessonResponse, QuestionsResponse, Question}