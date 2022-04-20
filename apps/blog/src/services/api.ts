import axios from 'axios'
import Session from 'supertokens-auth-react/recipe/session'

export const api = axios.create({
  baseURL: 'http://192.168.10.146:2580',
})

Session.addAxiosInterceptors(api)
