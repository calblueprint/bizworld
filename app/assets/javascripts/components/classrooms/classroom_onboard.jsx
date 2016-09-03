/**
 * @prop teacher_id - id for teacher
 */
class ClassroomOnboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
  }

  _onboardingComplete = () => {
    if (!this.state.complete) {
      const success = (msg) => {};
      APIRequester.put(APIConstants.teachers.member(this.props.teacher_id),
        { did_onboard: true }, success);
    }
    this.state.complete = true;
  }

  _startTourist = () => {
    $("#onboarding-modal").modal("hide");

    var steps = [{
      content: "<p>Click here to add more information about your class. \
             It's super important for the admins!</p>",
      highlightTarget: true,
      nextButton: true,
      closeButton: true,
      target: $(".additional-info-item-button"),
      my: "left center",
      at: "right center"
    }, {
      content: "<p>Access the links to the pre and post assessments here. \
             Give these links to your students!</p>",
      nextButton: true,
      closeButton: true,
      target: $("#onboarding-assessment-link"),
      my: "left center",
      at: "right center"
    }, {
      content: "<p>Click here to manually enter a student.</p>",
      highlightTarget: true,
      nextButton: true,
      closeButton: true,
      target: $(".add-card"),
      my: "top center",
      at: "bottom center"
    }, {
      content: "<p>Or, click here to upload an Excel spreadsheet of all \
             of your students at once.</p>",
      highlightTarget: true,
      nextButton: true,
      closeButton: true,
      target: $(".upload-button"),
      my: "top center",
      at: "bottom center"
    }, {
      content: "<p>Click here to download a spreadsheet with all student responses.</p>",
      highlightTarget: true,
      nextButton: true,
      closeButton: true,
      target: $(".download-button"),
      my: "top center",
      at: "bottom center"
    }, {
      content: "<p>Edit your classroom information by clicking here.</p>",
      highlightTarget: true,
      nextButton: true,
      target: $(".edit-button-container input"),
      my: "left center",
      at: "right center",
      teardown: this._onboardingComplete
    }]

    var tour = new Tourist.Tour({
      steps: steps,
      tipOptions: {
         showEffect: "slidein"
      },
    });

    tour.start();
  }

  componentDidMount() {
    $("#onboarding-modal").modal();
  }

  render() {
    return (
      <div className="onboarding-container">
        <div className="onboarding-overlay"></div>
        <div className="modal fade" id="onboarding-modal" tabIndex={-1}
          role="dialog" ref="modal" >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Welcome to your first class!
                </h4>
              </div>
              <div className="modal-body">
                <div className="onboarding-pic-container">
                  <img src={gon.onboarding_image} />
                </div>
                <h1>Thanks for joining us!</h1>
                <p>You'll be using this page to manage all your students. To take a quick tour of all the features, click "Begin Tour" below. We're glad you've joined the Bizworld family!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="button"
                    style={{float: "left"}} data-dismiss="modal"
                    onClick={this._onboardingComplete}>
                  Don't ask again
                </button>
                <button type="button" className="button"
                  data-dismiss="modal">Not now</button>
                <button type="button" name="begin"
                    value="Begin Tour" className="submit-button" onClick={this._startTourist}>
                  Begin Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
