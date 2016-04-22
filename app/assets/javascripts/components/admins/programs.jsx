/**
 * @prop active_programs     - list of active programs
 * @prop inactive_programs   - list of inactive programs
 */
class Programs extends DefaultForm {
  render() {
      const container_maker = (program) => ( <ProgramContainer program={program} key={program.id}/> );

      return (
          <div>
              <div className="classes-container active-class">
                  <h1 className="classes-container-title">Active Programs</h1>
                    { this.props.active_programs.map(container_maker) }
                    <ProgramCreationModal />
              </div>

              <div className="classes-container inactive-class">
                  <h1 className="classes-container-title">Inactive Programs</h1>
                    { this.props.inactive_programs.map(container_maker) }
              </div>
          </div>
      );
  }
}

Programs.PropTypes = {
    active_programs: React.PropTypes.array,
    inactive_programs: React.PropTypes.array
};


/**
* @prop program - the info about this program
*/
class ProgramContainer extends React.Component {

   render() {
       const classType = `classroom-${this.props.program.id}`
       return (
           <div className="classroom-card-col">
               <div className={`classroom-card ${classType}`}>
                   <a href={`/programs/${this.props.program.id}`}>
                       <div className="name-container">
                           <h1 className="title">{ this.props.program.name }</h1>
                       </div>
                       <div className="count-container">
                           <h3 className="count">{ this.props.program.num_classrooms }</h3>
                           <h2 className="student-label">active classes</h2>
                       </div>
                   </a>
               </div>
           </div>
       );
   }
}
