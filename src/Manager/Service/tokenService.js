const setToken=(token) =>{
    localStorage.setItem("token",token);
}

const getToken=() =>{
    return localStorage.getItem("token");
}

const tokenService = {setToken,getToken}

export default tokenService;