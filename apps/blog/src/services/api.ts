import axios from 'axios'
import Session from 'supertokens-auth-react/recipe/session'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
})

Session.addAxiosInterceptors(api)
