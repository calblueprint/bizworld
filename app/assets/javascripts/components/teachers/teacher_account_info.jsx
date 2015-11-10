/**
 * @prop teacher_id - id of teacher to show
 * @prop editable   - true if fields are editable
 */
class TeacherAccountInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teacher: {
                grades: []
            },
            editable: this.props.editable
        };
    }

    componentDidMount() {
        this._fetchTeacher(this.props.teacher_id);
    }

    _fetchTeacher(id) {
        $.getJSON(`/teachers/${id}`)
            .done((data) => {
                this.setState({ teacher: data });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    _changeInput = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    _changeButton = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).attr("data-edit") == "true" });
    }

    _showField = (label, data) => {
        return(
            <EditableInput label         = { label }
                           data          = { data }
                           editable      = { this.state.editable }
                           onChangeInput = { this._changeInput } />
        );
    }

    render() {
        return (
            <div>
                { this._showField("First Name", this.state.teacher.first_name) }
                { this._showField("Last Name", this.state.teacher.last_name) }
                { this._showField("Email", this.state.teacher.email) }
                { this._showField("Phone", this.state.teacher.phone_number) }
                { this._showField("School", this.state.teacher.school) }
                { this._showField("City", this.state.teacher.city) }
                <div>State: { this.state.teacher.state }</div>
                <div>Grade: { this.state.teacher.grades.join(', ') }</div>
                <form>
                    <fieldset className="input-container">
                        <input name="editable" type="button" value="Edit"
                            className="edit-btn" onClick={this._changeButton}
                            data-edit="true" />
                    </fieldset>
                </form>
            </div>
        );
    }
}

TeacherAccountInfo.propTypes = {
    teacher_id : React.PropTypes.number.isRequired,
    editable   : React.PropTypes.bool
};
