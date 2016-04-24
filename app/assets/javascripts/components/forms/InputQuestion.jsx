/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 */
const InputQuestion = (props) => (
  <fieldset className="question input-question input-container">
    <label className="question-title" htmlFor={this.props.id}>
      {`${this.props.question.number}. ${this.props.question.title}`}
    </label>
    <input
      name={this.props.question.id}
      type="text"
      onChange={this.props.onChange}
    />
  </fieldset>
);

InputQuestion.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  question: React.PropTypes.object.isRequired,
};
