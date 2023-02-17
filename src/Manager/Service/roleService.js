import axiosInstance from '../../Middleware/jwtInterceptor'

const fetchRole = async () => {
  const result = await axiosInstance.get("roles");
  return result;
};
const getByRoleId = async (code) => {
  const result = await axiosInstance.get(`roles/${code}`);
  return result;
};
const addRole = async (roleDto) => {
  var result = await axiosInstance.post("role", roleDto);
  return result;
};
const updateRole = async (roleDto) => {
  const result = await axiosInstance.put('roles', roleDto)
  return result
}
const deleteRole = async (code) => {
  const result = await axiosInstance.delete(`roles/${code}`)
  return result
}
const exportFunction = {
  fetchRole,
  getByRoleId,
  addRole,
  updateRole,
  deleteRole,
}

export default exportFunction
