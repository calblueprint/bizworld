/**
 * @prop type - the type of program to fetch (active or inactive)
 */
class Programs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            programs : [],
            isLoading : true
        };
    }

    componentDidMount() {
        this._fetchPrograms(this.props);
    }

    _success = (data) => {
        this.setState({ programs : data, isLoading: false });
    }

    _fetchPrograms = (params) => {
        APIRequester.getJSON(APIConstants.programs.collection, this._success,
            params);
    }

    _renderSpinner = () => {
        if (this.state.isLoading && this.props.type === "active") {
            return (
                <div className="spinner-container"></div>
            );
        }
    }

    _renderCreateProgram = () => {
        if (!this.state.isLoading && this.props.type === "active") {
            return (
                <ProgramCreationModal callback={this._fetchPrograms} />
            );
        }
    }

    render() {
        const programs = this.state.programs.map((program) => {
            return (
                <ProgramContainer program={program} key={program.id} />
            );
        });

        return (
            <div className={`card-group-container card-group-${this.props.type}`}>
                { this._renderSpinner() }
                { programs }
                { this._renderCreateProgram() }
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

Programs.propTypes = { type : React.PropTypes.string.isRequired };
