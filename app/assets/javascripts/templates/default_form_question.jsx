/**
 * @prop onChange - callback function when form answers change
 * @prop success  - callback function on successful form update
 * @prop question - the question to display
 * @prop view     - view type for this question
 */
class DefaultFormQuestion extends DefaultForm {

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
        APIRequester.put(`/questions/${this.props.question.id}`, this.state,
            success);
    }

    _renderEditButton() {
        let editButton;
        if (this.props.view == FormViewType.ADMIN && !this.state.editable) {
            editButton = (
                <span className="fa fa-pencil-square-o edit-question"
                    onClick={this._toggleEdit} />
            );
        }
        return editButton;
    }

    _renderButtonContainer() {
        let buttonContainer;
        if (this.props.view == FormViewType.ADMIN && this.state.editable) {
            buttonContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Cancel"
                        className="button" onClick={this._toggleEdit} />
                    <input type="button" value="Save Changes"
                        className="button submit-button"
                        onClick={this._attemptSave} />
                </div>
            );
        }
        return buttonContainer;
    }

    _onTextChange = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }
}

DefaultFormQuestion.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    success  : React.PropTypes.func.isRequired,
    question : React.PropTypes.object.isRequired,
    view     : React.PropTypes.number.isRequired
};
