/* Enum for Form view types */
const FormViewType = {
    STUDENT : 0,
    ADMIN   : 1
};

/**
 * @prop classroom_id - the id of the classroom
 * @prop form_id      - the id of the form to display
 * @prop view         - view type for this form
 */
class FormView extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            classroom_id : this.props.classroom_id,
            responses: { }
        };
    }

    _handleChange = (e) => {
        const newState = React.addons.update(this.state.responses, {
             [$(e.target).attr("name")] : { $set: $(e.target).val() }
        });
        this.setState({ responses : newState });
    }

    _submitAnswers = (e) => {
        this._attemptAction(`/forms/${this.props.form_id}/submit`, this._formFields());
    }

    render() {
        let nameSelector, submitButton;
        if (this.props.view == FormViewType.STUDENT) {
            nameSelector = <NameSelector id = {this.props.classroom_id} />
            submitButton = (
                <input name="submit" type="button" value="Submit Responses"
                    className="submit-button" onClick={this._submitAnswers} />
            );
        }
        return (
            <div className="form-view-container">
                { nameSelector }
                <FormQuestions onChange = {this._handleChange}
                               view     = {this.props.view}
                               id       = {this.props.form_id} />
                { submitButton }
            </div>
        );
    }
}

FormView.propTypes = {
    classroom_id : React.PropTypes.number,
    form_id      : React.PropTypes.number.isRequired,
    view         : React.PropTypes.number.isRequired
};
