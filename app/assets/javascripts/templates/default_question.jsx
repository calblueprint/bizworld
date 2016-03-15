/**
 * @prop editableOnRender        - true if question is editable on render
 * @prop index                   - question index
 * @prop insertQuestionCallback  - callback function to insert question
 * @prop question                - the question to display
 * @prop success                 - callback function on successful form update
 */
class DefaultAdminQuestion extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            editable     : this.props.editableOnRender || false,
            options      : { },
            mouseEntered : false,
        };
    }

    _onMouseEnter = (e) => {
        this.setState({ mouseEntered: true });
    }

    _onMouseLeave = (e) => {
        this.setState({ mouseEntered: false });
    }

    _renderNewQuestionButton() {
        let newButton;
        if (this.state.mouseEntered && !this.state.editable) {
            newButton = (
                <input type="button" value="New Question"
                    className="button-small submit-button"
                    onClick={this._insertQuestionAfter} />
            );
        }
        return newButton;
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.success();
            this.setState({ editable: false });
        }
        if (Question.isNew(this.props.question)) {
            APIRequester.post(APIConstants.questions.collection,
                React.addons.update(this.props.question, {
                    $merge: { title: this.state.title }
                }), success);
        } else {
            APIRequester.put(APIConstants.questions.member(this.props.question.id),
                this.state, success);
        }
    }

    _onTitleChange = (e) => {
        this.setState({ title : $(e.target).val() });
    }

    _insertQuestionAfter = () => {
        this.props.insertQuestionCallback(this.props.index, this.props.question.number);
    }

    _deleteQuestion = () => {
        APIRequester.delete(APIConstants.questions.member(this.props.question.id),
            this.props.success);
    }

    toggleEdit = () => { // TODO: weird React name conflict
        if (Question.isNew(this.props.question)) {
            this.props.success(); // TODO: shouldn't need to hit backend in this case
        } else {
            this._toggleEdit();
        }
    }

    _renderEditButton() {
        let editButton;
        if (!this.state.editable) {
            editButton = (
                <a className="edit-question-button"
                        onClick={this.toggleEdit} >
                    <span className="fa fa-pencil"/>
                    Edit
                </a>
            );
        }
        return editButton;
    }

    _renderSaveContainer() {
        let saveContainer;
        if (this.state.editable) {
            saveContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Cancel"
                        className="button button-small" onClick={this.toggleEdit} />
                    <input type="button" value="Save Changes"
                        className="button-small submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return saveContainer;
    }
}

DefaultAdminQuestion.propTypes = {
    editableOnRender       : React.PropTypes.bool,
    index                  : React.PropTypes.number.isRequired,
    insertQuestionCallback : React.PropTypes.func.isRequired,
    question               : React.PropTypes.object.isRequired,
    success                : React.PropTypes.func.isRequired,
};
