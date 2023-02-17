import axios from 'axios'
import tokenService from '../Manager/Service/tokenService'

const axiosInstance = axios.create({
  baseURL: `https://localhost:7083/`,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  function (request) {
    const token = tokenService.getToken()
    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }
    return request
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    /*const originalRequest = error.config
  
     if (1 sn 
      error.response.status === 401 &&
      originalRequest.url === 'https://localhost:7083/api/login'
    ) {
      //router.push('/login')
      return Promise.reject(error)
    }
    console.log("response");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = tokenService.getToken()
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            tokenService.setToken(res.data)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + tokenService.getToken()
            return axios(originalRequest)
          }
        })
    } */
    return Promise.reject(error)
  },
)

export default axiosInstance
