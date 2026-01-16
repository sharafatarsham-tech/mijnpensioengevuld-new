import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "MijnPensioen2025!";

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

// GET - Retrieve all messages (admin only)
export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth");

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureDataDir();

  try {
    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(data);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}

// POST - Save a new message (public)
export async function POST(request: NextRequest) {
  ensureDataDir();

  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    let messages = [];
    try {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    messages.unshift(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true, id: newMessage.id });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

// PATCH - Mark message as read
export async function PATCH(request: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth");

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, read } = body;

    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    const messages = JSON.parse(data);

    const messageIndex = messages.findIndex((m: { id: string }) => m.id === id);
    if (messageIndex !== -1) {
      messages[messageIndex].read = read;
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth");

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
    let messages = JSON.parse(data);

    messages = messages.filter((m: { id: string }) => m.id !== id);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
