/**
 * @prop classrooms - the list of classes
 */
class ClassroomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { classrooms: [] };
    }

    componentDidMount() {
        this._fetchClassrooms();
    }

    _fetchClassrooms() {
        $.getJSON("/admins/classrooms")
            .done((data) => {
                this.setState({ classrooms: data });
            })
            .fail((xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            });
    }

    render() {
        var classrooms = this.state.classrooms.map(function(classroom) {
            return (
                <Classroom classroom  = {classroom}
                           key        = {classroom["id"]} />
            );
        });
        return (
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Teacher</th>
                                <th># Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ClassroomsTable.propTypes = { classrooms: React.PropTypes.array.isRequired };
ClassroomsTable.defaultProps = { classrooms: [] };

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
                    { this.state.classroom.teacher.email }
                </td>
                <td>
                    { this.state.classroom.students.length }
                </td>
            </tr>
        );
    }
}

Classroom.propTypes = { classroom: React.PropTypes.object.isRequired };
Classroom.defaultProps = { classroom: {} };
