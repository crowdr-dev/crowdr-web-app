import './globals.css'
import './style/general/general.css'
import './style/general/button.css'
import './style/nav/nav.css'
import './style/cta/cta.css'
import './style/slogan/slogan.css'
import './style/sectors/sectors.css'
import './style/faq/faq.css'
import './style/benefits/benefits.css'
import './style/watchlist/watchlist.css'
import './style/footer/footer.css'
import './style/slogan/steps.css'
import './style/modal/modal.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fundraise & Find Volunteer Opportunities',
  description: 'Best volunteering & fund raising platform in Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
