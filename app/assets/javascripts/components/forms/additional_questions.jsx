/**
 * @prop responses - current responses for the additional questions
 * @prop onChange  - callback function when form responses change
 * @prop form_id   - the id of the form
 */
class AdditionalFormQuestions extends DefaultFormQuestions {

    _mergeResponses = (questions) => {
        questions.forEach((question) => {
            const respIndex = this.props.responses.findIndex((response) => {
                return response.question_id == question.id;
            });
            if (respIndex != -1) {
                question.response = this.props.responses[respIndex].answer;
            }
        });
        this.setState({
            questionList : new QuestionList(questions),
            isLoading    : false
        });
    }

    _fetchQuestions = (e) => {
        this.setState({ isLoading : true });
        const success = (data) => this._mergeResponses(data.questions);
        APIRequester.getJSON(APIConstants.forms.member(this.props.form_id), success);
    }

    _mapQuestions = (question, index) => {
        // Leave flexible mapping in case MC questions get added later
        const categoryToComponent = {
            [QuestionType.INPUT] : AdditionalInputQuestion,
        };
        const Question = categoryToComponent[question.category];
        return (
            <Question onChange = {this.props.onChange}
                      question = {question}
                      key      = {question.id} />
        );
    }
}

AdditionalFormQuestions.propTypes = {
    responses : React.PropTypes.array.isRequired,
    onChange  : React.PropTypes.func.isRequired,
    form_id   : React.PropTypes.number.isRequired
};

/**
 * @prop onChange - callback function when form answers change
 * @prop question - the MC question to display
 */
class AdditionalInputQuestion extends React.Component {

    render() {
        return (
            <fieldset className="question input-question input-container">
                <label className="question-title" htmlFor={this.props.id}>
                    { `${this.props.question.number}. ${this.props.question.title}` }
                </label>
                <div className="hint-container">
                    <p>
                        { this.props.question.hint }
                    </p>
                </div>
                <input name={this.props.question.id} type="text"
                    defaultValue={this.props.question.response}
                    onChange={this.props.onChange} />
            </fieldset>
        );
    }
}

AdditionalInputQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired
};
