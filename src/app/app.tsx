'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren, useEffect } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import ModalProvider from './common/hooks/useModal'
import './globals.css'
import './common/styles/button.css'


const queryClient = new QueryClient()

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
