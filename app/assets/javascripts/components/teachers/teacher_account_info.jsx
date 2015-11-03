/**
 * @prop teacher_id - id of teacher to show
 */
class TeacherAccountInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teacher: {
                grades: []
            }
        };
    }

    componentDidMount() {
        this._fetchTeacher(this.props.teacher_id);
    }

    _fetchTeacher(id) {
        $.getJSON(`/teachers/${id}`)
            .done((data) => {
                this.setState({ teacher: data });
            })
            .fail((xhr, status, err) => {
                console.error(xhr, status, err.toString());
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <p>First name: { this.state.teacher.first_name }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Last name: { this.state.teacher.last_name }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Email: { this.state.teacher.email }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Phone: { this.state.teacher.phone_number }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>School: { this.state.teacher.school }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p>City: { this.state.teacher.city }</p>
                    </div>
                    <div className="col-md-10">
                        <p>State: { this.state.teacher.state }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Grade: { this.state.teacher.grades.join(', ') }</p>
                    </div>
                </div>
            </div>
        );
    }
}

TeacherAccountInfo.propTypes = { teacher_id: React.PropTypes.number.isRequired };
