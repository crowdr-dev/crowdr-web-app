'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import ModalProvider from './common/hooks/useModal'
import './globals.css'
import './common/styles/button.css'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/router';



const queryClient = new QueryClient()

mixpanel.init('09420737b2f3103957800fa617fe2a0b', {
  /* eslint-disable camelcase */
  track_pageview: true,
  persistence: "localStorage",
  ignore_dnt: true,
});

export default function RootApp ({ children }: PropsWithChildren) {
  return (
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Toaster position='top-right' reverseOrder={false} />
            {children}
          </ModalProvider>
        </QueryClientProvider>
  )
}
