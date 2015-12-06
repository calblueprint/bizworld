class ApiConstants {

    get classrooms() {
        return {
            member     : (id) => `/api/classrooms/${id}`,
            upload     : (id) => `/api/classrooms/${id}/upload`,
            collection : `/api/classrooms/`,
        }
    }

    get teachers() {
        return {
            member     : (id) => `/api/teachers/${id}`,
            classrooms : (id) => `/api/teachers/${id}/classrooms`
        }
    }

    get forms() {
        return {
            member : (id) => `/api/forms/${id}`,
            submit : (id) => `/api/forms/${id}/submit`
        }
    }

    get sessions() {
        return {
            sign_in : `/sign_in`,
            sign_up : `/sign_up`
        }
    }

    get pages()    { return { states     : `/api/states` } }
    get admins()   { return { classrooms : `/api/admins/classrooms` } }
    get programs() { return { collection : `/api/programs` } }
    get students() { return { collection : `/api/students` } }

    get questions() { return { member : (id) => `/api/questions/${id}` } }
}

const APIConstants = new ApiConstants();
