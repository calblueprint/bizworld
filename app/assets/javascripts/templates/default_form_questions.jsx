/* Enum for different question types */
const QuestionType = {
    MC    : 1,
    INPUT : 2
};

/**
 * @prop form_id - the id of the form to display
 */
class DefaultFormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions : [] };
    }

    componentDidMount() {
        this._fetchQuestions();
    }

    _fetchQuestions = (e) => {
        const success = (data) => { this.setState({ questions: data.questions }) }
        APIRequester.getJSON(APIConstants.forms.member(this.props.form_id),
            success);
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

DefaultFormQuestions.propTypes = { form_id : React.PropTypes.number.isRequired }
