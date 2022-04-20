import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import SuperTokensReact from 'supertokens-auth-react'
import { frontendConfig } from '../config/auth.config'
import { queryClient } from '../services/query'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
