"use client"

import { useState } from "react"
import {
  Layout,
  Button,
  Typography,
  Space,
  Avatar,
  Dropdown,
  MenuProps,
} from "antd"
import { GithubOutlined, LogoutOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useAuth } from "@/store/auth-context"

function AppHeader() {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const { isLoggedIn, logout } = useAuth()

  const startAuthFlow = () => {
    setIsAuthLoading(true)
    try {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
        redirect_uri: `${window.location.origin}/auth/github/callback`,
        scope: "user repo",
        allow_signup: "true",
      })

      window.location.href = `https://github.com/login/oauth/authorize?${params}`
    } catch (error) {
      console.error("Authentication error:", error)
      setIsAuthLoading(false)
    }
  }

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ]

  return (
    <Layout.Header className="flex items-center justify-between !bg-white px-6 shadow-[0_2px_8px_#f0f1f2] z-10">
      <Link href="/" passHref>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar alt="GithubVibe logo" size="large" className="!bg-blue-600" />
          <Typography.Text strong className="text-xl !text-blue-600">
            GithubVibe
          </Typography.Text>
        </div>
      </Link>

      <Space size="large">
        {isLoggedIn ? (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span className="cursor-pointer">LoggedIn</span>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            icon={<GithubOutlined />}
            loading={isAuthLoading}
            onClick={startAuthFlow}
            className="flex items-center gap-2 font-medium"
          >
            Sign in with GitHub
          </Button>
        )}
      </Space>
    </Layout.Header>
  )
}

export { AppHeader }
