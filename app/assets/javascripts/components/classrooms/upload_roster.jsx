/* Acceptable file types to upload for the classroom roster */
const FILE_INPUTS = [
    ".csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];


/* Text to display before user has uploaded a file */
const DEFAULT_FILE = "Choose a File";

/**
 * @prop classroom_id - id for classroom
 *       success      - function handler for successful upload
 */
class UploadRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submit : false,
            file   : DEFAULT_FILE
        };
    }

    _handleFileSelect = (e) => {
        // Disable roster upload if no file selected
        this.setState({
            submit : $(e.target)[0].files.length > 0,
            file   : $(e.target).val().split("\\").pop() || DEFAULT_FILE
        });
    }

    _uploadRoster = (e) => {
        const formData = new FormData();
        formData.append("file", $(React.findDOMNode(this.refs.file))[0].files[0]);
        const extraFields = { processData : false, contentType : false };
        APIRequester.post(APIConstants.classrooms.upload(this.props.classroom_id),
            formData, this.props.success, extraFields);
    }

    render() {
        const spanClass = "fa " + (this.state.submit ?  "fa-check-circle-o" : "fa-upload");
        return (
            <div>
                <div className="modal-body">
                    <p>In order to upload your student roster,
                    your Excel file needs to have two columns
                    named exactly "First Name" and "Last Name."
                    You can have extra information in the file,
                    but those two columns are necessary.</p>
                    <form className="upload-roster-container"
                        encType="multipart/form-data" >
                        <input ref="file" type="file" name="file" id="roster-upload-input"
                            className="upload-file" accept={FILE_INPUTS.join(",")}
                            onChange={this._handleFileSelect} />
                        <label htmlFor="roster-upload-input"
                            className={`button upload-label upload-${this.state.submit}`}>
                            <span className={spanClass} />
                            { this.state.file }
                          </label>
                    </form>
                    <p className="upload-warning">
                        Note: Uploading a roster will replace all of your current students.
                    </p>
                </div>

                <div className="modal-footer">
                    <button type="button" className="button"
                            data-dismiss="modal">Cancel</button>
                    <input className="submit-button upload-button" type="button"
                        value="Upload Roster" onClick={this._uploadRoster}
                        disabled={!this.state.submit} />
                </div>
            </div>
        );
    }
}

UploadRoster.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired,
};
