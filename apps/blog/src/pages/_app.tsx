import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import SuperTokensReact from 'supertokens-auth-react'
import { ToastProvider as ToastPrimitiveProvider } from '@radix-ui/react-toast'

import { Toast } from '../components/toast'
import { frontendConfig } from '../config/auth.config'
import { queryClient } from '../services/query'
import { useToastStore } from '../stores/toast.store'
import { DefaultSeo } from 'next-seo'
import '../styles/globals.css'
import dynamic from 'next/dynamic'

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

const NoSSRUserId = dynamic(() => import('../components/get-user-id'), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  const handleToastChange = useToastStore((s) => s.handleChange)
  const toastOpen = useToastStore((s) => s.open)

  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitiveProvider swipeDirection="down">
        <DefaultSeo
          title="WeBook"
          description="Faça posts de blog com seus amigos"
        />

        <Component {...pageProps} />

        <Toast
          duration={5000}
          open={toastOpen}
          onOpenChange={handleToastChange}
        />
      </ToastPrimitiveProvider>

      <NoSSRUserId />
    </QueryClientProvider>
  )
}
