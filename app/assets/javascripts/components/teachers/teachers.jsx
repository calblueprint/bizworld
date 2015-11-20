
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

        let createCourse;
        if (this.props.type == 'active') {
            createCourse = (
                <div className="classroom-card-col add-course">
                  <div className="classroom-card add-card">
                      <span className="fa fa-plus"></span>
                      Create a new course
                  </div>
                </div>
            );
        }

        return (
            <div>
                { classrooms }
                { createCourse }
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
        window.location.href = `/classrooms/${this.props.classroom.id}`;
    }

    render() {
        const classType = `classroom-${this.props.classroom.program.id}`
        return (
            <div className="classroom-card-col">
                <div className={`classroom-card ${classType}`}
                       onClick={this._clickClassroom} >
                    <div className="name-container">
                        <h1 className="title">{ this.props.classroom.name }</h1>
                        <h2 className="program">{ this.props.classroom.program.name }</h2>
                    </div>
                    <div className="count-container">
                        <h3 className="count">{ this.props.classroom.students.length }</h3>
                        <h2 className="student-label">students</h2>
                    </div>
                </div>
            </div>
        );
    }
}


ClassroomContainer.PropTypes = { classroom: React.PropTypes.object.isRequired };
