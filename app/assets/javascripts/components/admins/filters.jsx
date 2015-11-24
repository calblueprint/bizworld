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
            <div className="date-input-container">
                <input type="text" className="daterange"/>
            </div>
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
        // Updates state of status variable and whether to show the dateRangeInput.
        this.props.onFilterChange(e);
        this.setState({ showDateRangeInput: $(e.target).val() === "date_range" });
    }

    _handleDateRangeChange = (startDate, endDate) => {
        this.props.onDateRangeChange(startDate, endDate);
        this.setState({
            rangeStart: startDate,
            rangeEnd: endDate
        });
    }

    render() {
        let dateRangeInput;
        if (this.state.showDateRangeInput) {
            dateRangeInput = (
                <DateRangeInput onFilterChange   = { this._handleDateRangeChange }
                                initialStartDate = { this.state.rangeStart }
                                initialEndDate   = { this.state.rangeEnd } />
            );
        }

        return (
            <div className="classroom-status-filter">
                <select className="classroom-status-select" name="status" onChange={this._handleSelectStatusChange}>
                    <option value="active">Currently Active</option>
                    <option value="date_range">Date Range</option>
                    <option value="">All Classrooms</option>
                </select>
                { dateRangeInput }
            </div>
        );
    }
}

ClassroomsStatusFilter.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};

class ClassroomsFilter extends React.Component {
    render() {
        return (
            <div className="temp-class">
                <ClassroomsStatusFilter onFilterChange    = {this.props.onFilterChange}
                                        onDateRangeChange = {this.props.onDateRangeChange} />
                <div className="filter-input-container">
                    <input placeholder="teacher email" type="text" name="email"
                        onChange={this.props.onFilterChange} />
                </div>
            </div>
        );
    }
}

ClassroomsFilter.propTypes = {
    onDateRangeChange : React.PropTypes.func.isRequired,
    onFilterChange    : React.PropTypes.func.isRequired
};
