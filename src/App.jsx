import React, { useState, useEffect } from "react";

function useOraItaliana() {
  const [ora, setOra] = useState("");
  useEffect(function() {
    function aggiorna() {
      var now = new Date();
      var opts = { timeZone: "Europe/Rome", weekday: "short", day: "numeric", month: "short" };
      var data = now.toLocaleDateString("it-IT", opts);
      var tempo = now.toLocaleTimeString("it-IT", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit" });
      setOra(data + " \u00B7 " + tempo);
    }
    aggiorna();
    var timer = setInterval(aggiorna, 30000);
    return function() { clearInterval(timer); };
  }, []);
  return ora;
}

const C = {
  bg:"#F7F7F4", card:"#FFFFFF", ink:"#1A1A18", muted:"#6B6B65", border:"#E5E3DC", surface:"#EEEEE8",
  pri:"#2B3A8E", priSoft:"#EEF0F8", acc:"#C4570A", accSoft:"#FFF3EB",
  green:"#15794E", greenSoft:"#EDFBF3", blue:"#2B6CB0", blueSoft:"#EBF4FF",
  purple:"#6D45B0", purpleSoft:"#F3EEFF", amber:"#946B0C", amberSoft:"#FFF8EB",
  red:"#B92D2D", redSoft:"#FFF0F0",
};

function PillTag({ label, color, bg }) {
  return <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: bg, color: color }}>{label}</span>;
}
function StatoPill({ stato }) {
  if (stato === "in_corso") return <PillTag label="In corso" color={C.blue} bg={C.blueSoft} />;
  if (stato === "programmato") return <PillTag label="Programmato" color={C.green} bg={C.greenSoft} />;
  if (stato === "completato") return <PillTag label="Fatto" color={C.green} bg={C.greenSoft} />;
  return <PillTag label="Nuovo" color={C.muted} bg={C.surface} />;
}
function Sec({ text }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "14px 0 8px" }}>{text}</div>;
}
function PBar({ value }) {
  return <div style={{ height: 3, borderRadius: 2, background: C.surface, width: "100%", marginTop: 6 }}><div style={{ height: "100%", width: value + "%", background: C.pri, borderRadius: 2 }} /></div>;
}
function ini(name) { return name.split(" ").map(function(x) { return x[0]; }).join(""); }

