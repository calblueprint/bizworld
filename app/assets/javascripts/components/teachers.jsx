/**
 * @prop classrooms - the list of classrooms for a teacher
 * teacher - the teacher associated with :id
 */
class TeacherModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
            teacher_id: this.props.teacher_id,
        };
    }

    componentDidMount() {
        this._fetchClassrooms(this.state.teacher_id);
    }

    _fetchClassrooms(id) {
        $.getJSON(`/teachers/${id}/classrooms`)
            .done((data) => {
                this.setState({ classrooms: data });
            })
            .fail((xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            });
    }

    render() {
        const classrooms = this.state.classrooms.map(function(classroom) {
            return (
                <Classroom classroom = {classroom}
                                 key = {classroom["id"]} />
            );
        });


        return (
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Start</th>
                                <th>End</th>
                                <th># Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            { classrooms }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

TeacherModal.propTypes = { classrooms: React.PropTypes.array.isRequired };
TeacherModal.defaultProps = { classrooms: [] };


/**
 * @prop classroom - the info about this classroom
 */
class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { classroom: this.props.classroom };
    }

    render() {
        return (
            <tr>
                <td>
                    { this.state.classroom.term }
                </td>
                <td>
                    { this.state.classroom.start_date }
                </td>
                <td>
                    { this.state.classroom.end_date }
                </td>
                <td>
                    { this.state.classroom.students.length }
                </td>
            </tr>
        );
    }
}


Classroom.PropTypes = { classroom: React.PropTypes.object.isRequired };
Classroom.defaultProps = { classroom: {} };
