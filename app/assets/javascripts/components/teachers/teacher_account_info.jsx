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

    _showInput = (label, name, data) => {
        return (
            <EditableInput label        = { label }
                           name         = { name }
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
                <h1 className="teacher-account-header">Your Account</h1>
                { this._showInput("First Name", "first_name", this.state.teacher.first_name) }
                { this._showInput("Last Name", "last_name", this.state.teacher.last_name) }
                { this._showInput("Email", "email", this.state.teacher.email) }
                { this._showInput("Phone", "phone_number", this.state.teacher.phone_number) }
                { this._showInput("School", "school", this.state.teacher.school) }
                { this._showInput("City", "city", this.state.teacher.city) }
                { this._showSelect("State", this.state.teacher.state, false) }
                { this._showSelect("Grades", gradesList, true) }

                <FormEditToggle editable = { this.state.editable }
                                update   = { this._toggleEdit } />
            </div>
        );
    }
}

TeacherAccountInfo.propTypes = {
    teacher_id : React.PropTypes.number.isRequired,
    editable   : React.PropTypes.bool.isRequired
};
