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
        $(this.refs.select.getDOMNode()).selectpicker({ dropupAuto: false });
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
        $(this.refs.select.getDOMNode()).selectpicker('refresh');
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
                <select id="name-dropdown" name="student" ref="select"
                    className="selectpicker" data-live-search="true">
                    {studentNames}
                </select>
            </div>
        );
    }
}
