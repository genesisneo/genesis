import { NextResponse } from "next/server";
import data from "../data/data.json";

export async function GET() {
  return NextResponse.json({ profile: data.profile }, { status: 200 });
}
