/**
* @prop callback - callback for when program is successfully created
*/
class ProgramCreationModal extends DefaultForm {
    _handleProgramCreation = (e) => {
        const success = (msg) => {
            $('#newProgramModal').modal('toggle');
            this.props.callback();
        };
        this._attemptAction(APIConstants.programs.collection, this._formFields(), success);
    }

    componentDidMount() {
        $('#newProgramModal').on('hidden.bs.modal', (e) => $('#programName').val(""));
        $('#newProgramModal').on('shown.bs.modal', (e) => this._focusInputField());
    }

    //TODO: Add color picker and icon selection for program styling.
    render() {
        return (
            <div className="card-col">
              <div type="button" className="add-course">
                  <div data-toggle="modal" data-target="#newProgramModal" >
                      <div className="card add-card">
                          <span className="fa fa-plus"></span>
                          Create a new program
                      </div>
                  </div>
              </div>
              <div className="modal fade" id="newProgramModal" tabIndex={-1}
                  role="dialog" aria-labelledby="newProgramModalLabel">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title"
                                  id="newProgramModalLabel">
                                  Create New Program
                              </h4>
                          </div>
                          <div className="modal-body">
                              <fieldset className="input-container">
                                  <label>Program Name</label>
                                  <input type="text" className="form-control" id="programName" ref="focus" name="name"
                                      onChange={this._handleChange} />
                              </fieldset>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="button"
                                      data-dismiss="modal">Cancel</button>
                              <button type="button" className="submit-button"
                                      onClick={this._handleProgramCreation}>
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

ProgramCreationModal.proptypes = { callback: React.PropTypes.func.isRequired };
