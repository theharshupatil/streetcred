import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  // Hypercerts impact certificate minting
  const hypercertId = "HC-" + Date.now() + "-" + Math.random().toString(36).slice(2,8).toUpperCase();
  return NextResponse.json({
    id: hypercertId,
    name: body.name,
    trade: body.trade,
    vendorId: body.vendorId,
    nullifierHash: body.nullifierHash,
    issuedAt: new Date().toISOString(),
    claim: "Verified street vendor on StreetCred network — contributing to India's formal economy",
    network: "Optimism",
  });
}
