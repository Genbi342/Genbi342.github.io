// GENBI Phase 1 BETA — vanilla JS

const CATEGORY_LABEL = {
  sight: "見る / SIGHT",
  food: "食べる / FOOD",
  onsen: "温泉 / ONSEN",
  experience: "体験 / EXPERIENCE",
  drive: "ドライブ / DRIVE",
  rest: "休憩 / REST"
};
const AREA_LABEL = {
  genbikei: "厳美渓",
  middle342: "342ミドル",
  sukawa: "須川"
};

// Photo spot candidates: subset of SPOTS marked visually strong (Phase 1: derived from sight/onsen spots)
const PHOTO_SPOT_IDS = ["spot-001", "spot-004", "spot-006", "spot-007"];
const PHOTO_SPOT_EXTRA = {
  "spot-001": { bestTime: "7:00–9:00", season: "新緑・紅葉シーズン" },
  "spot-004": { bestTime: "日中(桜: 4月中旬〜下旬)", season: "春" },
  "spot-006": { bestTime: "午前中", season: "夏〜初秋(冬期休業)" },
  "spot-007": { bestTime: "午後", season: "夏〜初秋(冬期休業)" }
};

function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

// Mobile nav toggle
const menuBtn = $("#menuBtn");
const mobileNav = $("#mobileNav");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $all("a", mobileNav).forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));
}

// Hero video: only attempt if reduced-motion is not requested; fall back to poster gracefully
(function setupHero() {
  const video = $("#heroVideo");
  const fallback = $("#heroFallback");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!video) return;
  if (prefersReduced) {
    video.remove();
    return;
  }
  video.addEventListener("error", () => {
    video.style.display = "none";
    if (fallback) fallback.style.display = "block";
  });
  video.addEventListener("canplay", () => {
    video.style.display = "block";
  });
  // Trigger load attempt; if source missing this simply errors out (handled above)
  video.load();
})();

// Render photo spots
function renderPhotoSpots() {
  const el = $("#photoSpotScroll");
  if (!el || typeof SPOTS === "undefined") return;
  const items = PHOTO_SPOT_IDS
    .map(id => SPOTS.find(s => s.id === id))
    .filter(Boolean);
  el.innerHTML = items.map(spot => {
    const extra = PHOTO_SPOT_EXTRA[spot.id] || {};
    return `
      <div class="photo-card">
        <div class="thumb">写真準備中<br>Photo pending</div>
        <div class="body">
          <h3>${spot.name}</h3>
          <div class="meta">
            ${extra.bestTime ? `<span class="tag">BEST TIME ${extra.bestTime}</span>` : ""}
            ${extra.season ? `<span class="tag">${extra.season}</span>` : ""}
          </div>
          <p style="font-size:.8rem;color:#666;margin:10px 0 0;">${spot.description}</p>
          <a class="maplink" style="margin-top:10px;display:inline-flex;" href="${spot.mapUrl}" target="_blank" rel="noopener" data-event="map_click" data-spot-id="${spot.id}" data-page-type="photospots">📍 Google Mapsで開く</a>
        </div>
      </div>`;
  }).join("");
}

// Render spot grid with filters
let activeArea = "all";
let activeCat = "all";

function renderSpots() {
  const el = $("#spots");
  if (!el || typeof SPOTS === "undefined") return;
  const filtered = SPOTS.filter(s =>
    (activeArea === "all" || s.area === activeArea) &&
    (activeCat === "all" || s.category === activeCat)
  );
  if (filtered.length === 0) {
    el.innerHTML = `<p style="grid-column:1/-1;color:#888;font-size:.85rem;">該当するスポットが見つかりませんでした。</p>`;
    return;
  }
  el.innerHTML = filtered.map(spot => `
    <a class="spot-card" href="#" data-spot-id="${spot.id}">
      <div class="thumb">写真準備中<br>Photo pending</div>
      <div class="body">
        <div class="cat">${CATEGORY_LABEL[spot.category] || spot.category} ・ ${AREA_LABEL[spot.area] || spot.area}</div>
        <h3>${spot.name}</h3>
        <p class="desc">${spot.description}</p>
        <div class="facts">
          ${spot.hours ? `<div>営業: ${spot.hours}</div>` : ""}
          ${spot.price ? `<div>料金: ${spot.price}</div>` : ""}
          ${spot.parking ? `<div>駐車場: ${spot.parking}</div>` : ""}
        </div>
        <span class="maplink" data-event="map_click" data-spot-id="${spot.id}" data-page-type="spots">📍 Google Mapsで開く</span>
      </div>
    </a>
  `).join("");
}

