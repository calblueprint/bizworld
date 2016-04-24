/**
 * @prop onChange - callback function when form responses change
 * @prop form_id  - the id of the form
 */
class StudentFormQuestions extends DefaultFormQuestions {

  _mapQuestions = (question, index) => {
    const categoryToComponent = {
      [QuestionType.MC]: MCQuestion,
      [QuestionType.INPUT]: InputQuestion,
    };
    const Question = categoryToComponent[question.category];
    return (
      <Question
        onChange={this.props.onChange}
        question={question}
        key={question.id}
      />
    );
  }
}

StudentFormQuestions.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  form_id: React.PropTypes.number.isRequired,
};
