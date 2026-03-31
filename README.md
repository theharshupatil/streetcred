# 🏪 StreetCred — Decentralised Identity for India's Street Vendors

> **India's 10M+ street vendors have no verifiable digital identity — blocking them from loans, government schemes, and digital commerce. StreetCred fixes that in 60 seconds using ZK proofs, IPFS, and on-chain impact certificates.**

[![Track](https://img.shields.io/badge/Track-Infrastructure%20%26%20Digital%20Rights-blue)]()
[![Sponsors](https://img.shields.io/badge/Sponsors-World%20ID%20%7C%20IPFS%20%7C%20Hypercerts-purple)]()
[![Stack](https://img.shields.io/badge/Stack-Next.js%2016-black)]()

---

## 🔥 The Problem

India has **10M+ street vendors**. The government's PM SVANidhi microloan scheme was built specifically for them — yet it has reached fewer than half its target. The single biggest barrier: **vendors can't prove they exist**.

- No business registration, no shop address, no paperwork
- Banks reject microloan applications without verifiable identity
- Municipal offices are slow, corrupt, and inaccessible
- A vendor's entire livelihood has zero digital record

The result: vendors stay locked out of formal credit, government welfare, and digital commerce — permanently.

---

## ✅ The Solution

StreetCred gives every street vendor a **verified, tamper-proof, decentralised digital identity** in under 60 seconds — no paperwork, no bureaucracy, just a phone.

| Step | What Happens | Sponsor Tech |
|------|-------------|--------------|
| 1 | Vendor proves they're a unique real human | **World ID** — ZK proof, no biometrics stored |
| 2 | Vendor profile pinned permanently | **IPFS via Pinata** — content-addressed, censorship-resistant |
| 3 | Impact certificate issued | **Hypercerts** — on-chain proof of joining the formal economy |
| 4 | Vendor gets a QR code ID card | Links directly to their live IPFS profile |

A bank, NGO, or government officer scans the QR → sees a World-ID-verified, IPFS-pinned profile that **nobody can fake, alter, or delete**.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    STREET VENDOR                        │
│                 (just needs a phone)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
              ┌───────▼────────┐
              │  StreetCred    │
              │  Next.js App   │
              └──┬──────────┬──┘
                 │          │
    ┌────────────▼──┐   ┌───▼──────────────────┐
    │  World ID     │   │  Next.js API Routes   │
    │               │   │                       │
    │  ZK Proof     │   │  POST /api/verify     │
    │  on-device    │   │  POST /api/hypercert  │
    │  Nullifier    │   │  GET  /api/vendors    │
    └────────────┬──┘   └───┬──────────────────┘
                 │           │
                 │     ┌─────▼──────────────────┐
                 │     │   IPFS via Pinata       │
                 │     │                         │
                 │     │  Vendor profile JSON    │
                 │     │  pinned permanently     │
                 │     │  Returns CIDv1 hash     │
                 │     └─────┬──────────────────┘
                 │           │
        ┌────────▼───────────▼──────────────────┐
        │           VENDOR ID CARD               │
        │                                        │
        │  ✅ World ID Verified                  │
        │  📦 IPFS CID  →  ipfs.io/ipfs/{cid}   │
        │  🏅 Hypercert ID                       │
        │  📱 QR Code (scannable by banks/govt)  │
        └────────────────────────────────────────┘
```

---

## 🔌 Sponsor Tech — Deep Integration

### 🌐 World ID
- Vendor proves they are a **unique real human** via ZK proof — no Aadhaar, no documents needed
- Generates a **nullifier hash** stored per vendor — enforces one person = one ID, prevents fraud
- No biometrics or personal data leave the vendor's device
- Stops Sybil attacks: nobody can create multiple fake IDs to claim multiple loans

### 📦 IPFS (via Pinata)
- On every registration, vendor profile JSON is **pinned to IPFS** server-side via Pinata REST API
- Returns a real **CIDv1 content hash** — data is immutable and independently verifiable
- QR code links directly to `https://ipfs.io/ipfs/{CID}` — scannable, always live
- No central server can delete or alter a vendor's identity record
- This is the **censorship-resistance layer** — a corrupt official cannot erase a vendor

### 🏅 Hypercerts
- Every registered vendor receives a **Hypercert ID** — an on-chain impact certificate
- Proves contribution to formalising India's street vendor economy
- NGOs and impact funders reference these certificates to unlock grant money that flows back to vendors as loans and subsidies
- Creates the path: verified vendor → provable impact → funding eligibility

---

## 📱 User Flow

```
Landing Page
    │
    ▼
[Verify with World ID]
    │  ZK proof generated on-device
    │  Nullifier hash returned
    ▼
Profile Form  (name, trade, location, years)
    │
    ▼
Registration  ←  POST /api/hypercert
    │  1. Profile JSON uploaded to IPFS → real CID returned
    │  2. Hypercert ID generated
    │  3. Vendor saved to local registry
    ▼
ID Card
    ├── QR Code  →  ipfs.io/ipfs/{CID}  (live, permanent)
    ├── World ID verified badge
    ├── Hypercert ID
    └── [View Vendor Registry]  ←  GET /api/vendors
```

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- Free [Pinata](https://pinata.cloud) account — no card required

### Install & Run

```bash
git clone https://github.com/theharshupatil/streetcred
cd streetcred
npm install
```

Create `.env` in the root:

```env
PINATA_JWT=your_pinata_jwt_here
```

Get your JWT: pinata.cloud → API Keys → New Key → Admin → Copy JWT

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📂 Project Structure

```
streetcred/
├── app/
│   ├── page.js                  # All UI screens (Landing → Verify → Form → ID Card)
│   ├── layout.js                # Root layout + metadata
│   ├── globals.css              # Global styles + shimmer animation
│   └── api/
│       ├── verify/route.js      # World ID ZK proof verification
│       ├── hypercert/route.js   # IPFS pin via Pinata + Hypercert mint
│       └── vendors/route.js     # Verified vendor registry
├── .env                         # PINATA_JWT — gitignored, never committed
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Frontend | React, inline CSS |
| Identity | World ID — ZK proof of personhood |
| Decentralised Storage | IPFS via Pinata REST API |
| Impact Certificates | Hypercerts |
| API | Next.js API Routes (serverless) |

---

## 🌍 Real-World Impact

**Why this matters:**
- PM SVANidhi has disbursed loans to ~5.5M vendors despite 10M+ being eligible — the gap is identity
- StreetCred removes the paperwork barrier entirely using cryptographic proof of personhood
- IPFS storage means vendor records survive government database failures, corruption, and censorship
- The Hypercert layer creates a path to impact funding that directly benefits vendors

**Why decentralised storage specifically:**
A centralised database can be corrupted or deleted. An IPFS content-addressed record means anyone with the CID can independently verify the data hasn't been tampered with — this is the trust guarantee that makes the ID credible to banks and government offices.

---

## 🎥 Demo Video

[Watch demo](#) <!-- Add Loom/YouTube link after recording -->

---

## 👤 Team

| Name | Institution |
|------|------------|
| Harshvardhan Patil | IIT Bombay |

---

## 📋 Submission Checklist

- [x] Project name on DevSpot — **StreetCred**
- [x] Project description
- [x] Sponsor tech integrated — World ID + IPFS (Pinata) + Hypercerts
- [x] GitHub repository (public)
- [ ] Demo video (2–3 min)
- [x] Track — Infrastructure & Digital Rights
- [ ] Submission marked as FINAL

---

*Built at PL Genesis Hackathon · March 2026*
