/* Enum for different question types */
const QuestionType = {
    MC    : 1,
    INPUT : 2
};

/**
 * @prop onChange - callback function when form responses change
 * @prop view     - view type for this form
 * @prop id       - the id of the form
 */
class FormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions : [] };
    }

    componentDidMount() {
        this._fetchQuestions();
    }

    _fetchQuestions = (e) => {
        const success = (data) => { this.setState({ questions: data.questions }) }
        APIRequester.getJSON(`/forms/${this.props.id}`, success);
    }

    _mapQuestions = (question, index) => {
        if (question.category == QuestionType.MC) {
            return (
                <MCQuestion onChange = {this.props.onChange}
                            success  = {this._fetchQuestions}
                            question = {question}
                            view     = {this.props.view}
                            key      = {question.id} />
            );
        } else if (question.category == QuestionType.INPUT) {
            return (
                <InputQuestion onChange = {this.props.onChange}
                               success  = {this._fetchQuestions}
                               question = {question}
                               view     = {this.props.view}
                               key      = {question.id} />

            );
        }
    }

    render() {
        const questions = this.state.questions.map(this._mapQuestions);
        return (
            <div className="form-questions-container">
                { questions }
            </div>
        );
    }
}

FormQuestions.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    view     : React.PropTypes.number.isRequired,
    id       : React.PropTypes.number.isRequired
};

/**
 * @prop onChange - callback function when form answers change
 * @prop success  - callback function when questions updated
 * @prop question - the MC question to display
 * @prop view     - view type for this question
 */
class MCQuestion extends DefaultFormQuestion {

    _onOptionChange = (e) => {
        const newOptions = React.addons.update(this.state.options, {
            [$(e.target).attr("name")]: { $set: $(e.target).val() }
        });
        this.setState({ options : newOptions });
    }

    render() {
        const radioOptions = this.props.question.options.map((option, index) => {
            const checked = (this.props.view == FormViewType.ADMIN &&
                             this.props.question.answer == index);
            return (
                <div className="radio-option" key={option}>
                    <EditableRadio name          = {this.props.question.id}
                                   view          = {this.props.view}
                                   value         = {index}
                                   option        = {option}
                                   checked       = {checked}
                                   editable      = {this.state.editable}
                                   onTextChange  = {this._onOptionChange}
                                   onRadioChange = {this.props.onChange} />
                </div>
            )
        });

        return (
            <fieldset className="question mc-question">
                <label className="question-title" htmlFor={this.props.id}>
                    { `${this.props.question.number}. ${this.props.question.title}` }
                    { this._renderEditButton() }
                </label>
                { radioOptions }
                { this._renderButtonContainer() }
            </fieldset>
        );
    }
}

MCQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    success  : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired,
    view     : React.PropTypes.number.isRequired
};

/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 * @prop view     - view type for this question
 */
class InputQuestion extends React.Component {

    constructor(props) {
        super(props);
    }

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
    question : React.PropTypes.object.isRequired,
    view     : React.PropTypes.number.isRequired
};
