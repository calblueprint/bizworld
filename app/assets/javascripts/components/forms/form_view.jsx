/**
 * @prop classroom_id - the id of the classroom
 *       form_id      - the id of the form to display
 */
class FormView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { responses: { } };
    }

    _handleChange = (e) => {
        const newState = React.addons.update(this.state.responses, {
             [$(e.target).attr("name")] : { $set: $(e.target).val() }
        });
        this.setState({ responses : newState });
    }

    _submitAnswers = (e) => {
        const fields = $.extend({}, this.state, { student : $('.student').val() });
        $.post(`/forms/${this.props.form_id}/submit`, fields)
            .done((msg) => {
                toastr.success(msg.message);
            })
            .fail((xhr, status, error) => {
                toastr.error(JSON.parse(xhr.responseText).message);
            });
    }

    render() {
        return (
            <div className="form-view">
                <NameSelector  id = {this.props.classroom_id} />
                <FormQuestions onChange = {this._handleChange}
                               id       = {this.props.form_id} />
                <input name="submit" type="button" value="Submit Responses"
                    className="submit-btn" onClick={this._submitAnswers} />
            </div>
        );
    }
}
