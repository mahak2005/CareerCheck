import type { Metadata } from "next"
import "./globals.css"
import { Layout } from '@/components/Layout'
// import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: "Career Check",
  description: "IGDTUW Placement Statistics Portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-50">
      <Layout>{children}</Layout>
      </body>
    </html>
  )
}

