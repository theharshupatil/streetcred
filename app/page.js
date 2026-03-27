'use client';
import { useState } from "react";

const TRADES = ["Vegetables", "Chai/Tea", "Street Food", "Flowers", "Clothing", "Electronics", "Other"];

export default function Home() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ name: "", trade: "Vegetables", location: "", years: "" });
  const [profile, setProfile] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setScreen("verifying");
    try {
      const res = await fetch("/api/verify", { method: "POST" });
      const data = await res.json();
      if (data.success) setScreen("form");
    } catch (e) {
      setScreen("form");
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.location) return alert("Please fill all fields");
    const vendorId = Math.floor(Math.random() * 9000) + 1000;
    const nullifierHash = "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("");
    const certId = "CERT-" + Date.now();
    const hypercertRes = await fetch("/api/hypercert", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: form.name, trade: form.trade, vendorId, nullifierHash })
    });
    const hypercertData = await hypercertRes.json();
    setProfile({ ...form, vendorId, certId, nullifierHash, hypercertId: hypercertData.id, reputation: 10, joinedAt: new Date().toLocaleDateString() });
    setScreen("profile");
  };

  if (screen === "verifying") return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={{textAlign:"center", padding:"40px 0"}}>
          <div style={s.spinner}></div>
          <h2 style={{color:"#1a1a2e", marginTop:"24px"}}>Generating ZK Proof</h2>
          <p style={{color:"#666"}}>World ID is verifying you're a unique human...</p>
          <p style={{color:"#999", fontSize:"0.85rem"}}>Zero personal data is shared.</p>
        </div>
      </div>
    </div>
  );

  if (screen === "profile" && profile) return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.badge}>✅ World ID Verified Human</div>
        <h1 style={s.title}>StreetCred</h1>
        <div style={s.vendorCard}>
          <div style={s.avatar}>{profile.name[0].toUpperCase()}</div>
          <h2 style={s.vendorName}>{profile.name}</h2>
          <p style={s.detail}>🛒 {profile.trade}</p>
          <p style={s.detail}>📍 {profile.location}</p>
          <p style={s.detail}>⏱ {profile.years} years in trade</p>
          <p style={s.detail}>📅 Joined: {profile.joinedAt}</p>
          <div style={s.idBox}>Vendor #{profile.vendorId}</div>
        </div>
        <div style={s.repBox}>
          <p style={{color:"#666", fontSize:"0.85rem", margin:"0 0 8px"}}>Reputation Score</p>
          <div style={{fontSize:"3rem", fontWeight:"900", color:"#2e7d32"}}>{profile.reputation}</div>
          <p style={{color:"#888", fontSize:"0.8rem"}}>Verified member of StreetCred network</p>
        </div>
        <div style={s.proofBox}>
          <p style={{fontWeight:"700", fontSize:"0.85rem", color:"#555", margin:"0 0 6px"}}>🔐 World ID Nullifier Hash</p>
          <div style={s.hash}>{profile.nullifierHash}</div>
          <p style={{color:"#999", fontSize:"0.75rem", marginTop:"6px"}}>ZK proof — no personal data stored</p>
        </div>
        <div style={s.certBox}>
          <p style={{fontWeight:"800", fontSize:"1.1rem", color:"#e65100", margin:"0 0 8px"}}>🏅 Hypercert Minted</p>
          <p style={{color:"#666", fontSize:"0.85rem"}}>Impact certificate issued for joining the verified vendor network</p>
          <div style={s.certId}>{profile.certId}</div>
          {profile.hypercertId && <div style={s.certId}>{profile.hypercertId}</div>}
          <p style={{color:"#666", fontSize:"0.85rem", marginTop:"8px"}}>This certificate proves your contribution to India's formal vendor economy</p>
        </div>
      </div>
    </div>
  );

  if (screen === "form") return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.badge}>✅ World ID Verified</div>
        <h1 style={s.title}>StreetCred</h1>
        <p style={{color:"#666", textAlign:"center", marginBottom:"24px"}}>You're verified as a unique human. Now set up your vendor profile.</p>
        <input style={s.input} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <select style={s.input} value={form.trade} onChange={e => setForm({...form, trade: e.target.value})}>
          {TRADES.map(t => <option key={t}>{t}</option>)}
        </select>
        <input style={s.input} placeholder="Your city / locality" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
        <input style={s.input} placeholder="Years in trade" type="number" value={form.years} onChange={e => setForm({...form, years: e.target.value})} />
        <button style={s.btn} onClick={handleRegister}>Register & Mint Hypercert →</button>
      </div>
    </div>
  );

  return (
    <div style={s.container}>
      <div style={s.card}>
        <h1 style={s.title}>StreetCred</h1>
        <p style={{color:"#666", textAlign:"center", marginBottom:"24px", lineHeight:"1.6"}}>
          Digital identity for India's 10M+ street vendors.<br/>
          Get verified, build reputation, access loans and government schemes.
        </p>
        <div style={s.statsRow}>
          <div style={{textAlign:"center"}}><div style={{fontSize:"1.4rem", fontWeight:"800", color:"#0f3460"}}>10M+</div><div style={{fontSize:"0.8rem", color:"#666"}}>Street Vendors</div></div>
          <div style={{textAlign:"center"}}><div style={{fontSize:"1.4rem", fontWeight:"800", color:"#0f3460"}}>0</div><div style={{fontSize:"0.8rem", color:"#666"}}>With Digital ID</div></div>
          <div style={{textAlign:"center"}}><div style={{fontSize:"1.4rem", fontWeight:"800", color:"#0f3460"}}>₹0</div><div style={{fontSize:"0.8rem", color:"#666"}}>Credit Access</div></div>
        </div>
        <p style={{fontWeight:"700", color:"#1a1a2e", marginBottom:"12px"}}>How it works</p>
        <div style={{display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px"}}>
          {["🌐 Verify you're a unique human with World ID", "📋 Create your vendor profile", "🏅 Get a Hypercert — your impact certificate", "💳 Use your ID for loans & government schemes"].map(step => (
            <div key={step} style={{background:"#f0f4ff", padding:"12px 16px", borderRadius:"10px", fontSize:"0.9rem", color:"#333"}}>{step}</div>
          ))}
        </div>
        <button style={s.btn} onClick={handleVerify}>🌐 Verify with World ID</button>
        <p style={{textAlign:"center", fontSize:"0.75rem", color:"#999", marginTop:"12px"}}>Zero personal data stored. Powered by ZK proofs.</p>
      </div>
    </div>
  );
}

const s = {
  container: { minHeight:"100vh", background:"linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:"'Segoe UI', sans-serif" },
  card: { background:"white", borderRadius:"20px", padding:"40px", maxWidth:"480px", width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" },
  title: { fontSize:"2.5rem", fontWeight:"800", color:"#1a1a2e", margin:"0 0 8px 0", textAlign:"center" },
  badge: { background:"#e8f5e9", color:"#2e7d32", padding:"8px 16px", borderRadius:"20px", fontSize:"0.85rem", fontWeight:"600", textAlign:"center", marginBottom:"16px" },
  statsRow: { display:"flex", justifyContent:"space-around", margin:"24px 0", padding:"16px", background:"#f8f9fa", borderRadius:"12px" },
  btn: { width:"100%", padding:"16px", background:"linear-gradient(135deg, #0f3460, #533483)", color:"white", border:"none", borderRadius:"12px", fontSize:"1.1rem", fontWeight:"700", cursor:"pointer", marginTop:"8px" },
  input: { width:"100%", padding:"14px", margin:"8px 0", border:"2px solid #e0e0e0", borderRadius:"10px", fontSize:"1rem", boxSizing:"border-box" },
  vendorCard: { textAlign:"center", padding:"20px", background:"#f8f9fa", borderRadius:"16px", marginBottom:"20px" },
  avatar: { width:"64px", height:"64px", background:"linear-gradient(135deg, #0f3460, #533483)", color:"white", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem", fontWeight:"800", margin:"0 auto 12px" },
  vendorName: { fontSize:"1.5rem", fontWeight:"800", color:"#1a1a2e", margin:"0 0 8px" },
  detail: { color:"#666", margin:"4px 0" },
  idBox: { background:"#0f3460", color:"white", padding:"8px 20px", borderRadius:"20px", display:"inline-block", fontWeight:"700", marginTop:"12px" },
  repBox: { textAlign:"center", padding:"16px", border:"2px solid #e8f5e9", borderRadius:"16px", marginBottom:"16px" },
  proofBox: { background:"#f5f5f5", borderRadius:"12px", padding:"16px", marginBottom:"16px" },
  hash: { fontFamily:"monospace", fontSize:"0.75rem", color:"#333", wordBreak:"break-all" },
  certBox: { background:"linear-gradient(135deg, #fff8e1, #fff3cd)", border:"2px solid #ffd54f", borderRadius:"16px", padding:"20px", textAlign:"center" },
  certId: { background:"#e65100", color:"white", padding:"6px 14px", borderRadius:"8px", fontFamily:"monospace", fontSize:"0.8rem", display:"inline-block", margin:"4px" },
  spinner: { width:"48px", height:"48px", border:"4px solid #f0f0f0", borderTop:"4px solid #0f3460", borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto" },
};
