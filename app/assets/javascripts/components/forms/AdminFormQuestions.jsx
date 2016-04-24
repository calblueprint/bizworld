/**
 * @prop form_id - the id of the form
 */
class AdminFormQuestions extends DefaultFormQuestions {

  _insertQuestion = (prev_index, prev_number) => {
    const newQuestionStub = Question.createStub({
      form_id: this.props.form_id,
      category: QuestionType.MC,
      number: prev_number + 1,
    });
    const newQuestionList = this.state.questionList.insertAt(prev_index + 1, newQuestionStub);
    this.setState({
      questionList: newQuestionList,
    });
  }

  _saveQuestion = (index, question) => {
    const savingQuestion = Object.assign({}, question);

    const success = (msg) => {
      const savedQuestion = msg.data.question;
      savedQuestion.updatingFromSave = true;

      const newQuestionList = this.state.questionList.replaceAt(index, savedQuestion);
      this.setState({
        questionList: newQuestionList,
      });
    };

    if (Question.isNew(question)) {
      const prevId = this.state.questionList.previousSavedQuestionFromIndex(index).id;
      APIRequester.post(APIConstants.questions.collection, {
        question,
        insert_after: prevId,
      }, success);
    } else {
      APIRequester.put(APIConstants.questions.member(question.id), question, success);
    }
  }

  _deleteQuestion = (index, question) => {
    const success = () => {
      const newQuestionList = this.state.questionList.removeIndex(index);
      this.setState({
        questionList: newQuestionList,
      });
    };

    if (Question.isNew(question)) {
      success();
    } else {
      APIRequester.delete(APIConstants.questions.member(question.id), success);
    }
  }

  _replaceQuestion = (index, question) => {
    const newQuestionList = this.state.questionList.replaceAt(index, question);
    this.setState({
      questionList: newQuestionList,
    });
  }

  _mapQuestions = (question, index) => {
    const AdminQuestion = QuestionType.reactComponentFor(question.category);
    return (
      <AdminQuestion
        question={question}
        key={question.id}
        index={index}
        editableOnRender={question.editableOnRender}
        updatingFromSave={question.updatingFromSave}
        saveCallback={this._saveQuestion}
        replaceCallback={this._replaceQuestion}
        deleteCallback={this._deleteQuestion}
        insertQuestionCallback={this._insertQuestion}
      />
    );
  }
}
