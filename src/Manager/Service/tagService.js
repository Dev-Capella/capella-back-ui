import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchTag = async () => {
  const result = await axiosInstance.get("tags");
  return result.data;
};

const getTags = async (code) => {
  const result = await axiosInstance.get(`tags/${code}`);
  return result;
};

const addTags = async (tagDto) => {
  var result = await axiosInstance.post("tag", tagDto);
  return result;
};

const updateTags = async (tagDto) => {
  var result = await axiosInstance.put("tags", tagDto);
  return result;
};

const deleteTags = async (code) => {
  var result = await axiosInstance.delete(`tags/${code}`);
  return result;
};

const exportFunction = {
  fetchTag,
  addTags,
  getTags,
  updateTags,
  deleteTags,
};

export default exportFunction;
