
/* Enum for different question types */
const QuestionType = {
    MC    : 1,
    INPUT : 2
};

class Question {
    static createStub(options) {
        let questionStub = {
            id: Question.unique_id,
            form_id: -1,
            category: QuestionType.MC,
            options: [''],
            answer: null,
            title: '',
            number: -1,
            editableOnRender: true,
        };
        const newQuestion = React.addons.update(questionStub, {
            $merge: options
        });
        Question.unique_id -= 1;
        return newQuestion;
    }

    static isNew(question) {
        return question.id < 0;
    }

}
// HACK(aleks, 03/14/16): currently the only way to assign static fields to classes in ES6
Question.unique_id = -1;
