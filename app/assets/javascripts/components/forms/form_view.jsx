/**
 * @prop classroom_id - the id of the classroom
 * @prop form_id      - the id of the form to display
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
        this._attemptAction(`/forms/${this.props.form_id}/submit`,
            this._formFields());
    }

    render() {
        return (
            <div className="form-view-container">
                <NameSelector id = {this.props.classroom_id} />
                <StudentFormQuestions onChange = {this._handleChange}
                                      form_id  = {this.props.form_id} />
                <input name="submit" type="button" value="Submit Responses"
                    className="submit-button" onClick={this._submitAnswers} />
            </div>
        );
    }
}

FormView.propTypes = {
    classroom_id : React.PropTypes.number,
    form_id      : React.PropTypes.number.isRequired,
};
