'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren, useEffect } from "react"
import Head from "next/head"
import { Public_Sans, Lato } from "next/font/google"
import localFont from 'next/font/local'
import {QueryClient, QueryClientProvider} from 'react-query'
import { Toaster } from "react-hot-toast"
import ModalProvider from "./common/hooks/useModal"
import "./globals.css"
import "./common/styles/button.css"
import NewLogo from "../../public/svg/new-crowdr-logo.svg"

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

const queryClient = new QueryClient()

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (pathname) {
      document.title = pathname.length > 1  ? `${(pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2) + " | ") } Crowdr — Crowdfund in Nigeria` : "Crowdr — Crowdfund in Nigeria";
      const metaDescription = `Explore campaigns and spread love by donating or volunteering`;
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', metaDescription);
      }
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        ogImageTag.setAttribute('content', NewLogo);
      }
    }
  }, [pathname])


  return (
    <html lang="en">
      <Head>
        <title>Crowdr</title>
        <meta name="description" content={"Build Community through Giving"} />
        <meta property="og:image" content={NewLogo} />
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
