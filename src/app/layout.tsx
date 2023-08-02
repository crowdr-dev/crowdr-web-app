import "./globals.css";
import "./shared-styles/button.css";

import { Toaster } from "react-hot-toast";
import { Public_Sans, Lato } from "next/font/google";

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Crowdr | Fundraise & Find Volunteer Opportunities",
  description: "|Crowdr helps you fundraise and find volunteering opportunities that make a change in our world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
