/**
 * @prop label         - label of field to show
 * @prop startDate     - start of date range
 * @prop endDate       - ending date of date range
 * @prop editable      - true if fields are editable
 * @prop handleChange  - callback function when date range changes
 */
class EditableDateRange extends React.Component {

    render() {
        var dateRange;
        if (this.props.editable) {
            dateRange = (
                <DateRangeInput onFilterChange   = { this.props.handleChange }
                                initialStartDate = { this.props.startDate }
                                initialEndDate   = { this.props.endDate } />
            );
        } else {
            const start = formatDate(this.props.startDate);
            const end = formatDate(this.props.endDate);
            dateRange = (
                <div>
                   { `${start} to ${end}` }
                </div>
            );
        }

        return (
            <div className="input-container">
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
