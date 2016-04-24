/* Enum for different question types */
class QuestionType {
  static reactComponentFor(type) {
    return QuestionType.categoryToComponent[type];
  }
}
QuestionType.MC = 1;
QuestionType.INPUT = 2;
QuestionType.categoryToComponent = {
  [QuestionType.MC]: AdminMCQuestion,
  [QuestionType.INPUT]: AdminInputQuestion,
};
QuestionType.categoryToName = {
  [QuestionType.MC]: "Multiple Choice",
  [QuestionType.INPUT]: "Free Response",
};

class Question {
  static createStub(options) {
    const questionStub = {
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
      $merge: options,
    });
    Question.unique_id -= 1;
    return newQuestion;
  }

  static isNew(question) {
    return question.id < 0;
  }

  static isSaved(question) {
    return !Question.isNew(question);
  }

}
// HACK(aleks, 03/14/16): currently the only way to assign static fields to classes in ES6
Question.unique_id = -1;
