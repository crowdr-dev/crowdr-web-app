'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren } from "react"
import Head from "next/head"
import { Public_Sans, Lato } from "next/font/google"
import localFont from 'next/font/local'
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

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Regular.otf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Satoshi-Medium.otf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Satoshi-Bold.otf',
      weight: '700'
    }
  ],
  variable: '--font-satoshi'
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
        <meta property="og:image" content={"/svg/new-crowdr-logo.svg"} />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      </Head>
      
      <body className={`${satoshi.variable} ${inter.className}`}>
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
