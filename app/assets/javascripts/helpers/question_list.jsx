class QuestionList {

    constructor(questions) {
        this.questions = questions || [];
    }

    insertAt = (index, newQuestion) => {
        let newQuestions = React.addons.update(this.questions, {
            $splice: [[index, 0, newQuestion]],
        });
        for (let i = index + 1; i < newQuestions.length; i++) {
            newQuestions[i].number += 1;
        }
        return new QuestionList(newQuestions);
    }

    move = (oldIndex, newIndex, question) => {
        question.number = newIndex + 1;
        let newQuestions = React.addons.update(this.questions, {
            $splice: [[oldIndex, 1], [newIndex, 0, question]]
        });
        if (newIndex > oldIndex) {
            for (let i = oldIndex; i < newIndex; i++) {
                newQuestions[i].number -= 1;
            }
        } else if (newIndex < oldIndex) {
            for (let i = newIndex + 1; i <= oldIndex; i++) {
                newQuestions[i].number += 1;
            }
        }
        return new QuestionList(newQuestions);
    }

    replaceAt = (index, newQuestion) => {
        return new QuestionList(React.addons.update(this.questions, {
            $splice: [[index, 1, newQuestion]],
        }));
    }

    removeIndex = (index) => {
        let newQuestions = React.addons.update(this.questions, {
            $splice: [[index, 1]],
        });
        for (let i = index; i < newQuestions.length; i++) {
            newQuestions[i].number -= 1;
        }
        return new QuestionList(newQuestions);
    }

    map = (mapFunc) => this.questions.map(mapFunc);

    previousSavedQuestionIdFromIndex = (index) => {
        for (let i = index - 1; i >= 0; i--) {
            if (Question.isSaved(this.questions[i])) {
                return this.questions[i].id;
            }
        }
        return null;
    }
}
