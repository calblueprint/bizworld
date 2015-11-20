/**
 * @prop classroom_id: id for classroom
 */
class StudentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { students: [] };
    }

    componentDidMount() {
        this._fetchStudents();
    }

    _fetchStudents = () => {
        $.getJSON(`/classrooms/${this.props.classroom_id}`)
            .done((data) => {
                this.setState({ students: data.students });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    render() {
        const students = this.state.students.map((student) => {
            return (
                <Student student  = {student}
                         key      = {student.id} />
            );
        });
        return (
            <div className="row">
                <UploadRoster success      = {this._fetchStudents}
                              classroom_id = {this.props.classroom_id} />
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Pre Score</th>
                                <th>Post Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

StudentsTable.propTypes = { classroom_id: React.PropTypes.number };

/**
 * @prop student - the info about this student
 */
class Student extends React.Component {

    constructor(props) {
        super(props);
        this.state = { student: this.props.student };
    }

    _formattedScore(score) {
        return (score) ? `${(score*100).toFixed(2)}%` : "N/A";
    }

    render() {
        return (
            <tr>
                <td>
                    { this.state.student.first_name }
                </td>
                <td>
                    { this.state.student.last_name }
                </td>
                <td>
                    { this._formattedScore(this.state.student.pre_score) }
                </td>
                <td>
                    { this._formattedScore(this.state.student.post_score) }
                </td>
            </tr>
        );
    }
}

Student.propTypes = { student: React.PropTypes.object.isRequired };
Student.defaultProps = { student: {} };
