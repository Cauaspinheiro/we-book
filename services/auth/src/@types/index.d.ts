declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPERTOKENS_APP_NAME: string
      SUPERTOKENS_API_DOMAIN: string
      SUPERTOKENS_WEBSITE_DOMAIN: string
      SUPERTOKENS_API_BASE_PATH: string
      SUPERTOKENS_WEBSITE_BASE_PATH: string
      SUPERTOKENS_CONNECTION_URI: string
    }
  }
}

export {}
