/* =====================================================================
   DURSUN ÇINAROĞLU BALIKÇILIK — SİTE İÇERİĞİ / SITE CONTENT
   ---------------------------------------------------------------------
   Sitedeki bütün metinler, gemiler, türler, ekipmanlar ve iletişim
   bilgisi bu dosyadadır. Değiştirmek için yalnızca bu dosyayı düzenleyin.
   Her metin { tr: "...", en: "..." } biçimindedir.

   GERÇEK veriler: şirket ünvanı ve 3 geminin kayıt bilgileri
     (kaynak: Deniz Ticaret Odası gemi sicili + VesselFinder AIS, Kasım 2026).
   ÖRNEK (doğrulanmalı): ekipman listesi.
   FOTOĞRAF/VİDEO: hepsi şirketin kendi medyası (assets/img/g, assets/video).
     Kaynak ve eşleştirme raporu: medya/RAPOR.md
   ===================================================================== */

window.SITE = {
  siteUrl: "https://dursuncinaroglu.github.io",

  company: {
    name: "Dursun Çınaroğlu Balıkçılık",
    // Resmî ünvan (DTO sicili): DURSUN ÇINAROĞLU BALIKÇILIK DENİZCİLİK İNŞAAT TURİZM
    // İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ
    legal: { tr: "Dursun Çınaroğlu Balıkçılık Ltd. Şti.", en: "Dursun Çınaroğlu Balıkçılık Ltd." },
    location: { tr: "İstanbul / Çanakkale, Türkiye", en: "Istanbul / Çanakkale, Türkiye" },
    // E-posta spam botlarından korunsun diye iki parça halinde yazılır:
    emailUser: "cinarogullari.balikcilik",
    emailDomain: "gmail.com",
    phone: "",           // İstenirse: "+90 5xx xxx xx xx" — boş bırakılırsa görünmez
    // WhatsApp Business numarası (ülke koduyla, boşluksuz, ör. "905xxxxxxxxx").
    // Boş bırakılırsa WhatsApp düğmesi görünmez.
    whatsapp: "",
    // Sosyal medya adresleri (tam adres). Boş bırakılan görünmez.
    youtube: "https://www.youtube.com/@dursuncinaroglu.balikcilik",
    instagram: "https://www.instagram.com/dursuncinaroglu.balikcilik/",
    address: { tr: "İstanbul / Çanakkale, Türkiye", en: "Istanbul / Çanakkale, Türkiye" }
  },

  /* ---------------- Ana sayfa giriş slaytları ---------------- */
  /* img/pos: bilgisayar (yatay alan) · imgM/posM: telefon (dikey alan).
     pos = fotoğrafın hangi kısmı görünsün ("yatay% dikey%"): 50% 50% orta, 50% 80% alt kısım. */
  hero: [
    { img: "g/dursun-cinaroglu-seyir", pos: "50% 72%", imgM: "g/dursun-cinaroglu-seyir", posM: "74% 50%",
      name: "DURSUN ÇINAROĞLU", caption: { tr: "Seyirde", en: "Under way" } },
    { img: "g/dursun-cinaroglu-gun-batimi-2", pos: "50% 86%", imgM: "g/dursun-cinaroglu-gun-batimi-1", posM: "50% 74%",
      name: "DURSUN ÇINAROĞLU", caption: { tr: "Gün batımında seyir", en: "Under way at sunset" } },
    { img: "g/dursun-cinaroglu-2-liman-1", pos: "50% 58%", imgM: "g/dursun-cinaroglu-2-liman-4", posM: "50% 48%",
      name: "DURSUN ÇINAROĞLU 2", caption: { tr: "Limanda", en: "In port" } },
    { img: "g/filo-gun-batimi", pos: "50% 66%", imgM: "g/filo-gun-batimi", posM: "50% 58%",
      name: "DURSUN ÇINAROĞLU BALIKÇILIK", caption: { tr: "Filomuz limanda", en: "Our fleet in port" } },
    { img: "g/operasyon-denizde-calisma", pos: "50% 60%", imgM: "g/operasyon-ag-gun-batimi-foto", posM: "50% 55%",
      name: "DURSUN ÇINAROĞLU BALIKÇILIK", caption: { tr: "Denizde çalışma", en: "Working at sea" } }
  ],

  /* ---------------- Aile hikâyesi (Hakkımızda) — tarih verilmeden, kuşak kuşak ---------------- */
  generations: [
    { who: { tr: "Dursun Dede'nin babası", en: "Grandfather Dursun's father" },
      role: { tr: "1. kuşak", en: "1st generation" },
      text: { tr: "İstanbul'da, Rumeli Kavağı'nda ahşap bir tekneyle denize açıldı; ağ atmayı, havayı ve denizi okumayı aileye o öğretti.", en: "Put to sea from Rumeli Kavağı, Istanbul, in a wooden boat, and taught the family to cast a net and read the weather and the sea." } },
    { who: { tr: "Dursun Dede", en: "Grandfather Dursun" },
      role: { tr: "2. kuşak", en: "2nd generation" },
      text: { tr: "İşi babasından denizde öğrendi; gemilerimiz bugün onun adını taşıyor.", en: "Learned the work from his father at sea; our ships carry his name today." } },
    { who: { tr: "Oğulları", en: "His sons" },
      role: { tr: "3. kuşak, bugün filoyu yönetiyor", en: "3rd generation, running the fleet today" },
      text: { tr: "Ahşap teknenin yerini çelik gırgır gemileri aldı; seferler Karadeniz'den Akdeniz'e uzandı.", en: "Steel purse seiners took the wooden boat's place, and the voyages reached from the Black Sea to the Mediterranean." } },
    { who: { tr: "Torunlar", en: "The grandchildren" },
      role: { tr: "4. kuşak, güvertede", en: "4th generation, on deck" },
      text: { tr: "İşi babalarından, denizde öğreniyorlar.", en: "Learning the work from their fathers, at sea." } }
  ],
  // Hikâyenin başladığı yer — haritada ayrı bir işaret
  origin: { name: { tr: "Rumeli Kavağı", en: "Rumeli Kavağı" }, lat: 41.18, lon: 29.07 },

  /* ---------------- Rakamlar ---------------- */
  stats: [
    { value: 3, label: { tr: "Gırgır gemisi", en: "Purse seiners" } },
    { value: 11400, suffix: " BHP", label: { tr: "Toplam makine gücü", en: "Total engine power" } },
    { value: 4, label: { tr: "Av sahası", en: "Fishing grounds" } },
    { value: 6, label: { tr: "Avlanan tür", en: "Species caught" } }
  ],

  /* ---------------- Gırgır nasıl çalışır ----------------
     img: fotoğraf (assets/img/g) · video: sessiz döngü (assets/video) */
  steps: [
    { img: "g/operasyon-kaptan-kosku-gun-batimi", title: { tr: "Sürüyü bul", en: "Find the school" },
      text: { tr: "Kaptan köşkünde sonar ve ekosounder başında saatler geçer; sürünün yeri, derinliği ve büyüklüğü belirlenir.", en: "Hours on the bridge at the sonar and echo sounder: the school's position, depth and size are read." } },
    { video: "operasyon-ag-atma", title: { tr: "Ağı çevir", en: "Set the net" },
      text: { tr: "Gemi sürünün etrafında tam bir daire çizer ve yüzlerce metrelik ağı dakikalar içinde denize bırakır.", en: "The vessel draws a full circle around the school, paying out hundreds of metres of net within minutes." } },
    { img: "g/operasyon-ag-cekme-2", title: { tr: "Büz ve topla", en: "Purse and haul" },
      text: { tr: "Büzgü halatı çekilir, ağın altı kese gibi kapanır; mürettebat ağı power block ile güverteye alır.", en: "The purse line is drawn, closing the net like a bag; the crew hauls it aboard with the power block." } },
    { video: "operasyon-kasalama", title: { tr: "Kasaya, taze", en: "Into the crate, fresh" },
      text: { tr: "Av soğutmalı ambara, oradan kasalara alınır ve tazeliği bozulmadan limana ulaşır.", en: "The catch goes into chilled holds, then into crates, and reaches port in prime condition." } }
  ],

  /* ---------------- Avımız (türler) ----------------
     img: şu an GEÇİCİ açık lisanslı fotoğraf (Wikimedia Commons / Pexels); credit alanı lisansın
     gerektirdiği kaynak bilgisidir. Kendi kasa fotoğrafınız gelince img'yi değiştirip credit'i silin.
     months: av ayları (1–12) · forms: fresh = taze kasa, frozen = şoklanmış
     Boy aralıkları tipik ticari boylardır; kendi verinizle doğrulayın. */
  species: [
    { id: "hamsi", img: "g/sp-hamsi-guverte",  /* kendi avımız (güverte, video karesi) */ featured: true,
      name: { tr: "Hamsi", en: "Anchovy" }, latin: "Engraulis encrasicolus",
      months: [1, 2, 3, 4, 9, 10, 11, 12], size: "9–14 cm", forms: ["fresh", "frozen"],
      area: { tr: "Karadeniz", en: "Black Sea" },
      text: { tr: "Karadeniz'in simgesi. Kış aylarında yağ oranı en yüksek seviyeye çıkar; sürü bulunduğu gece ağa girer, sabah kasada limandadır.", en: "The emblem of the Black Sea. Its oil content peaks in winter; caught at night, it is on the quay in crates by morning." } },
    { id: "palamut", img: "g/sp-palamut-kasa",  /* kendi kasamız (gemi güvertesi, video karesi) */
      name: { tr: "Palamut", en: "Atlantic bonito" }, latin: "Sarda sarda",
      months: [9, 10, 11, 12], size: "25–45 cm", forms: ["fresh"],
      area: { tr: "Karadeniz, Marmara", en: "Black Sea, Marmara" },
      text: { tr: "Sonbaharda Karadeniz'den Marmara'ya göç eder. Eylül'den itibaren irileşir; sezonun en çok beklenen avıdır.", en: "Migrates from the Black Sea into the Marmara in autumn, growing larger from September — the most awaited catch of the season." } },
    { id: "istavrit", img: "g/sp-istavrit", credit: { by: "karimhaddad", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Trachurus_mediterraneus_Algeria_1.jpg" },
      name: { tr: "İstavrit", en: "Horse mackerel" }, latin: "Trachurus mediterraneus",
      months: [1, 2, 3, 4, 9, 10, 11, 12], size: "12–20 cm", forms: ["fresh", "frozen"],
      area: { tr: "Karadeniz", en: "Black Sea" },
      text: { tr: "Sıkı eti ve uzun sezonuyla hem taze tezgâhın hem de işleme sanayisinin aranan türü.", en: "Firm flesh and a long season make it a staple for fresh counters and processors alike." } },
    { id: "sardalya", img: "g/sp-sardalya", credit: { by: "Pexels", license: "Pexels", url: "https://www.pexels.com/photo/fresh-sardines-in-red-market-crates-display-37743691/" },
      name: { tr: "Sardalya", en: "Sardine" }, latin: "Sardina pilchardus",
      months: [1, 2, 9, 10, 11, 12], size: "11–18 cm", forms: ["fresh", "frozen"],
      area: { tr: "Kuzey Ege, Marmara", en: "North Aegean, Marmara" },
      text: { tr: "Ege'nin gümüş pulu. Yüksek omega-3 içeriğiyle taze tüketim ve konserve için tercih edilir.", en: "The silver of the Aegean. Rich in omega-3, prized fresh and for canning." } },
    { id: "kolyoz", img: "g/sp-kolyoz", credit: { by: "bobby23 (kırpıldı)", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Scomber_colias_USA.jpg" },
      name: { tr: "Kolyoz", en: "Chub mackerel" }, latin: "Scomber colias",
      months: [9, 10, 11], size: "18–30 cm", forms: ["fresh"],
      area: { tr: "Marmara, Kuzey Ege", en: "Marmara, North Aegean" },
      text: { tr: "Uskumrunun sıcak deniz akrabası; sonbaharda Marmara ve Kuzey Ege'de yoğun sürüler hâlinde yakalanır.", en: "The warm-water cousin of mackerel, caught in dense autumn schools in the Marmara and North Aegean." } }
  ],

  /* ---------------- Orkinos ----------------
     Sezon her yıl ICCAT kotası ve Bakanlık uygulama talimatıyla belirlenir;
     tarihleri her yıl talimattan kontrol edin. */
  tuna: {
    img: "g/orkinos-guvertede", video2: "orkinos-havuz-suru",
    name: { tr: "Orkinos", en: "Bluefin tuna" },
    sub: { tr: "Mavi yüzgeçli ton balığı", en: "Atlantic bluefin tuna" },
    latin: "Thunnus thynnus",
    facts: [
      { k: { tr: "Sezon", en: "Season" }, v: { tr: "Mayıs sonu – Haziran", en: "Late May – June" } },
      { k: { tr: "Saha", en: "Ground" }, v: { tr: "Malta açıkları, uluslararası sular", en: "Off Malta, international waters" } },
      { k: { tr: "Kota", en: "Quota" }, v: { tr: "ICCAT, yıllık tahsis", en: "ICCAT, annual allocation" } },
      { k: { tr: "Havuz", en: "Cage towing" }, v: { tr: "Kendi gemilerimizle çiftliğe", en: "By our own vessels, to the farm" } }
    ],
    flow: [
      { tr: "Gırgırla canlı yakalanır", en: "Caught alive by purse seine" },
      { tr: "Transfer havuzuna alınır", en: "Moved into a transfer cage" },
      { tr: "Stereo kamerayla sayılır, ölçülür", en: "Counted and sized by stereo camera" },
      { tr: "Havuzu kendi gemimiz çiftliğe çeker", en: "Our own vessel tows the cage to the farm" }
    ]
  },

  /* ---------------- Av sahaları (haritada gösterilir) ----------------
     lat/lon: sahanın merkezi, radiusKm: haritadaki yarıçap, route: limandan deniz yolu */
  areas: [
    { name: { tr: "Karadeniz", en: "Black Sea" }, lat: 42.75, lon: 34.9, radiusKm: 150,
      route: [[41.22, 29.11], [41.42, 29.7], [41.85, 31.6]],
      text: { tr: "Ana av sahamız. Hamsi, istavrit ve palamut sezonunun kalbi.", en: "Our home grounds — the heart of the anchovy, horse mackerel and bonito season." } },
    { name: { tr: "Marmara", en: "Sea of Marmara" }, lat: 40.72, lon: 28.15, radiusKm: 48,
      route: [[40.9, 28.75]],
      text: { tr: "Sonbahar göçünde palamut ve kolyoz için.", en: "Bonito and chub mackerel during the autumn migration." } },
    { name: { tr: "Kuzey Ege", en: "North Aegean" }, lat: 39.85, lon: 25.35, radiusKm: 75,
      // İstanbul → Marmara → Çanakkale Boğazı
      route: [[40.9, 28.6], [40.62, 27.4], [40.38, 26.68], [40.12, 26.36], [40.0, 26.05]],
      text: { tr: "Sardalya ve kolyoz için sezonluk sefer.", en: "Seasonal trips for sardine and chub mackerel." } },
    { name: { tr: "Malta açıkları", en: "Off Malta" }, lat: 35.35, lon: 14.6, radiusKm: 110, tuna: true,
      // Çanakkale → Ege → Kithira boğazı → İyon Denizi → Malta açıkları (uluslararası sular)
      route: [[40.9, 28.6], [40.62, 27.4], [40.38, 26.68], [40.12, 26.36], [39.6, 25.6], [38.6, 24.9], [37.4, 24.2], [36.3, 23.25], [36.0, 21.5], [35.8, 19.0], [35.55, 16.6]],
      text: { tr: "Mayıs–Haziran'da ICCAT kotasıyla uluslararası sularda orkinos avı ve havuz çekme.", en: "Bluefin tuna under ICCAT quota in international waters, May–June, and towing the cages to the farm." } }
  ],
  // Haritada nabız gibi atan nokta — gemilerin sicil limanı (DTO)
  port: { name: { tr: "İstanbul", en: "Istanbul" }, lat: 41.02, lon: 28.98 },

  /* ---------------- Av sezonu ----------------
     open:  sezonun açıldığı gün (dahil) · close: yasağın başladığı ilk gün
     Takvim çubuğu ve "bugün" durumu bu tarihlerden otomatik hesaplanır. */
  season: { open: { month: 9, day: 1 }, close: { month: 4, day: 15 } },
  tunaSeason: { open: { month: 5, day: 26 }, close: { month: 7, day: 1 } },

  /* ---------------- Filo ----------------
     Kaynak: Deniz Ticaret Odası gemi sicili (resmî) ve VesselFinder (AIS).
     "≈" işaretli boy/en değerleri AIS kaynaklıdır (yaklaşık).
     img/gallery: şirketin kendi fotoğrafları (medya/RAPOR.md'deki eşleştirmeye göre).
     ais: MarineTraffic canlı haritası, gemi seçili (shipid'ler sahibi tarafından verildi).
     Boş bırakılan ("") özellik föyde gösterilmez. */
  fleet: [
    {
      name: "Dursun Çınaroğlu", img: "g/dursun-cinaroglu-seyir", gallery: ["g/dursun-cinaroglu-rihtim", "g/dursun-cinaroglu-safakta", "g/dursun-cinaroglu-rihtim-2", "g/dursun-cinaroglu-gun-batimi-2", "g/dursun-cinaroglu-gun-batimi-1", "g/dursun-cinaroglu-gun-batimi-3", "g/dursun-cinaroglu-tersane-1"],
      type: { tr: "Gırgır gemisi", en: "Purse seiner" },
      ais: "https://www.marinetraffic.com/en/ais/home/shipid:340966/zoom:10",
      specs: {
        built: "1996", yard: { tr: "Yalova, Türkiye", en: "Yalova, Türkiye" }, flag: { tr: "Türkiye", en: "Türkiye" },
        port: { tr: "İstanbul", en: "Istanbul" }, callsign: "TC9003", mmsi: "271072560", imo: "",
        loa: "40.20 m", beam: "≈ 12 m", depth: "", gt: "200", nt: "60",
        engine: { tr: "3 makine, 3.800 BHP", en: "3 engines, 3,800 BHP" }, aux: "", speed: "",
        hold: "", chill: "", crew: "", net: ""
      }
    },
    {
      name: "Çınaroğulları-1", img: "g/cinarogullari-1-liman", gallery: ["g/filo-cinarogullari-1-yan-yana"],
      type: { tr: "Gırgır gemisi", en: "Purse seiner" },
      ais: "https://www.marinetraffic.com/en/ais/home/shipid:8608651/zoom:10",
      specs: {
        built: "2006", yard: { tr: "Çamburnu, Türkiye", en: "Çamburnu, Türkiye" }, flag: { tr: "Türkiye", en: "Türkiye" },
        port: { tr: "İstanbul", en: "Istanbul" }, callsign: "TCB2058", mmsi: "", imo: "8686018",
        loa: "45.60 m", beam: "12.0 m", depth: "", gt: "246", nt: "74",
        engine: { tr: "3 makine, 4.600 BHP", en: "3 engines, 4,600 BHP" }, aux: "", speed: "",
        hold: "", chill: "", crew: "", net: ""
      }
    },
    {
      name: "Dursun Çınaroğlu 2", img: "g/dursun-cinaroglu-2-liman-1", gallery: ["g/dursun-cinaroglu-2-on-2", "g/dursun-cinaroglu-2-rihtim", "g/dursun-cinaroglu-2-liman-dag", "g/dursun-cinaroglu-2-liman-4", "g/dursun-cinaroglu-2-tersane-4", "g/dursun-cinaroglu-2-liman-2", "g/dursun-cinaroglu-2-tersane-2", "g/dursun-cinaroglu-2-tersane-3", "g/dursun-cinaroglu-2-liman-3", "g/dursun-cinaroglu-2-tersane-1"],
      type: { tr: "Gırgır gemisi", en: "Purse seiner" },
      ais: "https://www.marinetraffic.com/en/ais/home/shipid:1019179/zoom:10",
      specs: {
        built: "1997", yard: { tr: "Karadeniz Ereğli, Türkiye", en: "Karadeniz Ereğli, Türkiye" }, flag: { tr: "Türkiye", en: "Türkiye" },
        port: { tr: "İstanbul", en: "Istanbul" }, callsign: "TC9314", mmsi: "271062138", imo: "8341826",
        loa: "33.60 m", beam: "8.58 m", depth: "2.45 m", gt: "153", nt: "46",
        engine: { tr: "3 makine, 3.000 BHP", en: "3 engines, 3,000 BHP" }, aux: "", speed: "",
        hold: "", chill: "", crew: "", net: ""
      }
    }
  ],

  // Ekipman bölümündeki büyük fotoğraf
  equipmentPhoto: "g/operasyon-ag-guvertede",

  /* ---------------- Ekipmanlar (ÖRNEK — gerçek liste gelince güncellenecek) ----------------
     group: detect (tespit) · catch (av) · keep (tazelik) · safety (güvenlik) */
  equipmentGroups: [
    { id: "detect", name: { tr: "Tespit & seyir", en: "Detection & navigation" } },
    { id: "catch", name: { tr: "Av donanımı", en: "Fishing gear" } },
    { id: "keep", name: { tr: "Tazelik", en: "Freshness" } },
    { id: "safety", name: { tr: "Güvenlik & takip", en: "Safety & tracking" } }
  ],
  equipment: [
    { group: "detect", icon: "sonar", name: { tr: "Uzun menzilli sonar", en: "Long-range sonar" }, text: { tr: "360° tarama ile sürüyü kilometrelerce öteden tespit eder.", en: "360° scanning detects schools kilometres away." } },
    { group: "detect", icon: "echo", name: { tr: "Ekosounder", en: "Echo sounder" }, text: { tr: "Sürünün derinliğini ve yoğunluğunu ölçer.", en: "Measures school depth and density." } },
    { group: "catch", icon: "block", name: { tr: "Power block", en: "Power block" }, text: { tr: "Hidrolik makara ile ağı hızlı ve güvenli toplar.", en: "A hydraulic sheave hauls the net quickly and safely." } },
    { group: "catch", icon: "winch", name: { tr: "Büzgü vinci", en: "Purse winch" }, text: { tr: "Ağın altını kapatan büzgü halatını çeker.", en: "Draws the purse line that closes the net." } },
    { group: "keep", icon: "pump", name: { tr: "Balık pompası", en: "Fish pump" }, text: { tr: "Balığı ezmeden ağdan ambara aktarır.", en: "Transfers fish from net to hold without damage." } },
    { group: "keep", icon: "snow", name: { tr: "RSW soğutma", en: "RSW chilling" }, text: { tr: "Soğutulmuş deniz suyu ile avı ilk andan korur.", en: "Refrigerated sea water keeps the catch fresh from the first minute." } },
    { group: "detect", icon: "radar", name: { tr: "Radar & GPS plotter", en: "Radar & GPS plotter" }, text: { tr: "Gece ve sisli havada güvenli seyir.", en: "Safe navigation at night and in fog." } },
    { group: "safety", icon: "sat", name: { tr: "AIS & VMS takibi", en: "AIS & VMS tracking" }, text: { tr: "Gemilerimiz uydu ile sürekli izlenir.", en: "Our vessels are tracked by satellite at all times." } },
    { group: "catch", icon: "light", name: { tr: "Işık sistemi", en: "Lighting system" }, text: { tr: "Gece avı için LED ışıkçı donanımı.", en: "LED attraction lights for night fishing." } },
    { group: "safety", icon: "life", name: { tr: "Can kurtarma", en: "Life-saving gear" }, text: { tr: "Sal, yelek, EPIRB ve yangın donanımı tam ve denetimli.", en: "Rafts, vests, EPIRB and fire gear, complete and inspected." } }
  ],

  /* ---------------- Kalite & sorumluluk ---------------- */
  quality: [
    { title: { tr: "Kotaya ve yasaklara tam uyum", en: "Full compliance with quotas and closures" }, text: { tr: "Av yasağı dönemlerine, asgari boylara, ICCAT kotasına ve bölge kısıtlarına titizlikle uyarız.", en: "We strictly follow seasonal closures, minimum sizes, ICCAT quota and area restrictions." } },
    { title: { tr: "Soğuk zincir", en: "Cold chain" }, text: { tr: "Ağdan limana kadar av soğuk tutulur; tazelik kayıt altındadır.", en: "From net to port the catch stays chilled, with freshness recorded." } },
    { title: { tr: "Önce güvenlik", en: "Safety first" }, text: { tr: "Mürettebatımız düzenli tatbikat ve eğitimle denize çıkar.", en: "Our crews go to sea trained and drilled." } },
    { title: { tr: "İzlenebilirlik", en: "Traceability" }, text: { tr: "Gemilerimiz AIS ve VMS ile izlenir; her seferin konumu ve avı kayıtlıdır.", en: "Our vessels are tracked by AIS and VMS; every trip's position and catch is logged." } }
  ],

  /* ---------------- Galeri ----------------
     img: fotoğraf (assets/img/g/ad.webp) · video: sessiz döngü (assets/video/ad.mp4 + ad.webp kapak)
     cat: gemi · filo · operasyon (galeri sekmeleri) */
  gallery: [
    /* Kasım 2026, 3. medya grubu (en iyiler başta) */
    { img: "g/operasyon-ag-gun-batimi-foto", cat: "operasyon", alt: { tr: "Gün batımında ağ toplama", en: "Hauling the net at sunset" } },
    { img: "g/dursun-cinaroglu-rihtim", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU rıhtımda", en: "DURSUN ÇINAROĞLU alongside" } },
    { video: "operasyon-ag-cekme-video", cat: "operasyon", alt: { tr: "Dolu ağı mürettebat çekiyor", en: "The crew hauling a full net" } },
    { img: "g/filo-liman-genel", cat: "filo", alt: { tr: "Limanda filo", en: "The fleet in harbour" } },
    { img: "g/operasyon-ag-gun-dogumu", cat: "operasyon", alt: { tr: "Gün doğumunda ağ ve martılar", en: "Net and gulls at sunrise" } },
    { img: "g/operasyon-ag-cekme-2", cat: "operasyon", alt: { tr: "Ağ çekme", en: "Hauling the net" } },
    { video: "orkinos-havuz-cekme", cat: "operasyon", alt: { tr: "Orkinos havuzu çekme", en: "Towing the tuna cage" } },
    { img: "g/dursun-cinaroglu-2-rihtim", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 rıhtımda", en: "DURSUN ÇINAROĞLU 2 alongside" } },
    { video: "operasyon-gece-suru", cat: "operasyon", alt: { tr: "Gece, ağdaki sürü", en: "The school in the net at night" } },
    { img: "g/operasyon-kaptan-kosku-gun-batimi", cat: "operasyon", alt: { tr: "Kaptan köşkü, gün batımı", en: "The wheelhouse at sunset" } },
    { img: "g/operasyon-ag-safak", cat: "operasyon", alt: { tr: "Şafakta ağ", en: "The net at dawn" } },
    { video: "operasyon-kasalama", cat: "operasyon", alt: { tr: "Kasalara dolum", en: "Filling the crates" } },
    { img: "g/orkinos-guvertede", cat: "operasyon", alt: { tr: "Güvertede orkinos", en: "Bluefin tuna on deck" } },
    { img: "g/operasyon-gece-isiklar-1", cat: "operasyon", alt: { tr: "Gece avı", en: "Fishing at night" } },
    { video: "operasyon-ag-atma", cat: "operasyon", alt: { tr: "Ağ denize bırakılıyor", en: "Paying out the net" } },
    { img: "g/operasyon-ag-cekme-1", cat: "operasyon", alt: { tr: "Gece ağ çekme", en: "Hauling at night" } },
    { img: "g/dursun-cinaroglu-rihtim-2", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU rıhtımda", en: "DURSUN ÇINAROĞLU alongside" } },
    { video: "operasyon-filika", cat: "operasyon", alt: { tr: "Filika", en: "The skiff" } },
    { img: "g/operasyon-ag-gun-dogumu-2", cat: "operasyon", alt: { tr: "Gün doğumunda ağ", en: "The net at sunrise" } },
    { img: "g/operasyon-kaptan-kosku-ekranlar", cat: "operasyon", alt: { tr: "Sonar ve seyir ekranları", en: "Sonar and navigation screens" } },
    { video: "operasyon-suru-agda-video", cat: "operasyon", alt: { tr: "Ağın içinde sürü", en: "The school inside the net" } },
    { img: "g/dursun-cinaroglu-2-liman-dag", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 limanda", en: "DURSUN ÇINAROĞLU 2 in port" } },
    { img: "g/operasyon-ag-cekme-3", cat: "operasyon", alt: { tr: "Ağ çekme, gece", en: "Hauling at night" } },
    { video: "hamsi-guvertede", cat: "operasyon", alt: { tr: "Güvertede buzlu hamsi", en: "Iced anchovy on deck" } },
    { img: "g/operasyon-vinc", cat: "operasyon", alt: { tr: "Vinç", en: "The crane" } },
    { img: "g/operasyon-ag-cekme-gunes", cat: "operasyon", alt: { tr: "Güneşte ağ çekme", en: "Hauling in the sun" } },
    { video: "operasyon-gece-isiklar-video", cat: "operasyon", alt: { tr: "Işıklar altında", en: "Under the lights" } },
    { img: "g/operasyon-ag-cekme-4", cat: "operasyon", alt: { tr: "Ağ başında mürettebat", en: "The crew at the net" } },
    { img: "g/dursun-cinaroglu-safakta", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU şafakta", en: "DURSUN ÇINAROĞLU at dawn" } },
    { video: "operasyon-ayiklama", cat: "operasyon", alt: { tr: "Ayıklama ızgarası", en: "The sorting grate" } },
    { img: "g/operasyon-kaptan-kosku-gece", cat: "operasyon", alt: { tr: "Gece kaptan köşkü", en: "The wheelhouse at night" } },
    { video: "operasyon-balik-oluk", cat: "operasyon", alt: { tr: "Av oluğu", en: "The catch chute" } },
    { img: "g/operasyon-gece-isiklar-2", cat: "operasyon", alt: { tr: "Gece avı, ışıklar", en: "Night fishing lights" } },
    { video: "dursun-cinaroglu-2-seyir-video", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 seyirde", en: "DURSUN ÇINAROĞLU 2 under way" } },
    { video: "operasyon-sonar-video-2", cat: "operasyon", alt: { tr: "Sonarda sürü", en: "The school on sonar" } },
    /* önceki gruplar */
    { img: "g/dursun-cinaroglu-seyir", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU seyirde", en: "DURSUN ÇINAROĞLU under way" } },
    { video: "orkinos-havuz-suru", cat: "operasyon", alt: { tr: "Orkinos sürüsü ve havuz", en: "Bluefin school and the cage" } },
    { img: "g/filo-gun-batimi", cat: "filo", alt: { tr: "Gün batımında filo", en: "The fleet at sunset" } },
    { img: "g/operasyon-suru-agda", cat: "operasyon", alt: { tr: "Ağın içinde sürü", en: "The school inside the net" } },
    { video: "dursun-cinaroglu-seyir-video-2", cat: "gemi", alt: { tr: "Gün batımında seyir", en: "Under way at sunset" } },
    { img: "g/dursun-cinaroglu-2-liman-4", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 limanda", en: "DURSUN ÇINAROĞLU 2 in port" } },
    { video: "operasyon-guvertede-av", cat: "operasyon", alt: { tr: "Güvertede av", en: "The catch on deck" } },
    { img: "g/operasyon-ag-guvertede", cat: "operasyon", alt: { tr: "Güvertede ağ ve vinç", en: "Net and crane on deck" } },
    { img: "g/cinarogullari-1-liman", cat: "gemi", alt: { tr: "ÇINAROĞULLARI-1", en: "ÇINAROĞULLARI-1" } },
    { img: "g/operasyon-ag-buzme", cat: "operasyon", alt: { tr: "Ağı büzme", en: "Pursing the net" } },
    { video: "filo-demirde-video", cat: "filo", alt: { tr: "Demirde üç gemi", en: "Three vessels at anchor" } },
    { img: "g/operasyon-orkinos-kafes", cat: "operasyon", alt: { tr: "Orkinos transfer kafesi", en: "Bluefin transfer cage" } },
    { img: "g/dursun-cinaroglu-gun-batimi-1", cat: "gemi", alt: { tr: "Gün batımında DURSUN ÇINAROĞLU", en: "DURSUN ÇINAROĞLU at sunset" } },
    { img: "g/operasyon-ag-yukaridan", cat: "operasyon", alt: { tr: "Ağ tepeden", en: "The net from above" } },
    { video: "operasyon-denizde-filo-2", cat: "operasyon", alt: { tr: "Denizde birlikte çalışan gemiler", en: "Vessels working together at sea" } },
    { video: "operasyon-sonar-video", cat: "operasyon", alt: { tr: "Sonarda sürü", en: "School on the sonar" } },
    { img: "g/operasyon-ag-toplama", cat: "operasyon", alt: { tr: "Güvertede ağ toplama", en: "Hauling the net on deck" } },
    { img: "g/filo-limanda-2", cat: "filo", alt: { tr: "Limanda gemilerimiz", en: "Our vessels in port" } },
    { video: "operasyon-kasalar", cat: "operasyon", alt: { tr: "Kasalarda av", en: "The catch in crates" } },
    { img: "g/operasyon-ag-denizde", cat: "operasyon", alt: { tr: "Ağ denizde", en: "The net in the water" } },
    { img: "g/operasyon-makine-dairesi", cat: "operasyon", alt: { tr: "Makine dairesi", en: "Engine room" } },
    { img: "g/dursun-cinaroglu-2-tersane-2", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 tersanede", en: "DURSUN ÇINAROĞLU 2 at the yard" } },
    { video: "operasyon-suru-gece-video", cat: "operasyon", alt: { tr: "Gece ağdaki sürü", en: "The school in the net at night" } },
    { img: "g/filo-gece-2", cat: "filo", alt: { tr: "Gece limanda", en: "In port at night" } },
    { img: "g/operasyon-sonar", cat: "operasyon", alt: { tr: "Sonar ekranı", en: "Sonar screen" } },
    { img: "g/dursun-cinaroglu-2-liman-1", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2", en: "DURSUN ÇINAROĞLU 2" } },
    { video: "operasyon-ada-onunde-video", cat: "operasyon", alt: { tr: "Akdeniz'de çalışma", en: "Working in the Mediterranean" } },
    { img: "g/filo-cinarogullari-1-yan-yana", cat: "filo", alt: { tr: "ÇINAROĞULLARI-1 ve filo", en: "ÇINAROĞULLARI-1 with the fleet" } },
    { img: "g/operasyon-ag-samandira", cat: "operasyon", alt: { tr: "Ağ ve şamandıralar", en: "Net and floats" } },
    { img: "g/dursun-cinaroglu-gun-batimi-2", cat: "gemi", alt: { tr: "Akşam seyri", en: "Evening run" } },
    { video: "operasyon-denizde-filo", cat: "operasyon", alt: { tr: "Denizde filo", en: "The fleet at sea" } },
    { img: "g/dursun-cinaroglu-2-tersane-3", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 bakımda", en: "DURSUN ÇINAROĞLU 2 in maintenance" } },
    { img: "g/operasyon-akdeniz-seyir", cat: "operasyon", alt: { tr: "Akdeniz'de seyir", en: "Under way in the Mediterranean" } },
    { img: "g/filo-limanda-1", cat: "filo", alt: { tr: "Yan yana gemilerimiz", en: "Our vessels side by side" } },
    { video: "dursun-cinaroglu-seyir-video-1", cat: "gemi", alt: { tr: "Seyirde", en: "Under way" } },
    { img: "g/operasyon-suru-gece", cat: "operasyon", alt: { tr: "Gece sürü", en: "The school at night" } },
    { img: "g/dursun-cinaroglu-tersane-1", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU tersanede", en: "DURSUN ÇINAROĞLU at the yard" } },
    { img: "g/dursun-cinaroglu-2-tersane-4", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 tersanede", en: "DURSUN ÇINAROĞLU 2 at the yard" } },
    { video: "operasyon-ag-gun-batimi", cat: "operasyon", alt: { tr: "Gün batımında ağ", en: "The net at sunset" } },
    { img: "g/operasyon-denizde-calisma", cat: "operasyon", alt: { tr: "Denizde çalışma", en: "Working at sea" } },
    { img: "g/filo-gece-1", cat: "filo", alt: { tr: "Gece limanda filo", en: "The fleet in port at night" } },
    { img: "g/dursun-cinaroglu-2-liman-2", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2", en: "DURSUN ÇINAROĞLU 2" } },
    { video: "operasyon-seyir-video", cat: "operasyon", alt: { tr: "Denizde seyir", en: "Under way at sea" } },
    { img: "g/dursun-cinaroglu-2-on-2", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 önden", en: "DURSUN ÇINAROĞLU 2 from the bow" } },
    { img: "g/operasyon-sonar-harita", cat: "operasyon", alt: { tr: "Sonar ve harita", en: "Sonar and chart" } },
    { img: "g/dursun-cinaroglu-gun-batimi-3", cat: "gemi", alt: { tr: "Akşam denizde", en: "Evening at sea" } },
    { video: "operasyon-yanasma", cat: "operasyon", alt: { tr: "Denizde yanaşma", en: "Coming alongside at sea" } },
    { img: "g/filo-liman-3", cat: "filo", alt: { tr: "Limanda", en: "In port" } },
    { img: "g/dursun-cinaroglu-2-liman-3", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2 rıhtımda", en: "DURSUN ÇINAROĞLU 2 at the quay" } },
    { video: "operasyon-denizde-calisma-video", cat: "operasyon", alt: { tr: "Denizde çalışma", en: "Working at sea" } },
    { img: "g/dursun-cinaroglu-liman-ag", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU ağlarla limanda", en: "DURSUN ÇINAROĞLU in port with nets" } },
    { img: "g/dursun-cinaroglu-2-tersane-1", cat: "gemi", alt: { tr: "Tersanede", en: "At the yard" } },
    { video: "operasyon-denizde-2-video", cat: "operasyon", alt: { tr: "Denizde", en: "At sea" } },
    { img: "g/dursun-cinaroglu-2-on-1", cat: "gemi", alt: { tr: "DURSUN ÇINAROĞLU 2", en: "DURSUN ÇINAROĞLU 2" } },
    { video: "operasyon-uzak-filo", cat: "operasyon", alt: { tr: "Uzakta çalışan filo", en: "The fleet working offshore" } },
    { video: "operasyon-gece-ag", cat: "operasyon", alt: { tr: "Gece ağda balık", en: "Fish in the net at night" } }
  ],

  /* =================================================================
     ARAYÜZ METİNLERİ / UI TEXT
     ================================================================= */
  i18n: {
    tr: {
      "meta.title": "Dursun Çınaroğlu Balıkçılık – Gırgır balıkçılığı",
      "meta.desc": "Üç gırgır gemisiyle Karadeniz, Marmara, Ege ve Akdeniz'de balıkçılık: hamsi, palamut, istavrit, sardalya, kolyoz ve orkinos.",
      "brand.sub": "BALIKÇILIK",
      "nav.about": "Hakkımızda", "nav.method": "Gırgır", "nav.catch": "Avımız", "nav.fleet": "Filo", "nav.equipment": "Ekipman", "nav.gallery": "Galeri", "nav.contact": "İletişim",
      "nav.menu": "Menü", "nav.close": "Kapat",
      "hero.eyebrow": "Karadeniz'den Akdeniz'e, Gırgır",
      "hero.title": "Karadeniz'den Malta açıklarına, üç gırgır gemisiyle balıkçılık yapıyoruz.",
      "hero.lead": "Üç gırgır gemimiz ve deneyimli mürettebatımızla hamsiden orkinosa, denizin en taze avını limana getiriyoruz.",
      "hero.cta1": "Filoyu gör", "hero.cta2": "Bize yazın",
      "hero.scroll": "Kaydır",
      "about.eyebrow": "Hakkımızda",
      "about.title": "Rumeli Kavağı'nda ahşap bir tekneyle başladık.",
      "about.p1": "Hikâyemiz İstanbul Boğazı'nın Karadeniz'e açıldığı yerde, Rumeli Kavağı'nda ahşap bir teknede başladı. Deniz o günden bu yana dört kuşaktır babadan oğula geçiyor.",
      "about.p2": "Bugün üç gırgır gemimiz tek bir limana bağlı değil; balık neredeyse oraya gidiyoruz: Karadeniz'de, Ege'de, Akdeniz'de. Gemilerimizin başında Dursun Dede'nin adı yazıyor: DURSUN ÇINAROĞLU.",
      "about.sign": "— Çınaroğlu ailesi",
      "about.badge": "Kuşak",
      "about.origin": "Başladığımız yer",
      "method.eyebrow": "Ne yapıyoruz",
      "method.title": "Gırgır: denizin en <em>seçici</em> avı.",
      "method.lead": "Gırgır, yüzeye yakın yüzen sürü balıklarını büyük bir çember ağla çevirip kese gibi kapatma yöntemidir. Hedef tür seçilerek avlanır; dip habitatına dokunmaz.",
      "catch.eyebrow": "Avımız",
      "catch.title": "Denizden <em>kasaya</em>.",
      "catch.lead": "Her tür kendi sezonunda, gırgırla seçici biçimde avlanır ve kasaya taze girer.",
      "sp.photo": "Foto",
      "sp.season": "Sezon", "sp.size": "Boy", "sp.area": "Saha", "sp.forms": "Sunum",
      "form.fresh": "Taze, kasa", "form.frozen": "Şoklanmış",
      "tuna.eyebrow": "Orkinos",
      "tuna.title": "Akdeniz'in <em>devi</em>.",
      "tuna.p1": "Her yıl Mayıs sonu ile Haziran sonu arasında, ICCAT kotası ve Bakanlık uygulama talimatı çerçevesinde Malta açıklarında, uluslararası sularda gırgırla avlanır.",
      "tuna.p2": "Sürü ağdan çıkarılmadan canlı olarak transfer havuzuna alınır ve stereo kamerayla sayılıp ölçülür. Havuzu besi çiftliğine yine kendi gırgırlarımız çeker: aynı gemiler hem avı yapar hem de havuzu taşır. Her sefer bağımsız ICCAT gözlemcisinin denetimindedir.",
      "tuna.flow": "Denizden çiftliğe",
      "areas.title": "Av sahalarımız",
      "map.eyebrow": "Av sahaları",
      "map.title": "Karadeniz'den <em>Akdeniz'e</em>.",
      "map.lead": "Sicil limanımız İstanbul'dan sezona göre dört ana sahada avlanıyoruz.",
      "map.port": "Sicil limanı",
      "map.aria": "Av sahalarımızı ve sicil limanımızı gösteren harita",
      "season.title": "Av takvimi",
      "season.lead": "Gırgır sezonu 1 Eylül'de açılır, 15 Nisan'da kapanır. Orkinos sezonu Mayıs sonu – Haziran arasındadır; geri kalan dönemde filomuz bakım ve hazırlıkta.",
      "season.open": "Gırgır sezonu", "season.tuna": "Orkinos sezonu", "season.closed": "Av yasağı ve bakım",
      "season.nowOpen": "Şu an av sezonu, kapanışa {n} gün",
      "season.nowTuna": "Şu an orkinos sezonu, kapanışa {n} gün",
      "season.nowClosed": "Şu an av yasağı, sezonun açılmasına {n} gün",
      "season.today": "Bugün",
      "season.ban": "Gırgır av yasağı ve bakım",
      "season.species": "Türler",
      "season.note": "Tarihler her yıl Bakanlık tebliği ve ICCAT kararlarıyla güncellenir.",
      "months": ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
      "monthsLong": ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
      "fleet.eyebrow": "Filomuz",
      "fleet.title": "Denize hazır <em>üç gemi</em>.",
      "fleet.lead": "Üç gırgır gemimiz Türk bayraklı, İstanbul siciline kayıtlı ve faal durumda. Boy ve makine bilgileri şirket kayıtlarımızdan, diğerleri Deniz Ticaret Odası gemi sicilindendir.",
      "fleet.details": "Detaylar", "fleet.less": "Detayları kapat",
      "fleet.ais": "MarineTraffic'te canlı konum",
      "fleet.source": "Kaynak: şirket kayıtları (boy, makine) ve Deniz Ticaret Odası gemi sicili; ≈ değerler AIS verisidir.",
      "spec.group.id": "Kimlik", "spec.group.dim": "Boyutlar & tonaj", "spec.group.power": "Makine", "spec.group.cap": "Kapasite & donanım",
      "spec.built": "Yapım yılı", "spec.yard": "Tersane", "spec.flag": "Bayrak", "spec.port": "Sicil limanı", "spec.callsign": "Çağrı işareti",
      "spec.mmsi": "MMSI", "spec.imo": "IMO",
      "spec.loa": "Tam boy", "spec.beam": "Genişlik", "spec.depth": "Kalıp derinliği", "spec.gt": "Gros ton (GRT)", "spec.nt": "Net ton (NRT)",
      "spec.engine": "Makine", "spec.aux": "Jeneratör", "spec.speed": "Seyir hızı",
      "spec.hold": "Ambar", "spec.chill": "Soğutma", "spec.crew": "Mürettebat", "spec.net": "Ağ (boy × derinlik)",
      "equip.eyebrow": "Ekipman",
      "equip.title": "Her gemide <em>aynı standart</em>.",
      "equip.lead": "Avın verimi kadar mürettebatın güvenliği ve balığın tazeliği için de en iyi donanımı kullanıyoruz.",
      "equip.photo": "Her gemide eksiksiz donanım",
      "quality.eyebrow": "Sorumluluk",
      "quality.title": "Denizi yarın da <em>bereketli</em> bırakmak için.",
      "gallery.eyebrow": "Galeri",
      "gallery.title": "Denizden kareler",
      "gallery.all": "Tümü", "gallery.gemi": "Gemiler", "gallery.filo": "Filo", "gallery.operasyon": "Operasyon", "gallery.video": "Videolar",
      "gallery.more": "Daha fazla göster",
      "contact.eyebrow": "İletişim",
      "contact.title": "Bize yazın.",
      "contact.lead": "Satış, iş birliği ve diğer tüm konular için e-posta ile ulaşabilirsiniz. En kısa sürede dönüş yapıyoruz.",
      "contact.copy": "Kopyala", "contact.copied": "Kopyalandı",
      "contact.where": "Konum", "contact.phone": "Telefon",
      "footer.rights": "Tüm hakları saklıdır.",
      "footer.top": "Başa dön",
      "footer.tagline": "Karadeniz'den Akdeniz'e gırgır balıkçılığı.",
      "footer.nav": "Site", "footer.contact": "İletişim",
      "fab": "Bize ulaşın", "fab.mail": "E-posta gönder",
      "contact.gmail": "Gmail ile yaz", "contact.app": "E-posta uygulaması", "contact.whatsapp": "WhatsApp'tan yaz", "contact.youtube": "YouTube kanalımız", "contact.instagram": "Instagram",
      "mail.subject": "Dursun Çınaroğlu Balıkçılık — Bilgi talebi", "wa.text": "Merhaba, web siteniz üzerinden ulaşıyorum.",
      "lb.prev": "Önceki", "lb.next": "Sonraki", "lb.close": "Kapat", "lb.zoom": "Büyüt",
      "lang.switch": "Switch to English"
    },
    en: {
      "meta.title": "Dursun Çınaroğlu Balıkçılık – Purse seine fishing",
      "meta.desc": "Purse seine fishing with three vessels in the Black Sea, Marmara, Aegean and Mediterranean: anchovy, bonito, horse mackerel, sardine, chub mackerel and bluefin tuna.",
      "brand.sub": "BALIKÇILIK",
      "nav.about": "About", "nav.method": "Purse seine", "nav.catch": "Our catch", "nav.fleet": "Fleet", "nav.equipment": "Equipment", "nav.gallery": "Gallery", "nav.contact": "Contact",
      "nav.menu": "Menu", "nav.close": "Close",
      "hero.eyebrow": "Black Sea to Mediterranean, Purse seine",
      "hero.title": "From the Black Sea to the waters off Malta, we fish with three purse seiners.",
      "hero.lead": "With three purse seiners and seasoned crews, we land the freshest catch of the sea — from anchovy to bluefin tuna.",
      "hero.cta1": "See the fleet", "hero.cta2": "Write to us",
      "hero.scroll": "Scroll",
      "about.eyebrow": "About us",
      "about.title": "We started in Rumeli Kavağı, in a wooden boat.",
      "about.p1": "Our story began in a wooden boat at Rumeli Kavağı, Istanbul, where the Bosphorus opens onto the Black Sea. For four generations since, the sea has passed from father to son.",
      "about.p2": "Today our three purse seiners are tied to no single port; we go wherever the fish are, in the Black Sea, the Aegean and the Mediterranean. Grandfather Dursun's name is painted on our bows: DURSUN ÇINAROĞLU.",
      "about.sign": "— The Çınaroğlu family",
      "about.badge": "Generations",
      "about.origin": "Where we began",
      "method.eyebrow": "What we do",
      "method.title": "Purse seining: the sea's most <em>selective</em> catch.",
      "method.lead": "A purse seine encircles a school of pelagic fish near the surface and closes beneath it like a drawstring bag. Target species are chosen; the seabed is never touched.",
      "catch.eyebrow": "Our catch",
      "catch.title": "From the sea <em>to the crate</em>.",
      "catch.lead": "Each species is fished in its own season, selectively by purse seine, and goes into the crate fresh.",
      "sp.photo": "Photo",
      "sp.season": "Season", "sp.size": "Size", "sp.area": "Ground", "sp.forms": "Supplied",
      "form.fresh": "Fresh, crate", "form.frozen": "Frozen",
      "tuna.eyebrow": "Bluefin tuna",
      "tuna.title": "Giant of the <em>Mediterranean</em>.",
      "tuna.p1": "Every year between late May and the end of June, bluefin is fished by purse seine off Malta, in international waters, under ICCAT quota and the Ministry's implementing rules.",
      "tuna.p2": "The school is moved alive into a transfer cage without leaving the water, and counted and sized by stereo camera. Our own purse seiners then tow the cage to the farm: the same vessels both make the catch and carry it. Every trip is supervised by an independent ICCAT observer.",
      "tuna.flow": "From sea to farm",
      "areas.title": "Fishing grounds",
      "map.eyebrow": "Fishing grounds",
      "map.title": "From the Black Sea <em>to the Mediterranean</em>.",
      "map.lead": "From our port of registry, Istanbul, we fish four main grounds, following the season.",
      "map.port": "Port of registry",
      "map.aria": "Map of our fishing grounds and port of registry",
      "season.title": "Fishing calendar",
      "season.lead": "The purse seine season opens on 1 September and closes on 15 April. Bluefin season runs from late May to June; the rest of the year our fleet is in maintenance and preparation.",
      "season.open": "Purse seine season", "season.tuna": "Bluefin season", "season.closed": "Closed season, maintenance",
      "season.nowOpen": "Season open now, {n} days until closure",
      "season.nowTuna": "Bluefin season now, {n} days until closure",
      "season.nowClosed": "Closed season now, {n} days until opening",
      "season.today": "Today",
      "season.ban": "Purse seine closure, maintenance",
      "season.species": "Species",
      "season.note": "Dates are updated each year by Ministry regulation and ICCAT decisions.",
      "months": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      "monthsLong": ["January","February","March","April","May","June","July","August","September","October","November","December"],
      "fleet.eyebrow": "Our fleet",
      "fleet.title": "<em>Three vessels</em>, ready for sea.",
      "fleet.lead": "Our three purse seiners are Turkish-flagged, registered in Istanbul and in active service. Length and engine figures are from our own records; other data from the Turkish Chamber of Shipping register.",
      "fleet.details": "Details", "fleet.less": "Hide details",
      "fleet.ais": "Live position on MarineTraffic",
      "fleet.source": "Source: company records (length, engines) and the Turkish Chamber of Shipping register; ≈ values are AIS data.",
      "spec.group.id": "Identity", "spec.group.dim": "Dimensions & tonnage", "spec.group.power": "Machinery", "spec.group.cap": "Capacity & gear",
      "spec.built": "Year built", "spec.yard": "Shipyard", "spec.flag": "Flag", "spec.port": "Port of registry", "spec.callsign": "Call sign",
      "spec.mmsi": "MMSI", "spec.imo": "IMO",
      "spec.loa": "Length overall", "spec.beam": "Beam", "spec.depth": "Moulded depth", "spec.gt": "Gross tonnage (GRT)", "spec.nt": "Net tonnage (NRT)",
      "spec.engine": "Machinery", "spec.aux": "Generators", "spec.speed": "Service speed",
      "spec.hold": "Hold", "spec.chill": "Chilling", "spec.crew": "Crew", "spec.net": "Net (length × depth)",
      "equip.eyebrow": "Equipment",
      "equip.title": "<em>One standard</em> on every vessel.",
      "equip.lead": "We use the best gear not only for a good catch, but for the safety of our crews and the freshness of every fish.",
      "equip.photo": "Fully equipped, every vessel",
      "quality.eyebrow": "Responsibility",
      "quality.title": "Leaving the sea <em>bountiful</em> for tomorrow.",
      "gallery.eyebrow": "Gallery",
      "gallery.title": "Moments at sea",
      "gallery.all": "All", "gallery.gemi": "Vessels", "gallery.filo": "Fleet", "gallery.operasyon": "Operations", "gallery.video": "Videos",
      "gallery.more": "Show more",
      "contact.eyebrow": "Contact",
      "contact.title": "Write to us.",
      "contact.lead": "For sales, partnerships or anything else, reach us by e-mail. We reply as soon as we can.",
      "contact.copy": "Copy", "contact.copied": "Copied",
      "contact.where": "Location", "contact.phone": "Phone",
      "footer.rights": "All rights reserved.",
      "footer.top": "Back to top",
      "footer.tagline": "Purse seine fishing from the Black Sea to the Mediterranean.",
      "footer.nav": "Site", "footer.contact": "Contact",
      "fab": "Contact us", "fab.mail": "Send e-mail",
      "contact.gmail": "Write with Gmail", "contact.app": "Mail app", "contact.whatsapp": "Message on WhatsApp", "contact.youtube": "Our YouTube channel", "contact.instagram": "Instagram",
      "mail.subject": "Dursun Çınaroğlu Balıkçılık — Enquiry", "wa.text": "Hello, I'm contacting you via your website.",
      "lb.prev": "Previous", "lb.next": "Next", "lb.close": "Close", "lb.zoom": "Enlarge",
      "lang.switch": "Türkçeye geç"
    }
  }
};