/* ═══════════════════════════
   LOGIN
   ═══════════════════════════ */
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("titolare");
  var isTit = mode === "titolare";
  var ac = isTit ? C.acc : C.green;
  var abg = isTit ? C.accSoft : C.greenSoft;

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: '"DM Sans",system-ui,sans-serif', background: C.bg }}>
      <div style={{ flex: "0 0 46%", overflow: "hidden", background: C.card, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 56px", borderRight: "1px solid " + C.border }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>iO</div>
          <span style={{ fontSize: 22, fontWeight: 700 }}>InOpera</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px" }}>
          Il lavoro artigiano,<br /><span style={{ color: ac }}>{isTit ? "organizzato." : "semplificato."}</span>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: C.muted, maxWidth: 360, margin: 0 }}>Gestionale intelligente per artigiani e PMI.</p>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        <div style={{ width: "100%", maxWidth: 370 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>Accedi</h2>
          <p style={{ fontSize: 14, color: C.muted, margin: "0 0 28px" }}>{isTit ? "Entra nella tua area di gestione." : "Inserisci il codice operatore."}</p>
          <div style={{ display: "flex", borderRadius: 12, background: C.surface, padding: 3, marginBottom: 28 }}>
            <button onClick={function() { setMode("titolare"); }} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", background: mode === "titolare" ? C.card : "transparent", color: mode === "titolare" ? C.acc : C.muted, boxShadow: mode === "titolare" ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>Titolare</button>
            <button onClick={function() { setMode("operatore"); }} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", background: mode === "operatore" ? C.card : "transparent", color: mode === "operatore" ? C.green : C.muted, boxShadow: mode === "operatore" ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>Operatore</button>
          </div>
          {isTit ? (
            <div>
              <input placeholder="Email" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid " + C.border, fontSize: 14, outline: "none", background: C.card, boxSizing: "border-box", marginBottom: 12 }} />
              <input placeholder="Password" type="password" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid " + C.border, fontSize: 14, outline: "none", background: C.card, boxSizing: "border-box", marginBottom: 28 }} />
            </div>
          ) : (
            <div>
              <input placeholder="es. OP-7842" style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid " + C.border, fontSize: 18, fontWeight: 600, letterSpacing: "0.12em", outline: "none", background: C.card, boxSizing: "border-box", marginBottom: 28 }} />
            </div>
          )}
          <button onClick={function() { onLogin(mode); }} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", background: ac, color: "#fff" }}>{isTit ? "Accedi" : "Entra"}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   TITOLARE — SECTIONS
   ═══════════════════════════ */
function THome({ pend, richieste, lavori, onApprova, onRifiuta, showReq, setShowReq }) {
  var oggi = lavori.filter(function(l) { return l.data === "Oggi"; });
  var pending = richieste.filter(function(r) { return r.st === "pending"; });
  var done = richieste.filter(function(r) { return r.st !== "pending"; });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 10 }}><div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Settimana</div><div style={{ fontSize: 20, fontWeight: 700 }}>12</div></div>
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 10 }}><div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Completati</div><div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>4</div></div>
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 10 }}><div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Operatori</div><div style={{ fontSize: 20, fontWeight: 700, color: C.blue }}>2/3</div></div>
      </div>

      {pend > 0 ? (
        <div onClick={function() { setShowReq(!showReq); }} style={{ background: C.accSoft, border: "2px solid " + C.acc, borderRadius: 10, padding: "10px 12px", marginBottom: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.acc, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{pend}</div>
            <div><div style={{ fontSize: 12, fontWeight: 700, color: C.acc }}>{pend} richieste da approvare</div><div style={{ fontSize: 10, color: C.muted }}>Tocca per {showReq ? "chiudere" : "visualizzare"}</div></div>
          </div>
          <span style={{ color: C.acc }}>{showReq ? "\u25B2" : "\u25BC"}</span>
        </div>
      ) : (
        <div style={{ background: C.surface, borderRadius: 10, padding: "10px 12px", marginBottom: 12, textAlign: "center" }}>
          <span style={{ fontSize: 11, color: C.muted }}>Non ci sono richieste</span>
        </div>
      )}

      {showReq && pend > 0 && (
        <div style={{ marginBottom: 12 }}>
          {pending.map(function(r) {
            return (
              <div key={r.id} style={{ background: C.card, border: "2px solid " + C.acc, borderRadius: 14, padding: 12, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: r.ch === "WhatsApp" ? "#25D366" : C.blue, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.ch === "WhatsApp" ? "W" : "T"}</div>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{r.ch}</span>
                  </div>
                  <span style={{ fontSize: 10, color: C.muted }}>{r.t}</span>
                </div>
                <div style={{ background: C.surface, borderRadius: 8, padding: "8px 10px", marginBottom: 10, fontSize: 11, lineHeight: 1.5, fontStyle: "italic" }}>{'"' + r.msg + '"'}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.priSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, color: C.pri }}>{ini(r.nome)}</div>
                  <div><div style={{ fontSize: 12, fontWeight: 600 }}>{r.nome}</div><div style={{ fontSize: 10, color: C.muted }}>{r.ind}</div></div>
                </div>
                <div style={{ background: C.purpleSoft, borderRadius: 10, padding: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.purple, marginBottom: 6 }}>Bozza generata dall'IA</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 11 }}>
                    <div><span style={{ color: C.muted }}>Tipo: </span><strong>{r.tipo}</strong></div>
                    <div><span style={{ color: C.muted }}>Urgenza: </span><strong style={{ color: r.urg === "Alta" ? C.red : C.muted }}>{r.urg}</strong></div>
                    <div><span style={{ color: C.muted }}>Quando: </span><strong>{r.data}</strong></div>
                    <div><span style={{ color: C.muted }}>Operatore: </span><strong>{r.op}</strong></div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={function() { onApprova(r.id); }} style={{ flex: 2, padding: 10, borderRadius: 8, border: "none", background: C.green, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Approva</button>
                  <button style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid " + C.pri, background: C.priSoft, color: C.pri, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Modifica</button>
                  <button onClick={function() { onRifiuta(r.id); }} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid " + C.border, background: "transparent", color: C.muted, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Rifiuta</button>
                </div>
              </div>
            );
          })}
          {done.map(function(r) {
            return <div key={r.id} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "8px 12px", marginBottom: 4, opacity: 0.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ fontSize: 11, fontWeight: 600 }}>{r.tipo}</div><PillTag label={r.st === "ok" ? "Approvato" : "Rifiutato"} color={r.st === "ok" ? C.green : C.red} bg={r.st === "ok" ? C.greenSoft : C.redSoft} /></div>;
          })}
        </div>
      )}

      <Sec text={"Oggi \u2014 " + oggi.length + " interventi"} />
      {oggi.map(function(l) {
        return <div key={l.id} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "10px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 12, fontWeight: 700, color: C.pri, minWidth: 36 }}>{l.ora}</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{l.tipo}</div><div style={{ fontSize: 10, color: C.muted }}>{l.cl + " \u00B7 " + l.op}</div></div><StatoPill stato={l.st} /></div>;
      })}
    </div>
  );
}

