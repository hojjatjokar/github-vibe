import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/callback`,
        }),
      },
    )

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    const response = NextResponse.json({ accessToken })
    response.cookies.set("session", JSON.stringify({ accessToken }), {
      path: "/",
      httpOnly: true,
    })

    return response
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    )
  }
}
