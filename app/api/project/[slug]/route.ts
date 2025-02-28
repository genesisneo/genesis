import { NextRequest, NextResponse } from "next/server";
import data from "../../data/data.json";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = data.portfolio.find((item) => item.slug === slug);
  if (!project) {
    return NextResponse.json({ message: `Project ${slug} is nowhere to be found.` }, { status: 400 });
  } else {
    return NextResponse.json({ project }, { status: 200 });
  }
}
