/**
 * @prop onChange - callback function when form responses change
 * @prop form_id  - the id of the form
 */
class StudentFormQuestions extends DefaultFormQuestions {

    _mapQuestions = (question, index) => {
        const categoryToComponent = {
            [QuestionType.MC]    : MCQuestion,
            [QuestionType.INPUT] : InputQuestion,
        };
        const Question = categoryToComponent[question.category];
        return (
            <Question onChange = {this.props.onChange}
                      question = {question}
                      key      = {question.id} />
        );
    }
}

StudentFormQuestions.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    form_id  : React.PropTypes.number.isRequired
};

/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 */
class MCQuestion extends React.Component {

    render() {
        const radioOptions = this.props.question.options.map((option, index) => {
            const uniqueId = this.props.question.id + option;
            return (
                <div className="radio-option" key={option}>
                    <input id={uniqueId} type="radio" name={this.props.question.id}
                        value={index} onClick={this.props.onChange} />
                    <label className="radio-label" htmlFor={uniqueId}>
                        { option }
                    </label>
                </div>
            );
        });

        return (
            <fieldset className="question mc-question">
                <label className="question-title" htmlFor={this.props.question.id}>
                    { `${this.props.question.number}. ${this.props.question.title}` }
                </label>
                { radioOptions }
            </fieldset>
        );
    }
}

MCQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired
};

/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 */
class InputQuestion extends React.Component {

    render() {
        return (
            <fieldset className="question input-question input-container">
                <label className="question-title" htmlFor={this.props.id}>
                    { `${this.props.question.number}. ${this.props.question.title}` }
                </label>
                <input name={this.props.question.id} type="text"
                    onChange={this.props.onChange} />
            </fieldset>
        );
    }
}

InputQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired
};
