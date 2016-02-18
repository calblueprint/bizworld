/**
 * @prop classroom_id - id for classroom
 * @prop isAdmin      - whether admin is logged in
 */
class ClassroomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { classroom : { }, isLoading : true };
    }

    componentDidMount() {
        this._fetchClassroom();
    }

    _fetchClassroom = () => {
        const success = (data) => {
            this.setState({ classroom: data, isLoading : false })
        }
        APIRequester.getJSON(APIConstants.classrooms.member(
            this.props.classroom_id), success);
    }

    render() {
        let classpage;
        if (this.state.isLoading) {
            classpage = (
                <div className="spinner-container"></div>
            )
        } else {
            classpage = (
                <div>
                    <ClassInfo classroom    = {this.state.classroom}
                               success      = {this._fetchClassroom}
                               isAdmin      = {this.props.isAdmin} />
                    <StudentsTable students     = {this.state.classroom.students}
                                   classroom_id = {this.props.classroom_id}
                                   success      = {this._fetchClassroom} />
                </div>
            );
        }
        return (
            <div>
                { classpage }
            </div>
        );
    }
}

ClassroomPage.propTypes = {
    classroom_id: React.PropTypes.number
};
