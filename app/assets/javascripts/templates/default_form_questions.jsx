/**
 * @prop form_id - the id of the form to display
 */
class DefaultFormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions: [], isLoading: false };
    }

    componentDidMount() {
        this._fetchQuestions();
    }

    _fetchQuestions = (e) => {
        this.setState({ isLoading : true })
        const success = (data) => { this.setState({ questions: data.questions, isLoading : false }) }
        APIRequester.getJSON(APIConstants.forms.member(this.props.form_id),
            success);
    }

    render() {
        let questions;
        if (this.state.isLoading) {
            questions = (
                <div className="spinner-container"></div>
            )
        } else {
            questions = this.state.questions.map(this._mapQuestions);
        }
        return (
            <div className="form-questions-container">
                { questions }
            </div>
        );
    }
}

DefaultFormQuestions.propTypes = { form_id : React.PropTypes.number.isRequired }
