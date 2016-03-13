/**
 * @prop additional_info - string of JSON that holds current classroom responses
 * @prop classroom_id - id associated with the current classroom
 * @prop success - function called when classroom additional info is updated successfully
 */
class EditClassroomQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questions : this.props.questions, isLoading : false };
    }

    componentDidMount() {
        this._fetchQuestions();
    }

    _fetchQuestions = (scrollToBottom = false) => {
        this.setState({ isLoading : true })
        // Attempts to parse JSON, if it is invalid, sets responses to be empty.
        const success = (data) => {
            this.setState({ questions: data, isLoading : false });
            if (scrollToBottom) {
                // Scrolls to bottom of the questions list. Called when creating
                // a new question.
                $('html, body').scrollTop( $(document).height() );                
            }
        }
        APIRequester.getJSON(APIConstants.classrooms.questions, success);
    }

    _createNewQuestion = () => {
        const success = (msg) => {
            this._fetchQuestions(scrollToBottom = true);
        }
        const defaultQuestionFields = {
            title: "New Question",
            hint: "Edit the fields by clicking the small pencil"
        };
        APIRequester.post(APIConstants.classroom_additional_questions.collection,
            defaultQuestionFields,
            success
        );
    }

    render() {
        const questions = this.state.questions.map((question) => {
            return <AdminAdditionalInfoQuestion question  = {question}
                                         key       = {question.id}
                                         success   = {this._fetchQuestions} />
        });

        let editpage;
        if (this.state.isLoading) {
            editpage = (
                <div className="spinner-container"></div>
            )
        } else {
            editpage = (
                <div className="form-questions-container">
                    <div className="edit-classroom-questions-header-container">
                        <h4>Edit Classroom Additional Info Questions</h4>
                        <input type="button" value="New Question"
                                    className="button-small submit-button"
                                    onClick={this._createNewQuestion} />
                    </div>
                    { questions }
                </div>
            );
        }
        return (
            <div>
                { editpage }
            </div>
        );
    }
}

EditClassroomQuestions.defaultProps = {
    questions: [],
};

/**
 * @prop success  - callback function when form answers successfully update
 * @prop question - the MC question to display
 */
class AdminAdditionalInfoQuestion extends DefaultForm {

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.success();
            this.setState({ editable: false });
        }
        APIRequester.put(APIConstants.classroom_additional_questions.member(this.props.question.id),
            this.state, success);
    }

    _onTitleChange = (e) => {
        this.setState({ title : $(e.target).val() });
    }

    _onHintChange = (e) => {
        this.setState({ hint : $(e.target).val() });
    }

    _handleQuestionDelete = (e) => {
        const result = confirm("Are you sure you want to delete this question? This action cannot be undone");
        if (result) {
            APIRequester.delete(APIConstants.classroom_additional_questions.member(this.props.question.id),
                this.props.success);
        }
    }

    _renderEditButton() {
        let editButton;
        if (!this.state.editable) {
            editButton = (
                <a className="edit-question-button"
                        onClick={this._toggleEdit} >
                    <span className="fa fa-pencil"/>
                    Edit
                </a>
            );
        }
        return editButton;
    }

    _renderDeleteButton() {
        let deleteButton;
        if (!this.state.editable) {
            deleteButton = (
                <a className="delete-question-button"
                        onClick={this._handleQuestionDelete} >
                    <span className="fa fa-trash-o"/>
                    Delete
                </a>
            );            
        }
        return deleteButton;
    }

    _renderSaveContainer() {
        let saveContainer;
        if (this.state.editable) {
            saveContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Cancel"
                        className="button button-small" onClick={this._toggleEdit} />
                    <input type="button" value="Save Changes"
                        className="button-small submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return saveContainer;
    }

    _renderHintContainer() {
        let hintContainer;
        if (this.state.editable) {
            hintContainer = (
                <div>
                    <input type="text"
                        defaultValue={this.props.question.hint}
                        onChange={this._onHintChange} />
                </div>
            );
        } else {
            hintContainer = (
                <p>
                    { this.props.question.hint }
                </p>
            );
        }
        return hintContainer;
    }

    _renderTitleContainer() {
        let titleContainer;
        if (this.state.editable) {
            titleContainer = (
                <div>
                    <input type="text"
                        defaultValue={this.props.question.title}
                        onChange={this._onTitleChange} />
                </div>
            );
        } else {
            titleContainer = (
                <label className="question-title" htmlFor={this.props.question.id}>
                    { this.props.question.title }
                </label>
            );
        }
        return titleContainer;
    }

    _renderAnswerContainer() {
        let answerContainer;
        if (!this.state.editable) {
            answerContainer = (
                <input name={this.props.question.id} type="text" className=""
                    defaultValue={this.props.question.response} readOnly />
            );
        }
        return answerContainer;
    }

    render() {
        return (
            <div>
                <fieldset className="question input-question input-container">
                    { this._renderEditButton() }
                    { this._renderDeleteButton() }
                    { this._renderTitleContainer() }
                    { this._renderHintContainer() }
                    { this._renderAnswerContainer() }
                </fieldset>
                { this._renderSaveContainer() }
            </div>
        );
    }
}

AdminAdditionalInfoQuestion.propTypes = {
    success  : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired
};
