'use client';
import { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";

const TRADES = ["Vegetables 🥦","Chai / Tea ☕","Street Food 🍛","Flowers 🌸","Clothing 👗","Electronics 📱","Fruits 🍎","Stationery 📚","Other"];

const VERIFY_STEPS = [
  "Connecting to World ID…",
  "Generating ZK proof…",
  "Verifying proof on-chain…",
  "Proof verified ✓",
];

/* ─── LANDING ─────────────────────────────────────────────────────────── */
function Landing({ onVerify }) {
  return (
    <div style={s.page}>
      <div style={s.landing}>
        <div style={s.logoRow}>
          <span style={s.logoMark}>🏪</span>
          <span style={s.logoText}>StreetCred</span>
        </div>

        <h1 style={s.hero}>
          India's street vendors<br />
          <span style={s.heroGrad}>deserve a digital identity.</span>
        </h1>
        <p style={s.heroSub}>
          10M+ vendors. No bank account. No digital record. No access to loans
          or government schemes. StreetCred fixes that — one ZK proof at a time.
        </p>

        <div style={s.statsGrid}>
          {[["10M+","Street vendors"],["₹0","Credit access"],["0","Digital IDs"],["60s","To get yours"]].map(([n,l])=>(
            <div key={l} style={s.statBox}>
              <div style={s.statN}>{n}</div>
              <div style={s.statL}>{l}</div>
            </div>
          ))}
        </div>

        <div style={s.stepsBox}>
          <p style={s.stepsTitle}>HOW IT WORKS</p>
          {[
            ["🌐","Verify with World ID","ZK proof — no biometrics stored, one human one ID"],
            ["📋","Create your vendor profile","Name, trade, location — 30 seconds"],
            ["📦","Stored on IPFS","Permanent, censorship-resistant, content-addressed"],
            ["🏅","Get your Hypercert","On-chain impact certificate you own forever"],
          ].map(([icon,title,desc])=>(
            <div key={title} style={s.stepRow}>
              <span style={s.stepIcon}>{icon}</span>
              <div>
                <div style={s.stepTitle}>{title}</div>
                <div style={s.stepDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button style={s.ctaBtn} onClick={onVerify}>
          🌐 &nbsp;Verify with World ID
        </button>
        <p style={s.ctaSub}>Zero personal data stored · Powered by ZK proofs</p>

        <div style={s.poweredRow}>
          <span style={s.powLabel}>Powered by</span>
          {["World ID","IPFS / Pinata","Hypercerts"].map(t=>(
            <span key={t} style={s.powBadge}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── VERIFYING ───────────────────────────────────────────────────────── */
function Verifying({ stepIndex }) {
  return (
    <div style={s.page}>
      <div style={s.modalCard}>
        <div style={s.verifyGlobe}>🌐</div>
        <h2 style={s.verifyTitle}>Verifying with World ID</h2>
        <p style={s.verifySub}>Generating zero-knowledge proof on your device</p>
        <div style={s.stepsList}>
          {VERIFY_STEPS.map((step, i) => (
            <div key={i} style={{
              ...s.stepItem,
              background: i < stepIndex ? "rgba(74,222,128,0.1)" : i === stepIndex ? "rgba(96,165,250,0.1)" : "rgba(255,255,255,0.04)",
              borderColor: i < stepIndex ? "rgba(74,222,128,0.3)" : i === stepIndex ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.06)",
            }}>
              <span style={{fontSize:"1.1rem"}}>
                {i < stepIndex ? "✅" : i === stepIndex ? "⏳" : "⬜"}
              </span>
              <span style={{
                color: i < stepIndex ? "#4ade80" : i === stepIndex ? "#60a5fa" : "#475569",
                fontWeight: i <= stepIndex ? "600" : "400",
                fontSize: "0.9rem",
              }}>{step}</span>
            </div>
          ))}
        </div>
        <p style={s.verifySub2}>No biometrics or personal data leave your device</p>
      </div>
    </div>
  );
}

/* ─── FORM ────────────────────────────────────────────────────────────── */
function ProfileForm({ form, setForm, onSubmit, loading }) {
  return (
    <div style={s.page}>
      <div style={s.modalCard}>
        <div style={s.verifiedBanner}>✅ World ID Verified · You are a unique human</div>
        <div style={s.logoRow}>
          <span style={s.logoMark}>🏪</span>
          <span style={s.logoText}>StreetCred</span>
        </div>
        <h2 style={s.formTitle}>Set up your vendor profile</h2>
        <p style={s.formSub}>Stored permanently on IPFS · Minted as a Hypercert</p>

        <input style={s.input} placeholder="Your full name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input style={s.input} placeholder="City / Locality (e.g. Dharavi, Mumbai)" value={form.location}
          onChange={e => setForm({...form, location: e.target.value})} />
        <select style={s.input} value={form.trade}
          onChange={e => setForm({...form, trade: e.target.value})}>
          {TRADES.map(t => <option key={t} style={{background:"#1e2435"}}>{t}</option>)}
        </select>
        <input style={s.input} placeholder="Years in this trade" type="number" value={form.years}
          onChange={e => setForm({...form, years: e.target.value})} />

        <button
          style={{...s.ctaBtn, opacity: loading || !form.name || !form.location ? 0.55 : 1, marginTop:"24px"}}
          disabled={loading || !form.name || !form.location}
          onClick={onSubmit}
        >
          {loading ? "⏳  Uploading to IPFS & minting…" : "🚀  Register & Mint Identity →"}
        </button>

        {loading && (
          <div style={s.loadingSteps}>
            <div style={s.loadStep}>📦 Pinning profile to IPFS…</div>
            <div style={s.loadStep}>🏅 Minting Hypercert on-chain…</div>
            <div style={s.loadStep}>🎴 Generating your StreetCred ID…</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ID CARD ─────────────────────────────────────────────────────────── */
function IDCard({ profile, nullifier, vendors, onLoadVendors, showRegistry }) {
  const ipfsUrl = profile.ipfsCid
    ? `https://ipfs.io/ipfs/${profile.ipfsCid}`
    : null;
  const shortCid = profile.ipfsCid
    ? profile.ipfsCid.slice(0, 12) + "…" + profile.ipfsCid.slice(-6)
    : "Uploading…";

  return (
    <div style={s.page}>
      <div style={s.idPage}>

        <div style={s.idHeader}>
          <div style={s.logoRow}><span style={s.logoMark}>🏪</span><span style={s.logoText}>StreetCred</span></div>
          <p style={s.idHeaderSub}>Your verified digital identity is ready.</p>
        </div>

        {/* ── THE CARD ── */}
        <div style={s.card}>
          <div style={s.holoStrip} />

          <div style={s.cardTop}>
            <div style={s.cardBrand}>🏪 StreetCred</div>
            <div style={s.cardChip}>VERIFIED ID</div>
          </div>

          <div style={s.cardBody}>
            <div style={s.cardLeft}>
              <div style={s.avatar}>{profile.name[0].toUpperCase()}</div>
              <div style={s.qrBox}>
                <QRCode
                  value={ipfsUrl || `https://streetcred.app/vendor/${profile.hypercertId}`}
                  size={68}
                  bgColor="transparent"
                  fgColor="rgba(255,255,255,0.9)"
                  level="M"
                />
                <div style={s.qrLabel}>SCAN TO VERIFY</div>
              </div>
            </div>
            <div style={s.cardRight}>
              <div style={s.cardName}>{profile.name.toUpperCase()}</div>
              <div style={s.cardTrade}>{profile.trade}</div>
              <div style={s.cardMeta}>📍 {profile.location}</div>
              {profile.years && <div style={s.cardMeta}>⏱ {profile.years} yrs in trade</div>}
              <div style={s.cardMeta}>📅 Since {profile.joinedAt}</div>
              <div style={s.vendorBadge}>VENDOR #{String(Math.abs(profile.name.split("").reduce((h,c)=>(h<<5)-h+c.charCodeAt(0),0))).slice(-5)}</div>
            </div>
          </div>

          <div style={s.cardBadges}>
            <div style={s.cbadge}>🌐 World ID Verified</div>
            {profile.ipfsCid && <div style={s.cbadge}>📦 {shortCid}</div>}
            <div style={s.cbadge}>🏅 {profile.hypercertId.slice(0,16)}…</div>
          </div>

          <div style={s.cardFooter}>
            {[...Array(5)].map((_,i)=><div key={i} style={s.footDot}/>)}
          </div>
        </div>

        {/* ── DETAILS GRID ── */}
        <div style={s.detailGrid}>
          <div style={s.detailBox}>
            <div style={s.detailLbl}>📦 IPFS Profile</div>
            {ipfsUrl
              ? <a href={ipfsUrl} target="_blank" rel="noreferrer" style={s.detailLink}>{shortCid}</a>
              : <div style={s.detailVal}>No token set</div>}
            <div style={s.detailSub}>Pinned permanently · Content-addressed</div>
          </div>
          <div style={s.detailBox}>
            <div style={s.detailLbl}>🏅 Hypercert ID</div>
            <div style={s.detailVal}>{profile.hypercertId}</div>
            <div style={s.detailSub}>Impact certificate · On-chain</div>
          </div>
          <div style={s.detailBox}>
            <div style={s.detailLbl}>🔐 ZK Nullifier</div>
            <div style={{...s.detailVal, fontSize:"0.65rem", wordBreak:"break-all"}}>{nullifier?.slice(0,20)}…</div>
            <div style={s.detailSub}>Cannot register twice</div>
          </div>
        </div>

        {/* ── NEXT STEPS ── */}
        <div style={s.nextBox}>
          <div style={s.nextTitle}>WHAT YOU CAN DO NOW</div>
          <div style={s.nextGrid}>
            {[
              ["🏦","Apply for microloans","Show Vendor ID to lenders — PM SVANidhi, MUDRA"],
              ["🏛️","Access govt schemes","Verified identity unlocks subsidies & welfare"],
              ["📱","Accept digital payments","UPI linked to your verified profile"],
              ["🔗","Share your profile","Permanent link on IPFS — always accessible"],
            ].map(([icon,title,desc])=>(
              <div key={title} style={s.nextItem}>
                <div style={s.nextIcon}>{icon}</div>
                <div style={s.nextItemTitle}>{title}</div>
                <div style={s.nextItemDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── REGISTRY ── */}
        <button style={{...s.ctaBtn, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", marginTop:"8px"}} onClick={onLoadVendors}>
          🌐 &nbsp;View Verified Vendor Registry ({vendors.length > 0 ? vendors.length : "…"})
        </button>

        {showRegistry && vendors.length > 0 && (
          <div style={s.registry}>
            <div style={s.regTitle}>VERIFIED VENDORS ON STREETCRED</div>
            {vendors.map((v, i) => (
              <div key={i} style={s.regRow}>
                <div style={s.regAvatar}>{v.name[0].toUpperCase()}</div>
                <div style={s.regInfo}>
                  <div style={s.regName}>{v.name}</div>
                  <div style={s.regMeta}>{v.trade} · 📍 {v.location}</div>
                </div>
                <div style={s.regBadge}>✅ Verified</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── APP ROOT ────────────────────────────────────────────────────────── */
export default function Home() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ name:"", trade:"Vegetables 🥦", location:"", years:"" });
  const [profile, setProfile] = useState(null);
  const [nullifier, setNullifier] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [showRegistry, setShowRegistry] = useState(false);

  const handleVerify = async () => {
    setScreen("verifying");
    setStepIndex(0);
    for (let i = 0; i < VERIFY_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 750));
      setStepIndex(i + 1);
    }
    const res = await fetch("/api/verify", { method:"POST", headers:{"content-type":"application/json"}, body:"{}" });
    const data = await res.json();
    if (data.success) { setNullifier(data.nullifier); setScreen("form"); }
  };

  const handleRegister = async () => {
    if (!form.name || !form.location) return alert("Please fill name and location");
    setLoading(true);
    const res = await fetch("/api/hypercert", {
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify({ ...form, nullifier }),
    });
    const data = await res.json();
    setLoading(false);
    if (!data.success) return alert(data.error || "Registration failed");
    setProfile(data.vendor);
    setScreen("profile");
  };

  const loadVendors = async () => {
    const res = await fetch("/api/vendors");
    const data = await res.json();
    setVendors(data.vendors);
    setShowRegistry(true);
  };

  if (screen === "verifying") return <Verifying stepIndex={stepIndex} />;
  if (screen === "form")      return <ProfileForm form={form} setForm={setForm} onSubmit={handleRegister} loading={loading} />;
  if (screen === "profile")   return <IDCard profile={profile} nullifier={nullifier} vendors={vendors} onLoadVendors={loadVendors} showRegistry={showRegistry} />;
  return <Landing onVerify={handleVerify} />;
}

/* ─── STYLES ──────────────────────────────────────────────────────────── */
const s = {
  page:         { minHeight:"100vh", background:"linear-gradient(135deg,#080c18 0%,#0d1526 50%,#0a0f1e 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Inter','Segoe UI',system-ui,sans-serif" },

  // Landing
  landing:      { maxWidth:"560px", width:"100%", color:"#fff" },
  logoRow:      { display:"flex", alignItems:"center", gap:"10px", marginBottom:"28px" },
  logoMark:     { fontSize:"2rem" },
  logoText:     { fontSize:"1.9rem", fontWeight:"800", background:"linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  hero:         { fontSize:"2.5rem", fontWeight:"800", lineHeight:"1.2", marginBottom:"16px", color:"#f0f4ff" },
  heroGrad:     { background:"linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  heroSub:      { color:"#64748b", lineHeight:"1.8", marginBottom:"32px", fontSize:"1rem" },
  statsGrid:    { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"32px" },
  statBox:      { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"14px", padding:"16px 8px", textAlign:"center" },
  statN:        { fontSize:"1.5rem", fontWeight:"800", color:"#60a5fa", marginBottom:"4px" },
  statL:        { fontSize:"0.68rem", color:"#475569", lineHeight:"1.3" },
  stepsBox:     { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"16px", padding:"22px", marginBottom:"28px" },
  stepsTitle:   { fontSize:"0.7rem", fontWeight:"700", color:"#475569", letterSpacing:"0.1em", marginBottom:"16px" },
  stepRow:      { display:"flex", gap:"14px", alignItems:"flex-start", marginBottom:"14px" },
  stepIcon:     { fontSize:"1.3rem", flexShrink:0, marginTop:"1px" },
  stepTitle:    { fontWeight:"600", color:"#e2e8f0", fontSize:"0.93rem", marginBottom:"3px" },
  stepDesc:     { color:"#475569", fontSize:"0.8rem" },
  ctaBtn:       { width:"100%", padding:"17px", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", border:"none", borderRadius:"14px", fontSize:"1.05rem", fontWeight:"700", cursor:"pointer", letterSpacing:"0.01em" },
  ctaSub:       { textAlign:"center", fontSize:"0.73rem", color:"#334155", marginTop:"10px" },
  poweredRow:   { display:"flex", alignItems:"center", gap:"8px", marginTop:"20px", flexWrap:"wrap" },
  powLabel:     { fontSize:"0.73rem", color:"#334155" },
  powBadge:     { background:"rgba(96,165,250,0.08)", border:"1px solid rgba(96,165,250,0.2)", color:"#60a5fa", padding:"4px 10px", borderRadius:"20px", fontSize:"0.72rem", fontWeight:"600" },

  // Verify / modal card
  modalCard:    { background:"#111827", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"24px", padding:"36px", maxWidth:"460px", width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.6)" },
  verifyGlobe:  { fontSize:"3.5rem", textAlign:"center", marginBottom:"12px" },
  verifyTitle:  { fontSize:"1.5rem", fontWeight:"800", color:"#f0f4ff", textAlign:"center", marginBottom:"6px" },
  verifySub:    { color:"#475569", textAlign:"center", marginBottom:"24px", fontSize:"0.88rem" },
  stepsList:    { display:"flex", flexDirection:"column", gap:"10px", marginBottom:"20px" },
  stepItem:     { display:"flex", gap:"12px", alignItems:"center", padding:"12px 14px", borderRadius:"12px", border:"1px solid", transition:"all 0.3s" },
  verifySub2:   { color:"#334155", textAlign:"center", fontSize:"0.75rem" },

  // Form
  verifiedBanner:{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.2)", color:"#4ade80", padding:"10px 16px", borderRadius:"10px", fontSize:"0.82rem", fontWeight:"600", textAlign:"center", marginBottom:"20px" },
  formTitle:    { fontSize:"1.4rem", fontWeight:"800", color:"#f0f4ff", textAlign:"center", marginBottom:"6px" },
  formSub:      { color:"#475569", textAlign:"center", marginBottom:"22px", fontSize:"0.83rem" },
  input:        { width:"100%", padding:"13px 15px", margin:"6px 0", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.09)", borderRadius:"12px", fontSize:"0.95rem", color:"#f0f4ff", outline:"none", boxSizing:"border-box" },
  loadingSteps: { marginTop:"16px", display:"flex", flexDirection:"column", gap:"8px" },
  loadStep:     { background:"rgba(96,165,250,0.06)", border:"1px solid rgba(96,165,250,0.12)", color:"#64748b", padding:"10px 14px", borderRadius:"10px", fontSize:"0.8rem" },

  // ID page
  idPage:       { maxWidth:"580px", width:"100%", color:"#fff" },
  idHeader:     { textAlign:"center", marginBottom:"24px" },
  idHeaderSub:  { color:"#475569", fontSize:"0.88rem", marginTop:"6px" },

  // The card
  card:         { background:"linear-gradient(135deg,#162032 0%,#0f1729 45%,#1a1040 100%)", borderRadius:"20px", overflow:"hidden", boxShadow:"0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.7)", marginBottom:"20px" },
  holoStrip:    { height:"4px", background:"linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6,#34d399,#fbbf24,#60a5fa)", backgroundSize:"200% auto", animation:"shimmer 3s linear infinite" },
  cardTop:      { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 6px" },
  cardBrand:    { fontWeight:"800", fontSize:"0.95rem", color:"rgba(255,255,255,0.9)", letterSpacing:"0.05em" },
  cardChip:     { fontSize:"0.6rem", fontWeight:"700", color:"rgba(255,255,255,0.4)", letterSpacing:"0.12em", border:"1px solid rgba(255,255,255,0.15)", padding:"3px 8px", borderRadius:"4px" },
  cardBody:     { display:"flex", gap:"18px", padding:"10px 20px 16px" },
  cardLeft:     { display:"flex", flexDirection:"column", alignItems:"center", gap:"12px", flexShrink:0 },
  avatar:       { width:"68px", height:"68px", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.9rem", fontWeight:"800", color:"#fff", border:"2px solid rgba(255,255,255,0.15)" },
  qrBox:        { textAlign:"center" },
  qrLabel:      { fontSize:"0.5rem", color:"rgba(255,255,255,0.3)", marginTop:"4px", letterSpacing:"0.08em" },
  cardRight:    { flex:1, paddingTop:"4px" },
  cardName:     { fontSize:"1.1rem", fontWeight:"800", color:"#fff", letterSpacing:"0.06em", marginBottom:"4px" },
  cardTrade:    { fontSize:"0.88rem", color:"#a78bfa", fontWeight:"600", marginBottom:"8px" },
  cardMeta:     { fontSize:"0.76rem", color:"rgba(255,255,255,0.55)", marginBottom:"3px" },
  vendorBadge:  { marginTop:"10px", background:"rgba(96,165,250,0.12)", border:"1px solid rgba(96,165,250,0.25)", color:"#60a5fa", padding:"4px 12px", borderRadius:"20px", fontSize:"0.68rem", fontWeight:"700", letterSpacing:"0.08em", display:"inline-block" },
  cardBadges:   { display:"flex", gap:"6px", padding:"0 20px 14px", flexWrap:"wrap" },
  cbadge:       { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)", padding:"4px 10px", borderRadius:"20px", fontSize:"0.68rem", color:"rgba(255,255,255,0.7)", fontWeight:"500" },
  cardFooter:   { height:"8px", background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px" },
  footDot:      { width:"4px", height:"4px", borderRadius:"50%", background:"rgba(255,255,255,0.15)" },

  // Details grid
  detailGrid:   { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"16px" },
  detailBox:    { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"14px", padding:"14px" },
  detailLbl:    { fontSize:"0.65rem", color:"#334155", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"8px" },
  detailVal:    { fontSize:"0.78rem", fontWeight:"700", color:"#e2e8f0", fontFamily:"monospace", wordBreak:"break-all" },
  detailLink:   { fontSize:"0.78rem", fontWeight:"600", color:"#60a5fa", textDecoration:"none", fontFamily:"monospace", wordBreak:"break-all" },
  detailSub:    { fontSize:"0.65rem", color:"#1e3a5f", marginTop:"6px" },

  // Next steps
  nextBox:      { background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"16px", padding:"20px", marginBottom:"16px" },
  nextTitle:    { fontSize:"0.68rem", fontWeight:"700", color:"#334155", letterSpacing:"0.1em", marginBottom:"16px" },
  nextGrid:     { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"10px" },
  nextItem:     { background:"rgba(255,255,255,0.03)", borderRadius:"12px", padding:"14px" },
  nextIcon:     { fontSize:"1.2rem", marginBottom:"8px" },
  nextItemTitle:{ fontWeight:"700", color:"#e2e8f0", fontSize:"0.85rem", marginBottom:"4px" },
  nextItemDesc: { fontSize:"0.73rem", color:"#334155", lineHeight:"1.4" },

  // Registry
  registry:     { background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"16px", padding:"20px", marginTop:"12px" },
  regTitle:     { fontSize:"0.68rem", fontWeight:"700", color:"#334155", letterSpacing:"0.1em", marginBottom:"14px" },
  regRow:       { display:"flex", alignItems:"center", gap:"12px", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" },
  regAvatar:    { width:"36px", height:"36px", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", fontWeight:"800", color:"#fff", flexShrink:0 },
  regInfo:      { flex:1 },
  regName:      { fontWeight:"700", color:"#e2e8f0", fontSize:"0.88rem" },
  regMeta:      { color:"#334155", fontSize:"0.75rem", marginTop:"2px" },
  regBadge:     { background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.2)", color:"#4ade80", padding:"4px 10px", borderRadius:"20px", fontSize:"0.72rem", fontWeight:"600" },
};
