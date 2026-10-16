/* ============================================================
   Portfolio examples. Every brand here is FICTIONAL, and every
   card carries a visible badge saying so (see app.js).
   Each card: cat, f (format class), brand, type {sr,en}, html().
   Styles live in primjeri.css. L(), t() and lang come from app.js.
   Brands: Forma Studio (gym), Aurelia Residence (real estate),
   Čisto+ (cleaning), Kodbaza (IT), Žar Burger (street food),
   Mlin Kafa (café), Atelje Vera (fashion), Lex Partneri (law),
   Zvuk Ljeta (festival), Lumen Estetika (clinic), Nord Auto (cars)
   ============================================================ */

const STAR = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
const stars = () => `<div class="stars">${STAR.repeat(5)}</div>`;
const MONTHS = { sr: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] };
const fmt = (n) => n.toLocaleString(lang === "sr" ? "de-DE" : "en-US"); // de-DE gives 1.200, as written locally
const rep = (s, n) => Array(n).fill(s).join("");
const ILLU = () => L({ sr: "Ilustrativni podaci za prikaz šablona izvještaja.", en: "Illustrative data showing our report template." });

// Single-series line chart with hover/focus tooltips.
function lineChart(values, color, unit) {
  const W = 300, H = 160, max = Math.ceil(Math.max(...values) / 1000) * 1000;
  const x = (i) => (i / (values.length - 1)) * W;
  const y = (v) => H - (v / max) * H;
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const grid = [0, .5, 1].map((g) => `<line x1="0" x2="${W}" y1="${H - g * H}" y2="${H - g * H}" vector-effect="non-scaling-stroke"/>`).join("");
  const pts = values.map((v, i) => `<button class="pt-b" style="left:${(x(i) / W) * 100}%;top:${(y(v) / H) * 100}%" data-tip="${MONTHS[lang][i]} · ${fmt(v)} ${unit}" aria-label="${MONTHS[lang][i]}: ${fmt(v)} ${unit}"><i style="background:${color}"></i></button>`).join("");
  const axis = MONTHS[lang].map((m, i) => `<span style="left:${(x(i) / W) * 100}%">${m}</span>`).join("");
  return `<div class="r-chart"><svg class="lc" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><g class="grid">${grid}</g>
    <path class="area" fill="${color}" d="${d} L${W},${H} L0,${H} Z"/><path class="ln" stroke="${color}" d="${d}" pathLength="1" vector-effect="non-scaling-stroke"/></svg>
    ${pts}<div class="x-axis">${axis}</div><div class="tip"></div></div>`;
}
function barChart(values, color, unit) {
  const max = Math.max(...values) * 1.1;
  return `<div class="r-chart bars">${values.map((v, i) => `<button class="b-col" data-tip="${MONTHS[lang][i]} · ${fmt(v)} ${unit}" aria-label="${MONTHS[lang][i]}: ${fmt(v)} ${unit}">
    <i class="bar" style="height:${(v / max) * 100}%;background:${color};animation-delay:${i * .08}s"></i><span>${MONTHS[lang][i]}</span></button>`).join("")}<div class="tip"></div></div>`;
}
const spark = (pts) => `<svg viewBox="0 0 100 30" preserveAspectRatio="none"><path pathLength="1" d="M${pts.map((p, i) => `${i * (100 / (pts.length - 1))},${30 - p}`).join(" L")}"/></svg>`;

