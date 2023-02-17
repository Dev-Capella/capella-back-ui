import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchProducts = async () =>{
    const {data} = await axiosInstance.get('products');
   
    return data;
};

const getProduct = async (code) =>{
    var result = await axiosInstance.get(`products/${code}`);
    return result;
};

const addProduct = async (productDto) =>{
    var result = await axiosInstance.post('products',{...productDto});
    return result;
};

const updateProduct = async (productDto) =>{
    var result = await axiosInstance.put('products',{...productDto});
    return result;
};



const exportFunction = {
    fetchProducts,
    getProduct,
    addProduct,
    updateProduct
};


export default exportFunction;