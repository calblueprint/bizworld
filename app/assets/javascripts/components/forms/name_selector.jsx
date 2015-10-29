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
        $('.selectpicker').selectpicker({ dropupAuto: false });
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
        $('.selectpicker').selectpicker('refresh');
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
            <select name="student" className="selectpicker" data-live-search="true">
                {studentNames}
            </select>
        );
    }
}
