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
            responses  : (id) => `/api/classrooms/${id}/responses`,
            collection : `/api/classrooms/`,
        }
    }

    get teachers() {
        return {
            member     : (id) => `/api/teachers/${id}`,
            classrooms : (id) => `/api/teachers/${id}/classrooms`,
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

    get passwords() {
        return {
            update         : (id) => `/api/passwords/${id}`,
            request_reset  : `/api/passwords/request_reset`,
            reset          : `/api/passwords/reset`
        }
    }

    get students() {
        return {
          member     : (id) => `/api/students/${id}`,
          collection : `/api/students`,
        }
    }

    get pages()    { return { states     : `/api/states` } }

    get programs() {
        return {
            collection : `/api/programs`,
            update     : (id) => `/api/programs/${id}`
        }
    }

    get questions() {
        return {
            member     : (id) => `/api/questions/${id}`,
            collection : `/api/questions`,
        }
    }
}

const APIConstants = new ApiConstants();
