import axios from 'axios'
import AuthService from '../services/authService'
import HttpError from '../errors/httpError'

const urlApi =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;

const axiosCall = async (params, method, data = null) => {
   const {currentSession} = AuthService
   const config = {
      method: method,
      data: data,
      url: `${urlApi}/${params}`,    
   }  
   if (currentSession) {
      config.headers = { Authorization: `Bearer ${currentSession.token}` } 
   }

   try {      
      return await axios(config)
   } catch (error) {
      console.log(error.response)
      if (error.response) {
         const { data, status } = error.response
         throw new HttpError(data, status)
      } else {
         throw error
      }
   }
}

export default axiosCall
