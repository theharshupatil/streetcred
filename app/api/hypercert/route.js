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

async function uploadToIPFS(vendorData) {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) return null;
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        pinataContent: vendorData,
        pinataMetadata: { name: `streetcred-vendor-${Date.now()}` },
        pinataOptions: { cidVersion: 1 },
      }),
    });
    if (!res.ok) return null;
    const { IpfsHash } = await res.json();
    return IpfsHash;
  } catch {
    return null;
  }
}

export async function POST(request) {
  const body = await request.json();
  const db = readDB();

  if (db.nullifiers.includes(body.nullifier)) {
    return NextResponse.json({ success: false, error: "Already registered." }, { status: 400 });
  }

  const hypercertId = "HC-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const joinedAt = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const vendorData = {
    name: body.name,
    trade: body.trade,
    location: body.location,
    years: body.years,
    nullifier: body.nullifier,
    hypercertId,
    reputation: 10,
    joinedAt,
    network: "StreetCred v1",
    verifiedBy: "World ID",
    issuedAt: new Date().toISOString(),
  };

  // Upload to IPFS via Pinata
  const ipfsCid = await uploadToIPFS(vendorData);
  const vendor = { ...vendorData, ipfsCid };

  db.nullifiers.push(body.nullifier);
  db.vendors.push(vendor);
  writeDB(db);

  return NextResponse.json({ success: true, id: hypercertId, vendor });
}
