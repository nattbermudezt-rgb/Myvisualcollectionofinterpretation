// ── PAIRS (each folder = one pair) ──────────────────────────
// original = original interpretation
// reimagined = new visual interpretation

const BASE = "assets/cards/";
const CARD_BACK = BASE + "rationalback.png";

const placeholderSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='980' viewBox='0 0 700 980'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23ffc68f' offset='0'/%3E%3Cstop stop-color='%23ff8ca4' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='700' height='980' rx='32'/%3E%3Ctext x='50%25' y='44%25' fill='%235a1f35' font-size='40' text-anchor='middle' font-family='Georgia'%3EImage not found%3C/text%3E%3C/svg%3E";

const pairs = [
  {
    title: "Rationale",
    back:       "rationale/rationalback.png",
    original:   "rationale/rationalcard.png",
    reimagined: "rationale/rationalcard.png",
    singleCard: true,
  },
  {
    title: "Pair 1",
    back:       "parejas01/cartas%23a02.png",
    original:   "parejas01/cartas%23a01.png",
    reimagined: "parejas01/cartas%23b03.png",
  },
  {
    title: "Pair 2",
    back:       "parejas02/cartas%23c5.png",
    original:   "parejas02/cartas%23c05.png",
    reimagined: "parejas02/cartas%23d06.png",
  },
  {
    title: "Pair 3",
    back:       "pareja03/cartas%23e09.png",
    original:   "pareja03/carta%23e08.png",
    reimagined: "pareja03/cartas%23i10.png",
  },
  {
    title: "Pair 4",
    back:       "pareja04/cartas%23f13.png",
    original:   "pareja04/cartas%23f12.png",
    reimagined: "pareja04/cartas%23g14.png",
  },
  {
    title: "Pair 5",
    back:       "pareja05/cartas%23h17.png",
    original:   "pareja05/cartas%23h16.png",
    reimagined: "pareja05/cartas%23j18.png",
  },
  {
    title: "Pair 7",
    back:       "pareja07/cartas%23k21.png",
    original:   "pareja07/cartas%23k20.png",
    reimagined: "pareja07/cartas%2322.png",
  },
  {
    title: "Pair 8",
    back:       "pareja08/cartas_m25.png",
    original:   "pareja08/cartas%23m24.png",
    reimagined: "pareja08/cartas%23%C3%B126.png",
  },
  {
    title: "Pair 9",
    back:       "pareja09/cartas%23o29.png",
    original:   "pareja09/cartas%23o28.png",
    reimagined: "pareja09/cartas%23p30.png",
  },
  {
    title: "Pair 10",
    back:       "pareja10/cartas%23q33.png",
    original:   "pareja10/cartas%23q32.png",
    reimagined: "pareja10/cartas%23rs34.png",
  },
  {
    title: "Pair 11",
    back:       "pareja11/cartas%23r35.png",
    original:   "pareja11/cartas%23r34.png",
    reimagined: "pareja11/cartas%23s36.png",
  },
];

// ── DOM REFS ─────────────────────────────────────────────────

const intro           = document.getElementById("intro");
const deckStage       = document.getElementById("deckStage");
const startBtn        = document.getElementById("startBtn");

const gallerySection  = document.getElementById("gallerySection");
const galleryGrid     = document.getElementById("galleryGrid");
const musicBtnGallery = document.getElementById("musicBtnGallery");
const homeBtnGallery  = document.getElementById("homeBtnGallery");

const pairSection     = document.getElementById("pairSection");
const pairCounter     = document.getElementById("pairCounter");
const pairTitle       = document.getElementById("pairTitle");
const pairView        = document.getElementById("pairView");
const cardOriginalImg = document.querySelector("#cardOriginal img");
const cardNewImg      = document.querySelector("#cardNew img");
const prevBtn         = document.getElementById("prevBtn");
const nextBtn         = document.getElementById("nextBtn");
const backBtn         = document.getElementById("backBtn");
const homeBtnPair     = document.getElementById("homeBtnPair");
const zoomBtn         = document.getElementById("zoomBtn");
const musicBtn        = document.getElementById("musicBtn");

