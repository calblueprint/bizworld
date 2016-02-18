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
            <div className="action-item">
                <button className="button button-small upload-button submit-button-o" type="button"
                        onClick={this._uploadRoster} data-toggle="modal"
                        data-target="#uploadRosterModal">
                    <span className="fa fa-upload"></span>
                    Upload Roster
                </button>
                <div className="modal fade" id="uploadRosterModal" tabIndex={-1}
                    role="dialog" ref="modal" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Upload Your Student Roster
                                </h4>
                            </div>
                            <UploadRoster classroom_id = {this.props.classroom_id}
                                          success      = {this._success} />
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
