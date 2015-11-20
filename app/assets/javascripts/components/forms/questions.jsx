/* Enum for different question types */
const QuestionType = {
    MC     : 1,
    INPUT  : 2,
    LIKERT : 3
};


/**
 * @prop onChange - callback function when form inputs change
 *       id       - the id of the form
 */
class FormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions: [] };
    }

    componentDidMount() {
        this._fetchQuestions(this.props.id);
    }

    _fetchQuestions(id) {
        $.getJSON(`/forms/${id}`)
            .done((data) => {
                this.setState({ questions: data.questions });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    _mapQuestions = (question, index) => {
        const title = `${index + 1}. ${question.title}`;
        if (question.category == QuestionType.MC) {
            return (
                <MCQuestion onChange = {this.props.onChange}
                            options  = {question.options}
                            title    = {title}
                            id       = {question.id}
                            key      = {question.id} />
            );
        } else if (question.category == QuestionType.INPUT) {
            return (
                <InputQuestion onChange = {this.props.onChange}
                               title    = {title}
                               id       = {question.id}
                               key      = {question.id} />

            );
        } else if (question.category == QuestionType.LIKERT) {
            // TODO(nnarayen 10/29): determine where to initialize likert answers
            const likertOptions = ["Strongly Disagree", "Disagree",
                "Neither agree nor disagree", "Agree", "Strongly agree"];

            return (
                <MCQuestion onChange = {this.props.onChange}
                            options  = {likertOptions}
                            title    = {title}
                            id       = {question.id}
                            key      = {question.id} />
            );
        }
    }

    render() {
        const questions = this.state.questions.map(this._mapQuestions);
        return (
            <div className="form-questions-container">
                {questions}
            </div>
        );
    }
}

FormQuestions.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    id       : React.PropTypes.number.isRequired
};

/**
 * @prop onChange - callback function when form inputs change
 *       options  - the options for this question
 *       title    - the title for this question
 *       id       - the id for this question
 */
class MCQuestion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const radioOptions = this.props.options.map((option, index) => {
            const uniqueId = this.props.id + option;
            return (
                <div className="radio-option" key={option}>
                    <input id={uniqueId} type="radio" name={this.props.id}
                        value={index} onClick={this.props.onChange} />
                    <label className="radio-label" htmlFor={uniqueId}>{option}</label>
                </div>
            )
        });

        return (
            <fieldset className="question mc-question">
                <label className="question-title" htmlFor={this.props.id}>{this.props.title}</label>
                {radioOptions}
            </fieldset>
        );
    }
}

MCQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    options  : React.PropTypes.array.isRequired,
    title    : React.PropTypes.string.isRequired
};

/**
 * @prop onChange - callback function when form inputs change
 *       title    - the title for this question
 *       id       - the id for this question
 */
class InputQuestion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <fieldset className="question input-question input-container">
                <label className="question-title" htmlFor={this.props.id}>{this.props.title}</label>
                <input name={this.props.id} type="text"
                    onChange={this.props.onChange} />
            </fieldset>
        );
    }
}

InputQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    title    : React.PropTypes.string.isRequired
};
