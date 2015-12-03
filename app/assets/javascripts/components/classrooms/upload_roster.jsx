/* Acceptable file types to upload for the classroom roster */
const FILE_INPUTS = [
    ".csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

/**
 * @prop classroom_id - id for classroom
 *       success      - function handler for successful upload
 */
class UploadRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = { submit : false };
    }

    _handleFileSelect = (e) => {
        // Disable roster upload if no file selected
        this.setState({ submit : $(e.target)[0].files.length > 0 });
    }

    _uploadRoster = (e) => {
        const formData = new FormData();
        formData.append("file", $(this.refs.file.getDOMNode())[0].files[0]);
        const extraFields = { processData : false, contentType : false };
        APIRequester.post(`/classrooms/${this.props.classroom_id}/upload`,
            formData, this.props.success, extraFields);
    }

    render() {
        return (
            <div>
                <form className="upload-roster-container"
                    encType="multipart/form-data" >
                    <input ref="file" type="file" name="file"
                        className="upload-file" accept={FILE_INPUTS.join(",")}
                        onChange={this._handleFileSelect} />
                    <input className="button upload-button" type="button"
                        value="Upload Roster" onClick={this._uploadRoster}
                        disabled={!this.state.submit} />
                </form>
            </div>
        );
    }
}

UploadRoster.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired,
};
