declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string

      AUTH_SERVICE_API_SECRET: string
      API_BASE_URL: string
    }
  }
}

export {}
