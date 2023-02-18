import axiosInstance from '../../Middleware/jwtInterceptor'

const fetchSuppliers = async () => {
  const result = await axiosInstance.get('suppliers')
  return result
}
const getBySuppliersId = async (code) => {
  const result = await axiosInstance.get(`suppliers/${code}`)
  return result
}
const addSuppliers = async (SuppliersDto) => {
  var result = await axiosInstance.post('suppliers', SuppliersDto)
  return result
}
const updateSuppliers = async (SuppliersDto) => {
  const result = await axiosInstance.put('suppliers', SuppliersDto)
  return result
}
const deleteSuppliers = async (code) => {
  const result = await axiosInstance.delete(`suppliers/${code}`)
  return result
}
const exportFunction = {
  fetchSuppliers,
  getBySuppliersId,
  addSuppliers,
  updateSuppliers,
  deleteSuppliers,
}

export default exportFunction
