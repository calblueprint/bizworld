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
    }

    _uploadRoster = (e) => {
        const formData = new FormData();
        formData.append("file", $(this.refs.file.getDOMNode())[0].files[0]);
        $.ajax({
            url: `/classrooms/${this.props.classroom_id}/upload`,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: (msg) => {
                toastr.success(msg.message);
                this.props.success();
            },
            error: (xhr, status, error) => {
                JSON.parse(xhr.responseText).errors.forEach((error) => {
                    toastr.error(error);
                });
            }
        });
    }

    render() {
        return (
            <div>
                <form className="uploader"
                    encType="multipart/form-data" >
                    <input ref="file" type="file" name="file"
                        className="upload-file" accept={FILE_INPUTS.join(",")} />
                    <input type="button" value="Upload Roster"
                        onClick={this._uploadRoster} />
                </form>
            </div>
        );
    }
}

UploadRoster.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired,
};
