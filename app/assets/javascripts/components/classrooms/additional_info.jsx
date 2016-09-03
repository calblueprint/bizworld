/**
 * @prop classroom_id - current classroom id
 * @prop responses    - current responses for this classroom
 * @prop form_id      - id associated with the additional questions form
 * @prop success      - function called when classroom info is updated
 * @prop didOnboard   - whether the user completed onboarding
 * @prop isAdmin      - whether the user is an admin
 */
class AdditionalInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responses: { },
            isLoading : false
        };
    }

    _handleChange = (e) => {
        const newState = React.addons.update(this.state.responses, {
             [$(e.target).attr("name")] : { $set: $(e.target).val() }
        });
        this.setState({ responses : newState });
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.props.success();
            $("#additionalInfoModal").modal("hide");
        };
        APIRequester.put(APIConstants.classrooms.responses(
            this.props.classroom_id), this.state, success);
    }

    _renderQuestionsPopover = () => {
        const notice = new Tourist.Tour({
            steps: [{
                content: "<p><span class=\"fa fa-exclamation-circle\"></span> \
                            <span>Make sure to fill out these short questions. \
                             It's super important for the Bizworld administrators!</span></p>",
                highlightTarget: true,
                okButton: true,
                target: $(".additional-info-item-button"),
                my: "left center",
                at: "right center",
            }],
            tipOptions: {
               showEffect: "slidein"
            },
        });

        notice.start();
    }

    componentDidMount = () => {
        let numResponses = this.props.responses.length;
        const success = (data) => {
            if (!this.props.didOnboard && !this.props.isAdmin && numResponses < data.questions.length) {
                this._renderQuestionsPopover();
            }
        }

        APIRequester.getJSON(APIConstants.forms.member(this.props.form_id), success);
    }

    render() {
        return (
            <div className="action-item additional-info-item">
                <button data-toggle="modal" data-target="#additionalInfoModal"
                    className="button button-small additional-info-item-button">
                    <div>More info</div>
                </button>
                <div className="modal fade" id="additionalInfoModal" tabIndex={-1}
                        role="dialog" ref="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    More Info
                                </h4>
                            </div>
                            <div className="modal-body">
                                <AdditionalFormQuestions responses = {this.props.responses}
                                                         onChange  = {this._handleChange}
                                                         form_id   = {this.props.form_id} />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="button"
                                    data-dismiss="modal">Close</button>
                                <button type="button" name="update-info"
                                        value="Update Info" className="submit-button" onClick={this._attemptSave}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdditionalInfo.propTypes = {
    classroom_id : React.PropTypes.number.isRequired,
    responses    : React.PropTypes.array.isRequired,
    form_id      : React.PropTypes.number.isRequired,
    success      : React.PropTypes.func.isRequired
};
