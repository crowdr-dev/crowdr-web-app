'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren } from "react"
import Head from "next/head"
import { Public_Sans, Lato } from "next/font/google"
import {QueryClient, QueryClientProvider} from 'react-query'
import { Toaster } from "react-hot-toast"
import ModalProvider from "./common/hooks/useModal"
import "./globals.css"
import "./common/styles/button.css"

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

const inter = Public_Sans({ subsets: ["latin"] })

const metadata = {
  title: "Crowdr | Fundraise & Find Volunteer Opportunities",
  description:
    "Crowdr helps you fundraise and find volunteering opportunities that make a change in our world",
}

const queryClient = new QueryClient()

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      </Head>
      
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </ModalProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
