/**
 * @prop onFilterChange   - function that is called onChange for inputs, updates state
 * @prop initialStartDate - initial start date for date range
 * @prop initialEndDate   - initial end date for date range
 */
class DateRangeInput extends React.Component {
    componentDidMount() {
        options = {
            locale: {
                format: 'YYYY-MM-DD'
            },
            startDate: this.props.initialStartDate,
            endDate: this.props.initialEndDate
        }
        $('input[class="daterange"]').daterangepicker(options, (start, end, label) => {
            this.props.onFilterChange(start.format('YYYY-MM-DD'),
                                      end.format('YYYY-MM-DD'));
        });
    }

    render() {
        return (
            <input type="text" className="daterange"/>
        );
    }
}

DateRangeInput.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};
