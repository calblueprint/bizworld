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
        this.setState({ editable : !this.state.editable });
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
                <h1 className="teacher-account-header">Your Account</h1>
                { this._showInput("First Name", this.state.teacher.first_name) }
                { this._showInput("Last Name", this.state.teacher.last_name) }
                { this._showInput("Email", this.state.teacher.email) }
                { this._showInput("Phone", this.state.teacher.phone_number) }
                { this._showInput("School", this.state.teacher.school) }
                { this._showInput("City", this.state.teacher.city) }
                { this._showSelect("State", this.state.teacher.state, false) }
                { this._showSelect("Grades", gradesList, true) }

                <FormEditToggle editable = { this.state.editable }
                                update   = { this._changeButton } />
            </div>
        );
    }
}

TeacherAccountInfo.propTypes = {
    teacher_id : React.PropTypes.number.isRequired,
    editable   : React.PropTypes.bool.isRequired
};
