/**
 * @prop classroom_id - id associated with the current classroom
 */
class DeleteClassroomModal extends React.Component {

    _handleClassroomDelete = (e) => {
        APIRequester.delete(APIConstants.classrooms.member(this.props.classroom_id), () => {});
    }

    render() {
        return (
            <div className="action-item delete-item">
                <button data-toggle="modal" data-target="#removeClassroomModal"
                    className="button button-small delete-button">
                    <div>
                        <span className="fa fa-trash-o" />
                        Delete Classroom
                    </div>
                </button>
                <div className="modal fade" id="removeClassroomModal" tabIndex={-1}
                        role="dialog" ref="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Confirm Classroom Deletion
                                </h4>
                            </div>
                            <div className="modal-body delete-text">
                                <p>Are you sure you want to delete this classroom? You cannot undo this action!
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button"
                                    data-dismiss="modal">Cancel</button>
                                <button type="button" name="delete"
                                        value="Delete Classroom" className="submit-button" onClick={this._handleClassroomDelete}>
                                    Yes, delete
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
