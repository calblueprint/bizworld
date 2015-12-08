/**
 * @prop classroom_id - id associated with the current classroom
 * @prop students     - students in current classroom
 * @prop success      - function handler for successful ClassInfo box update
 */
class StudentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { students : [] };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ students : nextProps.students });
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
                         success = {this._fetchStudents}
                         key     = {student.id} />
            );
        });

        return (
            <div className="student-info-container">
                <div className="student-table-action-bar">
                    <StudentCreationModal classroom_id = {this.props.classroom_id}
                                          success      = {this.props.success}/>
                    <UploadModal classroom_id = {this.props.classroom_id}
                                 success      = {this.props.success} />
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
 * @prop success - callback function to call on successful actions
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

/**
 * @prop classroom - classroom info to display
 * @prop success   - function handler for successful ClassInfo box update
 */
class ClassInfo extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            classroom: { students: [], program: {} },
            editable: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ classroom : nextProps.classroom });
    }

    _formatLink(link) {
        if (link) { return link.replace(/^https?:\/\//, "") }
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

    _showDateRange = (label, startDate, endDate) => {
        return (
            <EditableDateRange label        = { label }
                               startDate    = { startDate }
                               endDate      = { endDate }
                               handleChange = { this._handleDateRangeChange }
                               editable     = { this.state.editable } />
        );
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.setState({ editable: false });
            this.props.success();
        };
        APIRequester.put(APIConstants.classrooms.member(
            this.props.classroom.id), this.state, success);
    }

    render() {
        const classType = `classroom-${this.state.classroom.program.id}`;
        return (
            <div className="class-info-container">
                <div className="class-title-container">
                    <h1 className={`classroom-program ${classType}`}>
                        { this.state.classroom.program.name }
                    </h1>
                    <h1 className="classroom-name">{ this.state.classroom.name }</h1>
                </div>
                <div className="class-info-box">
                    <h1><span className="fa fa-info-circle"></span>Class Info</h1>
                    <div className="info-grid">
                        <div className="class-info-item">
                            <h2 className="grid-label">Class ID</h2>
                            <div className="info-data number">
                                { this.props.classroom.id }
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Students</h2>
                            <div className="info-data number">
                                { this.state.classroom.students.length }
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Pre-Test</h2>
                            <div className="info-data">
                                <a href={this.state.classroom.pre_link} target="_blank">
                                    { this._formatLink(this.state.classroom.pre_link) }
                                </a>
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Post-Test</h2>
                            <div className="info-data">
                                <a href={this.state.classroom.post_link} target="_blank">
                                    { this._formatLink(this.state.classroom.post_link) }
                                </a>
                            </div>
                        </div>
                    </div>
                    { this._showInput("Classroom Name", "name", this.state.classroom.name) }
                    { this._showDateRange("Date Range", this.state.classroom.start_date, this.state.classroom.end_date) }

                    <FormEditToggle editable = { this.state.editable }
                                    update   = { this._toggleEdit }
                                    save     = { this._attemptSave } />
                </div>
            </div>
        );
    }
}

ClassInfo.propTypes = {
    classroom : React.PropTypes.object.isRequired,
    success   : React.PropTypes.func.isRequired
};
