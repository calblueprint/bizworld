/**
 * @prop question                - the question to display
 * @prop success                 - callback function on successful form update
 * @prop insertQuestionCallback  - callback function to insert question
 * @prop index                   - question index
 * @prop editableOnRender        - true if question is editable on render
 */
class DefaultAdminQuestion extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            editable : this.props.editableOnRender || false,
            options  : { },
            mouseEntered : false,
        };
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.success();
            this.setState({ editable: false, isEditing: false });
        }
        if (this.props.question.id < 0) {
            var params = Object.assign({});
            params.number = this.props.question.number;
            params.category = this.props.question.category;
            params.form_id = this.props.question.form_id;
            params.title = this.state.title;

            APIRequester.post(APIConstants.questions.create, params, success);
        } else {
            APIRequester.put(APIConstants.questions.member(this.props.question.id),
                this.state, success);
        }
    }

    _onTitleChange = (e) => {
        this.setState({ title : $(e.target).val() });
    }

    _insertQuestionAfter = (e) => {
        e.stopPropagation();
        this.props.insertQuestionCallback(this.props.index, this.props.question.number);
    }

    _deleteQuestion = () => {
        APIRequester.delete(APIConstants.questions.member(this.props.question.id),
            this.props.success);
    }

    toggleEdit = () => { // TODO: weird React name conflict
        if (this.props.question.id < 0) {
            this.props.success(); // TODO: shouldn't need to hit backend in this case
        } else {
            this._toggleEdit();
            this.setState({ isEditing: false })
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
                    <input type="submit" value="Save Changes"
                        className="button-small submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return saveContainer;
    }
}

DefaultAdminQuestion.propTypes = {
    question : React.PropTypes.object.isRequired,
    success : React.PropTypes.func.isRequired,
    insertQuestionCallback : React.PropTypes.func.isRequired,
    index : React.PropTypes.number.isRequired,
    editableOnRender : React.PropTypes.bool,
};