const zoomModal       = document.getElementById("zoomModal");
const zoomOriginal    = document.getElementById("zoomOriginal");
const zoomNew         = document.getElementById("zoomNew");
const closeZoomBtn    = document.getElementById("closeZoomBtn");

// HTML5 Audio player
var bgAudio = document.getElementById("bgAudio");
bgAudio.volume = 0.4;

let currentPair = 0;

// ── DECK SCATTER ANIMATION ───────────────────────────────────

function buildDeck() {
  const totalCards = 16;
  const columns = 7;
  const columnSpacing = 145;
  const rowSpacing = 62;
  const baseYOffset = -140;

  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("span");
    card.className = "deck-card";

    const column = i % columns;
    const row = Math.floor(i / columns);
    const angle = (Math.random() * 18 - 9).toFixed(2);
    const jitterX = Math.random() * 24 - 12;
    const jitterY = Math.random() * 24 - 12;
    const x = ((column - (columns - 1) / 2) * columnSpacing + jitterX).toFixed(1) + "px";
    const y = (baseYOffset + row * rowSpacing + column * 13 + jitterY).toFixed(1) + "px";

    card.style.setProperty("--x", x);
    card.style.setProperty("--y", y);
    card.style.setProperty("--r", angle + "deg");
    card.style.setProperty("--delay", (i * 0.04).toFixed(2) + "s");
    deckStage.appendChild(card);
  }
}

// ── GALLERY ──────────────────────────────────────────────────
// Each tile shows the pair back. Click to open pair detail.

function buildGallery() {
  galleryGrid.innerHTML = "";

  pairs.forEach(function(pair, index) {
    var item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.setAttribute("aria-label", "View " + pair.title);

    item.innerHTML =
      '<div class="gallery-back-wrap">' +
        '<img class="gallery-back-img" src="' + BASE + pair.back + '" alt="Back of ' + pair.title + '" />' +
        '<span class="gallery-pair-num">' + (index + 1) + '</span>' +
      '</div>' +
      '<p class="gallery-item-label">' + pair.title + '</p>';

    var backImg = item.querySelector(".gallery-back-img");
    backImg.onerror = function() { backImg.src = placeholderSvg; };

    item.addEventListener("click", function() { openPairFromGallery(index); });
    galleryGrid.appendChild(item);
  });
}

function revealCardsSequentially() {
  var items = galleryGrid.querySelectorAll(".gallery-item");
  items.forEach(function(item, i) {
    setTimeout(function() { item.classList.add("visible"); }, 180 + i * 65);
  });
}

// ── PAIR VIEW ────────────────────────────────────────────────

function withFallback(imgEl, src, alt) {
  imgEl.src = src;
  imgEl.alt = alt;
  imgEl.onerror = function() { imgEl.src = placeholderSvg; };
}

function renderPair(index, withTurn) {
  var pair = pairs[index];
  pairCounter.textContent = (index + 1) + " / " + pairs.length;
  pairTitle.textContent = pair.title;

  withFallback(cardOriginalImg, BASE + pair.original, "Original interpretation");
  withFallback(cardNewImg, BASE + pair.reimagined, "New visual interpretation");

  // Hide second card slot for singleCard entries (e.g. Rationale)
  var cardNewPane = document.getElementById("cardNewPane");
  if (pair.singleCard) {
    cardNewPane.style.visibility = "hidden";
  } else {
    cardNewPane.style.visibility = "";
  }

  if (withTurn) {
    pairView.classList.remove("turning");
    void pairView.offsetWidth;
    pairView.classList.add("turning");
  }

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === pairs.length - 1;
}

function openPairFromGallery(index) {
  currentPair = index;
  gallerySection.classList.add("hidden");
  pairSection.classList.remove("hidden");
  renderPair(currentPair);
}

// ── ZOOM ─────────────────────────────────────────────────────
// Shows both cards of the selected pair in the modal.

