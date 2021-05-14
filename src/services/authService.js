import * as api from '../api/index';
import {toTitleCase} from '../utils/textFormat'

class AuthService {

   get currentSession() {
      return JSON.parse(localStorage.getItem('user-session'))
   }

   get isAuthenticated() {
      if (this.currentSession) {
         return true
      }
      return false
   }

   login(authData) {     
      return api.login(authData).then((res) => {
         const session = {
            pseudo: authData.pseudo,
            role: res.data.role,
            token: res.data.token
         }
        this.storeCurrentSession(session);
        session.pseudo = toTitleCase(authData.pseudo)
        return session       
      })
   }

   logout() {
      localStorage.removeItem('user-session')
   }

   resetPassword(password) {
      const authData = {
         pseudo: this.currentSession.pseudo,
         password
      }
    return api.resetPwd(authData);
  }

   storeCurrentSession(data) {
      localStorage.setItem('user-session', JSON.stringify(data))
   }
}

export default new AuthService()
