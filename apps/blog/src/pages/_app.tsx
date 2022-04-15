import { AppProps } from 'next/app'
import SuperTokensReact from 'supertokens-auth-react'
import { frontendConfig } from '../config/auth.config'

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
