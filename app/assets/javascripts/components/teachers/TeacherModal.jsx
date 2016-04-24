/**
 * @prop teacher_id - the id associated with the teacher
 * @prop program_id - the id associated with the selected program
 * @prop type    - active or inactive classroom
 */

class TeacherModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classrooms: [], isLoading: true };
  }

  componentDidMount() {
    this._fetchClassrooms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._fetchClassrooms(nextProps);
  }

  _fetchClassrooms(params) {
    const success = (data) => { this.setState({ classrooms: data, isLoading: false }); };
    APIRequester.getJSON(APIConstants.teachers.classrooms(this.props.teacher_id), success, params);
  }

  render() {
    let classrooms;
    let createCourse;

    if (this.state.isLoading) {
      if (this.props.type === 'active') {
        classrooms = (
          <div className="spinner-container"></div>
        );
      }
    } else {
      classrooms = this.state.classrooms.map((classroom) => (
        <ClassroomContainer
          classroom={classroom}
          key={classroom.id}
        />
        )
      );

      if (this.props.type === 'active') {
        createCourse = (<ClassroomCreationModal teacher_id={this.props.teacher_id} />);
      }
    }

    return (
      <div>
        {classrooms}
        {createCourse}
      </div>
    );
  }
}

TeacherModal.propTypes = {
  teacher_id: React.PropTypes.number.isRequired,
  program_id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
};
