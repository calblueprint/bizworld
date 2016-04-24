/**
 * @prop classroom - the info about this classroom
 */
class ClassroomsTableRow extends React.Component {

  _handleRowClick = () => {
    window.location.href = `/classrooms/${this.props.classroom.id}`;
  }

  _formatTeacherName(teacher) {
    return `${teacher.first_name} ${teacher.last_name}`;
  }

  _formatDateRange(classroom) {
    return `${formatDate(classroom.start_date)} to ${formatDate(classroom.end_date)}`;
  }

  render() {
    return (
      <tr onClick={this._handleRowClick}>
        <td>{this.props.classroom.name}</td>
        <td>{this._formatTeacherName(this.props.classroom.teacher)}</td>
        <td>{this.props.classroom.teacher.email}</td>
        <td>{this._formatDateRange(this.props.classroom)}</td>
      </tr>
    );
  }
}

ClassroomsTableRow.propTypes = {
  classroom: React.PropTypes.object.isRequired,
};
