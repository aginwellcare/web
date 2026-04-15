import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { MotionProvider } from "@/components/shared/MotionProvider"
import { TawkChat } from "@/components/shared/TawkChat"
import { SITE_NAME } from "@/lib/constants"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Compassionate Home Care`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Professional, compassionate home care services for your aging loved ones. Personal care, companion care, live-in care, and more in the greater Phoenix area.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <TawkChat />
      </body>
    </html>
  )
}
