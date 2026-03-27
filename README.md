# StreetCred 🛒

> Digital identity for India's 10M+ street vendors using World ID ZK proofs and Hypercerts

## Problem

India has over 10 million street vendors. They have **no verifiable digital identity** — blocking them from:
- Government welfare schemes (PM SVANidhi, etc.)
- Micro-loans and credit
- Digital commerce platforms

## Solution

StreetCred gives every street vendor a **privacy-preserving digital identity** using:
- **World ID** — ZK proof of personhood (one vendor, one identity, no duplicates)
- **Hypercerts** — Impact certificate minted on-chain as proof of joining the formal economy

## How It Works

1. Vendor opens StreetCred
2. Verifies identity via **World ID** (ZK proof — no biometric data stored)
3. Creates vendor profile (name, trade, location)
4. **Hypercert** is minted as an impact certificate
5. Vendor gets a shareable digital ID card with reputation score

## Sponsor Tech Integration

### World ID
- ZK proof of personhood via `/api/verify` endpoint
- Nullifier hash stored per vendor (prevents duplicate registrations)
- Protocol version: World ID 4.0

### Hypercerts
- Impact certificate minted per verified vendor via `/api/hypercert` endpoint
- Certificate proves vendor's contribution to India's formal economy
- Unique `HC-` prefixed certificate ID issued on Optimism

## Tech Stack

- **Frontend**: Next.js 16 + React
- **Backend**: Next.js API Routes
- **Identity**: World ID (ZK proofs)
- **Impact Certificates**: Hypercerts
- **Deployment**: Vercel-ready

## Architecture
```
User → Landing Page
     → [Verify with World ID] → /api/verify (ZK proof validation)
     → Vendor Profile Form
     → [Register] → /api/hypercert (mint impact certificate)
     → Verified Vendor Card + Hypercert ID
```

## Setup
```bash
git clone https://github.com/theharshupatil/streetcred
cd streetcred
npm install
npm run dev
```

Open http://localhost:3000

## Demo

[Watch Demo Video](#) <!-- Add your video link here -->

## Track

Infrastructure & Digital Rights

## Sponsors Used

- World ID (proof of personhood)
- Hypercerts (impact certificates)

## Team

- Harshvardhan Patil
