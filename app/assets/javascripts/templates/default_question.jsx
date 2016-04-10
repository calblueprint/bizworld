/**
 * @prop editableOnRender        - true if question is editable on render
 * @prop index                   - question index
 * @prop insertQuestionCallback  - callback function to insert question
 * @prop question                - the question to display
 * @prop saveSuccess             - callback function on successful question update
 * @prop delSuccess              - callback function on successful question delete
 */
class DefaultAdminQuestion extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            editable     : (this.props.editableOnRender != null) ? this.props.editableOnRender : false,
            options      : { },
            mouseEntered : false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editableOnRender != null) {
            this.setState({ editable: nextProps.editableOnRender })
        }
    }

    _onMouseEnter = (e) => {
        this.setState({ mouseEntered: true });
    }

    _onMouseLeave = (e) => {
        this.setState({ mouseEntered: false });
    }

    _renderNewQuestionButton() {
        return (
            <input type="button" value="New Question"
                className="button-small submit-button new-question-button"
                onClick={this._insertQuestionAfter} />
        );
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.saveSuccess(this.props.index,
                React.addons.update( { id: msg.data.id }, {
                    $merge: { title: this.state.title }
                }));
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

    _insertQuestionAfter = (e) => {
        e.stopPropagation();
        this.props.insertQuestionCallback(this.props.index, this.props.question.number);
    }

    _deleteQuestion = (e) => {
        e.stopPropagation();
        const success = (msg) => {
            this.props.delSuccess(this.props.index);
        }
        if (Question.isNew(this.props.question)) {
            this.props.delSuccess(this.props.index);
        } else {
            APIRequester.delete(APIConstants.questions.member(this.props.question.id),
                success);
        }
    }

    _startEditing = () => {
        if (!this.state.editable) {
            this._toggleEdit();
        }
    }

    _stopEditing = () => {
        if (Question.isNew(this.props.question)) {
            this.props.delSuccess(this.props.index);
        } else {
            this._toggleEdit();
        }
    }

    _renderSaveContainer() {
        let saveContainer;
        if (this.state.editable) {
            saveContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Cancel"
                        className="button button-small" onClick={this._stopEditing} />
                    <input type="submit" value="Save Changes"
                        className="button-small submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return saveContainer;
    }

    _renderQuestionTitle() {
        return (
            <EditableTitle name         = {this.props.question.id}
                           number       = {this.props.question.number}
                           title        = {this.props.question.title}
                           editable     = {this.state.editable}
                           onTextChange = {this._onTitleChange} />
        );
    }

    _editClass() {
        return this.state.editable ? "editing-true" : "";
    }

    _renderEditLabel() {
        if (this.state.editable) {
            return <div className="edit-label active">Currently editing</div>
        } else {
            return <div className="edit-label">Click anywhere to edit</div>
        }
    }
}

DefaultAdminQuestion.propTypes = {
    editableOnRender       : React.PropTypes.bool,
    index                  : React.PropTypes.number.isRequired,
    insertQuestionCallback : React.PropTypes.func.isRequired,
    question               : React.PropTypes.object.isRequired,
    saveSuccess            : React.PropTypes.func.isRequired,
    delSuccess             : React.PropTypes.func.isRequired,
};
