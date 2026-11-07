import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["full_name", "email", "phone", "applicant_type", "contribution"];
    for (const key of required) {
      if (!body[key] || !String(body[key]).trim()) {
        return NextResponse.json({ error: `Please provide ${key.replaceAll("_", " ")}.` }, { status: 400 });
      }
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ error: "The application database is not configured yet. Please try again later." }, { status: 503 });
    }

    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { error } = await supabase.from("media_applications").insert({
      full_name: String(body.full_name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      applicant_type: String(body.applicant_type).trim(),
      instagram: body.instagram ? String(body.instagram).trim() : null,
      tiktok: body.tiktok ? String(body.tiktok).trim() : null,
      contribution: String(body.contribution).trim(),
      status: "Under review"
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BFAF application error:", error);
    return NextResponse.json({ error: "We could not submit your application. Please try again." }, { status: 500 });
  }
}
