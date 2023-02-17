import axiosInstance from '../../Middleware/jwtInterceptor'

const getUsers = async () => {
  const result = await axiosInstance.get('users')
  return result.data;
}
const getUserByName = async (username) => {
  const result = await axiosInstance.get(`users/${username}`)
  return result.data.data;
}
const updateUser = async (userDto) => {
  const result = await axiosInstance.put('users',userDto)
  return result
}
const deleteUser = async (username) => {
  const result = await axiosInstance.delete(`users/${username}`)
  return result
}

const exportFunction = {
  getUsers,
  getUserByName,
  deleteUser,
  updateUser

}

export default exportFunction
