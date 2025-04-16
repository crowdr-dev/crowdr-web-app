import React, { Fragment, PropsWithChildren } from 'react'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Crowdr account to find volunteers, track donations, update your campaign, and connect with supporters.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oncrowdr.com/",
    siteName: "Crowdr",
    title: "Login",
    description:
      "Sign in to your Crowdr account to find volunteers, track donations, update your campaign, and connect with supporters.",
    images: [
      {
        url: "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1713100843/crowdr_wordmark_png-GREEN_weutm8.png",
        alt: "Crowdr logo"
      }
    ]
  }
};


export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}
