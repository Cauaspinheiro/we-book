import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
  appName: 'Blog Auth',
  apiDomain: 'http://192.168.10.146:2580',
  websiteDomain: 'http://192.168.10.146:2500',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
}

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        emailVerificationFeature: {
          mode: process.env.NODE_ENV === 'production' ? 'REQUIRED' : 'OFF',
        },
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'name',
                label: 'Nome',
                placeholder: 'Seu nome completo',
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
  }
}
