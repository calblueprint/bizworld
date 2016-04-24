/**
 * @prop id - the id of the classroom
 */
class NameSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    this._fetchStudents(this.props.id);
    $(React.findDOMNode(this.refs.select)).selectpicker({ dropupAuto: false });
  }

  componentDidUpdate() {
    $(React.findDOMNode(this.refs.select)).selectpicker('refresh');
  }

  _fetchStudents(id) {
    const success = (data) => { this.setState({ students: data.students }); };
    APIRequester.getJSON(APIConstants.classrooms.member(id), success);
  }

  render() {
    const studentNames = this.state.students.map((student) => (
      <option key={student.id} value={student.id}>
        {`${student.first_name} ${student.last_name}`}
      </option>
    ));

    return (
      <div className="input-container form-name-container">
        <label className="question-title" htmlFor="name-dropdown">Name:</label>
        <select
          id="name-dropdown"
          name="student"
          ref="select"
          className="selectpicker"
          data-live-search="true"
        >
          {studentNames}
        </select>
      </div>
    );
  }
}

NameSelector.propTypes = { id: React.PropTypes.number.isRequired };
