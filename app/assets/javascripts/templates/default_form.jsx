/**
 * Component to handle barebones form submissions
 */
class DefaultForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    _handleChange = (e) => {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    _formFields() {
        // Necessary because bootstrap-select does not fire onChange events
        const extraFields = { };
        $('.selectpicker').each((index, element) => {
            extraFields[$(element).attr("name")] = $(element).val();
        });
        return $.extend({}, this.state, extraFields);
    }

    _attemptAction(endpoint, data) {
        $.post(endpoint, data)
            .done((msg) => {
                toastr.success(msg.message);
                window.location.href = `${msg.to}`;
            })
            .fail((xhr, status, error) => {
                JSON.parse(xhr.responseText).errors.forEach((error) => {
                    toastr.error(error);
                });
            });
    }
}
