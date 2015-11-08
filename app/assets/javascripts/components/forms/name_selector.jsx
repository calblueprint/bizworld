/**
 * @prop id - the id of the classroom
 */
class NameSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = { students: [] };
    }

    componentDidMount() {
        this._fetchStudents(this.props.id);
        $('.student').selectpicker({ dropupAuto: false });
    }

    _fetchStudents(id) {
        $.getJSON(`/classrooms/${id}`)
            .done((data) => {
                this.setState({ students: data.students });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    componentDidUpdate() {
        $('.student').selectpicker('refresh');
    }

    render() {
        const studentNames = this.state.students.map((student) => {
            return (
                <option key={student.id} value={student.id}>
                    {student.first_name + " " + student.last_name}
                </option>
            );
        });

        return (
            <div className="input-container">
                <label className="question-title" htmlFor="name-dropdown">Name:</label>
                <select id="name-dropdown" name="student" className="selectpicker student"
                    data-live-search="true">
                    {studentNames}
                </select>
            </div>
        );
    }
}
