// import { NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest) {
//     const a = request.nextUrl.searchParams.get("a")!
//     const b = request.nextUrl.searchParams.get("b")!

//     return NextResponse.json({result: Number.parseInt(a) + Number.parseInt(b)})
// }

import { loadAllEvents } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const events = await loadAllEvents()
    return NextResponse.json({ events: events});
}

export async function createEvent(name: string, desc:string, t0:date) {
    const result = await sql(``)
}