/**
 * @prop classroom_id - the id associated with the classroom
 * @prop success      - callback function to call on successful upload
 */
class UploadModal extends React.Component {

    _success = (e) => {
        $(this.refs.modal.getDOMNode()).modal("hide");
        this.props.success();
    }

    render() {
        return (
            <div>
                <input className="button upload-button" type="button"
                    value="Upload Roster" onClick={this._uploadRoster}
                    data-toggle="modal" data-target="#uploadRosterModal" />
                <div className="modal fade" id="uploadRosterModal" tabIndex={-1}
                    role="dialog" ref="modal" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"
                                        data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">
                                    Upload Your Student Roster
                                </h4>
                            </div>
                            <div className="modal-body">
                                In order to upload your student roster,
                                your Excel file needs to have two columns
                                named exactly "First Name" and "Last Name."
                                You can have extra information in the file,
                                but those two columns are necessary.
                                <UploadRoster classroom_id = {this.props.classroom_id}
                                              success      = {this._success} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UploadModal.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired
};
