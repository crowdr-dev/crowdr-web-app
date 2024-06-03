import { PropsWithChildren, useEffect } from "react";
import type { Metadata } from "next";
import Head from "next/head";
import Script from "next/script";
import { Public_Sans, Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./common/styles/button.css";
import RootApp from "./app";

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"]
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400"
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500"
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700"
    }
  ],
  variable: "--font-satoshi"
});

export const metadata: Metadata = {
  title: {
    template: "%s | Crowdr",
    default: "Crowdr - Crowdfund in Nigeria"
  },
  applicationName: "Crowdr",
  keywords: [
    "crowdfunding",
    "donate",
    "volunteer",
    "charity",
    "NGO",
    "non-profit",
    "fundraising",
    "donation",
    "volunteering",
    "Nigeria",
    "Africa"
  ],
  description: "Explore campaigns and spread love by donating or volunteering",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oncrowdr.com/",
    siteName: "Crowdr",
    title: "Crowdr - Crowdfund in Nigeria",
    description:
      "Explore campaigns and spread love by donating or volunteering",
    images: [
      {
        url: "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1713100843/crowdr_wordmark_png-GREEN_weutm8.png",
        alt: "Crowdr logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@oncrowdr",
    creator: "@oncrowdr",
    images:
      "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1713100843/crowdr_wordmark_png-GREEN_weutm8.png",
    description: "Explore campaigns and spread love by donating or volunteering"
  },
  appleWebApp: {
    statusBarStyle: "default",
    capable: true,
    title: "Crowdr - Crowdfund in Nigeria"
  }
};

const inter = Public_Sans({ subsets: ["latin"] });



export default function RootLayout({ children }: PropsWithChildren) {
  // const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JL3VDJ3QRX"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JL3VDJ3QRX');
        `}
        </Script>
      </head>
      <body className={`${satoshi.variable} ${inter.className}`}>
        <RootApp>{children}</RootApp>
      </body>
    </html>
  );
}
