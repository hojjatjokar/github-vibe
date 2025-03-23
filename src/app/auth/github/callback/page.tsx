"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spin } from "antd"
import { useDispatch } from "react-redux"
import { login } from "@/store/auth-slice"

const getToken = async (code: string) => {
  const response = await fetch(`/api/auth/github/callback?code=${code}`)
  const { accessToken } = await response.json()

  localStorage.setItem("token", accessToken)
  return accessToken
}

function CallbackPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    if (code) {
      getToken(code).then(() => {
        dispatch(login())
        router.push("/")
      })
    }
  }, [code, dispatch, router])

  return (
    <div className="flex justify-center mt-24">
      <Spin size="large" />
    </div>
  )
}

export default function Callback() {
  return (
    <Suspense>
      <CallbackPage />
    </Suspense>
  )
}
