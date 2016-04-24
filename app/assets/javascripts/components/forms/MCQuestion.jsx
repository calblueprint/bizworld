/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 */
const MCQuestion = (props) => {
  const radioOptions = this.props.question.options.map((option, index) => {
    const uniqueId = this.props.question.id + option;
    return (
      <div className="radio-option" key={option}>
        <input
          id={uniqueId}
          type="radio"
          name={this.props.question.id}
          value={index}
          onClick={this.props.onChange}
        />
        <label className="radio-label" htmlFor={uniqueId}>
          {option}
        </label>
      </div>
    );
  });

  return (
    <fieldset className="question mc-question">
      <label className="question-title" htmlFor={this.props.question.id}>
        {`${this.props.question.number}. ${this.props.question.title}`}
      </label>
      {radioOptions}
    </fieldset>
  );
};

MCQuestion.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  question: React.PropTypes.object.isRequired,
};