window.PRIMJERI = [

  /* ============================ REELS ============================ */
  { cat: "reels", f: "f-916", brand: "Forma Studio", type: { sr: "Reel · kinetička tipografija", en: "Reel · kinetic type" },
    html: () => { const m = (s) => `<span>${rep(s, 4)}</span><span>${rep(s, 4)}</span>`; return `<div class="d rf grain">
      <div class="segs"><i></i><i></i><i></i></div>
      <div class="mq m1">${m(L({ sr: "TRENIRAJ • ", en: "TRAIN • " }))}</div><div class="mq m2">${m("FORMA STUDIO • ")}</div>
      <div class="center"><b>${L({ sr: "JAČE.", en: "STRONGER." })}</b><b>${L({ sr: "BRŽE.", en: "FASTER." })}</b><b>${L({ sr: "TVOJE.", en: "YOURS." })}</b></div>
      <div class="mq m3">${m(L({ sr: "BEZ IZGOVORA • ", en: "NO EXCUSES • " }))}</div><div class="mq m4">${m("FORMA STUDIO • ")}</div>
      <div class="foot"><b>FORMA</b><span>${L({ sr: "Novi termini od ponedjeljka", en: "New classes from Monday" })}</span></div></div>`; } },

  { cat: "reels", f: "f-916", brand: "Aurelia Residence", type: { sr: "Reel · arhitektonski nacrt", en: "Reel · blueprint" },
    html: () => `<div class="d rb">
      <div class="top"><span>AURELIA · A4</span><span>1:100</span></div>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path class="w" pathLength="1" d="M5 5 H95 V95 H5 Z"/>
        <path class="w" pathLength="1" d="M5 58 H28 M36 58 H58 M58 5 V24 M58 32 V95 M40 58 V95 M58 52 H72 M80 52 H95"/>
        <path class="w t" pathLength="1" d="M28 58 A8 8 0 0 1 36 50 M36 58 V50 M58 32 A8 8 0 0 0 66 24 M58 24 H66 M70 12 H88 V38 H70 Z M70 18 H88 M10 40 H40 V48 H10 Z M18 26 A6 6 0 1 0 30 26 A6 6 0 1 0 18 26 M8 62 H34 V68 H8 Z M44 80 H54 V92 H44 Z"/>
        <path class="w dash" d="M58 72 H95"/>
        <text x="10" y="18">${L({ sr: "DNEVNI BORAVAK", en: "LIVING ROOM" })}</text><text class="s" x="10" y="22">32 m²</text>
        <text x="63" y="46">${L({ sr: "SPAVAĆA", en: "BEDROOM" })}</text><text class="s" x="63" y="50">14 m²</text>
        <text x="8" y="78">${L({ sr: "KUHINJA", en: "KITCHEN" })}</text><text class="s" x="8" y="82">11 m²</text>
        <text x="62" y="64">${L({ sr: "GARDEROBA", en: "WARDROBE" })}</text>
        <text x="64" y="86">${L({ sr: "TERASA", en: "TERRACE" })}</text><text class="s" x="64" y="90">9 m²</text>
      </svg>
      <div class="compass">N</div>
      <div class="title"><h4>${L({ sr: "Stan A4.<br>78 m² svjetla.", en: "Apartment A4.<br>78 m² of light." })}</h4><p>${L({ sr: "AURELIA RESIDENCE · USELJENJE 2027", en: "AURELIA RESIDENCE · MOVE IN 2027" })}</p></div></div>` },

  { cat: "reels", f: "f-916", brand: "Čisto+", type: { sr: "Reel · prije i poslije", en: "Reel · before & after" },
    html: () => `<div class="d rc">
      <div class="before"><div class="tiles"></div></div>
      <div class="after"><div class="tiles"></div>
        <i class="spark" style="left:30%;top:28%">✦</i><i class="spark" style="left:62%;top:40%;animation-delay:.6s">✦</i><i class="spark" style="left:44%;top:60%;animation-delay:1.2s">✦</i></div>
      <div class="handle"></div>
      <span class="lbl a">${L({ sr: "PRIJE", en: "BEFORE" })}</span><span class="lbl b">${L({ sr: "POSLIJE", en: "AFTER" })}</span>
      <div class="panel"><b>čisto<i>+</i></b><p>${L({ sr: "Generalno čišćenje stanova i poslovnih prostora.", en: "Deep cleaning for homes and offices." })}</p></div></div>` },

  { cat: "reels", f: "f-916", brand: "Kodbaza", type: { sr: "Reel · rezultat u brojkama", en: "Reel · result in numbers" },
    html: () => `<div class="d rk grain"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>
      <span class="chip">CASE STUDY</span>
      <div class="glass"><small>${L({ sr: "BRZINA NOVOG SAJTA", en: "NEW SITE SPEED" })}</small><b class="num"></b>
        <p>${L({ sr: "učitavanje 4,8 s → 1,1 s", en: "load time 4.8 s → 1.1 s" })}</p>${spark([4, 6, 5, 9, 12, 11, 17, 22, 26])}</div>
      <div class="logo"><i>{</i>kodbaza<i>}</i></div></div>` },

  { cat: "reels", f: "f-916", brand: "Žar Burger", type: { sr: "Reel · retro kolaž", en: "Reel · retro collage" },
    html: () => `<div class="d rz grain"><div class="rays"></div><div class="dots"></div>
      <h4>${L({ sr: "DUPLI<br>ŽAR", en: "DOUBLE<br>ŽAR" })}</h4>
      <div class="stk s1">${L({ sr: "NOVO!", en: "NEW!" })}</div><div class="stk s2">${L({ sr: "SAMO OVAJ VIKEND", en: "THIS WEEKEND ONLY" })}</div>
      <div class="burger"><i class="bun-t"></i><i class="let"></i><i class="che"></i><i class="pat"></i><i class="che"></i><i class="pat"></i><i class="bun-b"></i></div>
      <div class="foot"><b>ŽAR BURGER</b><span>${L({ sr: "naruči u DM", en: "order via DM" })}</span></div></div>` },

  { cat: "reels", f: "f-916", brand: "Mlin Kafa", type: { sr: "Reel · titlovi", en: "Reel · captions" },
    html: () => `<div class="d rm"><div class="scene"></div>
      <i class="bok" style="left:8%;top:12%;width:14cqw;height:14cqw;background:rgba(255,200,140,.35)"></i>
      <i class="bok" style="right:10%;top:20%;width:10cqw;height:10cqw;background:rgba(255,220,170,.3);animation-delay:1s"></i>
      <i class="bok" style="left:20%;top:40%;width:8cqw;height:8cqw;background:rgba(255,180,120,.3);animation-delay:2s"></i>
      <div class="cup"></div>
      <div class="caps">
        <div class="cap">${L({ sr: "Ovako <mark>pravimo</mark><br>naš flat white", en: "This is how<br>we <mark>make</mark> it" })}</div>
        <div class="cap">${L({ sr: "<mark>Polako.</mark><br>Sa pažnjom.", en: "<mark>Slowly.</mark><br>With care." })}</div>
        <div class="cap">${L({ sr: "Svako jutro<br>od <mark>7 h</mark>", en: "Every morning<br>from <mark>7 am</mark>" })}</div>
      </div>
      <div class="ui"><svg viewBox="0 0 24 24" class="h"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M22 3L11 13M22 3l-7 19-4-9-9-4z"/></svg></div>
      <div class="who"><i></i>mlin.kafa <span>${L({ sr: "Prati", en: "Follow" })}</span></div>
      <div class="desc">${L({ sr: "Jutro počinje ovdje. ☕", en: "Mornings start here. ☕" })}</div>
      <div class="bar"></div></div>` },

  /* ============================ POSTS ============================ */
  { cat: "posts", f: "f-45", brand: "Atelje Vera", type: { sr: "Post · naslovnica magazina", en: "Post · magazine cover" },
    html: () => `<div class="d pv grain">
      <div class="mast">VERA</div>
      <div class="issue"><span>${L({ sr: "BROJ 07", en: "ISSUE 07" })}</span><span>${L({ sr: "JESEN · ZIMA", en: "AUTUMN · WINTER" })}</span><span>ATELJE</span></div>
      <div class="arch"></div>
      <div class="script">${L({ sr: "Jesen", en: "Autumn" })}</div>
      <div class="lines"><b>${L({ sr: "Nova kolekcija", en: "The new collection" })}</b>${L({ sr: "12 komada koje ćete nositi godinama", en: "12 pieces you’ll wear for years" })}</div>
      <div class="bc"><i></i><span>07</span></div></div>` },

  { cat: "posts", f: "f-45", brand: "Lex Partneri", type: { sr: "Post · švicarski grid", en: "Post · Swiss grid" },
    html: () => `<div class="d pl"><div class="rules"></div>
      <div class="para">§</div>
      <div class="hd"><span>LEX PARTNERI</span><i class="sq"></i></div>
      <div class="no">03</div>
      <div class="tx">${L({ sr: "Ugovor ne mora biti dugačak. <em>Mora biti jasan.</em>", en: "A contract doesn’t need to be long. <em>It needs to be clear.</em>" })}</div>
      <div class="ft"><span>${L({ sr: "PRAVNI SAVJET SEDMICE", en: "LEGAL TIP OF THE WEEK" })}</span><span>03 / 12</span></div></div>` },

  { cat: "posts", f: "f-45", brand: "Zvuk Ljeta", type: { sr: "Post · festivalski poster", en: "Post · festival poster" },
    html: () => `<div class="d pz grain"><div class="sun"></div>
      <h4>${L({ sr: "Zvuk<br>ljeta", en: "Sound of<br>summer" })}</h4>
      <span class="tag">${L({ sr: "FESTIVAL · 3 DANA", en: "FESTIVAL · 3 DAYS" })}</span>
      <div class="date">12—14.07</div>
      <div class="meta"><span>${L({ sr: "18 izvođača", en: "18 artists" })}</span><span>${L({ sr: "Ulaznice uskoro", en: "Tickets soon" })}</span></div></div>` },

  { cat: "posts", f: "f-45", brand: "Kodbaza", type: { sr: "Post · staklo i kod", en: "Post · glass & code" },
    html: () => `<div class="d pk grain">
      <h4>${L({ sr: "Zapošljavamo.", en: "We’re hiring." })}</h4>
      <div class="code"><div class="dotsw"><i></i><i></i><i></i></div><span class="k">const</span> tim = <span class="s">"kodbaza"</span>;
tim.<span class="f">${L({ sr: "zaposli", en: "hire" })}</span>({
  ${L({ sr: "pozicija", en: "role" })}: <span class="s">"Frontend"</span>,
  remote: <span class="b">true</span>
});<span class="cur"></span></div>
      <div class="chips"><span>React</span><span>TypeScript</span><span>${L({ sr: "Prijavi se →", en: "Apply →" })}</span></div></div>` },

  { cat: "posts", f: "f-45", brand: "Žar Burger", type: { sr: "Post · brutalizam", en: "Post · brutalism" },
    html: () => `<div class="d pb"><div class="frame">
      <div class="hd"><b>ŽAR</b><span>${L({ sr: "MENI<br>OVE<br>SEDMICE", en: "MENU<br>THIS<br>WEEK" })}</span></div>
      <ul><i class="hl"></i>
        <li><span>${L({ sr: "DUPLI ŽAR", en: "DOUBLE ŽAR" })}</span><span>12 KM</span></li>
        <li><span>${L({ sr: "LJUTI ŽAR", en: "HOT ŽAR" })}</span><span>11 KM</span></li>
        <li><span>${L({ sr: "KLASIK", en: "CLASSIC" })}</span><span>9 KM</span></li>
        <li><span>${L({ sr: "POMFRIT", en: "FRIES" })}</span><span>4 KM</span></li>
        <li><span>${L({ sr: "LIMUNADA", en: "LEMONADE" })}</span><span>4 KM</span></li>
      </ul></div><div class="stamp">${L({ sr: "NOVO", en: "NEW" })}</div></div>` },

  { cat: "posts", f: "f-45", brand: "Lumen Estetika", type: { sr: "Post · mekani minimalizam", en: "Post · soft minimal" },
    html: () => `<div class="d ps"><div class="frame"><i class="ring"></i><i class="orb"></i></div>
      <h4>${L({ sr: "Koža koja diše.", en: "Skin that breathes." })}</h4>
      <div class="chips"><span>${L({ sr: "Konsultacije", en: "Consultations" })}</span><span>${L({ sr: "Tretmani", en: "Treatments" })}</span><span>${L({ sr: "Njega", en: "Care" })}</span></div>
      <div class="brand">LUMEN ESTETIKA</div></div>` },

  /* ========================== CAROUSELS ========================== */
  { cat: "carousels", f: "f-45", brand: "Lex Partneri", type: { sr: "Karusel · mit i činjenica", en: "Carousel · myth vs fact" },
    html: () => `<div class="d kl"><div class="k-wrap">
      <div class="sl c1"><h4>${L({ sr: "3 mita o ugovorima", en: "3 myths about contracts" })}</h4><p>${L({ sr: "PREVUCITE →", en: "SWIPE →" })}</p></div>
      <div class="sl c2"><span class="tag"><i>✕</i>${L({ sr: "MIT", en: "MYTH" })}</span><h5>${L({ sr: "Što je ugovor duži, to je sigurniji.", en: "The longer the contract, the safer it is." })}</h5></div>
      <div class="sl c3"><span class="tag"><i>✓</i>${L({ sr: "ČINJENICA", en: "FACT" })}</span><h5>${L({ sr: "Siguran je ugovor koji obje strane razumiju.", en: "A safe contract is one both sides understand." })}</h5></div>
      <div class="sl c4"><h5>${L({ sr: "Pitajte nas prije potpisa.", en: "Ask us before you sign." })}</h5><span class="btn2">${L({ sr: "Zakažite konsultacije", en: "Book a consultation" })}</span><span class="brand">LEX PARTNERI</span></div>
    </div><div class="k-dots"><i></i><i></i><i></i><i></i></div></div>` },

  { cat: "carousels", f: "f-45", brand: "Čisto+", type: { sr: "Karusel · čeklista", en: "Carousel · checklist" },
    html: () => { const prog = (n) => `<div class="prog"><span>${L({ sr: "Korak", en: "Step" })} ${n}/3</span><span>čisto+</span><i style="--p:${n * 33.3}%"></i></div>`; return `<div class="d kc"><div class="k-wrap">
      <div class="sl c1"><h4>${L({ sr: "Selite se?<br><i>Bez stresa.</i>", en: "Moving?<br><i>No stress.</i>" })}</h4><p>${L({ sr: "3 koraka do čistog stana na dan useljenja.", en: "3 steps to a clean flat on moving day." })}</p></div>
      <div class="sl">${prog(1)}<h5>${L({ sr: "Prije pakovanja", en: "Before packing" })}</h5><ul><li><i></i>${L({ sr: "Isprazni ormare", en: "Empty the wardrobes" })}</li><li><i></i>${L({ sr: "Odvoji stvari za bacanje", en: "Sort out what to throw away" })}</li><li><i></i>${L({ sr: "Fotografiši stanje", en: "Photograph the state" })}</li></ul></div>
      <div class="sl">${prog(2)}<h5>${L({ sr: "Dan selidbe", en: "Moving day" })}</h5><ul><li><i></i>${L({ sr: "Otvori prozore", en: "Open the windows" })}</li><li><i></i>${L({ sr: "Isključi frižider", en: "Unplug the fridge" })}</li><li><i></i>${L({ sr: "Pozovi nas", en: "Call us" })}</li></ul></div>
      <div class="sl c4"><h5>${L({ sr: "Ostalo prepustite nama.", en: "Leave the rest to us." })}</h5><p>${L({ sr: "Pišite nam u poruke za termin.", en: "Message us to book a slot." })}</p></div>
    </div><div class="k-dots"><i></i><i></i><i></i><i></i></div></div>`; } },

  { cat: "carousels", f: "f-45", brand: "Mlin Kafa", type: { sr: "Karusel · polaroidi", en: "Carousel · polaroids" },
    html: () => { const pol = (cls, r, name, role) => `<div class="sl"><div class="pol" style="--r:${r}"><i class="tape"></i><div class="ph ${cls}"></div><div class="cap">${name}<small>${role}</small></div></div></div>`; return `<div class="d km"><div class="k-wrap">
      <div class="sl c1"><div><h4>${L({ sr: "Upoznajte<br>ljude iza šanka", en: "Meet the people<br>behind the bar" })}</h4><p>MLIN KAFA</p></div></div>
      ${pol("a", "-3deg", L({ sr: "naš flat white", en: "our flat white" }), L({ sr: "svako jutro isto dobar", en: "just as good every morning" }))}
      ${pol("b", "2deg", L({ sr: "Ime, barista", en: "Name, barista" }), L({ sr: "ovdje ide pravo ime", en: "a real name goes here" }))}
      ${pol("c", "-2deg", L({ sr: "naš kutak", en: "our corner" }), L({ sr: "vidimo se?", en: "see you there?" }))}
    </div><div class="k-dots"><i></i><i></i><i></i><i></i></div></div>`; } },

  { cat: "carousels", f: "f-45", brand: "Nord Auto", type: { sr: "Karusel · savjeti", en: "Carousel · tips" },
    html: () => { const s = (n, h, p) => `<div class="sl"><span class="bn">${n}</span><span class="k">NORD AUTO</span><h5>${h}</h5><p>${p}</p></div>`; return `<div class="d kn"><div class="k-wrap">
      ${s("?", L({ sr: "Kupujete polovno auto?", en: "Buying a used car?" }), L({ sr: "Tri stvari koje uvijek provjeravamo. Prevucite →", en: "Three things we always check. Swipe →" }))}
      ${s("1", L({ sr: "Servisna knjiga.", en: "Service book." }), L({ sr: "Tražite je uvijek, i pečate u njoj.", en: "Always ask for it, stamps included." }))}
      ${s("2", L({ sr: "Hladan start.", en: "Cold start." }), L({ sr: "Motor slušajte ujutro, prije vožnje.", en: "Listen to the engine in the morning." }))}
      ${s("3", L({ sr: "Test vožnja.", en: "Test drive." }), L({ sr: "Grad i autoput. Oba.", en: "City and highway. Both." }))}
    </div><div class="k-dots"><i></i><i></i><i></i><i></i></div></div>`; } },

  /* =========================== RESULTS =========================== */
  { cat: "results", f: "f-45", brand: "Aurelia Residence", type: { sr: "Izvještaj · rast pratilaca", en: "Report · follower growth" }, badge: "badge.example",
    html: () => `<div class="d res">
      <div class="r-head"><div class="r-title">${L({ sr: "Pratioci na Instagramu", en: "Instagram followers" })}</div><div class="r-brand">6 ${L({ sr: "mjeseci", en: "months" })}</div></div>
      <div class="r-big">${fmt(4300)}</div><div class="r-delta">↑ ${fmt(3100)} ${L({ sr: "od januara", en: "since January" })}</div>
      ${lineChart([1200, 1450, 1900, 2600, 3400, 4300], "#2c5141", L({ sr: "pratilaca", en: "followers" }))}
      <div class="foot">${ILLU()}</div></div>` },

  { cat: "results", f: "f-45", brand: "Nord Auto", type: { sr: "Izvještaj · upiti", en: "Report · enquiries" }, badge: "badge.example",
    html: () => `<div class="d res">
      <div class="r-head"><div class="r-title">${L({ sr: "Upiti za test vožnju", en: "Test-drive enquiries" })}</div><div class="r-brand">${L({ sr: "mjesečno", en: "monthly" })}</div></div>
      <div class="r-big">64</div><div class="r-delta">↑ 46 ${L({ sr: "više nego u januaru", en: "more than in January" })}</div>
      ${barChart([18, 22, 31, 40, 52, 64], "#0d1b2a", L({ sr: "upita", en: "enquiries" }))}
      <div class="foot">${ILLU()}</div></div>` },

  { cat: "results", f: "f-45", brand: "Žar Burger", type: { sr: "Case study · prije i poslije", en: "Case study · before & after" }, badge: "badge.example",
    html: () => `<div class="d res cs">
      <div class="r-head"><div class="r-title">${L({ sr: "Narudžbe preko poruka", en: "Orders via messages" })}</div><div class="r-brand">${L({ sr: "3 mjeseca", en: "3 months" })}</div></div>
      <div class="ba"><div class="pre"><span>${L({ sr: "PRIJE", en: "BEFORE" })}</span><b>12</b></div><div class="arr">→</div><div><span>${L({ sr: "POSLIJE", en: "AFTER" })}</span><b>47</b></div></div>
      <div class="ba-bars"><div style="width:26%">12</div><div style="width:100%">47 ${L({ sr: "sedmično", en: "per week" })}</div></div>
      <ul class="cs-list"><li class="h">${L({ sr: "ŠTA SMO URADILI", en: "WHAT WE DID" })}</li><li>${L({ sr: "Jasan meni u istaknutim pričama", en: "A clear menu in story highlights" })}</li><li>${L({ sr: "Odgovor na poruke za 15 minuta", en: "Replies to messages within 15 min" })}</li><li>${L({ sr: "Sedmični post sa novim burgerom", en: "A weekly new-burger post" })}</li></ul>
      <div class="foot">${ILLU()}</div></div>` },

  { cat: "results", f: "f-45", brand: "Kodbaza", type: { sr: "Izvještaj · cilj kampanje", en: "Report · campaign goal" }, badge: "badge.example",
    html: () => `<div class="d res ring">
      <div class="r-head"><div class="r-title">${L({ sr: "Prijave za posao", en: "Job applications" })}</div><div class="r-brand">${L({ sr: "cilj 500", en: "goal 500" })}</div></div>
      <div class="gauge"><svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="42"/><circle class="fg" cx="50" cy="50" r="42" pathLength="100"/></svg>
        <div class="val"><div><b></b><span>${L({ sr: "410 od 500", en: "410 of 500" })}</span></div></div></div>
      <div class="legend"><span><i></i>${L({ sr: "ostvareno", en: "achieved" })}</span><span><i class="o"></i>${L({ sr: "preostalo", en: "remaining" })}</span></div>
      <div class="foot">${ILLU()}</div></div>` },

  { cat: "results", f: "f-45", brand: "Mlin Kafa", type: { sr: "Izvještaj · pregled mjeseca", en: "Report · monthly overview" }, badge: "badge.example",
    html: () => `<div class="d res dark">
      <div class="r-head"><div class="r-title">${L({ sr: "Pregled mjeseca", en: "Monthly overview" })}</div><div class="r-brand">${L({ sr: "Jun", en: "June" })}</div></div>
      <div class="kpis">
        <div class="kpi"><b>${fmt(48200)}</b><span>${L({ sr: "doseg", en: "reach" })}</span>${spark([5, 8, 7, 12, 15, 14, 22, 26])}</div>
        <div class="kpi"><b>${lang === "sr" ? "6,8%" : "6.8%"}</b><span>${L({ sr: "angažman", en: "engagement" })}</span>${spark([10, 12, 9, 14, 13, 17, 16, 20])}</div>
        <div class="kpi"><b>${fmt(1130)}</b><span>${L({ sr: "sačuvanih objava", en: "saves" })}</span>${spark([3, 4, 8, 7, 11, 16, 18, 24])}</div>
        <div class="kpi"><b>212</b><span>${L({ sr: "poruka", en: "messages" })}</span>${spark([6, 5, 9, 10, 9, 14, 19, 21])}</div>
      </div><div class="foot">${ILLU()}</div></div>` },

  /* =========================== REVIEWS =========================== */
  { cat: "reviews", f: "f-45", brand: "Lumen Estetika", type: { sr: "Šablon · citat", en: "Template · quote" }, badge: "badge.template",
    html: () => `<div class="d rv1"><span class="q">“</span>${stars()}
      <blockquote>${L({ sr: "Ovdje ide pravi utisak vaše klijentkinje, ispisan u stilu vašeg brenda.", en: "Your client’s real words go here, set in your brand’s style." })}</blockquote>
      <div class="who"><i></i><div><b>${L({ sr: "Ime Prezime", en: "Client Name" })}</b>${L({ sr: "klijentkinja", en: "client" })}</div></div></div>` },

  { cat: "reviews", f: "f-45", brand: "Mlin Kafa", type: { sr: "Šablon · poruka", en: "Template · message" }, badge: "badge.template",
    html: () => `<div class="d rv2">
      <div class="top"><i>M</i><div><b>mlin.kafa</b><small>${L({ sr: "aktivni sada", en: "active now" })}</small></div></div>
      <div class="msgs">
        <div class="m in">${L({ sr: "Ovdje ide prava poruka gosta ☕", en: "A guest’s real message goes here ☕" })}</div>
        <div class="m in">${L({ sr: "…onako kako ju je napisao.", en: "…exactly as they wrote it." })}</div>
        <div class="m out">${L({ sr: "Hvala vam, vidimo se sutra!", en: "Thank you, see you tomorrow!" })}<span class="heart">❤️</span></div>
        <div class="typing"><i></i><i></i><i></i></div>
      </div></div>` },

  { cat: "reviews", f: "f-45", brand: "Žar Burger", type: { sr: "Šablon · ocjene", en: "Template · ratings" }, badge: "badge.template",
    html: () => `<div class="d rv3">
      <div class="score"><b>${lang === "sr" ? "4,9" : "4.9"}</b><div>${stars()}<small>${L({ sr: "broj recenzija · primjer", en: "number of reviews · example" })}</small></div></div>
      <div class="dist">${[[5, 88], [4, 9], [3, 2], [2, 1], [1, 0]].map(([s, w]) => `<div>${s}★<i style="--w:${w}%"></i></div>`).join("")}</div>
      <div class="snip">${L({ sr: "„Kratak, iskren citat gosta ide ovdje.“", en: "“A short, honest guest quote goes here.”" })}<b>${L({ sr: "— Ime Prezime", en: "— Guest Name" })}</b></div></div>` },

  { cat: "reviews", f: "f-45", brand: "Forma Studio", type: { sr: "Šablon · video izjava", en: "Template · video testimonial" }, badge: "badge.template",
    html: () => `<div class="d rv4"><div class="vid"></div><div class="person"></div><div class="play"></div>
      <div class="rec"><i></i>${L({ sr: "IZJAVA", en: "TESTIMONIAL" })}</div>
      <div class="lower"><span class="sub">${L({ sr: "„Ovdje idu titlovi prave izjave člana.“", en: "“Subtitles of a member’s real words go here.”" })}</span>
        <div class="name"><b>${L({ sr: "IME PREZIME", en: "MEMBER NAME" })}</b><span>${L({ sr: "član Forma Studija", en: "Forma Studio member" })}</span></div></div></div>` },

  { cat: "reviews", f: "f-45", brand: "Atelje Vera", type: { sr: "Šablon · rukom pisano", en: "Template · handwritten" }, badge: "badge.template",
    html: () => `<div class="d rv5"><div class="paper"><i class="tape l"></i><i class="tape r"></i>
      <p>${L({ sr: "Ovdje ide rukom pisana poruka kupca, slikana i prenesena u objavu", en: "A customer’s handwritten note goes here, photographed and turned into a post" })} <span class="heart">♥</span></p>
      <div class="sig">— ${L({ sr: "Ime", en: "Name" })}</div><span class="brand">VERA</span></div></div>` },

  /* =========================== BRANDING =========================== */
  { cat: "branding", f: "f-45", brand: "Aurelia Residence", type: { sr: "Logo · konstrukcija", en: "Logo · construction" },
    html: () => `<div class="d bl">
      <svg viewBox="0 0 100 80" aria-hidden="true">
        <circle class="g" cx="50" cy="42" r="30"/><circle class="g" cx="50" cy="42" r="18"/>
        <path class="g" d="M8 42 H92 M50 4 V80 M20 72 L50 12 L80 72 M14 72 H86"/>
        <path class="m" pathLength="1" d="M28 72 L50 14 L72 72"/><path class="m gold" pathLength="1" d="M37 52 Q50 40 63 52"/>
        <text x="81" y="22">r = 30</text><text x="68" y="34">r = 18</text><text x="10" y="40">${L({ sr: "osa", en: "axis" })}</text>
      </svg>
      <div class="wm">AURELIA<small>RESIDENCE</small></div>
      <div class="spec"><span>#1F3A2E</span><span>#B89B5E</span><span>Playfair Display</span></div></div>` },

  { cat: "branding", f: "f-45", brand: "Kodbaza", type: { sr: "Brend tabla", en: "Brand board" },
    html: () => `<div class="d bk">
      <div class="t1"><span><i>{</i>kodbaza<i>}</i></span></div>
      <div class="t2"><b>Aa</b><span>Space Grotesk<br>Space Mono</span></div>
      <div class="t3"><i style="background:#0b1024;color:#fff">#0B1024</i><i style="background:#6d5dfc;color:#fff">#6D5DFC</i><i style="background:#22d3ee">#22D3EE</i></div>
      <div class="t4"></div>
      <div class="t5"><svg viewBox="0 0 24 24"><path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/></svg><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8"/></svg><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg></div></div>` },

  { cat: "branding", f: "f-45", brand: "Lex Partneri", type: { sr: "Vizit karte · 3D", en: "Business cards · 3D" },
    html: () => `<div class="d bc3"><div class="stage">
      <div class="c front"><i></i><b>LEX PARTNERI</b><span>${L({ sr: "Advokatska kancelarija", en: "Law office" })}</span></div>
      <div class="c back"><em>§</em><b>${L({ sr: "Ime Prezime", en: "Full Name" })}</b><span>${L({ sr: "ADVOKAT", en: "ATTORNEY" })}<br>ime@domena.ba</span></div>
    </div></div>` },

  { cat: "branding", f: "f-45", brand: "Žar Burger", type: { sr: "Ikone i ambalaža", en: "Icons & packaging" },
    html: () => `<div class="d bz">
      <div class="app"><svg viewBox="0 0 24 24"><path fill="#ffd23f" d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 1 3 2 4 1-3 1-6 1-9z"/></svg><span class="lbl">app</span></div>
      <div class="ava">Ž<span class="lbl">${L({ sr: "profilna", en: "avatar" })}</span></div>
      <div class="stk">${L({ sr: "NOVO!", en: "NEW!" })}</div>
      <div class="bag">ŽAR<span class="lbl">${L({ sr: "kesa", en: "bag" })}</span></div></div>` },

  { cat: "branding", f: "f-45", brand: "Mlin Kafa", type: { sr: "Ambalaža · čaša", en: "Packaging · cup" },
    html: () => `<div class="d bp grain"><span class="tag">${L({ sr: "za ponijeti", en: "to go" })}</span>
      <i class="steam a"></i><i class="steam b"></i><div class="shadow"></div>
      <div class="cup"><div class="body"></div><div class="lid"></div><div class="sleeve"><div><div class="seal"></div><b>MLIN</b></div></div></div></div>` },

  /* ============================ PRINT ============================ */
  { cat: "print", f: "f-wide", ar: "4/3", brand: "Nord Auto", type: { sr: "Bilbord · grad u sumrak", en: "Billboard · city at dusk" },
    html: () => `<div class="d pr1"><div class="city"></div><i class="leg a"></i><i class="leg b"></i>
      <div class="board"><div><div class="k">NORD AUTO</div><h4>${L({ sr: "Sigurno do<br>svakog cilja.", en: "Safely to<br>every destination." })}</h4><span class="cta">${L({ sr: "Test vožnja ove subote", en: "Test drive this Saturday" })}</span></div><div class="car"></div></div>
      <i class="lamp a"></i><i class="lamp b"></i></div>` },

  { cat: "print", f: "f-a4", brand: "Žar Burger", type: { sr: "Meni · A4", en: "Menu · A4" },
    html: () => { const it = (n, d, p) => `<div class="it"><span>${n}<small>${d}</small></span><em>${p}</em></div>`; return `<div class="d pr2">
      <div class="hd"><b>ŽAR</b><span>BURGER · ${L({ sr: "MENI", en: "MENU" })}</span><div class="stk">${L({ sr: "SVJEŽE<br>SVAKI<br>DAN", en: "FRESH<br>EVERY<br>DAY" })}</div></div>
      <h6>BURGERI</h6>
      ${it(L({ sr: "Dupli žar", en: "Double žar" }), L({ sr: "dvije pljeskavice, cheddar, luk", en: "two patties, cheddar, onion" }), "12 KM")}
      ${it(L({ sr: "Ljuti žar", en: "Hot žar" }), L({ sr: "jalapeño, ljuti sos", en: "jalapeño, hot sauce" }), "11 KM")}
      ${it(L({ sr: "Klasik", en: "Classic" }), L({ sr: "pljeskavica, salata, paradajz", en: "patty, lettuce, tomato" }), "9 KM")}
      <h6>${L({ sr: "PRILOZI", en: "SIDES" })}</h6>
      ${it(L({ sr: "Pomfrit", en: "Fries" }), L({ sr: "sa začinskom solju", en: "with seasoned salt" }), "4 KM")}
      ${it(L({ sr: "Limunada", en: "Lemonade" }), L({ sr: "domaća", en: "homemade" }), "4 KM")}
      <div class="ft"><span>@zar.burger</span><span>${L({ sr: "dostava u DM", en: "delivery via DM" })}</span></div></div>`; } },

  { cat: "print", f: "f-wide", ar: "4/3", brand: "Lumen Estetika", type: { sr: "Brošura · tri dijela", en: "Brochure · tri-fold" },
    html: () => `<div class="d pr3"><div class="shadow"></div><div class="fold">
      <div class="pn"><h5>${L({ sr: "Prije prvog tretmana", en: "Before your first treatment" })}</h5><ul><li>${L({ sr: "Besplatne konsultacije", en: "Free consultation" })}</li><li>${L({ sr: "Plan prema vašoj koži", en: "A plan for your skin" })}</li><li>${L({ sr: "Bez žurbe", en: "No rush" })}</li></ul></div>
      <div class="pn"><h5>${L({ sr: "Koža koja diše.", en: "Skin that breathes." })}</h5><p>LUMEN ESTETIKA</p><i class="orb"></i></div>
      <div class="pn"><h5>${L({ sr: "Zakažite termin", en: "Book a visit" })}</h5><p>${L({ sr: "Kontakt i radno vrijeme idu ovdje.", en: "Contact and opening hours go here." })}</p><i class="orb"></i></div>
    </div></div>` },

  { cat: "print", f: "f-a4", brand: "Aurelia Residence", type: { sr: "Katalog · naslovna", en: "Catalogue · cover" },
    html: () => `<div class="d pr4"><div class="k">AURELIA RESIDENCE</div><h4>${L({ sr: "Katalog <em>stanova</em>", en: "Apartment <em>catalogue</em>" })}</h4><div class="ph"></div><div class="ft"><span>2027</span><span>${L({ sr: "FAZA I", en: "PHASE I" })}</span></div></div>` },

  { cat: "print", f: "f-wide", ar: "4/3", brand: "Kodbaza", type: { sr: "Roll-up · sajam", en: "Roll-up · trade fair" },
    html: () => `<div class="d pr5"><i class="booth"></i><i class="booth r"></i><i class="base"></i>
      <div class="roll"><div class="lg"><i>{</i>kodbaza<i>}</i></div><h4>${L({ sr: "Softver koji traje.", en: "Software built to last." })}</h4><p>${L({ sr: "Web · aplikacije · sistemi po mjeri", en: "Web · apps · custom systems" })}</p><i class="qr"></i></div></div>` },

  /* ============================= WEB ============================= */
  { cat: "web", f: "f-wide", ar: "4/3", brand: "Aurelia + Lumen", type: { sr: "Sajt · desktop i mobilni", en: "Website · desktop & mobile" },
    html: () => `<div class="d web w1"><div class="win"><div class="bar"><i></i><i></i><i></i><span>aurelia-residence.ba</span></div>
      <div class="page"><div class="hero-w"><div class="nav-w"><span>AURELIA</span><span>${L({ sr: "STANOVI · LOKACIJA · KONTAKT", en: "HOMES · LOCATION · CONTACT" })}</span></div>
        <div class="k">${L({ sr: "USELJENJE 2027", en: "MOVE IN 2027" })}</div><h4>${L({ sr: "Dom s pogledom na rijeku.", en: "A home with a river view." })}</h4></div>
        <div class="grid-w"><div></div><div></div><div></div></div><div class="row-w"></div></div></div>
      <div class="phone"><div class="scr"><i class="c"></i><b>${L({ sr: "Koža koja<br>diše.", en: "Skin that<br>breathes." })}</b><span class="btnw">${L({ sr: "Zakaži", en: "Book" })}</span></div></div></div>` },

  { cat: "web", f: "f-wide", ar: "4/3", brand: "Atelje Vera", type: { sr: "Web shop · stranica proizvoda", en: "Web shop · product page" },
    html: () => `<div class="d web w2"><div class="win"><div class="bar"><i></i><i></i><i></i><span>atelje-vera.ba</span></div>
      <div class="pg"><div class="img"></div><div class="info">
        <small>${L({ sr: "JESEN · ZIMA", en: "AUTUMN · WINTER" })}</small><h4>${L({ sr: "Kaput Jesen", en: "The Autumn Coat" })}</h4><span class="pr">289 KM</span>
        <div class="sz"><span>S</span><span class="on">M</span><span>L</span><span>XL</span></div>
        <span class="add">${L({ sr: "Dodaj u korpu", en: "Add to bag" })}</span>
        <p>${L({ sr: "Vuna, ručno krojeno u ateljeu. Opis proizvoda ide ovdje.", en: "Wool, hand-cut in our atelier. Product description goes here." })}</p></div></div></div>
      <span class="cart">${L({ sr: "Korpa", en: "Bag" })}<i>1</i></span>
      <span class="cursor"><svg viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#111" stroke="#fff" stroke-width="1.4"/></svg></span></div>` },

  { cat: "web", f: "f-wide", ar: "4/3", brand: "Kodbaza", type: { sr: "Sajt · tamna tema", en: "Website · dark theme" },
    html: () => `<div class="d web w3"><div class="win"><div class="bar"><i></i><i></i><i></i><span>kodbaza.ba</span></div><i class="glow"></i>
      <div class="nv"><b><i>{</i>kodbaza<i>}</i></b><span>${L({ sr: "Usluge · Radovi · Tim · Kontakt", en: "Services · Work · Team · Contact" })}</span></div>
      <div class="hh"><h4>${L({ sr: "Softver koji traje.", en: "Software built to last." })}</h4><p>${L({ sr: "Web aplikacije i sistemi po mjeri za firme koje rastu.", en: "Custom web apps and systems for growing companies." })}</p>
        <div class="btns"><span>${L({ sr: "Pošaljite upit", en: "Get in touch" })}</span><span>${L({ sr: "Naši radovi", en: "Our work" })}</span></div></div>
      <div class="feat"><div><b>Web</b>${L({ sr: "brzi sajtovi", en: "fast sites" })}<i></i></div><div><b>${L({ sr: "Aplikacije", en: "Apps" })}</b>iOS · Android<i></i></div><div><b>${L({ sr: "Sistemi", en: "Systems" })}</b>${L({ sr: "po mjeri", en: "custom" })}<i></i></div></div></div></div>` },

  { cat: "web", f: "f-wide", ar: "4/3", brand: "Žar Burger", type: { sr: "Aplikacija · naručivanje", en: "App · ordering" },
    html: () => { const it = (n, p) => `<div class="it"><i></i>${n}<em>${p}</em></div>`; return `<div class="d w4">
      <div class="ph"><div class="s"><h6>ŽAR</h6><small>${L({ sr: "Šta jedemo danas?", en: "What are we eating?" })}</small><div class="chips"><span>${L({ sr: "Burgeri", en: "Burgers" })}</span><span>${L({ sr: "Prilozi", en: "Sides" })}</span></div>${it(L({ sr: "Dupli žar", en: "Double žar" }), "12")}${it(L({ sr: "Ljuti žar", en: "Hot žar" }), "11")}${it(L({ sr: "Klasik", en: "Classic" }), "9")}</div></div>
      <div class="ph"><div class="s"><h6>${L({ sr: "KORPA", en: "BAG" })}</h6>${it(L({ sr: "Dupli žar", en: "Double žar" }), "12")}${it(L({ sr: "Pomfrit", en: "Fries" }), "4")}<small>${L({ sr: "Ukupno 16 KM", en: "Total 16 KM" })}</small><span class="btn3">${L({ sr: "Naruči", en: "Order" })}</span></div></div>
      <div class="ph"><div class="s"><h6>${L({ sr: "STIŽE!", en: "ON ITS WAY!" })}</h6><div class="bigt">15 min</div><div class="track"><i></i></div>
        <div class="steps"><div><i></i>${L({ sr: "Primljeno", en: "Received" })}</div><div><i></i>${L({ sr: "Na žaru", en: "On the grill" })}</div><div><i></i>${L({ sr: "Dostava", en: "Delivery" })}</div></div></div></div></div>`; } }
];
