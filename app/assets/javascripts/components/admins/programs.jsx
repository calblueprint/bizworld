/**
 * @prop active_programs     - list of active programs
 * @prop inactive_programs   - list of inactive programs
 */
class Programs extends DefaultForm {
  render() {
      const container_maker = (program) => ( <ProgramContainer program={program} key={program.id}/> );

      return (
          <div>
              <div className="card-group-container">
                  <h1 className="card-container-title">Active Programs</h1>
                    { this.props.active_programs.map(container_maker) }
                    <ProgramCreationModal />
              </div>

              <div className="card-group-container card-group-inactive">
                  <h1 className="card-container-title">Inactive Programs</h1>
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
            <div className="card-col">
                <a href={`/programs/${this.props.program.id}`}>
                    <div className={`card ${classType}`}>
                        <div className="name-container admin-program-name">
                            <h1 className="title">{ this.props.program.name }</h1>
                            <h2 className="subtitle">
                              <span className="count">{ this.props.program.num_classrooms  }</span> active classes
                            </h2>
                        </div>
                        <div className="card-color-bar"></div>
                    </div>
                </a>
            </div>
        );
    }
}
