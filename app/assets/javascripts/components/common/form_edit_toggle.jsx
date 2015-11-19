/**
 * @prop editable - true if fields are editable
 * @prop update   - function to toggle editable mode true/false
 */
class FormEditToggle extends React.Component {

    render() {
        var buttonContainer;
        if (this.props.editable) {
            buttonContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Cancel"
                        className="button" onClick={this.props.update} />
                    <input type="button" value="Save Changes"
                        className="button submit-button" onClick={this.props.update} />
                </div>
            )
        } else {
            buttonContainer = (
                <div className="edit-button-container">
                    <input name="editable" type="button" value="Edit"
                        className="button" onClick={this.props.update} />
                </div>
            )
        }
        return (
            <fieldset>
                { buttonContainer }
            </fieldset>
        )
    }
}

FormEditToggle.propTypes = {
    editable : React.PropTypes.bool.isRequired
};
