import axiosInstance from '../../Middleware/jwtInterceptor'

const fetchBanners = async () => {
  const result = await axiosInstance.get('banners')
  return result.data
}
const getByCode = async (code) => {
  const result = await axiosInstance.get(`banners/${code}`)
  return result
}
const addBanners = async (bannerDto) => {
  var result = await axiosInstance.post('banners', bannerDto)
  return result
}
const updateBanners = async (bannerDto) => {
  const result = await axiosInstance.put('banners', bannerDto)
  return result
}
const deleteBanners = async (code) => {
  const result = await axiosInstance.delete(`banners/${code}`)
  return result
}

const getBannerTypes = () => {
  const data = [
    { code: "0", name: "Carousel" },
    { code: "1", name: "Top" },
    { code: "2", name: "Card" },
  ];
  return data;
};

const exportFunction = {
  fetchBanners,
  addBanners,
  updateBanners,
  getByCode,
  deleteBanners,
  getBannerTypes
}

export default exportFunction
