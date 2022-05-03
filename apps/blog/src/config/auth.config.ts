import type { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
  appName: String(process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME),
  apiDomain: String(process.env.NEXT_PUBLIC_API_DOMAIN),
  websiteDomain: String(process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_DOMAIN),
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    languageTranslations: {
      translations: {
        br: {
          BRANDING_POWERED_BY_START: 'Feito com ',
          BRANDING_POWERED_BY_END: '',
          SOMETHING_WENT_WRONG_ERROR: 'Algo deu errado. Tente novamente',

          EMAIL_VERIFICATION_RESEND_SUCCESS: 'Email reenviado',
          EMAIL_VERIFICATION_SEND_TITLE: 'Verifique seu endereço de email',
          EMAIL_VERIFICATION_SEND_DESC_START: '',
          EMAIL_VERIFICATION_SEND_DESC_STRONG: 'Por favor clique no link',
          EMAIL_VERIFICATION_SEND_DESC_END:
            ' no email que nós the enviamos para você confirmar seu endereço de email.',
          EMAIL_VERIFICATION_RESEND_BTN: 'Reenviar email',
          EMAIL_VERIFICATION_LOGOUT: 'Sair ',
          EMAIL_VERIFICATION_SUCCESS: 'Email verificado com sucesso!',
          EMAIL_VERIFICATION_CONTINUE_BTN: 'CONTINUE',
          EMAIL_VERIFICATION_CONTINUE_LINK: 'Continue',
          EMAIL_VERIFICATION_EXPIRED:
            'O link de verificação de email foi expirado',
          EMAIL_VERIFICATION_ERROR_TITLE: 'Algo deu errado',
          EMAIL_VERIFICATION_ERROR_DESC: 'Tente novamente',

          EMAIL_PASSWORD_EMAIL_LABEL: 'Email',
          EMAIL_PASSWORD_EMAIL_PLACEHOLDER: 'Endereço de email',

          EMAIL_PASSWORD_PASSWORD_LABEL: 'Senha',
          EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: 'Senha',

          EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: 'Entrar',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START:
            'Ainda não se cadastrou?',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: 'Cadastre-se',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: '',
          EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: 'Esqueceu a sua senha?',
          EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: 'ENTRAR',
          EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR:
            'Combinação incorreta de e-mail e senha',

          EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: 'Cadastre-se',
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: 'Já tem uma conta?',
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: 'Entrar',
          EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: '',
          EMAIL_PASSWORD_SIGN_UP_FOOTER_START:
            'Continuando, você aceita nossos ',
          EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: 'Termos de serviço',
          EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: ' e ',
          EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: 'Política de privacidade',
          EMAIL_PASSWORD_SIGN_UP_FOOTER_END: '',
          EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: 'CADASTRE-SE',

          EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS:
            'Esse email já existe. Faça login invés disso',

          EMAIL_PASSWORD_RESET_HEADER_TITLE: 'Redefina sua senha',
          EMAIL_PASSWORD_RESET_HEADER_SUBTITLE:
            'Nós iremos te enviar um email para você redefinir sua senha',
          EMAIL_PASSWORD_RESET_SEND_SUCCESS:
            'Por favor verifique seu email para o link de recuperação de senha. ',
          EMAIL_PASSWORD_RESET_RESEND_LINK: 'Reenviar',
          EMAIL_PASSWORD_RESET_SEND_BTN: 'Enviar',

          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: 'Sucesso!',
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC:
            'Sua senha foi redefina com sucesso!',
          EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: 'ENTRAR',

          EMAIL_PASSWORD_NEW_PASSWORD_LABEL: 'Nova senha',
          EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: 'Nova senha',
          EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: 'Confirmar senha',
          EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: 'Confirmar senha',

          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: 'Mude sua senha',
          EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE:
            'Defina sua nova senha abaixo',
          EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: 'MUDAR SENHA',
          EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR:
            'Token de redefinição de senha inválido',

          ERROR_EMAIL_NON_STRING: 'Email deve ser um texto',
          ERROR_EMAIL_INVALID: 'Email inválido',

          ERROR_PASSWORD_NON_STRING: 'Senha deve ser um texto',
          ERROR_PASSWORD_TOO_SHORT:
            'Senha deve contar ao menos 8 caracteres, incluindo um número',
          ERROR_PASSWORD_TOO_LONG: 'Senha deve ser menor que 100 caracteres',
          ERROR_PASSWORD_NO_ALPHA: 'Senha deve conter ao menos um letra',
          ERROR_PASSWORD_NO_NUM: 'Senha deve conter ao menos um número',
          ERROR_CONFIRM_PASSWORD_NO_MATCH: 'As senhas não conferem',

          ERROR_NON_OPTIONAL: 'Campo não é opcional',
        },
      },
      defaultLanguage: 'br',
    },
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        palette: {
          primaryText: '#D4D4D8',
        },
        useShadowDom: false,
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
