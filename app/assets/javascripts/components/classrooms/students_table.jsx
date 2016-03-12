/**
 * @prop classroom_id - id associated with the current classroom
 * @prop students     - students in current classroom
 * @prop success      - function handler for successful ClassInfo box update
 */
class StudentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { students : this.props.students };
    }

    getDefaultProps() {
        return {
            students: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ students : nextProps.students });
    }

    _generateCSVLink() {
        return APIConstants.classrooms.download(this.props.classroom_id);
    }

    render() {
        let emptyState;
        if (this.state.students.length == 0) {
            emptyState = (
                <div className="empty-table-container">
                    <h1>No students yet! Import a roster or add a student to begin.</h1>
                </div>
            );
        }

        const students = this.state.students.map((student) => {
            return (
                <Student student = {student}
                         success = {this.props.success}
                         key     = {student.id} />
            );
        });

        return (
            <div className="student-info-container">
                <div className="student-table-action-bar">
                    <a className="action-item button button-small download-button"
                            href={this._generateCSVLink()}>
                        <span className="fa fa-download"/>
                        Download Scores
                    </a>
                    <UploadModal classroom_id = {this.props.classroom_id}
                                 success      = {this.props.success} />
                    <StudentCreationModal classroom_id = {this.props.classroom_id}
                                          success      = {this.props.success}/>
                </div>
                <div className="student-table-container">
                    { emptyState }
                    <table className="table student-table">
                        <thead>
                            <tr>
                                <th>FIRST</th>
                                <th>LAST</th>
                                <th className="score">PRE-SCORE</th>
                                <th className="score">POST-SCORE</th>
                                <th className="trash-col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { students }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

StudentsTable.propTypes = {
    students     : React.PropTypes.arrayOf(React.PropTypes.object),
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired
};

/**
 * @prop student - the info about this student
 * @prop success - callback function to call on successful delete
 */
class Student extends React.Component {

    constructor(props) {
        super(props);
        this.state = { student: this.props.student };
    }

    _formattedScore(score) {
        return (score) ? `${(score*100).toFixed(2)}%` : "N/A";
    }

    _handleStudentDelete = (e) => {
      const id = this.props.student.id;
      APIRequester.delete(APIConstants.students.member(this.props.student.id),
          this.props.success);
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
                <td>
                    <div className="fa fa-trash-o delete-control"
                        onClick={this._handleStudentDelete}></div>
                </td>
            </tr>
        );
    }
}

Student.propTypes = {
    student: React.PropTypes.object.isRequired,
    success: React.PropTypes.func.isRequired
 };
