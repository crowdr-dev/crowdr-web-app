import React, { Fragment, PropsWithChildren } from 'react'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Sign Up",

  description:
    "Create a Crowdr account and start raising funds for your cause, business, or project. ",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oncrowdr.com/",
    siteName: "Crowdr",
    title: "Sign Up",
    description:
      "Create a Crowdr account and start raising funds for your cause, business, or project. ",
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
