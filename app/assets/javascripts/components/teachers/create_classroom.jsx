class ClassroomDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = { programs: [] };
    }

    componentDidMount() {
        this._fetchPrograms();
    }

    _fetchPrograms() {
        const success = (data) => { this.setState({ programs : data }) }
        APIRequester.getJSON("/programs", success);
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
            <div className="form-group">
                <label htmlFor="program_id">Select module:</label>
                <select name="program_id" className="form-control program-select"
                 onChange={this.props.onChange}>
                    { programNames }
                </select>
            </div>
        );
    }
}


/**
 * @prop teacher_id - the id associated with the teacher
 */
class ClassroomCreationModal extends DefaultForm {

    constructor(props) {
        super(props);
        const curDate = moment().format('YYYY-MM-DD');
        this.state = {
            teacher_id : this.props.teacher_id,
            program_id : "1",
            start_date : curDate,
            end_date   : curDate
        };
    }

    _handleClassroomCreation = (e) => {
        this._attemptAction("/classrooms", this._formFields());
    }

    render() {
        return (
            <div className="modal fade" id="newClassroomModal" tabIndex={-1} role="dialog" aria-labelledby="newClassroomModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <h4 className="modal-title" id="newClassroomModalLabel">New Classroom</h4>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" placeholder="Classroom Name" name="name" onChange={this._handleChange} />
                            <ClassroomDropdown onChange={this._handleChange} />
                            <DateRangeInput onFilterChange={this._handleDateRangeChange} className="daterange" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" name="submit" value="Create Classroom" className="btn btn-primary" onClick={this._handleClassroomCreation}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ClassroomCreationModal.propTypes = { teacher_id : React.PropTypes.number.isRequired };
