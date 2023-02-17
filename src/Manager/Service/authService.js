import axiosInstance from "../../Middleware/jwtInterceptor";

const loginUser = async (user) =>{
    var {data} = await axiosInstance.post('api/login',{...user});
    return data;
};

const getCategory = async (id) =>{
    var {data} = await axiosInstance.get('category/'+id);
    return data;
};


const exportFunction = {
    loginUser,
    getCategory
};


export default exportFunction;