function openSpotDetail(id) {
  const spot = SPOTS.find(s => s.id === id);
  if (!spot) return;
  const modal = $("#spotDetail");
  const body = $("#spotDetailBody");
  const rows = [
    ["カテゴリー", CATEGORY_LABEL[spot.category] || spot.category],
    ["住所", spot.address],
    ["営業時間", spot.hours],
    ["定休日", spot.closed],
    ["料金", spot.price],
    ["電話番号", spot.phone],
    ["駐車場", spot.parking],
    ["トイレ", spot.toilet],
    ["注意点", spot.caution],
    ["最終確認日", spot.verifiedAt]
  ].filter(([, v]) => v);

  body.innerHTML = `
    <button class="spot-detail-close" id="spotDetailClose" aria-label="閉じる">✕</button>
    <div class="cat">${CATEGORY_LABEL[spot.category] || spot.category} ・ ${AREA_LABEL[spot.area] || spot.area}</div>
    <h3>${spot.name}</h3>
    ${spot.unofficialGuide ? `<div class="unofficial-note">このページはGENBIが独自にまとめた案内情報です。店舗・施設の公式ページではありません。</div>` : ""}
    <p>${spot.description}</p>
    <div class="dl">
      ${rows.map(([k, v]) => `<div class="row"><div class="k">${k}</div><div>${v}</div></div>`).join("")}
    </div>
    <a class="btn btn-primary" href="${spot.mapUrl}" target="_blank" rel="noopener" data-event="map_click" data-spot-id="${spot.id}" data-page-type="detail">Google Mapsで開く / OPEN IN MAPS</a>
    ${spot.officialUrl ? `<p style="margin-top:14px;"><a href="${spot.officialUrl}" target="_blank" rel="noopener" style="font-size:.85rem;color:#0f9b8e;">公式サイトを見る →</a></p>` : ""}
    <p style="margin-top:16px;font-size:.72rem;color:#999;">出典: ${spot.source || "現地確認"} / 最終確認日: ${spot.verifiedAt}</p>
  `;
  modal.classList.add("open");
  $("#spotDetailClose").addEventListener("click", closeSpotDetail);
}
function closeSpotDetail() {
  $("#spotDetail").classList.remove("open");
}
$("#spotDetail")?.addEventListener("click", (e) => {
  if (e.target.id === "spotDetail") closeSpotDetail();
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".spot-card");
  if (card) {
    e.preventDefault();
    openSpotDetail(card.dataset.spotId);
  }
});

// Filters
function setupFilters() {
  $all("#areaFilters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $all("#areaFilters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeArea = btn.dataset.area;
      renderSpots();
    });
  });
  $all("#catFilters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $all("#catFilters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.dataset.cat;
      renderSpots();
    });
  });
}

// Render routes
function renderRoutes() {
  const el = $("#routeList");
  if (!el || typeof ROUTES === "undefined") return;
  el.innerHTML = ROUTES.map(route => {
    const spotNames = route.spots
      .map(id => (SPOTS.find(s => s.id === id) || {}).name)
      .filter(Boolean);
    return `
      <div class="route-card">
        <h3>${route.title}</h3>
        <div class="dur">${route.duration}(目安)</div>
        <div class="target">対象: ${route.target} / 季節: ${route.season}</div>
        <div class="route-steps">${spotNames.map(n => `<span>${n}</span>`).join(" → ")}</div>
        ${route.caution ? `<p style="font-size:.78rem;color:#7a6a4a;margin-top:10px;">⚠ ${route.caution}</p>` : ""}
      </div>`;
  }).join("");
}

// Map click tracking hook (no-op until analytics tool is chosen; keeps data attributes ready)
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-event='map_click']");
  if (!el) return;
  if (window.gtag) {
    window.gtag("event", "map_click", {
      spot_id: el.dataset.spotId,
      page_type: el.dataset.pageType
    });
  }
});

renderPhotoSpots();
renderSpots();
renderRoutes();
setupFilters();
