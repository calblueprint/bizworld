/**
 * @prop teacher_id - id of teacher to show
 * @prop editable   - true if fields are editable
 */
class TeacherAccountInfo extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            teacher: { grades: [] },
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

    _changeButton = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).attr("data-edit") == "true" });
    }

    _showInput = (label, data) => {
        return (
            <EditableInput label        = { label }
                           data         = { data }
                           editable     = { this.state.editable }
                           handleChange = { this._handleChange} />
        );
    }

    _showSelect = (label, data, multiple) => {
        return (
            <EditableSelect label    = { label }
                            data     = { data }
                            multiple = { multiple }
                            editable = { this.state.editable } />
        );
    }

    render() {
        const gradesList = this.state.teacher.grades.join(', ');
        return (
            <div>
                { this._showInput("First Name", this.state.teacher.first_name) }
                { this._showInput("Last Name", this.state.teacher.last_name) }
                { this._showInput("Email", this.state.teacher.email) }
                { this._showInput("Phone", this.state.teacher.phone_number) }
                { this._showInput("School", this.state.teacher.school) }
                { this._showInput("City", this.state.teacher.city) }
                { this._showSelect("State", this.state.teacher.state, false) }
                { this._showSelect("Grades", gradesList, true) }
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
