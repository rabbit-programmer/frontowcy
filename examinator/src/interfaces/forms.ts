interface LoginFormInterface {
    username: string
    password: string
}


interface CreateModuleFormInterface {

}

interface CreateLessonFormInterface {

}

interface CreateLessonFormInterface {

}

interface CreateAnswerFormInterface {
    answer: string
    isCorrect: boolean
}

interface CreateQuestionFormInterface {
    question: string
    type: string
    answers: CreateAnswerFormInterface[]
}

export type {LoginFormInterface, CreateQuestionFormInterface, CreateModuleFormInterface, CreateLessonFormInterface}