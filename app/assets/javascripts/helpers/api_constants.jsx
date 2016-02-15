class ApiConstants {

    get admins()   {
        return {
            classrooms : `/api/admins/classrooms`,
            download_classrooms   : (params) => `/api/admins/download/classrooms?${params}`,
            download_teachers   : (params) => `/api/admins/download/teachers?${params}`
        }
    }

    get classrooms() {
        return {
            member     : (id) => `/api/classrooms/${id}`,
            upload     : (id) => `/api/classrooms/${id}/upload`,
            download   : (id) => `/api/classrooms/${id}/download`,
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

    get students() {
        return {
          member     : (id) => `/api/students/${id}`,
          collection : `/api/students`,
        }
    }

    get pages()    { return { states     : `/api/states` } }
    get programs() { return { collection : `/api/programs` } }

    get questions() { return { member : (id) => `/api/questions/${id}` } }
}

const APIConstants = new ApiConstants();
