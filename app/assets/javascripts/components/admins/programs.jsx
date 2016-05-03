class Programs extends DefaultForm {
    constructor(props) {
        super(props);
        this.state = { active_programs : [], inactive_programs: [], isLoading : true };
    }

    componentDidMount() {
        this._fetchPrograms();
    }

    _success = (data) => {
        const is_active = (program) => program.is_active;
        const is_inactive = (program) => !program.is_active;
        const active_programs = data.filter(is_active);
        const inactive_programs = data.filter(is_inactive);
        this.setState({
            active_programs: active_programs,
            inactive_programs: inactive_programs,
            isLoading: false
        });
    }

    _fetchPrograms = () => {
        APIRequester.getJSON(APIConstants.programs.collection, this._success);
    }

    render() {
        const container_maker = (program) => ( <ProgramContainer program={program} key={program.id}/> );

        let active_programs, inactive_programs, create_program;

        if (this.state.isLoading) {
            active_programs = ( <div className="spinner-container"></div> );
        } else {
            active_programs = this.state.active_programs.map(container_maker);
            inactive_programs = this.state.inactive_programs.map(container_maker);
            create_program = (<ProgramCreationModal callback={this._fetchPrograms}/>);
        }

        return (
            <div>
                <div className="card-group-container">
                    <h1 className="card-container-title">Active Programs</h1>
                      { active_programs }
                      { create_program }
                </div>

                <div className="card-group-container card-group-inactive">
                    <h1 className="card-container-title">Inactive Programs</h1>
                      { inactive_programs }
                </div>
            </div>
        );
    }
}

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
