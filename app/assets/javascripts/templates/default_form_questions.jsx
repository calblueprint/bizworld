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

        let newQuestionButton;
        if (this instanceof AdminFormQuestions) {
            // HACK(aleks, 04/27/16): breaks abstraction, but #yolo
            newQuestionButton = (
                <div className="global-new-question-button">
                    <button
                        className="submit-button button-small"
                        onClick={this._insertQuestionAtEnd}
                    >New Question</button>
                </div>
            );
        }

        return (
            <div className="form-questions-container">
                <ReactSortable
                    options={{
                        handle: '.form-questions-handle',
                        onSort: (evt) => {
                            question = this.state.questionList.questions[evt.oldIndex];
                            this._moveQuestion(evt.oldIndex, evt.newIndex, question);
                        },
                    }}
                    onChange={(order, sortable) => {
                        // Need stub for React to properly update UI.
                    }}
                >
                    {questions}
                </ReactSortable>
                { newQuestionButton }
            </div>
        );
    }
}

DefaultFormQuestions.propTypes = {
    form_id: React.PropTypes.number.isRequired,
}
