/**
 * @prop onFilterChange   - function that is called onChange for inputs, updates state
 * @prop initialStartDate - initial start date for date range
 * @prop initialEndDate   - initial end date for date range
 */
class DateRangeFilter extends React.Component {
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

DateRangeFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};

/**
 * @prop onFilterChange - function that is called onChange for inputs, updates state
 */
class ClassroomsStatusFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    _handleSelectStatusChange = (e) => {
        // Updates state of status variable and whether to show the dateRangeFilter.
        this.props.onFilterChange(e);
        this.setState({ showDateRangeFilter: $(e.target).val() === "date_range" });
    }

    _handleDateRangeChange = (startDate, endDate) => {
        this.props.onDateRangeChange(startDate, endDate);
        this.setState({
            rangeStart: startDate,
            rangeEnd: endDate
        });
    }

    render() {
        var dateRangeFilter;
        if (this.state.showDateRangeFilter) {
            dateRangeFilter = (
                <DateRangeFilter onFilterChange={this._handleDateRangeChange}
                                 initialStartDate={this.state.rangeStart}
                                 initialEndDate={this.state.rangeEnd} />
            );
        }

        return (
            <div>
                <select name="status" onChange={this._handleSelectStatusChange}>
                    <option value="active">Currently Active</option>
                    <option value="date_range">Date Range</option>
                    <option value="">All Classrooms</option>
                </select>
                <br />
                {dateRangeFilter}
            </div>
        );
    }
}

ClassroomsStatusFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};
