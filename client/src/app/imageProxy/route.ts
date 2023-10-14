import { type NextRequest, type NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const url = searchParams.get("imageUrl");
	if (url) {
		const res = await fetch(url);
		const body = res.body;
		return new Response(body);
	}
}
