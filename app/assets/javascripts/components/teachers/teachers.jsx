/**
 * @prop teacher_id - the id associated with the teacher
 * @prop program_id - the id associated with the selected program
 * @prop type       - active or inactive classroom
 */

class TeacherModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { classrooms : [], isLoading : true };
    }

    componentDidMount() {
        this._fetchClassrooms(this.props);
    }

    _fetchClassrooms(params) {
        const success = (data) => { this.setState({ classrooms: data, isLoading: false }) }
        APIRequester.getJSON(APIConstants.teachers.classrooms(this.props.teacher_id), success, params)
    }

    componentWillReceiveProps(nextProps) {
        this._fetchClassrooms(nextProps);
    }

    render() {
        let classrooms;
        let createCourse;

        if (this.state.isLoading) {
            if (this.props.type == 'active') {
                classrooms = (
                    <div className="spinner-container"></div>
                )
            }
        } else {
            classrooms = this.state.classrooms.map(function(classroom) {
                return (
                    <ClassroomContainer classroom = {classroom}
                                              key = {classroom["id"]} />
                );
            });

            if (this.props.type == 'active') {
                createCourse = <ClassroomCreationModal teacher_id={this.props.teacher_id} />
            }
        }

        return (
            <div className="card-group-container">
                { classrooms }
                { createCourse }
            </div>
        );
    }
}

TeacherModal.propTypes = {
    teacher_id : React.PropTypes.number.isRequired,
    program_id : React.PropTypes.string.isRequired,
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
            <div className="card-col">
                <a href={`/classrooms/${this.props.classroom.id}`}>
                    <div className={`card ${classType}`}>
                        <div className="name-container">
                            <h1 className="title">{ this.props.classroom.name }</h1>
                            <h2 className="subtitle">{ this.props.classroom.program.name }</h2>
                        </div>
                        <div className="count-container">
                            <h3 className="count">{ this.props.classroom.num_students }</h3>
                            <h2 className="count-label">students</h2>
                        </div>
                        <div className="card-color-bar"></div>
                    </div>
                </a>
            </div>
        );
    }
}


ClassroomContainer.PropTypes = { classroom: React.PropTypes.object.isRequired };
