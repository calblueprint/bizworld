/*
 * @prop question - contains metadata for the question (title, hint, initial response)
 * @prop handleInfoChange - for updating responses whenever they change
 */
const AdditionalInfoQuestion = (props) => (
  <fieldset className="input-container">
    <div className="label-container">
      <label>{`${this.props.question.title}`}</label>
    </div>
    <div className="hint-container">
      <p>{this.props.question.hint}</p>
    </div>
    <div>
      <input
        name={this.props.question.id} type="text"
        defaultValue={this.props.question.response}
        onChange={this.props.handleInfoChange}
      />
    </div>
  </fieldset>
);

AdditionalInfoQuestion.propTypes = {
  question: React.PropTypes.object.isRequired,
  handleInfoChange: React.PropTypes.func.isRequired,
};
