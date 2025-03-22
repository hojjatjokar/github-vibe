"use client"

import { Layout } from "antd"
import { AppHeader } from "@/components/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-lvh">
      <AppHeader />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
