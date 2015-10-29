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

    _mapQuestions = (question) => {
        if (question.category == QuestionType.MC) {
            return (
                <MCQuestion onChange = {this.props.onChange}
                            options  = {question.options}
                            title    = {question.title}
                            id       = {question.id}
                            key      = {question.id} />
            );
        } else if (question.category == QuestionType.INPUT) {
            return (
                <InputQuestion onChange = {this.props.onChange}
                               title    = {question.title}
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
                            title    = {question.title}
                            id       = {question.id}
                            key      = {question.id} />
            );
        }
    }

    render() {
        const questions = this.state.questions.map(this._mapQuestions);
        return (
            <div className="form-questions">
                {questions}
            </div>
        );
    }
}

FormQuestions.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    id       : React.PropTypes.number.isRequired
};
FormQuestions.defaultProps = { onChange: () => {}, id: 0 };

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
        const radioOptions = this.props.options.map((option) => {
            return (
                <div className="radio-option" key={option}>
                    <input type="radio" name={this.props.id} value={option}
                        onClick={this.props.onChange} />
                    {option}
                </div>
            )
        });

        return (
            <div className="mc-question">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                {radioOptions}
            </div>
        );
    }
}

MCQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    options  : React.PropTypes.array.isRequired,
    title    : React.PropTypes.string.isRequired
};
MCQuestion.defaultProps = { onChange: () => {}, options: [], title: "" };

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
            <div className="input-question">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input name={this.props.id} type="text"
                    onChange={this.props.onChange} />
            </div>
        );
    }
}

InputQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    title    : React.PropTypes.string.isRequired
};
InputQuestion.defaultProps = { onChange: () => {}, title: "" };
