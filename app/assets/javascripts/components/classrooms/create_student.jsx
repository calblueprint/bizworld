/**
 * @prop classroom_id - id associated with the current classroom
 * @prop success      - function handler for successful student creation
 */
class StudentCreationModal extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = { classroom_id : this.props.classroom_id };
    }

    _attemptCreate = (e) => {
        const success = (msg) => {
            // Hacky workaround to clear component state
            $(".modal-dialog input").reactClear();
            $(React.findDOMNode(this.refs.modal)).modal("hide");
            this.props.success();
        }
        this._attemptAction(APIConstants.students.collection, this._formFields(),
            success);
    }

    render() {
        return (
            <div className="action-item">
                <div data-toggle="modal" data-target="#newStudentModal" >
                    <div onClick={this._focusInputField} type="button" className="student-card add-card button button-small">
                        <span className="fa fa-plus" />
                        Add a new student
                    </div>
                </div>
                <div className="modal fade" id="newStudentModal" tabIndex={-1}
                        role="dialog" ref="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create New Student</h4>
                            </div>
                            <div className="modal-body">
                                <fieldset className="input-container name-container">
                                    <label>First name</label>
                                    <input type="text" placeholder="First Name" ref="focus" name="first_name" onChange={this._handleChange} />
                                </fieldset>

                                <fieldset className="input-container name-container">
                                    <label>Last name</label>
                                    <input type="text" placeholder="Last Name" name="last_name" onChange={this._handleChange} />
                                </fieldset>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button" data-dismiss="modal">Cancel</button>
                                <button type="button" name="submit" value="Create Student" className="button submit-button" onClick={this._attemptCreate}>Create</button>
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
