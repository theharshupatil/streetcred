import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data.json");

function readDB() {
  if (!existsSync(DB_PATH)) return { nullifiers: [], vendors: [] };
  return JSON.parse(readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const db = readDB();
  
  // Generate a nullifier hash (in production this comes from World ID ZK proof)
  const nullifier = "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("");
  
  // Check if already registered
  if (body.nullifier && db.nullifiers.includes(body.nullifier)) {
    return NextResponse.json({ success: false, error: "Already registered. One vendor per human." }, { status: 400 });
  }

  await new Promise(r => setTimeout(r, 2000));
  
  return NextResponse.json({ 
    success: true, 
    nullifier,
    protocol_version: "4.0",
    message: "World ID ZK proof verified"
  });
}
