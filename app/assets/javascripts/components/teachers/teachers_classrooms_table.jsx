/* Enum for difference classroom types */
const ClassroomType = {
    ACTIVE   : "active",
    INACTIVE : "inactive"
}

/**
 * @prop type       - active or inactive classroom
 *       teacher_id - the id associated with the teacher
 *       program_id - id of the selected program
 */
class TeacherClassrooms extends DefaultForm {

    constructor(props) {
        super(props);
        this.state = { program_id: "" };
    }

    render() {
        return (
            <div>
                <h3>
                    <ProgramFilter onChange = {this._handleChange}
                                   showAll  = {true} />
                </h3>
                <div className="classes-container active-class">
                    <h1 className="classes-container-title">Active Classes</h1>
                    <TeacherModal teacher_id = {this.props.teacher_id}
                                  program_id = {this.state.program_id}
                                  type       = {ClassroomType.ACTIVE} />
                </div>

                <div className="classes-container inactive-class">
                    <h1 className="classes-container-title">Inactive Classes</h1>
                    <TeacherModal teacher_id = {this.props.teacher_id}
                                  program_id = {this.state.program_id}
                                  type       = {ClassroomType.INACTIVE} />
                </div>
            </div>
        );
    }
}
