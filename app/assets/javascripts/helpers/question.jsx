
/* Enum for different question types */
const QuestionType = {
    MC    : 1,
    INPUT : 2
};

var unique_id = -1;

class Question {

    createStub(options) {
        let questionStub = {
            id: unique_id,
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
        unique_id = unique_id - 1;
        debugger;
        return newQuestion;
    }

    isNew(question) {
        return question.id < 0;
    }
}

const NewQuestion = new Question();
