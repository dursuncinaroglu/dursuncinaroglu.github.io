/* =========================================================
   Dursun Çınaroğlu Balıkçılık — site davranışları
   İçerik assets/js/content.js dosyasından gelir.
   ========================================================= */
(function () {
  "use strict";
  // Başka bir site bu sayfayı çerçeve (iframe) içine gömerse kendi penceremize çık.
  // GitHub Pages X-Frame-Options / frame-ancestors başlığı veremediği için bu kontrol onların yerini tutar.
  if (window.top !== window.self) {
    try { window.top.location.replace(location.href); } catch (e) { /* üst pencereye erişilemedi */ }
    document.documentElement.textContent = "";
    return;
  }
  var S = window.SITE;
  var doc = document.documentElement;
  doc.classList.add("js");

  var IMG = "/assets/img/";
  var LANGS = ["tr", "en"];
  var lang = detectLang();
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Dil ---------------- */
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function detectLang() {
    var p = location.pathname;
    if (/^\/en(\/|$)/.test(p)) return "en";
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) > -1) return q;
    var saved = store("lang");
    if (LANGS.indexOf(saved) > -1) return saved;
    // Arama motoru botları her zaman varsayılan (TR) sürümü görsün
    if (/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)) return "tr";
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "tr"];
    return /^tr\b/i.test(prefs[0]) || prefs.some(function (l) { return /^tr\b/i.test(l); }) ? "tr" : "en";
  }
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : v.tr;
  }
  function ui(key) { return (S.i18n[lang] && S.i18n[lang][key]) || S.i18n.tr[key] || ""; }

  function syncUrl() {
    if (!/^https?:$/.test(location.protocol)) return;
    var isLocal = /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname);
    var url;
    if (isLocal) {
      var sp = new URLSearchParams(location.search);
      if (lang === "en") sp.set("lang", "en"); else sp.delete("lang");
      url = location.pathname + (sp.toString() ? "?" + sp : "") + location.hash;
    } else {
      url = (lang === "en" ? "/en/" : "/") + location.hash;
    }
    history.replaceState(null, "", url);
  }

  function applyLang() {
    doc.lang = lang;
    document.title = ui("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", ui("meta.desc"));
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.href = S.siteUrl + (lang === "en" ? "/en/" : "/");

    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = ui(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = ui(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        var p = pair.split(":"); el.setAttribute(p[0].trim(), ui(p[1].trim()));
      });
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.querySelector(".skip").textContent = lang === "en" ? "Skip to content" : "İçeriğe geç";

    document.getElementById("aboutBadge").textContent = ui("about.badge");
    renderStats(); renderGenerations(); renderSteps(); renderSpecies(); renderTuna(); renderAreas(); renderSeason();
    renderFleet(); renderEquipment(); renderQuality(); renderGalleryTabs(); renderGallery(); renderContact();
    watchVideos();
    setCaption(current);
    observeReveals();
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; store("lang", lang); syncUrl(); applyLang();
    });
  });

  /* ---------------- Yardımcılar ---------------- */
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (attrs[k] != null) el.setAttribute(k, attrs[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pic(name, sizes, alt, eager) {
    return '<img src="' + IMG + name + '-sm.webp" srcset="' + IMG + name + "-sm.webp 800w, " + IMG + name + '.webp 1920w" sizes="' + sizes + '" alt="' + esc(alt || "") + '"' + (eager ? "" : ' loading="lazy"') + ' decoding="async">';
  }
  var VID = "/assets/video/";
  // Hızlı görsel: önce küçük sürüm (genelde önbellekte), büyük sürüm gerekiyorsa arka planda gelince değiştirilir
  var preloaded = {};
  function preload(name, big) {
    var key = name + (big ? "" : "-sm");
    if (preloaded[key]) return preloaded[key];
    var im = new Image(); im.decoding = "async"; im.src = IMG + key + ".webp"; preloaded[key] = im; return im;
  }
  function needsBig(el) { return (el.clientWidth || window.innerWidth) * (window.devicePixelRatio || 1) > 820; }
  function showProgressive(el, name, isCurrent) {
    el.src = IMG + name + "-sm.webp";
    if (!needsBig(el)) return;
    var big = preload(name, true);
    var swap = function () { if (isCurrent()) el.src = big.src; };
    if (big.complete && big.naturalWidth) swap(); else big.addEventListener("load", swap, { once: true });
  }
  // Sessiz, döngülü video (ses kanalı dosyadan zaten silinmiştir)
  // Önce sabit kapak karesi görünür; video gerçekten oynamaya başlayınca üstüne yumuşakça gelir.
  // Böylece video yüklenirken kutu hiç boş/siyah kalmaz.
  function vid(name, label, eager) {
    return '<span class="vwrap"><img class="vposter" src="' + VID + name + '.webp" alt="' + esc(label || "") + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">' +
      '<video class="lazyvid" muted loop playsinline preload="none" aria-hidden="true">' +
      '<source src="' + VID + name + '.mp4" type="video/mp4"></video></span>';
  }
  function fill(id, nodes) { var el = document.getElementById(id); el.replaceChildren.apply(el, nodes); return el; }
  function fmt(n) { return n.toLocaleString(lang === "tr" ? "tr-TR" : "en-US"); }

  /* ---------------- Header ---------------- */
  var hdr = document.querySelector(".hdr");
  var nav = document.getElementById("nav");
  var burger = document.querySelector(".burger");
  function onScroll() { hdr.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    hdr.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", ui(open ? "nav.close" : "nav.menu"));
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false); });

  // Aktif bölümü menüde işaretle
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) secObs.observe(s); });
    // Hero ve rakamlar görünürken hiçbir menü öğesi seçili olmasın
    [".hero", ".stats"].forEach(function (sel) { var s = document.querySelector(sel); if (s) secObs.observe(s); });
  }

  /* ---------------- Hero slayt ---------------- */
  var SLIDE_MS = reduceMotion ? 9000 : 6500;
  var slidesEl = document.getElementById("heroSlides");
  var dotsEl = document.getElementById("heroDots");
  var current = 0, timer = null;
  doc.style.setProperty("--slide-ms", SLIDE_MS + "ms");
  // Yayında HTML önceden yazılmış gelir (araclar/onceden-yaz.mjs); slaytlar iki kez eklenmesin
  slidesEl.replaceChildren(); dotsEl.replaceChildren();

  S.hero.forEach(function (s, i) {
    // Telefon için ayrı fotoğraf (dikey) ve her fotoğrafa ayrı odak noktası
    var m = s.imgM || s.img;
    var f = h("figure", null,
      '<picture><source media="(max-width: 700px)" srcset="' + IMG + m + "-sm.webp 800w, " + IMG + m + '.webp 1600w" sizes="100vw">' +
      pic(s.img, "100vw", "", i === 0) + "</picture>");
    f.style.setProperty("--pos", s.pos || "50% 50%");
    f.style.setProperty("--pos-m", s.posM || s.pos || "50% 50%");
    if (i === 0) f.classList.add("is-on");
    slidesEl.appendChild(f);
    var d = h("button", { type: "button", "aria-label": String(i + 1) + " / " + S.hero.length });
    d.addEventListener("click", function () { go(i, true); });
    dotsEl.appendChild(d);
  });
  var heroName = document.getElementById("heroName");
  function setCaption(i) {
    var c = document.getElementById("heroCaption");
    if (c && S.hero[i]) c.textContent = t(S.hero[i].caption);
    // Bant, ekrandaki geminin adını taşır (geminin baş yazısı gibi)
    var nm = (S.hero[i] && S.hero[i].name) || "DURSUN ÇINAROĞLU BALIKÇILIK";
    var ship = S.fleet.filter(function (v) { return v.name.toLocaleUpperCase("tr-TR") === nm; })[0];
    var plate = ship ? ship.specs.callsign + "  " + t(ship.specs.port) : "";
    var pl = document.getElementById("heroPlate");
    if (heroName && heroName.textContent !== nm) {
      heroName.classList.add("is-swap"); if (pl) pl.classList.add("is-swap");
      setTimeout(function () {
        heroName.textContent = nm; heroName.classList.remove("is-swap");
        if (pl) { pl.textContent = plate; pl.hidden = !plate; pl.classList.remove("is-swap"); }
      }, reduceMotion ? 0 : 450);
    } else if (pl) { pl.textContent = plate; pl.hidden = !plate; }
  }
  function go(i, user) {
    var figs = slidesEl.children, dots = dotsEl.children;
    figs[current].classList.remove("is-on"); dots[current].classList.remove("is-on");
    current = (i + S.hero.length) % S.hero.length;
    // Animasyonu yeniden başlat
    void dots[current].offsetWidth;
    figs[current].classList.add("is-on"); dots[current].classList.add("is-on");
    setCaption(current);
    if (user) restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { go(current + 1); }, SLIDE_MS); }
  dotsEl.children[0].classList.add("is-on");
  restart();
  document.addEventListener("visibilitychange", function () { document.hidden ? clearInterval(timer) : restart(); });

  /* ---------------- Rakamlar ---------------- */
  function renderStats() {
    fill("stats", S.stats.map(function (s) {
      var el = h("div", { class: "stat reveal" },
        '<div class="stat__num"><span data-count="' + s.value + '"' + (s.plain ? ' data-plain="1"' : "") + '>' + (s.plain ? s.value : fmt(s.value)) + "</span>" +
        (s.suffix ? "<small>" + esc(s.suffix.trim()) + "</small>" : "") + "</div>" +
        '<div class="stat__label">' + esc(t(s.label)) + "</div>");
      return el;
    }));
  }
  var counted = false;
  function countUp() {
    if (counted || reduceMotion) return; counted = true;
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var end = +el.dataset.count, plain = el.dataset.plain, start = plain ? Math.max(0, end - 60) : 0, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 1600), e = 1 - Math.pow(1 - p, 3), v = Math.round(start + (end - start) * e);
        el.textContent = plain ? v : fmt(v);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------- Tarihçe / adımlar / türler / sahalar ---------------- */
  function renderGenerations() {
    if (!S.generations) return;
    fill("generations", S.generations.map(function (g, i) {
      return h("li", { class: "gen reveal" },
        '<span class="gen__n" aria-hidden="true"></span><div><b class="gen__who">' + esc(t(g.who)) + '</b><span class="gen__role">' + esc(t(g.role)) + "</span>" +
        '<p class="gen__text">' + esc(t(g.text)) + "</p></div>");
    }));
  }
  function renderSteps() {
    fill("steps", S.steps.map(function (x, i) {
      return h("li", { class: "step reveal" },
        '<figure class="step__img">' + (x.video ? vid(x.video, t(x.title), true) : pic(x.img, "(max-width: 640px) 85vw, (max-width: 1100px) 45vw, 25vw", t(x.title))) +
        '<span class="step__num">0' + (i + 1) + "</span></figure>" +
        "<h4>" + esc(t(x.title)) + "</h4><p>" + esc(t(x.text)) + "</p>");
    }));
  }
  function monthBar(list) {
    var months = ui("months"), out = "";
    for (var m = 1; m <= 12; m++) out += '<span class="' + (list.indexOf(m) > -1 ? "on" : "") + '"><i>' + months[m - 1].charAt(0) + "</i></span>";
    return '<div class="mo" role="img" aria-label="' + esc(list.map(function (m) { return months[m - 1]; }).join(", ")) + '">' + out + "</div>";
  }
  function renderSpecies() {
    fill("species", S.species.map(function (x) {
      var forms = (x.forms || []).map(function (f) { return '<span class="chip chip--' + f + '">' + esc(ui("form." + f)) + "</span>"; }).join("");
      var media = x.img
        ? '<figure class="fish__img">' + pic(x.img, x.featured ? "(max-width: 960px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw", t(x.name)) +
          '<figcaption class="fish__latin">' + esc(x.latin) + "</figcaption>" +
          (x.credit ? '<a class="fish__credit" href="' + esc(x.credit.url) + '" target="_blank" rel="noopener noreferrer">' + esc(ui("sp.photo")) + ": " + esc(x.credit.by) + ", " + esc(x.credit.license) + "</a>" : "") +
          "</figure>"
        : '<div class="fish__head" aria-hidden="true"><span class="fish__ghost">' + esc(t(x.name)) + '</span><span class="fish__latin">' + esc(x.latin) + "</span></div>";
      return h("article", { class: "fish reveal" + (x.featured ? " fish--featured" : "") + (x.img ? "" : " fish--noimg") },
        media +
        '<div class="fish__body"><h3 class="fish__name">' + esc(t(x.name)) + "</h3>" +
        '<p class="fish__text">' + esc(t(x.text)) + "</p>" +
        '<dl class="fish__facts">' +
        "<div><dt>" + esc(ui("sp.season")) + "</dt><dd>" + monthBar(x.months) + "</dd></div>" +
        "<div><dt>" + esc(ui("sp.size")) + "</dt><dd>" + esc(x.size) + "</dd></div>" +
        "<div><dt>" + esc(ui("sp.area")) + "</dt><dd>" + esc(t(x.area)) + "</dd></div>" +
        "<div><dt>" + esc(ui("sp.forms")) + "</dt><dd class=\"chips\">" + forms + "</dd></div>" +
        "</dl></div>");
    }));
  }
  function renderTuna() {
    var T = S.tuna; if (!T) return;
    document.getElementById("tunaMedia").innerHTML =
      pic(T.img, "(max-width: 960px) 100vw, 60vw", t(T.name)) +
      '<div class="tuna__inset">' + (T.video2 ? vid(T.video2, "", true) : pic(T.img2, "(max-width: 960px) 40vw, 18vw", "")) + "</div>";
    document.getElementById("tunaLatin").textContent = t(T.sub) + ", " + T.latin;
    fill("tunaFacts", T.facts.map(function (f) { return h("div", null, "<dt>" + esc(t(f.k)) + "</dt><dd>" + esc(t(f.v)) + "</dd>"); }));
    fill("tunaFlow", T.flow.map(function (f, i) { return h("li", null, "<span>0" + (i + 1) + "</span>" + esc(t(f))); }));
  }
  function renderAreas() {
    fill("areas", S.areas.map(function (x, i) {
      var li = h("li", { class: "spot", tabindex: "0", "data-i": i },
        '<span class="areas__n">0' + (i + 1) + "</span><div><b>" + esc(t(x.name)) + "</b><span>" + esc(t(x.text)) + "</span></div>");
      li.addEventListener("mouseenter", function () { hotArea(i); });
      li.addEventListener("focus", function () { hotArea(i); });
      return li;
    }));
    renderMap();
  }

  /* ---------------- Harita ---------------- */
  function proj(lat, lon) {
    var M = window.MAP;
    return [(lon - M.lon0) * M.k * M.s, (M.lat1 - lat) * M.s];
  }
  // Noktalardan yumuşak bir eğri (Catmull-Rom → kübik Bézier)
  function smooth(pts) {
    var d = "M" + pts[0][0].toFixed(1) + "," + pts[0][1].toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      var c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += "C" + [c1, c2, p2].map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
    }
    return d;
  }
  function renderMap() {
    var M = window.MAP, fig = document.getElementById("map");
    if (!M || !fig) return;
    var port = proj(S.port.lat, S.port.lon);
    var areas = S.areas.map(function (a, i) {
      var c = proj(a.lat, a.lon), r = (a.radiusKm / 111) * M.s;
      var way = [port].concat((a.route || []).map(function (p) { return proj(p[0], p[1]); }));
      if (!a.route) way.push([(port[0] + c[0]) / 2, Math.min(port[1], c[1]) - 40]);
      way.push(c);
      var ly = c[1] - r - 12;
      return '<path class="route" d="' + smooth(way) + '"/>' +
        '<g class="area' + (a.tuna ? " area--tuna" : "") + '" data-i="' + i + '">' +
        '<circle class="area__glow" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="' + (r * 1.25).toFixed(1) + '" fill="url(#mapGlow)"/>' +
        '<circle class="area__ring" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="' + r.toFixed(1) + '"/>' +
        '<circle class="area__dot" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="4"/>' +
        '<text class="area__label" x="' + c[0].toFixed(1) + '" y="' + ly.toFixed(1) + '">' + esc(t(a.name)) + "</text></g>";
    }).join("");
    fig.innerHTML =
      '<svg class="map__svg" viewBox="0 0 ' + M.w + " " + M.h + '" role="img" aria-label="' + esc(ui("map.aria")) + '">' +
      '<defs><radialGradient id="mapGlow"><stop offset="0" stop-color="#ff6a2b" stop-opacity=".55"/><stop offset=".55" stop-color="#ff6a2b" stop-opacity=".16"/><stop offset="1" stop-color="#ff6a2b" stop-opacity="0"/></radialGradient>' +
      '<pattern id="mapDots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#5fa6c4" fill-opacity=".22"/></pattern></defs>' +
      '<rect width="100%" height="100%" fill="url(#mapDots)"/>' +
      '<path class="map__land" d="' + M.land + '"/><path class="map__tr" d="' + M.tr + '"/>' +
      areas + originMark() +
      '<g class="port"><circle class="port__pulse" cx="' + port[0].toFixed(1) + '" cy="' + port[1].toFixed(1) + '" r="9"/>' +
      '<circle class="port__dot" cx="' + port[0].toFixed(1) + '" cy="' + port[1].toFixed(1) + '" r="7"/>' +
      '<text class="port__label" x="' + (port[0] + 16).toFixed(1) + '" y="' + (port[1] + 30).toFixed(1) + '">' + esc(t(S.port.name)) + "</text>" +
      '<text class="port__sub" x="' + (port[0] + 16).toFixed(1) + '" y="' + (port[1] + 50).toFixed(1) + '">' + esc(ui("map.port")) + "</text></g>" +
      "</svg>";
    fig.querySelectorAll(".area").forEach(function (g) {
      g.addEventListener("mouseenter", function () { hotArea(+g.dataset.i); });
    });
    hotArea(0);
  }
  function originMark() {
    if (!S.origin) return "";
    var o = proj(S.origin.lat, S.origin.lon);
    return '<g class="origin"><circle class="origin__dot" cx="' + o[0].toFixed(1) + '" cy="' + o[1].toFixed(1) + '" r="5"/>' +
      // Etiket noktanın sağ üstünde: hemen güneydeki İstanbul (sicil limanı) etiketiyle çakışmasın
      '<text class="origin__label" x="' + (o[0] + 10).toFixed(1) + '" y="' + (o[1] - 22).toFixed(1) + '">' + esc(t(S.origin.name)) + "</text>" +
      '<text class="origin__sub" x="' + (o[0] + 10).toFixed(1) + '" y="' + (o[1] - 8).toFixed(1) + '">' + esc(ui("about.origin")) + "</text></g>";
  }
  function hotArea(i) {
    document.querySelectorAll("#map .area, #map .route").forEach(function (el, k) { el.classList.remove("is-hot"); });
    var g = document.querySelector('#map .area[data-i="' + i + '"]');
    if (g) { g.classList.add("is-hot"); var r = g.previousElementSibling; if (r && r.classList.contains("route")) r.classList.add("is-hot"); }
    document.querySelectorAll("#areas li").forEach(function (li) { li.classList.toggle("is-hot", +li.dataset.i === i); });
  }

  // Sezon tarihleri content.js → season'dan gelir; yıl dönümünü (Eyl → Nis) destekler.
  function isOpenOn(date, s) {
    s = s || S.season;
    var k = (date.getMonth() + 1) * 100 + date.getDate();
    var a = s.open.month * 100 + s.open.day, b = s.close.month * 100 + s.close.day;
    return a > b ? (k >= a || k < b) : (k >= a && k < b);
  }
  /* Takvim: her satır bir sezon/tür, sütunlar aylar; çubuklar gün hassasiyetinde */
  function dayOfYear(d) { return Math.round((d - new Date(d.getFullYear(), 0, 1)) / 864e5); }
  function windowSegments(win, y) {
    // [başlangıç, bitiş) gün aralıkları; yıl dönümünde ikiye bölünür
    var a = dayOfYear(new Date(y, win.open.month - 1, win.open.day)), b = dayOfYear(new Date(y, win.close.month - 1, win.close.day));
    var n = dayOfYear(new Date(y, 11, 31)) + 1;
    return a < b ? [[a, b]] : [[0, b], [a, n]];
  }
  function monthSegments(list, y) {
    var segs = [], n = dayOfYear(new Date(y, 11, 31)) + 1;
    for (var m = 1; m <= 12; m++) {
      if (list.indexOf(m) < 0) continue;
      var a = dayOfYear(new Date(y, m - 1, 1)), b = m === 12 ? n : dayOfYear(new Date(y, m, 1));
      var last = segs[segs.length - 1];
      if (last && last[1] === a) last[1] = b; else segs.push([a, b]);
    }
    return segs;
  }
  function fmtDay(m, d) { return d + " " + ui("months")[m - 1]; }
  function fmtPrev(w) { var d = new Date(2001, w.month - 1, w.day - 1); return fmtDay(d.getMonth() + 1, d.getDate()); }
  function renderSeason() {
    var today = new Date(), y = today.getFullYear(), n = dayOfYear(new Date(y, 11, 31)) + 1;
    var ban = { open: S.season.close, close: S.season.open };
    var rows = [
      { label: ui("season.open"), cls: "seine", segs: windowSegments(S.season, y),
        text: fmtDay(S.season.open.month, S.season.open.day) + " – " + fmtPrev(S.season.close) },
      S.tunaSeason && { label: t(S.tuna.name), cls: "tuna", segs: windowSegments(S.tunaSeason, y),
        text: fmtDay(S.tunaSeason.open.month, S.tunaSeason.open.day) + " – " + fmtPrev(S.tunaSeason.close) },
      { label: ui("season.ban"), cls: "ban", segs: windowSegments(ban, y),
        text: fmtDay(ban.open.month, ban.open.day) + " – " + fmtPrev(ban.close) },
      { sub: ui("season.species") }
    ].filter(Boolean).concat(S.species.map(function (x) {
      return { label: t(x.name), cls: "sp", segs: monthSegments(x.months, y) };
    }));

    var cal = document.getElementById("season");
    var head = '<div class="cal__row cal__row--head"><span></span><div class="cal__months">' +
      ui("months").map(function (mm, i) {
        // Masaüstünde kısa ad (Oca), dar ekranda tek harf (O)
        return '<span class="' + (i === today.getMonth() ? "is-now" : "") + '"><b class="m-s">' + mm + '</b><b class="m-xs" aria-hidden="true">' + mm.charAt(0) + "</b></span>";
      }).join("") + "</div></div>";
    cal.innerHTML = head + rows.map(function (r) {
      if (r.sub) return '<div class="cal__sub">' + esc(r.sub) + "</div>";
      var widest = r.segs.reduce(function (a, s) { return (s[1] - s[0]) > (a[1] - a[0]) ? s : a; }, [0, 0]);
      return '<div class="cal__row"><span class="cal__label">' + esc(r.label) +
        (r.text ? '<small class="cal__dates">' + esc(r.text) + "</small>" : "") + '</span><div class="cal__track">' +
        r.segs.map(function (sg) {
          var w = (sg[1] - sg[0]) / n, label = r.text && sg === widest;
          // Dar çubukta tarih çubuğun sağına, dışarı yazılır
          var outside = label && w < 0.2;
          return '<b class="cal__bar cal__bar--' + r.cls + '" data-l="' + sg[0] / n + '" data-w="' + w + '">' +
            (label && !outside ? "<i>" + esc(r.text) + "</i>" : "") + "</b>" +
            (outside ? '<span class="cal__out" data-l="' + sg[1] / n + '">' + esc(r.text) + "</span>" : "");
        }).join("") + "</div></div>";
    }).join("") +
      '<div class="cal__today" data-l="' + (dayOfYear(today) + 0.5) / n + '"><em>' + esc(ui("season.today")) + "</em></div>";
    // Konumlar CSP gereği satır içi stil yerine CSSOM ile verilir
    cal.querySelectorAll("[data-l]").forEach(function (el) {
      // Bugün çizgisi etiket sütununu atlayıp yalnızca takvim alanına göre konumlanır
      el.style.left = el.classList.contains("cal__today")
        ? "calc(var(--label) + (100% - var(--label)) * " + el.dataset.l + ")"
        : (+el.dataset.l * 100) + "%";
      if (el.dataset.w) el.style.width = (+el.dataset.w * 100) + "%";
    });
    cal.setAttribute("aria-label", ui("season.lead"));

    // Bugünün durumu ve bir sonraki değişime kalan gün
    var tuna = S.tunaSeason && isOpenOn(today, S.tunaSeason);
    var win = tuna ? S.tunaSeason : S.season;
    var open = tuna || isOpenOn(today), k = 0, probe = new Date(y, today.getMonth(), today.getDate());
    while (k < 370) {
      probe.setDate(probe.getDate() + 1); k++;
      if (open && !isOpenOn(probe, win)) break;
      if (!open && (isOpenOn(probe) || (S.tunaSeason && isOpenOn(probe, S.tunaSeason)))) break;
    }
    var now = document.getElementById("seasonNow");
    now.textContent = ui(tuna ? "season.nowTuna" : open ? "season.nowOpen" : "season.nowClosed").replace("{n}", k);
    now.classList.toggle("is-open", open);
    now.classList.toggle("is-tuna", !!tuna);
  }

  /* ---------------- Filo ---------------- */
  var SPEC_GROUPS = [
    ["spec.group.id", ["built", "yard", "flag", "port", "callsign", "mmsi", "imo"]],
    ["spec.group.dim", ["loa", "beam", "depth", "gt", "nt"]],
    ["spec.group.power", ["engine", "aux", "speed"]],
    ["spec.group.cap", ["hold", "chill", "crew", "net"]]
  ];
  var arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var chevL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var chevR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  // Gemi fotoğrafları: satırın içinde kaydırmalı şerit (telefonda parmakla, bilgisayarda alttaki oklarla)
  function shipSlider(v, i) {
    var imgs = [v.img].concat(v.gallery || []);
    var slides = imgs.map(function (n, k) {
      return '<li class="sl__slide" data-k="' + k + '">' + pic(n, "(max-width: 960px) 100vw, 58vw", v.name + " " + (k + 1), k === 0) + "</li>";
    }).join("");
    var bar = imgs.length > 1
      ? '<div class="sl__bar"><button type="button" class="sl__btn" data-d="-1" aria-label="' + esc(ui("lb.prev")) + '">' + chevL + "</button>" +
        '<span class="sl__dots" aria-hidden="true">' + imgs.map(function (_, k) { return "<i" + (k ? "" : ' class="is-on"') + "></i>"; }).join("") + "</span>" +
        '<button type="button" class="sl__btn" data-d="1" aria-label="' + esc(ui("lb.next")) + '">' + chevR + "</button></div>"
      : "";
    return '<figure class="shiprow__img sl"><ul class="sl__track" tabindex="0" aria-label="' + esc(v.name) + '">' + slides + "</ul>" + bar + "</figure>";
  }
  function wireSlider(row, v) {
    var imgs = [v.img].concat(v.gallery || []);
    var track = row.querySelector(".sl__track"), dots = row.querySelectorAll(".sl__dots i");
    var at = function () { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); };
    var go = function (k) {
      var n = imgs.length; k = (k + n) % n;
      track.scrollTo({ left: k * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    };
    row.querySelectorAll(".sl__btn").forEach(function (b) {
      b.addEventListener("click", function () { go(at() + (+b.dataset.d)); });
    });
    var tick = null;
    track.addEventListener("scroll", function () {
      if (tick) return;
      tick = requestAnimationFrame(function () {
        tick = null; var k = at();
        dots.forEach(function (d, j) { d.classList.toggle("is-on", j === k); });
      });
    }, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(at() - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(at() + 1); }
    });
    // Fotoğrafa dokununca tam ekran (galerinin büyütme penceresi, bu geminin fotoğraflarıyla)
    track.addEventListener("click", function (e) {
      var li = e.target.closest(".sl__slide"); if (!li) return;
      lbList = imgs.map(function (n, k) { return { img: n, alt: { tr: v.name + " " + (k + 1), en: v.name + " " + (k + 1) } }; });
      lbShow(+li.dataset.k); openDialog(lb);
    });
  }
  function shipSpecs(v) {
    return SPEC_GROUPS.map(function (g) {
      var rows = g[1].filter(function (k) { return t(v.specs[k]); }).map(function (k) {
        return "<div><dt>" + esc(ui("spec." + k)) + "</dt><dd>" + esc(t(v.specs[k])) + "</dd></div>";
      }).join("");
      return rows ? '<section class="spec-group"><h4>' + esc(ui(g[0])) + "</h4><dl>" + rows + "</dl></section>" : "";
    }).join("");
  }
  function renderFleet() {
    fill("fleet", S.fleet.map(function (v, i) {
      var sp = v.specs, pid = "shipmore-" + i;
      var facts = [["spec.built", [t(sp.built), t(sp.yard).split(",")[0]].filter(Boolean).join(", ")], ["spec.loa", t(sp.loa)], ["spec.gt", t(sp.gt)], ["spec.engine", t(sp.engine)]]
        .filter(function (f) { return f[1]; })
        .map(function (f) { return "<div><dt>" + esc(ui(f[0])) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("");
      var row = h("article", { class: "shiprow" },
        shipSlider(v, i) +
        '<div class="shiprow__body"><h3 class="shiprow__name">' + esc(v.name.toLocaleUpperCase("tr-TR")) + "</h3>" +
        '<p class="shiprow__plate"><span>' + esc(sp.callsign) + "</span><span>" + esc(t(sp.port)) + "</span></p>" +
        '<dl class="shiprow__facts">' + facts + "</dl>" +
        '<div class="shiprow__actions"><button type="button" class="btn btn--line shiprow__toggle" aria-expanded="false" aria-controls="' + pid + '">' +
        '<span>' + esc(ui("fleet.details")) + '</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>' +
        (v.ais ? '<a class="shiprow__ais" href="' + esc(v.ais) + '" target="_blank" rel="noopener noreferrer">' + esc(ui("fleet.ais")) + " ↗</a>" : "") +
        "</div></div>" +
        '<div class="shiprow__more" id="' + pid + '" aria-hidden="true" inert><div><div class="shiprow__specs">' + shipSpecs(v) + "</div></div></div>");
      wireSlider(row, v);
      var btn = row.querySelector(".shiprow__toggle"), more = row.querySelector(".shiprow__more");
      btn.addEventListener("click", function () {
        var open = !row.classList.contains("is-open");
        row.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
        btn.querySelector("span").textContent = ui(open ? "fleet.less" : "fleet.details");
        more.setAttribute("aria-hidden", String(!open));
        if (open) more.removeAttribute("inert"); else more.setAttribute("inert", "");
        if (open && more.scrollIntoView) setTimeout(function () { more.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" }); }, 120);
      });
      return row;
    }));
  }

  /* ---------------- Ekipman / kalite ---------------- */
  function renderEquipment() {
    var photo = h("figure", { class: "bento__photo reveal" },
      pic(S.equipmentPhoto || "g/operasyon-makine-dairesi", "(max-width: 960px) 100vw, 40vw", "") +
      '<figcaption><strong>' + S.equipment.length + "</strong><span>" + esc(ui("equip.photo")) + "</span></figcaption>");
    var tiles = S.equipmentGroups.map(function (g, gi) {
      var items = S.equipment.filter(function (x) { return x.group === g.id; });
      return h("section", { class: "bento__tile spot reveal bento__tile--" + g.id },
        '<header><span class="bento__n">0' + (gi + 1) + "</span><h3>" + esc(t(g.name)) + "</h3><span class=\"bento__count\">" + items.length + "</span></header>" +
        "<ul>" + items.map(function (x) {
          return '<li><svg aria-hidden="true"><use href="#i-' + x.icon + '"/></svg><div><b>' + esc(t(x.name)) + "</b><span>" + esc(t(x.text)) + "</span></div></li>";
        }).join("") + "</ul>");
    });
    fill("equipment", [photo].concat(tiles));
  }
  function renderQuality() {
    fill("quality", S.quality.map(function (x) {
      return h("li", { class: "reveal" }, '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"/></svg><b>' + esc(t(x.title)) + "</b><span>" + esc(t(x.text)) + "</span>");
    }));
  }

  /* ---------------- Galeri + lightbox ---------------- */
  var lb = document.getElementById("lightbox"), lbIdx = 0, galFilter = "all", galAll = false, galList = [], lbList = [];
  var GAL_STEP = 15;
  function galItems() {
    return S.gallery.filter(function (g) {
      return galFilter === "all" || (galFilter === "video" ? !!g.video : g.cat === galFilter);
    });
  }
  function renderGalleryTabs() {
    var tabs = ["all", "gemi", "filo", "operasyon", "video"];
    fill("galleryTabs", tabs.map(function (k) {
      var n = k === "all" ? S.gallery.length : S.gallery.filter(function (g) { return k === "video" ? !!g.video : g.cat === k; }).length;
      var b = h("button", { type: "button", role: "tab", "aria-selected": String(k === galFilter) },
        esc(ui("gallery." + k)) + " <span>" + n + "</span>");
      b.addEventListener("click", function () { galFilter = k; galAll = false; renderGalleryTabs(); renderGallery(); });
      return b;
    }));
  }
  function renderGallery() {
    var items = galItems();
    galList = galAll ? items : items.slice(0, GAL_STEP);
    fill("gallery", galList.map(function (g, i) {
      var inner = g.video
        ? vid(g.video, t(g.alt)) + '<span class="masonry__play" aria-hidden="true"></span>'
        : pic(g.img, "(max-width: 640px) 50vw, 33vw", t(g.alt));
      var b = h("button", { type: "button", class: "reveal" + (g.video ? " is-video" : ""), "aria-label": t(g.alt) }, inner);
      b.addEventListener("click", function () { lbList = galList; lbShow(i); openDialog(lb); });
      return b;
    }));
    var more = document.getElementById("galleryMore");
    more.hidden = galAll || items.length <= GAL_STEP;
    more.textContent = ui("gallery.more") + " (" + (items.length - galList.length) + ")";
    watchVideos();
    observeReveals();
  }
  document.getElementById("galleryMore").addEventListener("click", function () { galAll = true; renderGallery(); });
  function lbShow(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    var g = lbList[lbIdx];
    var img = document.getElementById("lbImg"), v = document.getElementById("lbVid");
    if (g.video) {
      img.hidden = true; v.hidden = false;
      v.poster = VID + g.video + ".webp"; v.src = VID + g.video + ".mp4"; v.play().catch(function () {});
    } else {
      v.pause(); v.removeAttribute("src"); v.hidden = true; img.hidden = false;
      var cur = lbIdx; img.alt = t(g.alt);
      showProgressive(img, g.img, function () { return lbIdx === cur && lb.open; });
      [1, -1].forEach(function (d) { var nx = lbList[(cur + d + lbList.length) % lbList.length]; if (nx && nx.img) { preload(nx.img, false); preload(nx.img, true); } });
    }
    document.getElementById("lbCap").textContent = t(g.alt) + " (" + (lbIdx + 1) + " / " + lbList.length + ")";
  }
  lb.addEventListener("close", function () { var v = document.getElementById("lbVid"); v.pause(); v.removeAttribute("src"); });

  // Videolar yalnızca ekrandayken oynar (pil ve veri tasarrufu)
  var vidObs = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting && !reduceMotion) {
        // Önce kapak karesi insin; video ancak ondan sonra yüklenmeye başlasın (bant genişliği paylaşılmasın)
        var p = v.parentNode && v.parentNode.querySelector(".vposter");
        var start = function () { if (v.dataset.on !== "1") return; v.preload = "auto"; v.play().catch(function () {}); };
        v.dataset.on = "1";
        if (p && !(p.complete && p.naturalWidth)) { p.loading = "eager"; p.addEventListener("load", start, { once: true }); p.addEventListener("error", start, { once: true }); }
        else start();
      } else { v.dataset.on = "0"; v.pause(); }
    });
  }, { rootMargin: "300px 0px" }) : null;
  function watchVideos() {
    document.querySelectorAll("video.lazyvid:not([data-w])").forEach(function (v) {
      v.dataset.w = "1"; v.muted = true;
      v.addEventListener("playing", function () { v.classList.add("is-playing"); });
      if (vidObs) vidObs.observe(v);
    });
  }
  document.getElementById("lbPrev").addEventListener("click", function () { lbShow(lbIdx - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { lbShow(lbIdx + 1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    if (e.key === "ArrowRight") lbShow(lbIdx + 1);
  });
  // Mobilde kaydırarak geçiş
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
  });

  /* ---------------- Dialog ortak ---------------- */
  function openDialog(d) {
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  document.querySelectorAll("dialog").forEach(function (d) {
    d.addEventListener("close", function () { if (!document.querySelector("dialog[open]")) document.body.style.overflow = ""; });
    d.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]") || e.target === d) d.close();
    });
  });

  /* ---------------- İletişim ---------------- */
  function email() { return S.company.emailUser + "@" + S.company.emailDomain; }
  function renderContact() {
    var link = document.getElementById("mailLink");
    link.href = "mailto:" + email();
    document.getElementById("mailText").textContent = email();
    var meta = [["contact.where", t(S.company.address)]];
    if (S.company.phone) meta.push(["contact.phone", '<a href="tel:' + S.company.phone.replace(/\s/g, "") + '">' + esc(S.company.phone) + "</a>", true]);
    fill("contactMeta", meta.map(function (m) {
      return h("div", null, "<dt>" + esc(ui(m[0])) + "</dt><dd>" + (m[2] ? m[1] : esc(m[1])) + "</dd>");
    }));
    var legal = t(S.company.legal);
    document.getElementById("legal").textContent = /\.$/.test(legal) ? legal : legal + ".";
    var fm = document.getElementById("ftrMail");
    fm.href = "mailto:" + email(); fm.textContent = email();
    document.getElementById("ftrLoc").textContent = t(S.company.location);
    document.getElementById("mailGmail").href = gmailUrl();
    document.getElementById("mailApp").href = mailtoUrl();
    // Sosyal medya: adres girilmişse iletişim bölümünde ve footer'da görünür
    [["youtube", "socYt", "ftrYt"], ["instagram", "socIg", "ftrIg"]].forEach(function (sm) {
      var url = S.company[sm[0]];
      [sm[1], sm[2]].forEach(function (id) { var el = document.getElementById(id); if (url) el.href = url; el.hidden = !url; });
    });
    var wa = document.getElementById("mailWa");
    if (S.company.whatsapp) {
      wa.href = "https://wa.me/" + S.company.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(ui("wa.text"));
      wa.hidden = false;
    } else wa.hidden = true;
    setFab();
  }

  /* E-posta açma: mobilde telefonun e-posta uygulaması (Gmail yüklüyse ve
     varsayılansa Gmail açılır), masaüstünde Gmail web yeni sekmede açılır. */
  var isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  function mailtoUrl() { return "mailto:" + email() + "?subject=" + encodeURIComponent(ui("mail.subject")); }
  function gmailUrl() {
    return "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email()) + "&su=" + encodeURIComponent(ui("mail.subject"));
  }
  function openMail() {
    if (isTouch) location.href = mailtoUrl();
    else window.open(gmailUrl(), "_blank", "noopener");
  }
  document.getElementById("mailLink").addEventListener("click", function (e) { e.preventDefault(); openMail(); });
  document.getElementById("heroMail").addEventListener("click", function (e) { e.preventDefault(); openMail(); });
  // Kopyala düğmeleri (giriş + iletişim); pano yoksa adresi seçili bırakır
  var heroAddr = document.getElementById("heroAddr");
  heroAddr.textContent = email();
  ["mailCopy", "heroCopy"].forEach(function (id) {
    var btn = document.getElementById(id);
    btn.addEventListener("click", function () {
      var done = function () {
        btn.textContent = ui("contact.copied"); btn.classList.add("is-done");
        setTimeout(function () { btn.textContent = ui("contact.copy"); btn.classList.remove("is-done"); }, 1800);
      };
      var select = function () { var r = document.createRange(); r.selectNodeContents(heroAddr); var s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      if (navigator.clipboard) navigator.clipboard.writeText(email()).then(done, select); else select();
    });
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Kaydırınca belirme ---------------- */
  var revObs = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.transitionDelay = Math.min(sibs, 6) * 70 + "ms";
      el.classList.add("in");
      revObs.unobserve(el);
      if (el.classList.contains("stat")) countUp();
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      if (revObs) revObs.observe(el); else el.classList.add("in");
    });
  }

  /* ---------------- Spot ışığı (fareyi izleyen hafif parlama) ---------------- */
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".spot");
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px");
    el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---------------- Sol altta sabit "Bize ulaşın" düğmesi ----------------
     1. tıklama: iletişim bölümüne kaydırır. İletişim bölümü ekrandayken
     düğme "E-posta gönder" olur ve tıklanınca e-postayı açar. */
  var fab = document.getElementById("fab"), atContact = false;
  function setFab() {
    fab.classList.toggle("is-mail", atContact);
    document.getElementById("fabText").textContent = ui(atContact ? "fab.mail" : "fab");
    fab.href = atContact ? mailtoUrl() : "#iletisim";
  }
  fab.addEventListener("click", function (e) {
    e.preventDefault();
    if (atContact) { openMail(); return; }
    document.getElementById("iletisim").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      atContact = entries[0].isIntersecting; setFab();
    }, { threshold: 0.35 }).observe(document.getElementById("iletisim"));
  }
  // Düğme, girişteki e-posta düğmeleri ekrandayken ve footer'ın en alt satırında gizlenir
  // (girişte yazının, en altta telif satırının üstüne binmesin)
  if ("IntersectionObserver" in window) {
    var inHero = true, atBar = false;
    var fabVis = function () { fab.classList.toggle("is-on", !inHero && !atBar); };
    new IntersectionObserver(function (entries) { inHero = entries[0].isIntersecting; fabVis(); })
      .observe(document.querySelector(".hero__bottom"));
    new IntersectionObserver(function (entries) { atBar = entries[0].isIntersecting; fabVis(); })
      .observe(document.querySelector(".ftr__bar"));
  } else {
    fab.classList.add("is-on");
  }

  /* ---------------- Başlat ---------------- */
  applyLang();
  syncUrl();
})();