function TAgenda({ lavori }) {
  return (
    <div>
      {["Oggi", "Domani"].map(function(g) {
        var items = lavori.filter(function(l) { return l.data === g; });
        if (items.length === 0) return null;
        return <div key={g}><Sec text={g + " \u2014 " + items.length + " lavori"} />{items.map(function(l) {
          return <div key={l.id} style={{ background: C.card, border: "1px solid " + (l.bozza ? C.green : C.border), borderRadius: 12, padding: "10px 12px", marginBottom: 6 }}>
            {l.bozza && <div style={{ fontSize: 9, fontWeight: 600, color: C.green, background: C.greenSoft, padding: "2px 8px", borderRadius: 10, display: "inline-block", marginBottom: 6 }}>Da richiesta cliente</div>}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12, fontWeight: 700, color: C.pri, minWidth: 36 }}>{l.ora}</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{l.tipo}</div><div style={{ fontSize: 10, color: C.muted }}>{l.cl}</div><div style={{ fontSize: 10, color: C.blue, fontWeight: 500 }}>{l.op}</div></div><StatoPill stato={l.st} /></div>
            {l.prog > 0 && l.prog < 100 && <PBar value={l.prog} />}
          </div>;
        })}</div>;
      })}
    </div>
  );
}

function TClienti() {
  var cl = [{n:"Marco Bianchi",t:"339 123 4567",i:"Via Nazionale 42, Teramo",l:4},{n:"Anna Russo",t:"347 987 6543",i:"Corso San Giorgio 8, Teramo",l:2},{n:"Elena Ferretti",t:"328 111 2233",i:"Viale Bovio 45, Pescara",l:7},{n:"Roberto Sala",t:"340 555 6677",i:"Via Trento 3, Teramo",l:1}];
  return <div>{cl.map(function(c,i) { return <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: "10px 12px", marginBottom: 6 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: C.priSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: C.pri }}>{ini(c.n)}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{c.n}</div><div style={{ fontSize: 10, color: C.muted }}>{c.l} lavori</div></div></div><div style={{ display: "flex", gap: 6 }}><a href={"tel:" + c.t.replace(/\s/g,"")} style={{ flex: 1, padding: 7, borderRadius: 8, border: "1px solid " + C.green, background: C.greenSoft, color: C.green, fontSize: 11, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>{c.t}</a><a href={"https://maps.google.com/?q=" + encodeURIComponent(c.i)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: 7, borderRadius: 8, border: "1px solid " + C.blue, background: C.blueSoft, color: C.blue, fontSize: 11, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>{c.i.split(",")[0]}</a></div></div>; })}</div>;
}

function TTeam() {
  var tm = [{n:"Luca Verdi",s:"Idraulica",c:"OP-7842",o:2,a:true},{n:"Marco Neri",s:"Elettricista",c:"OP-3156",o:1,a:true},{n:"Paolo Galli",s:"Generico",c:"OP-9901",o:0,a:false}];
  return <div><button style={{ width: "100%", padding: 8, borderRadius: 8, border: "none", background: C.pri, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", marginBottom: 10 }}>+ Nuovo operatore</button>{tm.map(function(t,i) { return <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "10px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 34, height: 34, borderRadius: "50%", background: t.a ? C.greenSoft : C.surface, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: t.a ? C.green : C.muted }}>{ini(t.n)}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{t.n}</div><div style={{ fontSize: 10, color: C.muted }}>{t.s + " \u00B7 " + t.c}</div></div><PillTag label={t.a ? t.o + " oggi" : "Libero"} color={t.a ? C.green : C.muted} bg={t.a ? C.greenSoft : C.surface} /></div>; })}</div>;
}

