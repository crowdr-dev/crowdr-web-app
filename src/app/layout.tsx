import { PropsWithChildren } from "react";
import type { Metadata } from 'next'
import Head from "next/head";
import { usePathname } from "next/navigation";
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
    template: '%s | Crowdr',
    default: 'Crowdr - Crowdfund in Nigeria',
  },
  applicationName: 'Crowdr',
  keywords: ['crowdfunding', 'donate', 'volunteer', 'charity', 'NGO', 'non-profit', 'fundraising', 'donation', 'volunteering', 'Nigeria', 'Africa'],
  description: 'Explore campaigns and spread love by donating or volunteering',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.oncrowdr.com/',
    siteName: 'Crowdr',
    title: 'Crowdr - Crowdfund in Nigeria',
    description: 'Explore campaigns and spread love by donating or volunteering',
    images: [
      {
        url: 'https://res.cloudinary.com/dqx8jfcj0/image/upload/v1713100065/CROWDR_LOGO-GREEN_qlmt0o.png',
        alt: 'Crowdr logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@oncrowdr", 
    creator: "@oncrowdr",
    images: "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1713100065/CROWDR_LOGO-GREEN_qlmt0o.png",
    description: "Explore campaigns and spread love by donating or volunteering"
  },
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    capable: true,
    title: "Crowdr - Crowdfund in Nigeria"
  }
}

const inter = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  // const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${inter.className}`}>
        <RootApp>
          {children}
        </RootApp>
      </body>
    </html>
  );
}
