import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchVariants = async () => {
  const result = await axiosInstance.get("variants");
  return result.data;
};

const getVariant = async (code) => {
  const result = await axiosInstance.get(`variants/${code}`);
  return result;
}

const addVariant = async (classificationDto) => {
  var result = await axiosInstance.post("variants", classificationDto);
  return result;
};

const updateVariant = async (classificationDto) => {
  var result = await axiosInstance.put("variants", classificationDto);
  return result;
};

const deleteVariant = async (code) => {
  var result = await axiosInstance.delete(`variants/${code}`);
  return result;
};

const exportFunction = {
  fetchVariants,
  addVariant,
  getVariant,
  updateVariant,
  deleteVariant
};

export default exportFunction;
