/**
 * @prop program      - program info to display
 */
class ProgramInfo extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = {
            program : this.props.program,
        };
    }

    _attemptSave = (e) => {
        const success = (msg) => {
            program = React.addons.update(
                this.state.program,
                {is_active: {$set: msg.data.is_active }}
            );
            this.setState({
                program: program
            });
        };
        APIRequester.put(APIConstants.programs.update(
            this.state.program.id),
            { is_active: !this.state.program.is_active },
            success);
    }

    _getFormLink = (id) => `/forms/${id}`

    //TODO: Add options to change color and icon for a program
    render() {
        deactivate_button_value = this.state.program.is_active ? "Deactivate Program" : "Activate Program";

        const classType = `classroom-${this.state.program.id}`;
        return (
            <div className="class-info-container">
                <div className="class-title-container">
                    <h1 className={`classroom-program ${classType}`}>
                        { this.state.program.name }
                    </h1>
                </div>
                <div className="class-info-box">
                    <h1><span className="fa fa-info-circle"></span>Program Info</h1>
                    <div className="info-grid">

                        <div className="class-info-item">
                            <h2 className="grid-label">Edit Forms</h2>
                            <div className="info-data">
                                <a href={this._getFormLink(this.state.program.pre_id)} target="_blank">
                                    Pre-Assessment
                                </a>
                            </div>
                            <div className="info-data">
                                <a href={this._getFormLink(this.state.program.post_id)} target="_blank">
                                    Post-Assessment
                                </a>
                            </div>
                        </div>

                        <div className="class-info-item">
                            <h2 className="grid-label">Program Status</h2>
                            <div className="info-data number">
                                { this.state.program.is_active ? "Active" : "Inactive" }
                            </div>
                        </div>

                    </div>
                    <div className="button-container">
                        <input name="deactivate" type="button" value={deactivate_button_value}
                            className="button" onClick={this._attemptSave} />
                    </div>
                </div>
            </div>
        );
    }
}

ProgramInfo.propTypes = {
    program : React.PropTypes.object.isRequired
};
