"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spin } from "antd"
import { useAuth } from "@/store/auth-context"

function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const { login } = useAuth()

  useEffect(() => {
    if (code) {
      login(code).then(() => {
        router.push("/")
      })
    }
  }, [code, router, login])

  return (
    <div className="flex justify-center mt-24">
      <Spin size="large" />
    </div>
  )
}

export default function Callback() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <CallbackPage />
    </Suspense>
  )
}
