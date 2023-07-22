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
  description: "Best volunteering & fund raising platform in Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