function ChatIA({ context }) {
  const [msgs, setMsgs] = useState([]);
  const [val, setVal] = useState("");
  var quickTit = ["Genera preventivo", "Ottimizza agenda", "Suggerisci materiali"];
  var quickOp = ["Scheda normativa", "Aggiungi a materiali", "Chiedi al titolare"];
  var quick = context === "titolare" ? quickTit : quickOp;

  function send(text) {
    if (!text.trim()) return;
    setMsgs(msgs.concat([{ r: "u", t: text }, { r: "a", t: "Elaboro la risposta..." }]));
    setVal("");
  }

  return (
    <div>
      <div style={{ background: context === "titolare" ? C.purpleSoft : C.greenSoft, padding: "6px 10px", borderRadius: 8, marginBottom: 10, fontSize: 10, color: context === "titolare" ? C.purple : C.green }}>
        {context === "titolare" ? "Assistente IA \u2014 preventivi, gestione" : "Assistente IA \u2014 specifiche tecniche, norme"}
      </div>
      {msgs.length === 0 && <div style={{ textAlign: "center", padding: "20px 16px", color: C.muted }}><div style={{ fontSize: 13, marginBottom: 6 }}>Chiedi qualcosa all'assistente</div></div>}
      <div style={{ marginBottom: 10 }}>
        {msgs.map(function(m, i) {
          var isU = m.r === "u";
          return <div key={i} style={{ display: "flex", justifyContent: isU ? "flex-end" : "flex-start", marginBottom: 6 }}><div style={{ maxWidth: "82%", padding: "8px 12px", borderRadius: isU ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: isU ? C.priSoft : C.card, border: isU ? "none" : "1px solid " + C.border, fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", color: isU ? C.pri : C.ink, fontWeight: isU ? 500 : 400 }}>{m.t}</div></div>;
        })}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {quick.map(function(q) { return <button key={q} onClick={function() { send(q); }} style={{ padding: "4px 10px", borderRadius: 12, border: "1px solid " + C.border, background: C.card, fontSize: 10, color: C.purple, fontWeight: 600, cursor: "pointer" }}>{q}</button>; })}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input value={val} onChange={function(e) { setVal(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") send(val); }} placeholder="Scrivi un messaggio..." style={{ flex: 1, padding: "10px 12px", borderRadius: 18, border: "1px solid " + C.border, fontSize: 13, outline: "none", background: C.card, boxSizing: "border-box" }} />
        <button onClick={function() { send(val); }} style={{ width: 36, height: 36, borderRadius: "50%", background: C.pri, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{"\u2191"}</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   TITOLARE PHONE
   ═══════════════════════════ */
function TitolarePhone({ onLogout }) {
  const [tab, setTab] = useState("home");
  const [showReq, setShowReq] = useState(false);
  var oraLive = useOraItaliana();
  const [richieste, setRichieste] = useState([
    { id: "r1", ch: "WhatsApp", t: "10 min fa", nome: "Fabio Moretti", ind: "Via Nazionale 18, Teramo", msg: "Ho una perdita sotto il lavandino. Potete venire?", tipo: "Riparazione perdita", urg: "Alta", data: "Oggi 16:00", op: "Luca Verdi", st: "pending" },
    { id: "r2", ch: "Chiamata", t: "35 min fa", nome: "Carla Gentili", ind: "Corso San Giorgio 22, Teramo", msg: "Salta la corrente quando accendo il forno.", tipo: "Verifica elettrica", urg: "Normale", data: "Mer 9 apr 10:00", op: "Marco Neri", st: "pending" },
    { id: "r3", ch: "WhatsApp", t: "2 ore fa", nome: "Paolo Santini", ind: "Piazza Garibaldi 7, Giulianova", msg: "Dovrei rifare il bagno. Potete fare un sopralluogo?", tipo: "Sopralluogo bagno", urg: "Bassa", data: "Gio 10 apr 15:00", op: "Titolare", st: "pending" },
  ]);
  const [lavori, setLavori] = useState([
    { id: 1, cl: "Marco Bianchi", ind: "Via Nazionale 42, Teramo", tipo: "Ristrutturazione bagno", st: "in_corso", op: "Luca V.", data: "Oggi", ora: "08:30", prog: 65 },
    { id: 2, cl: "Anna Russo", ind: "Corso San Giorgio 8, Teramo", tipo: "Impianto elettrico", st: "programmato", op: "Marco N.", data: "Oggi", ora: "11:00", prog: 0 },
    { id: 3, cl: "Giuseppe Conti", ind: "Via Roma 22, Giulianova", tipo: "Sopralluogo", st: "nuovo", op: "Tu", data: "Oggi", ora: "15:00", prog: 0 },
    { id: 5, cl: "Roberto Sala", ind: "Via Trento 3, Teramo", tipo: "Posa pavimento", st: "programmato", op: "Luca V.", data: "Domani", ora: "09:00", prog: 0 },
  ]);

  var pend = richieste.filter(function(r) { return r.st === "pending"; }).length;

  function approva(id) {
    var r = richieste.find(function(x) { return x.id === id; });
    if (!r) return;
    setRichieste(richieste.map(function(x) { return x.id === id ? Object.assign({}, x, { st: "ok" }) : x; }));
    var p = r.op.split(" ");
    setLavori(lavori.concat([{ id: Date.now(), cl: r.nome, ind: r.ind, tipo: r.tipo, st: "programmato", op: p[0] + " " + (p[1] ? p[1][0] + "." : ""), data: r.data.indexOf("Oggi") >= 0 ? "Oggi" : "Domani", ora: r.data.split(" ").pop(), prog: 0, bozza: true }]));
  }
  function rifiuta(id) { setRichieste(richieste.map(function(x) { return x.id === id ? Object.assign({}, x, { st: "no" }) : x; })); }

  var content = null;
  if (tab === "home") content = <THome pend={pend} richieste={richieste} lavori={lavori} onApprova={approva} onRifiuta={rifiuta} showReq={showReq} setShowReq={setShowReq} />;
  if (tab === "agenda") content = <TAgenda lavori={lavori} />;
  if (tab === "clienti") content = <TClienti />;
  if (tab === "team") content = <TTeam />;
  if (tab === "ai") content = <ChatIA context="titolare" />;

  return (
    <div style={{ width: 340, borderRadius: 32, border: "6px solid #1A1A18", background: C.bg, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,.18)", height: 700 }}>
      <div style={{ height: 24, background: "#1A1A18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div style={{ width: 70, height: 4, borderRadius: 2, background: "#333" }} /></div>
      <div style={{ background: C.card, borderBottom: "1px solid " + C.border, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>iO</div>
        <span style={{ fontSize: 11, color: C.muted }}>{oraLive}</span>
      </div>
      <div style={{ flex: 1, padding: "10px 12px", overflowY: "auto" }}>{content}</div>
      <div style={{ background: C.card, borderTop: "1px solid " + C.border, display: "flex", padding: "5px 0 10px", flexShrink: 0 }}>
        {[{id:"home",e:"\uD83C\uDFE0",l:"Home"},{id:"agenda",e:"\uD83D\uDCC5",l:"Agenda"},{id:"clienti",e:"\uD83D\uDC64",l:"Clienti"},{id:"team",e:"\uD83D\uDC65",l:"Team"},{id:"ai",e:"\u2728",l:"IA"}].map(function(item) {
          var isA = tab === item.id;
          var col = isA ? (item.id === "ai" ? C.purple : C.pri) : C.muted;
          return <button key={item.id} onClick={function() { setTab(item.id); }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, border: "none", background: "none", cursor: "pointer", padding: "4px 0" }}><span style={{ fontSize: 16 }}>{item.e}</span><span style={{ fontSize: 8, fontWeight: isA ? 700 : 400, color: col }}>{item.l}</span></button>;
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════
   OPERATORE PHONE
   ═══════════════════════════ */
function OperatorePhone({ onLogout }) {
  const [tab, setTab] = useState("agenda");
  const [notes, setNotes] = useState(["Tubo sotto lavandino corroso", "Cliente chiede preventivo cucina"]);
  const [noteVal, setNoteVal] = useState("");
  var oraLive = useOraItaliana();

  var lavori = [
    { id: 1, cl: "Marco Bianchi", tel: "3391234567", ind: "Via Nazionale 42, Teramo", tipo: "Ristrutturazione bagno", st: "in_corso", ora: "08:30", prog: 65, mat: ["Piastrelle 60x60", "Colla Mapei", "Stucco"], note: "Piano terra, citofono rotto" },
    { id: 2, cl: "Anna Russo", tel: "3479876543", ind: "Corso San Giorgio 8, Teramo", tipo: "Impianto elettrico", st: "programmato", ora: "14:00", prog: 0, mat: ["Cavo 2.5mm", "Scatole 503"], note: "" },
  ];
  var domani = [{ id: 5, cl: "Roberto Sala", ind: "Via Trento 3, Teramo", tipo: "Posa pavimento", ora: "09:00" }];

  var sett = [
    { g: "Lun 7", today: true, lavori: [{ o: "08:30", t: "Ristrutturaz. bagno", c: "M. Bianchi", i: "Via Nazionale 42", tel: "3391234567" }, { o: "14:00", t: "Imp. elettrico", c: "A. Russo", i: "Corso San Giorgio 8", tel: "3479876543" }] },
    { g: "Mar 8", lavori: [{ o: "09:00", t: "Posa pavimento", c: "R. Sala", i: "Via Trento 3", tel: "3405556677" }] },
    { g: "Mer 9", lavori: [{ o: "08:00", t: "Sost. caldaia", c: "S. Colombo", i: "Piazza Martiri 12", tel: "3498889900" }] },
    { g: "Gio 10", lavori: [] },
    { g: "Ven 11", lavori: [{ o: "09:00", t: "Manutenzione", c: "E. Ferretti", i: "Viale Bovio 45", tel: "3281112233" }] },
  ];

  function addNote() { if (noteVal.trim()) { setNotes([noteVal].concat(notes)); setNoteVal(""); } }

  var content = null;

  if (tab === "agenda") {
    content = (
      <div>
        <Sec text={"Oggi \u2014 " + lavori.length + " lavori"} />
        {lavori.map(function(l) {
          return (
            <div key={l.id} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 14, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, fontWeight: 700, color: C.pri }}>{l.ora}</span><StatoPill stato={l.st} /></div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{l.tipo}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{l.cl}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>{l.ind}</div>
              {l.prog > 0 && l.prog < 100 && <div style={{ marginBottom: 8 }}><PBar value={l.prog} /></div>}
              {l.note && <div style={{ fontSize: 10, color: C.amber, background: C.amberSoft, padding: "5px 8px", borderRadius: 6, marginBottom: 8 }}>{l.note}</div>}
              {l.mat.length > 0 && <div style={{ borderTop: "1px solid " + C.border, paddingTop: 6, marginBottom: 8 }}><div style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginBottom: 4 }}>Materiali</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{l.mat.map(function(m, i) { return <span key={i} style={{ background: C.surface, padding: "3px 8px", borderRadius: 6, fontSize: 10 }}>{m}</span>; })}</div></div>}
              <div style={{ display: "flex", gap: 6 }}>
                <a href={"https://maps.google.com/?q=" + encodeURIComponent(l.ind)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: 10, borderRadius: 10, border: "1.5px solid " + C.green, background: C.greenSoft, color: C.green, fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>Naviga</a>
                <button style={{ flex: 1, padding: 10, borderRadius: 10, border: "1.5px solid " + C.pri, background: C.priSoft, color: C.pri, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Completato</button>
              </div>
            </div>
          );
        })}
        <Sec text="Domani" />
        {domani.map(function(l) { return <div key={l.id} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: "8px 12px", opacity: 0.6 }}><div style={{ fontSize: 11, color: C.muted }}>{l.ora}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{l.tipo}</div><div style={{ fontSize: 10, color: C.muted }}>{l.ind}</div></div>; })}
      </div>
    );
  }

  if (tab === "sett") {
    content = (
      <div>
        {sett.map(function(d, i) {
          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: d.today ? C.pri : C.muted, marginBottom: 6 }}>
                {d.g}{d.lavori.length > 0 ? <span style={{ fontSize: 10, fontWeight: 600, background: C.priSoft, color: C.pri, padding: "2px 7px", borderRadius: 10, marginLeft: 8 }}>{d.lavori.length}</span> : <span style={{ fontWeight: 400, color: C.muted }}> \u2014 Libero</span>}
              </div>
              {d.lavori.map(function(l, j) {
                return (
                  <div key={j} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "8px 12px", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.pri, minWidth: 36 }}>{l.o}</span><span style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>{l.t}</span></div>
                    <div style={{ fontSize: 10, color: C.muted, paddingLeft: 44 }}>{l.c + " \u00B7 " + l.i}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4, paddingLeft: 44 }}>
                      <a href={"tel:" + l.tel} style={{ fontSize: 10, color: C.green, fontWeight: 600, textDecoration: "none" }}>Chiama</a>
                      <span style={{ color: C.border }}>\u00B7</span>
                      <a href={"https://maps.google.com/?q=" + encodeURIComponent(l.i)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: C.blue, fontWeight: 600, textDecoration: "none" }}>Naviga</a>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  if (tab === "ai") content = <ChatIA context="operatore" />;

  if (tab === "note") {
    content = (
      <div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <input value={noteVal} onChange={function(e) { setNoteVal(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") addNote(); }} placeholder="Scrivi un appunto..." style={{ flex: 1, padding: "9px 10px", borderRadius: 8, border: "1px solid " + C.border, fontSize: 13, outline: "none", background: C.card, boxSizing: "border-box" }} />
          <button onClick={addNote} style={{ padding: "9px 14px", borderRadius: 8, background: C.pri, color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+</button>
        </div>
        <div style={{ background: C.amberSoft, padding: "6px 10px", borderRadius: 8, marginBottom: 10, fontSize: 10, color: C.amber }}>Le note vengono inviate al titolare</div>
        {notes.map(function(n, i) { return <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "9px 12px", marginBottom: 6, fontSize: 12, lineHeight: 1.5 }}>{n}</div>; })}
      </div>
    );
  }

  return (
    <div style={{ width: 340, borderRadius: 32, border: "6px solid #1A1A18", background: C.bg, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,.18)", height: 700 }}>
      <div style={{ height: 24, background: "#1A1A18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div style={{ width: 70, height: 4, borderRadius: 2, background: "#333" }} /></div>
      <div style={{ background: C.card, borderBottom: "1px solid " + C.border, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>iO</div>
        <span style={{ fontSize: 11, color: C.muted }}>Lun 7 apr \u00B7 14:32</span>
      </div>
      <div style={{ flex: 1, padding: "10px 12px", overflowY: "auto" }}>{content}</div>
      <div style={{ background: C.card, borderTop: "1px solid " + C.border, display: "flex", padding: "5px 0 10px", flexShrink: 0 }}>
        {[{id:"agenda",e:"\uD83D\uDCC5",l:"Agenda"},{id:"sett",e:"\uD83D\uDCC6",l:"Settimana"},{id:"ai",e:"\u2728",l:"Assistente"},{id:"note",e:"\u270F\uFE0F",l:"Note"}].map(function(item) {
          var isA = tab === item.id;
          var col = isA ? (item.id === "ai" ? C.purple : C.green) : C.muted;
          return <button key={item.id} onClick={function() { setTab(item.id); }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, border: "none", background: "none", cursor: "pointer", padding: "4px 0" }}><span style={{ fontSize: 16 }}>{item.e}</span><span style={{ fontSize: 8, fontWeight: isA ? 700 : 400, color: col }}>{item.l}</span></button>;
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════
   APP ROOT
   ═══════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState("login");

  if (screen === "login") return <LoginScreen onLogin={function(mode) { setScreen(mode === "titolare" ? "tit" : "op"); }} />;

  if (screen === "tit") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: '"DM Sans",system-ui,sans-serif', display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ textAlign: "center" }}>
          <TitolarePhone onLogout={function() { setScreen("login"); }} />
          <button onClick={function() { setScreen("login"); }} style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid " + C.border, background: C.card, fontSize: 11, color: C.muted, cursor: "pointer" }}>Torna al login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: '"DM Sans",system-ui,sans-serif', display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ textAlign: "center" }}>
        <OperatorePhone onLogout={function() { setScreen("login"); }} />
        <button onClick={function() { setScreen("login"); }} style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid " + C.border, background: C.card, fontSize: 11, color: C.muted, cursor: "pointer" }}>Torna al login</button>
      </div>
    </div>
  );
}
