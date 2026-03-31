import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data.json");

export async function GET() {
  if (!existsSync(DB_PATH)) return NextResponse.json({ vendors: [] });
  const db = JSON.parse(readFileSync(DB_PATH, "utf8"));
  return NextResponse.json({ vendors: db.vendors || [] });
}
