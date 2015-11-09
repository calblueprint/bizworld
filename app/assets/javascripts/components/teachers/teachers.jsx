
/**
 * @prop classrooms - the list of classrooms for a teacher
 *       teacher_id - the :id associated with the teacher
 */
class TeacherModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
        };
    }

    componentDidMount() {
        this._fetchClassrooms( this.props.teacher_id, { type : this.props.type } );
    }

    _fetchClassrooms(id, params) {
        $.getJSON(`/teachers/${id}/classrooms`, params)
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
                <ClassroomContainer classroom = {classroom}
                                          key = {classroom["id"]} />
            );
        });

        var createCourse = null;
        if (this.props.type == 'active') {
            createCourse = (
                <div className="col-md-4">
                    <div className="add-course">
                        <div className="row">
                            Create a <br></br> new course
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="medium-container">
                <div className="row">
                    { classrooms }
                    { createCourse }
                </div>
            </div>
        );
    }
}

TeacherModal.propTypes = { classrooms: React.PropTypes.array.isRequired };


/**
 * @prop classroom - the info about this classroom
 */
class ClassroomContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    _clickClassroom = (e) => {
        window.location.replace(`/classrooms/${this.props.classroom.id}`);
    }

    render() {
        const classroomClass = `classroom-card ${this.props.type}-classroom`

        return (
            <div className="col-md-4">
                <div className={classroomClass} onClick={this._clickClassroom} >
                    <div className="row">
                        <div className="classroom-name col-md-6">
                            { this.props.classroom.name }<br></br>

                            { this.props.classroom.program.name }<br></br>
                        </div>
                        <div className="classroom-count col-md-6">
                            { this.props.classroom.students.length } Students<br></br>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ClassroomConatiner.PropTypes = { classroom: React.PropTypes.object.isRequired };
