import axiosInstance from "../../Middleware/jwtInterceptor";

const saveMedia = async (file) =>{

    const result = await axiosInstance.post(`media/content-category`,file);
    return result.data;
};



const exportFunction = {
    saveMedia
};


export default exportFunction;