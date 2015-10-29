/**
 * @prop classroom_id - the id of the classroom
 *       form_id      - the id of the form to display
 */
class FormView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    _handleChange = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    render() {
        return (
            <div className="form-view">
                <NameSelector  id = {this.props.classroom_id} />
                <FormQuestions onChange = {this._handleChange}
                               id       = {this.props.form_id} />
            </div>
        );
    }
}
