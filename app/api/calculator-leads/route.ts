import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the lead (in production, save to database or send to CRM)
    console.log("Calculator lead received:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      calculatorResult: data.calculatorResult,
      source: data.source,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send to CRM (HubSpot, Pipedrive, etc.)
    // 3. Send confirmation email
    // 4. Add to email marketing list

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing calculator lead:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
