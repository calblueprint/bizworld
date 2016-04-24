/**
* @prop classroom - the info about this classroom
*/
const ClassroomContainer = (props) => {
  const classType = (`classroom-${this.props.classroom.program.id}`);
  return (
    <div className="classroom-card-col">
      <div className={`classroom-card ${classType}`}>
        <a href={`/classrooms/${this.props.classroom.id}`}>
          <div className="name-container">
            <h1 className="title">{this.props.classroom.name}</h1>
            <h2 className="program">{this.props.classroom.program.name}</h2>
          </div>
          <div className="count-container">
            <h3 className="count">{this.props.classroom.students.length}</h3>
            <h2 className="student-label">students</h2>
          </div>
        </a>
      </div>
    </div>
  );
};

ClassroomContainer.propTypes = { classroom: React.PropTypes.object.isRequired };
