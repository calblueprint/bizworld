/**
 * @prop classroom_id - id associated with the current classroom
 */
class DeleteClassroomModal extends React.Component {

    _handleClassroomDelete = (e) => {
        APIRequester.delete(APIConstants.classrooms.member(this.props.classroom_id), () => {});
    }

    render() {
        return (
            <div type="button"className="classroom-card-col remove-classroom">
                <div data-toggle="modal" data-target="#removeClassroomModal" >
                    <div className="student-card add-card">
                        <span className="fa fa-trash-o" />
                        Delete Classroom
                    </div>
                </div>
                <div className="modal fade" id="removeClassroomModal" tabIndex={-1}
                        role="dialog" ref="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"
                                        data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">
                                    Confirm Classroom Deletion
                                </h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn
                                    btn-default"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" name="delete"
                                        value="Delete Classroom" className="btn
                                        btn-primary" onClick={this._handleClassroomDelete}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DeleteClassroomModal.propTypes = {
    classroom_id : React.PropTypes.number.isRequired
};
