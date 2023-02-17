import axiosInstance from "../../Middleware/jwtInterceptor";


const fetchBrands = async () => {
  const result = await axiosInstance.get("brands");
  return result.data;
};
const getByCode = async (code) => {
  const result = await axiosInstance.get(`brands/${code}`);
  return result;
};
const addBrand = async (brandDto) => {
  var result = await axiosInstance.post("brands", brandDto);
  return result;
};
const updateBrand = async (brandDto) => {
  const result = await axiosInstance.put("brands", brandDto);
  return result;
};
const deleteBrand = async (code) => {
  const result = await axiosInstance.delete(`brands/${code}`);
  return result;
};

const exportFunction = {
  fetchBrands,
  addBrand,
  deleteBrand,
  getByCode,
  updateBrand,
};


export default exportFunction;