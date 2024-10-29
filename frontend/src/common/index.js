const backendDomain = "http://localhost:4020";

const summaryApi = {
    signup : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : "post"
    },
    currentUser : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    currentUserLogout : {
        url : `${backendDomain}/api/user-logout`,
        method : "get",
    },
    allUsers : {
        url : `${backendDomain}/api/all-users`,
        method : "get",
    },
    
}

export default summaryApi