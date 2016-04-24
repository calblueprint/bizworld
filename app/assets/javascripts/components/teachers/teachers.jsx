/**
 * @prop teacher_id - the id associated with the teacher
 * @prop program_id - the id associated with the selected program
 * @prop type    - active or inactive classroom
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
   <div>
   { classrooms }
   { createCourse }
   </div>
   );
 }
}

TeacherModal.propTypes = {
 teacher_id : React.PropTypes.number.isRequired,
 program_id : React.PropTypes.string.isRequired,
 type    : React.PropTypes.string.isRequired
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
