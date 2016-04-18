/**
 * @prop form_id - the id of the form to display
 */
class DefaultFormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionList: new QuestionList(),
            isLoading: false,
        };
    }

    componentDidMount() {
        this._fetchQuestions();
    }

    _fetchQuestions = (e) => {
        this.setState({ isLoading : true })
        const success = (data) => this.setState({
            questionList: new QuestionList(data.questions),
            isLoading : false
        })
        APIRequester.getJSON(APIConstants.forms.member(this.props.form_id), success);
    }

    render() {
        let questions;
        if (this.state.isLoading) {
            questions = (
                <div className="spinner-container"></div>
            )
        } else {
            questions = this.state.questionList.map(this._mapQuestions);
        }
        return (
            <div className="form-questions-container">
                { questions }
            </div>
        );
    }
}

DefaultFormQuestions.propTypes = {
    form_id: React.PropTypes.number.isRequired,
}
