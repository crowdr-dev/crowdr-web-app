import "./globals.css"
import "./common/styles/button.css"

import { Toaster } from "react-hot-toast"
import ModalProvider from "./common/hooks/useModal"

import { Public_Sans, Lato } from "next/font/google"
import { PropsWithChildren } from "react"

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

const inter = Public_Sans({ subsets: ["latin"] })

export const metadata = {
  title: "Crowdr | Fundraise & Find Volunteer Opportunities",
  description:
    "|Crowdr helps you fundraise and find volunteering opportunities that make a change in our world",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/flowbite.min.js" defer></script>
        </ModalProvider>
      </body>
    </html>
  )
}
