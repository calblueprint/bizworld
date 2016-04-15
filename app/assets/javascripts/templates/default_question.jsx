/**
 * @prop index                   - question index
 * @prop question                - the question to display
 * @prop updatingFromSave        - true if updating from save
 * @prop editableOnRender        - true if question is editable on render
 * @prop replaceCallback         - callback function to replace question
 * @prop saveCallback            - callback function to save question
 * @prop deleteCallback          - callback function to delete question
 * @prop insertQuestionCallback  - callback function to insert new question
 */
class DefaultAdminQuestion extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            editable:     (this.props.editableOnRender != null) ? this.props.editableOnRender : false,
            question:     Object.assign({}, props.question),
            mouseEntered: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatingFromSave === true) {
            this.state = {
                editable: (nextProps.editableOnRender != null) ? nextProps.editableOnRender : false,
                question: Object.assign({}, nextProps.question),
            }
        }
    }

    _onMouseEnter = (e) => {
        if (!this.state.mouseEntered) {
            this.setState({ mouseEntered: true });
        }
    }

    _onMouseLeave = (e) => {
        if (this.state.mouseEntered) {
            this.setState({ mouseEntered: false });
        }
    }

    _startEditing = (e) => {
        if (!this.state.editable) {
            e.preventDefault();
            this._toggleEdit();
        }
    }

    _stopEditing = () => {
        if (Question.isNew(this.state.question)) {
            this.props.deleteCallback(this.props.index, this.state.question);
        } else {
            this._toggleEdit();
        }
    }

    _onTitleChange = (e) => {
        const newQuestion = React.addons.update(this.state.question, {
            title: { $set: $(e.target).val() }
        });
        this.setState({ question: newQuestion });
    }

    _insertQuestionAfter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.insertQuestionCallback(this.props.index, this.props.question.number);
    }

    _saveQuestion = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.saveCallback(this.props.index, this.state.question);
    }

    _deleteQuestion = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.deleteCallback(this.props.index, this.state.question);
    }

    _renderEditLabel() {
        if (this.state.editable) {
            return <div className="edit-label active">Currently editing</div>
        } else {
            return <div className="edit-label">Click anywhere to edit</div>
        }
    }

    _onTypeChange = (e) => {
        const newQuestion = React.addons.update(this.state.question, { $merge: {
            category: parseInt(e.target.value),
            editableOnRender: true,
        }});
        this.props.replaceCallback(this.props.index, newQuestion);
    }

    _renderQuestionTypeSelecter() {
        let questionTypeSelecter;
        if (this.state.editable) {
            let questionOptions = [];
            for (let category in QuestionType.categoryToName) {
                if (QuestionType.categoryToName.hasOwnProperty(category)) {
                    let categoryName = QuestionType.categoryToName[category];
                    questionOptions.push((
                        <option key={category} value={category}>
                            {categoryName}
                        </option>
                    ));
                }
            }

            questionTypeSelecter = (
                <div className="question-type-select-container">
                    <select onChange={this._onTypeChange} value={this.state.question.category}
                            name="question_type">
                        {questionOptions}
                    </select>
                </div>
            );
        }
        return questionTypeSelecter;
    }

    _renderQuestionHeader() {
        return (
            <div className="question-header">
                { this._renderEditLabel() }
                <div className="fa fa-trash-o delete-question-button"
                    onClick={this._deleteQuestion}></div>
                { this._renderQuestionTypeSelecter() }
            </div>
        );
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
                        onClick={this._saveQuestion} />
                </div>
            );
        }
        return saveContainer;
    }

    _renderNewQuestionButton() {
        return (
            <input type="button" value="New Question"
                className="button-small submit-button new-question-button"
                onClick={this._insertQuestionAfter} />
        );
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

}

DefaultAdminQuestion.propTypes = {
    index:                  React.PropTypes.number.isRequired,
    question:               React.PropTypes.object.isRequired,
    updatingFromSave:       React.PropTypes.bool,
    editableOnRender:       React.PropTypes.bool,
    replaceCallback:        React.PropTypes.func.isRequired,
    saveCallback:           React.PropTypes.func.isRequired,
    deleteCallback:         React.PropTypes.func.isRequired,
    insertQuestionCallback: React.PropTypes.func.isRequired,
};
