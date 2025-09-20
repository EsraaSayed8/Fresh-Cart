// src/app/api/signup/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const base = process.env.API_BASEURL;
    if (!base) {
      return NextResponse.json(
        { message: "Server misconfigured: API_BASEURL is missing" },
        { status: 500 }
      );
    }

    const url = new URL(`${process.env.API_BASEURL}/auth/signup`, base).toString();

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const payload = await res.json().catch(() => ({}));
    return NextResponse.json(payload, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