function openZoom() {
  var pair = pairs[currentPair];

  // Front face: pair back
  withFallback(document.getElementById("zoomBackImg1"), BASE + pair.back, "Back " + pair.title);
  withFallback(document.getElementById("zoomBackImg2"), BASE + pair.back, "Back " + pair.title);

  // Back face: illustrations (revealed on flip)
  withFallback(zoomOriginal, BASE + pair.original, "Original interpretation");
  withFallback(zoomNew, BASE + pair.reimagined, "New visual interpretation");

  // Reset flip state and title
  document.getElementById("zoomCard1").classList.remove("flipped");
  document.getElementById("zoomCard2").classList.remove("flipped");
  document.getElementById("zoomTitle").textContent = pair.title;

  // Hide second card in zoom for singleCard entries
  var zoomCard2 = document.getElementById("zoomCard2");
  if (pair.singleCard) {
    zoomCard2.style.display = "none";
  } else {
    zoomCard2.style.display = "";
  }

  zoomModal.classList.remove("hidden");
}

function closeZoom() {
  zoomModal.classList.add("hidden");
}

// ── HOME / RESET ─────────────────────────────────────────────

function goHome() {
  closeZoom();
  pairSection.classList.add("hidden");
  gallerySection.classList.add("hidden");
  intro.classList.remove("hidden");
  startBtn.disabled = false;
  deckStage.classList.remove("scattered");
  bgAudio.pause();
  syncMusicBtns(false);
}

// ── MUSIC ────────────────────────────────────────────────────

function syncMusicBtns(playing) {
  var label = playing ? "Music: On" : "Music: Off";
  [musicBtn, musicBtnGallery].forEach(function(btn) {
    if (btn) {
      btn.textContent = label;
      btn.setAttribute("aria-pressed", String(playing));
    }
  });
}

function isMusicPlaying() {
  return !bgAudio.paused;
}

function toggleMusic() {
  if (isMusicPlaying()) {
    bgAudio.pause();
    syncMusicBtns(false);
  } else {
    bgAudio.play();
    syncMusicBtns(true);
  }
}

// ── INIT ─────────────────────────────────────────────────────

function startPresentation() {
  deckStage.classList.add("scattered");
  startBtn.disabled = true;
  setTimeout(function() {
    intro.classList.add("hidden");
    gallerySection.classList.remove("hidden");
    buildGallery();
    revealCardsSequentially();
  }, 1300);
}

function setupEvents() {
  startBtn.addEventListener("click", startPresentation);

  if (homeBtnGallery) homeBtnGallery.addEventListener("click", goHome);
  if (homeBtnPair)    homeBtnPair.addEventListener("click", goHome);

  backBtn.addEventListener("click", function() {
    pairSection.classList.add("hidden");
    gallerySection.classList.remove("hidden");
  });

  nextBtn.addEventListener("click", function() {
    if (currentPair < pairs.length - 1) {
      currentPair++;
      renderPair(currentPair, true);
    }
  });

  prevBtn.addEventListener("click", function() {
    if (currentPair > 0) {
      currentPair--;
      renderPair(currentPair, true);
    }
  });

  zoomBtn.addEventListener("click", openZoom);
  document.getElementById("cardOriginal").addEventListener("click", openZoom);
  document.getElementById("cardNew").addEventListener("click", openZoom);

  // Independent flip for each card in zoom
  document.getElementById("zoomCard1").addEventListener("click", function() {
    this.classList.toggle("flipped");
  });
  document.getElementById("zoomCard2").addEventListener("click", function() {
    this.classList.toggle("flipped");
  });

  closeZoomBtn.addEventListener("click", closeZoom);
  zoomModal.addEventListener("click", function(e) {
    if (e.target === zoomModal) closeZoom();
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeZoom();
    if (!pairSection.classList.contains("hidden")) {
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "ArrowLeft") prevBtn.click();
    }
  });

  musicBtn.addEventListener("click", toggleMusic);
  if (musicBtnGallery) musicBtnGallery.addEventListener("click", toggleMusic);
}

buildDeck();
setupEvents();
