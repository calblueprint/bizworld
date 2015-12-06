/**
 * @prop teacher_id - the id associated with the teacher
 * @prop type       - active or inactive classroom
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
        const success = (data) => { this.setState({ classrooms: data }) }
        APIRequester.getJSON(APIConstants.teachers.classrooms(id), success, params)
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
                <div type="button" className="classroom-card-col add-course">
                    <div data-toggle="modal" data-target="#newClassroomModal" >
                        <div className="classroom-card add-card">
                            <span className="fa fa-plus"></span>
                            Create a new course
                        </div>
                    </div>
                    <ClassroomCreationModal teacher_id={this.props.teacher_id} />
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

TeacherModal.propTypes = {
    teacher_id : React.PropTypes.number.isRequired,
    type       : React.PropTypes.string.isRequired
};

/**
 * @prop classroom - the info about this classroom
 */
class ClassroomContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classType = `classroom-${this.props.classroom.program.id}`
        return (
            <div className="classroom-card-col">
                <div className={`classroom-card ${classType}`}>
                    <a href={`/classrooms/${this.props.classroom.id}`}>
                        <div className="name-container">
                            <h1 className="title">{ this.props.classroom.name }</h1>
                            <h2 className="program">{ this.props.classroom.program.name }</h2>
                        </div>
                        <div className="count-container">
                            <h3 className="count">{ this.props.classroom.students.length }</h3>
                            <h2 className="student-label">students</h2>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}


ClassroomContainer.PropTypes = { classroom: React.PropTypes.object.isRequired };
