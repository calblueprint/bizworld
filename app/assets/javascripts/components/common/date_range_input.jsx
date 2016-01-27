/**
 * @prop onFilterChange   - function that is called onChange for inputs, updates state
 * @prop initialStartDate - initial start date for date range
 * @prop initialEndDate   - initial end date for date range
 */
class DateRangeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { $dateRangePicker: null };
    }

    componentDidMount() {
        options = {
            locale: {
                format: DATE_FORMAT
            },
            startDate: formatDate(this.props.initialStartDate),
            endDate: formatDate(this.props.initialEndDate)
        }
        const dateRange = $(React.findDOMNode(this.refs.date));
        $(dateRange).daterangepicker(options, (start, end, label) => {
            this.props.onFilterChange(formatDate(start), formatDate(end));
        });
        $dateRangePicker = $('.daterangepicker');

        // Disable updating date on mouseover, which is visually jarring; only change date on click.
        $dateRangePicker.find('.calendar').off('mouseenter', 'td.available');
        this.setState({ $dateRangePicker: $dateRangePicker });
    }

    componentWillUnmount() {
        this.state.$dateRangePicker.remove();
        this.setState({ $dateRangePicker: null });
    }

    render() {
        return (
            <div className="date-input-container">
                <input type="text" ref="date"/>
            </div>
        );
    }
}

DateRangeInput.propTypes = {
    onFilterChange   : React.PropTypes.func.isRequired,
    initialStartDate : React.PropTypes.string,
    initialEndDate   : React.PropTypes.string,
};
