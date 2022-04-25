import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
  appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME,
  apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN,
  websiteDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_DOMAIN,
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
