import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
  appName: 'Blog Auth',
  apiDomain: 'http://localhost:25080',
  websiteDomain: 'http://localhost:25000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
}

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [EmailPasswordReact.init(), SessionReact.init()],
  }
}
