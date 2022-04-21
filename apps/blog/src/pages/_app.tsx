import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import SuperTokensReact from 'supertokens-auth-react'
import { ToastProvider as ToastPrimitiveProvider } from '@radix-ui/react-toast'

import { Toast } from '../components/toast'
import { frontendConfig } from '../config/auth.config'
import { queryClient } from '../services/query'
import { useToastStore } from '../stores/toast.store'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

export default function App({ Component, pageProps }: AppProps) {
  const handleToastChange = useToastStore((s) => s.handleChange)
  const toastOpen = useToastStore((s) => s.open)

  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitiveProvider swipeDirection="down">
        <Component {...pageProps} />

        <Toast
          duration={5000}
          open={toastOpen}
          onOpenChange={handleToastChange}
        />
      </ToastPrimitiveProvider>
    </QueryClientProvider>
  )
}
