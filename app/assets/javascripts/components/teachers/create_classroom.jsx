/**
 * @prop teacher_id - the id associated with the teacher
 */
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
            <fieldset className="input-container program-select">
                <label htmlFor="program_id">Select program</label>
                <select name="program_id" className="form-control program-select"
                 onChange={this.props.onChange}>
                    { programNames }
                </select>
            </fieldset>
        );
    }
}


/**
 * @prop teacher_id - the id associated with the teacher
 */
class ClassroomCreationModal extends DefaultForm {

    constructor(props) {
        super(props);
        const curDate = formatDate(moment());
        this.state = {
            teacher_id : this.props.teacher_id,
            program_id : "1",
            start_date : curDate,
            end_date   : curDate
        };
    }

    _handleClassroomCreation = (e) => {
        this._attemptAction(APIConstants.classrooms.collection, this._formFields());
    }

    render() {
        return (
            <div className="classroom-card-col">
              <div type="button" className="add-course">
                  <div data-toggle="modal" data-target="#newClassroomModal" >
                      <div onClick={this._focusInputField} className="classroom-card add-card">
                          <span className="fa fa-plus"></span>
                          Create a new course
                      </div>
                  </div>
              </div>
              <div className="modal fade" id="newClassroomModal" tabIndex={-1}
                  role="dialog" aria-labelledby="newClassroomModalLabel">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title"
                                  id="newClassroomModalLabel">
                                  Create New Classroom
                              </h4>
                          </div>
                          <div className="modal-body">
                              <fieldset className="input-container">
                                  <label>Classroom name</label>
                                  <input type="text" className="form-control" ref="focus"
                                      placeholder="Bizworld Class 1" name="name"
                                      onChange={this._handleChange} />
                              </fieldset>
                              <ClassroomDropdown onChange={this._handleChange} />
                              <fieldset className="input-container date-select">
                                  <label>Date range</label>
                                  <DateRangeInput className="daterange"
                                      onFilterChange={this._handleDateRangeChange} />
                              </fieldset>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="button"
                                      data-dismiss="modal">Cancel</button>
                              <button type="button" className="button submit-button"
                                      onClick={this._handleClassroomCreation}>
                                      Create
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

ClassroomCreationModal.propTypes = { teacher_id : React.PropTypes.number.isRequired };
