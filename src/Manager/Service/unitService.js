import axiosInstance from '../../Middleware/jwtInterceptor'

const fetchUnits = async () => {
  const result = await axiosInstance.get("units");
  return result;
};

const addUnit = async (unitDto) => {
  var result = await axiosInstance.post("units", unitDto);
  return result;
};

const getByUnit = async (code) => {
  const result = await axiosInstance.get(`units/${code}`);
  return result;
};

const updateUnit = async (untiDto) => {
  const result = await axiosInstance.put("units", untiDto);
  return result;
};
const deleteUnit = async (code) => {
  const result = await axiosInstance.delete(`units/${code}`);
  return result;
};
const exportFunction = {
  fetchUnits,
  addUnit,
  deleteUnit,
  updateUnit,
  getByUnit,
}

export default exportFunction
