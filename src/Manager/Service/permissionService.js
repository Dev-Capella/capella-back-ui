import axiosInstance from "../../Middleware/jwtInterceptor";

const fetchPermission = async () => {
  const result = await axiosInstance.get("permission");
  return result;
};
const exportFunction = {
  fetchPermission,
};

export default exportFunction;
