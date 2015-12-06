/**
 * @prop question - the question to display
 * @prop success  - callback function on successful form update
 */
class DefaultAdminQuestion extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            editable : false,
            options  : { }
        };
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.success();
            this.setState({ editable: false });
        }
        APIRequester.put(APIConstants.questions.member(this.props.question.id),
            this.state, success);
    }

    _onTitleChange = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    _renderEditButton() {
        let editButton;
        if (!this.state.editable) {
            editButton = (
                <span className="fa fa-pencil-square-o edit-question"
                    onClick={this._toggleEdit} />
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
                        className="button" onClick={this._toggleEdit} />
                    <input type="button" value="Save Changes"
                        className="button submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return saveContainer;
    }
}

DefaultAdminQuestion.propTypes = {
    question : React.PropTypes.object.isRequired,
    success  : React.PropTypes.func.isRequired
};
