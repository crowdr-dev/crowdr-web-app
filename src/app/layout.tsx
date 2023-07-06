import "./shared-styles/globals.css";
import "./shared-styles/general/general.css";
import "./shared-styles/general/button.css";
import "./shared-styles/nav/nav.css";
import "./shared-styles/cta/cta.css";
import "./shared-styles/slogan/slogan.css";
import "./shared-styles/sectors/sectors.css";
import "./shared-styles/faq/faq.css";
import "./shared-styles/benefits/benefits.css";
import "./shared-styles/watchlist/watchlist.css";
import "./shared-styles/footer/footer.css";
import "./shared-styles/slogan/steps.css";
import "./shared-styles/modal/modal.css";
import { Public_Sans, Lato } from "next/font/google";

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"] 
});

const inter = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Fundraise & Find Volunteer Opportunities",
  description: "Best volunteering & fund raising platform in Africa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
