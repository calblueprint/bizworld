/**
 * @prop classroom_id - id for classroom
 */
class ClassroomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { classroom : { } };
    }

    componentDidMount() {
        this._fetchClassroom();
    }

    _fetchClassroom = () => {
        const success = (data) => {
            this.setState({ classroom: data })
        }
        APIRequester.getJSON(APIConstants.classrooms.member(
            this.props.classroom_id), success);
    }

    render() {
        return (
            <div className="classroom-view-container">
                <div className="student-info-container">
                    <StudentsTable students     = {this.state.classroom.students}
                                   classroom_id = {this.props.classroom_id}
                                   success      = {this._fetchClassroom} />
                </div>
                <ClassInfo classroom = {this.state.classroom}
                           success   = {this._fetchClassroom} />
            </div>
        );
    }
}

ClassroomPage.propTypes = {
    classroom_id: React.PropTypes.number
};
