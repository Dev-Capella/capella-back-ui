import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchCategories = async () =>{
    const result = await axiosInstance.get('categories');
    return result.data;
};

const addCategory = async (categoryDto) =>{
    var result = await axiosInstance.post('category',categoryDto);
    
    return result;
};

const reOrderCategory = async (categoryReorderDto) =>{
    var {data} = await axiosInstance.post('/category/reorder',categoryReorderDto);
    return data;
};

const exportFunction = {
    fetchCategories,
    addCategory,
    reOrderCategory
};


export default exportFunction;