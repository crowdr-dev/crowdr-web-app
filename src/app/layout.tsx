'use client' // TODO: TRY TO RETURN TO SERVER COMPONENT; LOOK AT ModalProvider
import { PropsWithChildren, useEffect } from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { Public_Sans, Lato } from 'next/font/google'
import localFont from 'next/font/local'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import ModalProvider from './common/hooks/useModal'
import './globals.css'
import './common/styles/button.css'
import NewLogo from '../../public/svg/new-crowdr-logo.svg'

export const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
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

const inter = Public_Sans({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout ({ children }: PropsWithChildren) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      document.title =
        pathname.length > 1
          ? `${
              pathname.slice(1).charAt(0).toUpperCase() +
              pathname.slice(2) +
              ' | '
            } Crowdr — Crowdfund in Nigeria`
          : 'Crowdr — Crowdfund in Nigeria'
      const metaDescription = `Explore campaigns and spread love by donating or volunteering`
      const metaTag = document.querySelector('meta[name="description"]')
      if (metaTag) {
        metaTag.setAttribute('content', metaDescription)
      }
      const ogImageTag = document.querySelector('meta[property="og:image"]')
      if (ogImageTag) {
        ogImageTag.setAttribute('content', NewLogo)
      }
    }
  }, [pathname])

  return (
    <html lang='en'>
      <Head>
        <meta property='og:image' content={NewLogo} />
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css'
          rel='stylesheet'
        />
        <title>{pathname.length > 1
          ? `${
              pathname.slice(1).charAt(0).toUpperCase() +
              pathname.slice(2) +
              ' | '
            } Crowdr — Crowdfund in Nigeria`
          : 'Crowdr — Crowdfund in Nigeria'}</title>
        <meta name='title' content='Crowdr — Crowdfund in Nigeria' />
        <meta
          name='description'
          content='Explore campaigns and spread love by donating or volunteering'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://www.oncrowdr.com/' />
        <meta property='og:title' content={pathname.length > 1
          ? `${
              pathname.slice(1).charAt(0).toUpperCase() +
              pathname.slice(2) +
              ' | '
            } Crowdr — Crowdfund in Nigeria`
          : 'Crowdr — Crowdfund in Nigeria'} />
        <meta
          property='og:description'
          content='Explore campaigns and spread love by donating or volunteering'
        />
        <meta
          property='og:image'
          content={NewLogo}
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://www.oncrowdr.com/' />
        <meta
          property='twitter:title'
          content={pathname.length > 1
            ? `${
                pathname.slice(1).charAt(0).toUpperCase() +
                pathname.slice(2) +
                ' | '
              } Crowdr — Crowdfund in Nigeria`
            : 'Crowdr — Crowdfund in Nigeria'}
        />
        <meta
          property='twitter:description'
          content='Explore campaigns and spread love by donating or volunteering'
        />
        <meta
          property='twitter:image'
          content={NewLogo}
        />
      </Head>

      <body className={`${satoshi.variable} ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Toaster position='top-right' reverseOrder={false} />
            {children}
          </ModalProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
