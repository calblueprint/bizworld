/**
 * @prop onFilterChange   - function that is called onChange for inputs, updates state
 * @prop initialStartDate - initial start date for date range
 * @prop initialEndDate   - initial end date for date range
 */
class DateRangeInput extends React.Component {
    componentDidMount() {
        options = {
            locale: {
                format: DATE_FORMAT
            },
            startDate: formatDate(this.props.initialStartDate),
            endDate: formatDate(this.props.initialEndDate)
        }
        $('input[class="daterange"]').daterangepicker(options, (start, end, label) => {
            this.props.onFilterChange(formatDate(start), formatDate(end));
        });
    }

    render() {
        return (
            <div className="date-input-container">
              <input type="text" className="daterange"/>
            </div>
        );
    }
}

DateRangeInput.propTypes = {
    onFilterChange   : React.PropTypes.func.isRequired,
    initialStartDate : React.PropTypes.string,
    initialEndDate   : React.PropTypes.string,
};
