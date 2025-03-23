"use client"

import { Provider } from "react-redux"
import store from "@/store"
import { Layout } from "antd"
import { AppHeader } from "@/components/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Layout className="h-lvh">
        <AppHeader />
        <Layout.Content className="p-4">{children}</Layout.Content>
      </Layout>
    </Provider>
  )
}
