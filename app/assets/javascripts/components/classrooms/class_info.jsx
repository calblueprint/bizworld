/**
 * @prop classroom - classroom info to display
 * @prop success   - function handler for successful ClassInfo box update
 */
class ClassInfo extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            classroom: { students: [], program: {} },
            editable: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ classroom : nextProps.classroom });
    }

    _formatLink(link) {
        if (link) { return link.replace(/^https?:\/\//, "") }
    }

    _showInput = (label, name, data) => {
        return (
            <EditableInput label        = { label }
                           name         = { name }
                           data         = { data }
                           editable     = { this.state.editable }
                           handleChange = { this._handleChange} />
        );
    }

    _showDateRange = (label, startDate, endDate) => {
        return (
            <EditableDateRange label        = { label }
                               startDate    = { startDate }
                               endDate      = { endDate }
                               handleChange = { this._handleDateRangeChange }
                               editable     = { this.state.editable } />
        );
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            this.setState({ editable: false });
            this.props.success();
        };
        APIRequester.put(APIConstants.classrooms.member(
            this.props.classroom.id), this.state, success);
    }

    render() {
        const classType = `classroom-${this.state.classroom.program.id}`;
        return (
            <div className="class-info-container">
                <div className="class-title-container">
                    <h1 className={`classroom-program ${classType}`}>
                        { this.state.classroom.program.name }
                    </h1>
                    <h1 className="classroom-name">{ this.state.classroom.name }</h1>
                </div>
                <div className="class-info-box">
                    <h1><span className="fa fa-info-circle"></span>Class Info</h1>
                    <div className="info-grid">
                        <div className="class-info-item">
                            <h2 className="grid-label">Class ID</h2>
                            <div className="info-data number">
                                { this.props.classroom.id }
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Students</h2>
                            <div className="info-data number">
                                { this.state.classroom.students.length }
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Pre-Test</h2>
                            <div className="info-data">
                                <a href={this.state.classroom.pre_link} target="_blank">
                                    { this._formatLink(this.state.classroom.pre_link) }
                                </a>
                            </div>
                        </div>
                        <div className="class-info-item">
                            <h2 className="grid-label">Post-Test</h2>
                            <div className="info-data">
                                <a href={this.state.classroom.post_link} target="_blank">
                                    { this._formatLink(this.state.classroom.post_link) }
                                </a>
                            </div>
                        </div>
                    </div>
                    { this._showInput("Classroom Name", "name", this.state.classroom.name) }
                    { this._showDateRange("Date Range", this.state.classroom.start_date, this.state.classroom.end_date) }

                    <FormEditToggle editable = { this.state.editable }
                                    update   = { this._toggleEdit }
                                    save     = { this._attemptSave } />
                </div>
            </div>
        );
    }
}

ClassInfo.propTypes = {
    classroom : React.PropTypes.object.isRequired,
    success   : React.PropTypes.func.isRequired
};
