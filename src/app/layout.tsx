import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import AppLayout from "./app-layout"
import "./globals.css"
import "@ant-design/v5-patch-for-react-19"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Github Vibe",
  description:
    "A platform offering customizable widgets for real-time tracking of repositories, user activity, and community trends.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
