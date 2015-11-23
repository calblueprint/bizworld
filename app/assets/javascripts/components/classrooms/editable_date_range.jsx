/**
 * @prop label         - label of field to show
 * @prop startDate     - start of date range
 * @prop endDate       - ending date of date range
 * @prop editable      - true if fields are editable
 * @prop handleChange  - callback function when date range changes
 */
class EditableDateRange extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.editable) {
            options = {
                locale: {
                    format: 'YYYY-MM-DD'
                },
                startDate: this.props.startDate,
                endDate: this.props.endDate
            }
            $('input[class="daterange"]').daterangepicker(options, (start, end, label) => {
                this.props.handleChange(start.format('YYYY-MM-DD'),
                                          end.format('YYYY-MM-DD'));
            });
        }
    }

    render() {
        var dateRange;
        if (this.props.editable) {
            dateRange = (
                <input type="text" className="daterange"/>
            );
        } else {
            dateRange = (
                <div>
                   { `${this.props.startDate} - ${this.props.endDate}` }
                </div>
                );
        }

        return (
            <div>
                <label htmlFor={this.props.label}>
                    { this.props.label }:
                </label>
                { dateRange }
            </div>
        );
    }
}

EditableDateRange.propTypes = {
    startDate    : React.PropTypes.string,
    endDate      : React.PropTypes.string,
    label        : React.PropTypes.string.isRequired,
    editable     : React.PropTypes.bool.isRequired,
    handleChange : React.PropTypes.func.isRequired
};
