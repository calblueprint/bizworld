/**
 * @prop onChange - function that is called onChange for inputs, updates program_id
 * @prop showAll  - whether to show the 'All Programs' option
 */
class ProgramFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { programs: [] };
    }

    componentDidMount() {
        this._fetchPrograms();
    }

    _fetchPrograms() {
        const success = (data) => { this.setState({ programs : data }) }
        APIRequester.getJSON(APIConstants.programs.collection, success);
    }

    render() {
        const programNames = this.state.programs.map((program) => {
            return (
                <option key={program.id} value={program.id}>
                    {program.name}
                </option>
            );
        });

        return (
            <div className="teacher-classroom-filter">
                <select name="program_id" onChange={this.props.onChange} className="program-select" id="module">
                    <optgroup>
                        { this.props.showAll ? <option value="">All Programs</option> : null }
                        { programNames }
                    </optgroup>
                </select>
            </div>
        );
    }
}

ProgramFilter.propTypes = {
    onChange : React.PropTypes.func.isRequired,
    showAll  : React.PropTypes.bool.isRequired
};
