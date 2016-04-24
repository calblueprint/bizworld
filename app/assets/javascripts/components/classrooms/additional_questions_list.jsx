/*
 * @prop questions - array of questions to ask
 * @prop responses - responses object, keeps track of user inputted answers
 * @prop handleInfoChange - for updating responses whenever they change
 */
const AdditionalQuestionsList = (props) => {
  const questions = this.props.questions.map((question) => (
    <AdditionalInfoQuestion
      question={question}
      key={question.id}
      handleInfoChange={this.props.handleInfoChange}
    />
  ));

  return (<div>{questions}</div>);
};

AdditionalQuestionsList.propTypes = {
  questions: React.PropTypes.array.isRequired,
  responses: React.PropTypes.object,
  handleInfoChange: React.PropTypes.func.isRequired,
};
