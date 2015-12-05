/**
 * @prop classroom_id - id associated with the current classroom
 * @prop success      - function handler for successful student creation
 */
class StudentCreationModal extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = { classroom_id : this.props.classroom_id };
    }

    _handleStudentCreation = (e) => {
        const success = (msg) => {
            // Hacky workaround to clear component state
            $(".modal-dialog input").reactClear();
            $(React.findDOMNode(this.refs.modal)).modal("hide");
            this.props.success();
        }
        this._attemptAction(`/students`, this._formFields(), success);
    }

    render() {
        return (
            <div type="button"className="student-card-col add-student">
                <div data-toggle="modal" data-target="#newStudentModal" >
                    <div className="student-card add-card">
                        <span className="fa fa-plus" />
                        Add a new student
                    </div>
                </div>
                <div className="modal fade" id="newStudentModal" tabIndex={-1} role="dialog" aria-labelledby="newStudentModalLabel" ref="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title" id="newStudentModalLabel">New Student</h4>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" placeholder="First Name" name="first_name" onChange={this._handleChange} />
                                <input type="text" className="form-control" placeholder="Last Name" name="last_name" onChange={this._handleChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" name="submit" value="Create Student" className="btn btn-primary" onClick={this._handleStudentCreation}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentCreationModal.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired
};
