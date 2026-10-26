// 1. Mock Database of Curated Student Rooms
const ROOMS_DATA = [
  {
    id: 1,
    title: "Penthouse Mini Gác Xép Gỗ Thông — Cửa Sổ Kính Tràn Viền",
    campus: "BACHKHOA",
    campusName: "ĐH Bách Khoa",
    distanceKm: 0.4,
    walkMin: 5,
    bikeMin: 2,
    price: 3.2,
    priceCategory: "25_40",
    area: 28,
    areaCategory: "MEDIUM",
    matchScore: 99,
    bentoSpan: "bento-hero",
    accentBg: "#FFF9DB",
    badgeText: "🔥 CÁCH CỔNG TRƯỜNG 400M",
    badgeBg: "var(--fa-yellow)",
    verified: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    amenities: ["no_curfew", "loft", "balcony", "full_furniture", "fingerprint"],
    amenityLabels: ["Không chung chủ", "Gác xép cao 1m8", "Ban công thoáng", "Khóa vân tay"],
    address: "Ngõ 48 Tạ Quang Bửu, Hai Bà Trưng",
    radarX: 36,
    radarY: 32,
    electricityPrice: "3.5k/số",
    waterPrice: "80k/người"
  },
  {
    id: 2,
    title: "Studio Ban Công Cây Xanh — Ngập Nắng Sáng",
    campus: "BACHKHOA",
    campusName: "ĐH Kinh Tế Quốc Dân",
    distanceKm: 0.9,
    walkMin: 11,
    bikeMin: 3,
    price: 4.5,
    priceCategory: "OVER_40",
    area: 34,
    areaCategory: "LARGE",
    matchScore: 97,
    bentoSpan: "bento-tall",
    accentBg: "#E6FCF5",
    badgeText: "🌿 NUÔI THÚ CƯNG OK",
    badgeBg: "var(--fa-mint)",
    verified: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "balcony", "pet", "full_furniture", "fingerprint"],
    amenityLabels: ["Nuôi Pet thoải mái", "Ban công 4m²", "Máy giặt riêng", "Giờ tự do"],
    address: "Phố Trần Đại Nghĩa (Sát KTX Kinh Tế)",
    radarX: 68,
    radarY: 28,
    electricityPrice: "Giá dân",
    waterPrice: "Giá dân"
  },
  {
    id: 3,
    title: "Phòng Đơn Tối Giản Nhật Bản — Giá Sinh Viên",
    campus: "CAUGIAY",
    campusName: "ĐH Quốc Gia Cầu Giấy",
    distanceKm: 0.6,
    walkMin: 7,
    bikeMin: 2,
    price: 2.3,
    priceCategory: "UNDER_25",
    area: 20,
    areaCategory: "SMALL",
    matchScore: 95,
    bentoSpan: "bento-wide",
    accentBg: "#F3D9FA",
    badgeText: "💎 SIÊU TIẾT KIỆM < 2.5TR",
    badgeBg: "var(--fa-purple)",
    verified: true,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "full_furniture", "fingerprint"],
    amenityLabels: ["Đủ điều hòa, nóng lạnh", "Giờ tự do", "Khu an ninh cao"],
    address: "Ngõ 130 Xuân Thủy, Cầu Giấy",
    radarX: 25,
    radarY: 64,
    electricityPrice: "3.8k/số",
    waterPrice: "70k/người"
  },
  {
    id: 4,
    title: "Duplex Gác Lửng Đôi — Cực Hợp Ở Nhóm 2-3 Bạn",
    campus: "FPT",
    campusName: "ĐH FPT Hòa Lạc",
    distanceKm: 1.4,
    walkMin: 16,
    bikeMin: 4,
    price: 3.6,
    priceCategory: "25_40",
    area: 32,
    areaCategory: "LARGE",
    matchScore: 94,
    bentoSpan: "bento-medium",
    accentBg: "#E7F5FF",
    badgeText: "✨ MỚI XÂY 100%",
    badgeBg: "var(--fa-blue)",
    verified: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "loft", "balcony", "pet", "full_furniture"],
    amenityLabels: ["2 Giường tách biệt", "Có gác xép rộng", "Sân để xe miễn phí"],
    address: "Khu Tân Xã — Cách cổng ĐH FPT 1.4km",
    radarX: 74,
    radarY: 68,
    electricityPrice: "3.5k/số",
    waterPrice: "Miễn phí"
  },
  {
    id: 5,
    title: "Căn Hộ Mini Gần Cổng Trường — Có Bếp Tách Riêng",
    campus: "VINH",
    campusName: "Đại Học Vinh",
    distanceKm: 0.5,
    walkMin: 6,
    bikeMin: 2,
    price: 2.2,
    priceCategory: "UNDER_25",
    area: 25,
    areaCategory: "MEDIUM",
    matchScore: 98,
    bentoSpan: "bento-wide",
    accentBg: "#FFE3E3",
    badgeText: "🔥 SÁT ĐẠI HỌC VINH 500M",
    badgeBg: "var(--fa-coral)",
    verified: true,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "balcony", "full_furniture", "fingerprint"],
    amenityLabels: ["Bếp riêng không ám mùi", "Ban công phơi đồ", "Cổng vân tay"],
    address: "Đường Bạch Liêu, TP. Vinh, Nghệ An",
    radarX: 48,
    radarY: 22,
    electricityPrice: "3.2k/số",
    waterPrice: "50k/người"
  },
  {
    id: 6,
    title: "Loft Industrial Cực Nghệ — View Hồ Thoáng Mát",
    campus: "CAUGIAY",
    campusName: "ĐH Quốc Gia Cầu Giấy",
    distanceKm: 1.8,
    walkMin: 20,
    bikeMin: 5,
    price: 4.2,
    priceCategory: "OVER_40",
    area: 30,
    areaCategory: "MEDIUM",
    matchScore: 92,
    bentoSpan: "bento-medium",
    accentBg: "#FFF9DB",
    badgeText: "📸 GÓC SỐNG ẢO CỰC CHẤT",
    badgeBg: "var(--fa-yellow)",
    verified: true,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "loft", "balcony", "pet", "full_furniture", "fingerprint"],
    amenityLabels: ["Decor chuẩn Studio", "Nuôi thú cưng", "Thang máy tốc độ cao"],
    address: "Phố Duy Tân / Dịch Vọng Hậu, Cầu Giấy",
    radarX: 62,
    radarY: 77,
    electricityPrice: "3.8k/số",
    waterPrice: "80k/người"
  }
];

// Helper to sanitize HTML strings
function escapeHtml(str) {
  if (typeof str !== 'string') return str == null ? '' : String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Current Filter State
let currentFilters = {
  campus: "BACHKHOA",
  maxDistance: 2.5,
  price: "ALL",
  area: "ALL",
  amenities: [],
  showcaseMode: "bento",
  selectedRadarRoomId: 1
};

const savedRoomIds = new Set([1, 2]);

// Initialize UI on Load
document.addEventListener("DOMContentLoaded", () => {
  updateSavedBadge();
  renderAllSections();
});

// Update Distance Slider Badge
function updateDistanceDisplay(val) {
  currentFilters.maxDistance = parseFloat(val);
  const bikeMin = Math.max(1, Math.round(currentFilters.maxDistance * 2.5));
  const badge = document.getElementById("distanceBadge");
  if (badge) {
    badge.innerHTML = `&le; ${val} km (~${bikeMin} phút đi xe)`;
  }
  renderAllSections();
}

// Select Price Pill
function selectPricePill(btn) {
  document.querySelectorAll("#priceFilterGroup .filter-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilters.price = btn.getAttribute("data-price");
  renderAllSections();
}

// Select Area Pill
function selectAreaPill(btn) {
  document.querySelectorAll("#areaFilterGroup .filter-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilters.area = btn.getAttribute("data-area");
  renderAllSections();
}

// Toggle Amenity
function toggleAmenity(btn) {
  btn.classList.toggle("active");
  const key = btn.getAttribute("data-amenity");
  if (currentFilters.amenities.includes(key)) {
    currentFilters.amenities = currentFilters.amenities.filter(item => item !== key);
  } else {
    currentFilters.amenities.push(key);
  }
  renderAllSections();
}

// Handle Campus Dropdown Change
function handleFilterChange() {
  const select = document.getElementById("campusSelect");
  if (!select) return;
  currentFilters.campus = select.value;

  const campusLabels = {
    "ALL": "Tất cả ĐH",
    "BACHKHOA": "ĐH Bách Khoa",
    "CAUGIAY": "ĐH Quốc Gia",
    "FPT": "ĐH FPT",
    "VINH": "Đại Học Vinh"
  };
  const centerLabel = document.getElementById("radarCenterLabel");
  if (centerLabel) {
    centerLabel.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${campusLabels[currentFilters.campus] || "Tâm Trường"}`;
  }
  renderAllSections();
}

// Reset Filters
function resetAllFilters() {
  currentFilters = {
    campus: "ALL",
    maxDistance: 5.0,
    price: "ALL",
    area: "ALL",
    amenities: [],
    showcaseMode: currentFilters.showcaseMode,
    selectedRadarRoomId: 1
  };
  const campusSelect = document.getElementById("campusSelect");
  if (campusSelect) campusSelect.value = "ALL";
  const distanceRange = document.getElementById("distanceRange");
  if (distanceRange) distanceRange.value = 5.0;
  const distanceBadge = document.getElementById("distanceBadge");
  if (distanceBadge) distanceBadge.innerHTML = `&le; 5.0 km (~12 phút đi xe)`;
  const centerLabel = document.getElementById("radarCenterLabel");
  if (centerLabel) {
    centerLabel.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> Tất cả ĐH`;
  }

  document.querySelectorAll("#priceFilterGroup .filter-pill").forEach((b, i) => b.classList.toggle("active", i === 0));
  document.querySelectorAll("#areaFilterGroup .filter-pill").forEach((b, i) => b.classList.toggle("active", i === 0));
  document.querySelectorAll("#amenityGroup .amenity-toggle").forEach(b => b.classList.remove("active"));

  renderAllSections();
  showToast("Đã đặt lại toàn bộ bộ lọc tìm kiếm!");
}

// Filter Rooms Logic
function getFilteredRooms() {
  return ROOMS_DATA.filter(room => {
    const matchCampus = currentFilters.campus === "ALL" || room.campus === currentFilters.campus;
    const matchDistance = room.distanceKm <= currentFilters.maxDistance;
    const matchPrice = currentFilters.price === "ALL" || room.priceCategory === currentFilters.price;
    const matchArea = currentFilters.area === "ALL" || room.areaCategory === currentFilters.area;
    const matchAmenities = currentFilters.amenities.every(a => room.amenities.includes(a));
    return matchCampus && matchDistance && matchPrice && matchArea && matchAmenities;
  });
}

// Render Both Bento Showcase & Radar Map
function renderAllSections() {
  const filtered = getFilteredRooms();
  const isFallback = filtered.length === 0;
  const displayRooms = isFallback ? ROOMS_DATA : filtered;

  const countBadge = document.getElementById("liveResultCount");
  if (countBadge) {
    if (isFallback) {
      countBadge.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-warning"></i> Gợi ý mở rộng: ${ROOMS_DATA.length} phòng nổi bật`;
    } else {
      countBadge.innerHTML = `<i class="fa-solid fa-fire text-danger"></i> Đang khớp: ${filtered.length} phòng cực phẩm`;
    }
  }

  if (document.getElementById("bentoContainer")) {
    renderBentoGrid(displayRooms, isFallback);
  }
  if (document.getElementById("radarPinsLayer")) {
    renderRadarMap(displayRooms);
  }
}

let shuffleOffset = 0;

// Render Asymmetric Bento Grid
function renderBentoGrid(rooms) {
  const container = document.getElementById("bentoContainer");
  if (!container) return;

  // Rotate room list based on shuffleOffset so different rooms take the Hero & Spotlight positions
  let displayList = [...rooms];
  if (shuffleOffset > 0 && displayList.length > 1) {
    const shift = shuffleOffset % displayList.length;
    displayList = displayList.slice(shift).concat(displayList.slice(0, shift));
  }

  const roommateCardHtml = `
    <article class="bento-item bento-col-4" data-category="low" style="background: #FFF0F6;">
      <span class="fa-sticker sticker-top-right" style="background: var(--fa-yellow);">
        <i class="fa-solid fa-handshake-angle"></i> Góc Ở Ghép 50/50
      </span>
      <div class="p-4 d-flex flex-column justify-content-between h-100">
        <div>
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="rounded-circle border border-3 border-dark d-flex align-items-center justify-content-center fw-bold fs-4"
                 style="width: 58px; height: 58px; background: var(--fa-yellow); box-shadow: var(--shadow-sm);">
              🧑‍💻
            </div>
            <div>
              <h4 class="h5 mb-0">Tìm 1 Bạn Nam Ở Ghép</h4>
              <span class="badge bg-info text-dark border border-dark">SV Năm 3 - CNTT</span>
            </div>
          </div>

          <p class="small fw-semibold mb-3"
             style="background: var(--fa-white); border: var(--border-medium); padding: 0.75rem; border-radius: var(--radius-sm);">
            "Phòng 32m² gác xép, full điều hòa, máy giặt, cách cổng trường 600m. Cần tìm bạn ở ghép sạch sẽ, văn minh, chia đôi tiền phòng!"
          </p>

          <div class="d-flex flex-wrap gap-1 mb-2">
            <span class="distance-pill"><i class="fa-solid fa-couch"></i> Đủ đồ 100%</span>
            <span class="distance-pill"><i class="fa-solid fa-wifi"></i> Wifi Mesh</span>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center pt-2 border-top border-2 border-dark">
          <div>
            <span class="small fw-bold d-block text-muted">Chia tiền phòng chỉ:</span>
            <span class="price-tag-brutal py-1 px-2 fs-6" style="background: var(--fa-coral);">1.65 Triệu/người</span>
          </div>
          <button class="fa-btn fa-btn-mint py-2 px-3" onclick="showToast('Đã gửi lời mời kết nối tới Tuấn Anh (SV CNTT)!')">
            <i class="fa-solid fa-comments"></i> Nhắn làm quen
          </button>
        </div>
      </div>
    </article>
  `;

  function renderRoomCard(room, spanClass, imgHeight) {
    const isHero = spanClass === "bento-hero";
    const isSaved = savedRoomIds.has(room.id);

    return `
      <article class="bento-item ${spanClass}" style="background-color: ${room.accentBg};">
        <div>
          <div class="room-img-wrapper" style="height: ${imgHeight};">
            <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.title)}" onerror="this.src='https://placehold.co/800x500/183153/FFD43B?text=TroAwesome+360'">
            
            <!-- Top Floating Stickers -->
            <div class="position-absolute top-0 start-0 p-3 d-flex flex-wrap gap-2">
              <span class="fa-badge sticker-rotate-left" style="background: ${room.badgeBg};">
                ${escapeHtml(room.badgeText)}
              </span>
              <span class="fa-badge bg-white">
                <i class="fa-solid fa-heart-circle-check text-danger"></i> ${room.matchScore}% Hợp Gu
              </span>
            </div>

            <!-- Price Tag Pill -->
            <div class="position-absolute bottom-0 end-0 m-3">
              <span class="fa-badge fs-6 px-3 py-2" style="background: var(--fa-yellow); font-size: 1rem !important;">
                <i class="fa-solid fa-tag"></i> ${room.price} Triệu/tháng
              </span>
            </div>
          </div>

          <!-- Room Content Body -->
          <div class="p-3 p-lg-4">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span class="badge rounded-pill border border-2 border-dark text-dark" style="background: var(--fa-white);">
                <i class="fa-solid fa-graduation-cap text-primary me-1"></i> ${escapeHtml(room.campusName)} (${room.distanceKm} km)
              </span>
              <span class="badge rounded-pill border border-2 border-dark text-dark" style="background: var(--fa-white);">
                <i class="fa-solid fa-person-walking text-success me-1"></i> ${room.walkMin}p đi bộ / ${room.bikeMin}p xe máy
              </span>
              <span class="badge rounded-pill border border-2 border-dark text-dark" style="background: var(--fa-white);">
                <i class="fa-solid fa-expand me-1"></i> ${room.area}m²
              </span>
            </div>

            <h3 class="${isHero ? 'fs-3' : 'fs-5'} fw-bold mb-2">${escapeHtml(room.title)}</h3>
            <p class="small fw-semibold mb-3 text-muted">
              <i class="fa-solid fa-location-dot text-danger me-1"></i> ${escapeHtml(room.address)}
            </p>

            <!-- Amenity Mini Tags -->
            <div class="d-flex flex-wrap gap-1 mb-2">
              ${room.amenityLabels.map(label => `
                <span class="badge bg-white text-dark border border-2 border-dark fw-bold" style="font-size:0.75rem;">
                  <i class="fa-solid fa-check text-success me-1"></i>${escapeHtml(label)}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Action Row -->
        <div class="px-3 px-lg-4 pb-3 pt-2 d-flex justify-content-between align-items-center border-top border-2 border-dark bg-white bg-opacity-75">
          <div class="small fw-bold">
            <i class="fa-solid fa-bolt text-warning"></i> Điện: ${escapeHtml(room.electricityPrice)} • Nước: ${escapeHtml(room.waterPrice)}
          </div>
          <div class="d-flex gap-2">
            <button class="fa-btn ${isSaved ? 'fa-btn-yellow' : 'fa-btn-white'} py-1 px-2" title="${isSaved ? 'Bỏ lưu' : 'Lưu phòng này'}" onclick="toggleSaveRoom(${room.id})">
              <i class="${isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}"></i>
            </button>
            <button class="fa-btn fa-btn-yellow py-1 px-3 small" onclick="openQuickPeek(${room.id})">
              <i class="fa-solid fa-eye"></i> Xem 360°
            </button>
          </div>
        </div>
      </article>
    `;
  }

  let htmlParts = [];
  const total = displayList.length;

  if (total === 1) {
    htmlParts.push(renderRoomCard(displayList[0], "bento-col-8", "260px"));
    htmlParts.push(roommateCardHtml);
  } else if (total === 2) {
    htmlParts.push(renderRoomCard(displayList[0], "bento-wide", "240px"));
    htmlParts.push(renderRoomCard(displayList[1], "bento-medium", "240px"));
    htmlParts.push(roommateCardHtml.replace("bento-col-4", "bento-full"));
  } else if (total === 3) {
    htmlParts.push(renderRoomCard(displayList[0], "bento-hero", "290px"));
    htmlParts.push(renderRoomCard(displayList[1], "bento-tall", "260px"));
    htmlParts.push(renderRoomCard(displayList[2], "bento-col-8", "230px"));
    htmlParts.push(roommateCardHtml);
  } else if (total === 4) {
    htmlParts.push(renderRoomCard(displayList[0], "bento-hero", "290px"));
    htmlParts.push(renderRoomCard(displayList[1], "bento-tall", "260px"));
    htmlParts.push(renderRoomCard(displayList[2], "bento-col-8", "230px"));
    htmlParts.push(roommateCardHtml);
    htmlParts.push(renderRoomCard(displayList[3], "bento-full", "230px"));
  } else {
    // 5 or more rooms:
    // Row 1 & 2: 7 + 5 = 12 columns
    htmlParts.push(renderRoomCard(displayList[0], "bento-hero", "290px"));
    htmlParts.push(renderRoomCard(displayList[1], "bento-tall", "260px"));
    // Row 3: 6 + 6 = 12 columns
    htmlParts.push(renderRoomCard(displayList[2], "bento-wide", "210px"));
    htmlParts.push(renderRoomCard(displayList[3], "bento-medium", "210px"));
    // Row 4: 8 + 4 = 12 columns
    htmlParts.push(renderRoomCard(displayList[4], "bento-col-8", "220px"));
    htmlParts.push(roommateCardHtml);

    // Remaining rooms (e.g. room 6 and beyond):
    for (let i = 5; i < total; i++) {
      const isLastOdd = (i === total - 1) && ((total - 5) % 2 === 1);
      const span = isLastOdd ? "bento-full" : ((i % 2 === 1) ? "bento-wide" : "bento-medium");
      htmlParts.push(renderRoomCard(displayList[i], span, "210px"));
    }
  }

  container.innerHTML = htmlParts.join('');
}

// Switch between Bento and List view safely
function switchShowcaseMode(mode) {
  currentFilters.showcaseMode = mode;
  const btnBento = document.getElementById("btnBentoView");
  const btnDeck = document.getElementById("btnDeckView");
  if (btnBento) btnBento.className = mode === "bento" ? "fa-btn fa-btn-yellow active-pressed" : "fa-btn fa-btn-white";
  if (btnDeck) btnDeck.className = mode === "polaroid" ? "fa-btn fa-btn-yellow active-pressed" : "fa-btn fa-btn-white";
  renderAllSections();
}

// Render Interactive Campus Radar Map & Pins
function renderRadarMap(rooms) {
  const pinsLayer = document.getElementById("radarPinsLayer");
  if (!pinsLayer) return;

  if (rooms.length === 0) {
    pinsLayer.innerHTML = '';
    return;
  }

  // Ensure selected room exists in current list
  if (!rooms.some(r => r.id === currentFilters.selectedRadarRoomId)) {
    currentFilters.selectedRadarRoomId = rooms[0].id;
  }

  pinsLayer.innerHTML = rooms.map(room => {
    const isActive = room.id === currentFilters.selectedRadarRoomId;
    return `
      <div class="radar-pin ${isActive ? 'active-pin active' : ''}"
           style="pointer-events: auto; left: ${room.radarX}%; top: ${room.radarY}%;"
           onclick="selectRadarRoom(${room.id})">
        <i class="fa-solid fa-house-chimney text-primary"></i>
        <span>${room.price}Tr</span>
        <span class="badge rounded-pill bg-dark text-white" style="font-size:0.65rem;">${room.distanceKm}km</span>
      </div>
    `;
  }).join('');

  const activeRoom = rooms.find(r => r.id === currentFilters.selectedRadarRoomId) || rooms[0];
  renderRadarInspector(activeRoom);
}

function selectRadarRoom(roomId) {
  currentFilters.selectedRadarRoomId = roomId;
  const activeRoom = ROOMS_DATA.find(r => r.id === roomId);
  if (activeRoom) {
    renderRadarInspector(activeRoom);
  }
  // Update pin active state visually without full redraw
  document.querySelectorAll('#radarPinsLayer .radar-pin').forEach((pin, idx) => {
    const currentRooms = getFilteredRooms().length > 0 ? getFilteredRooms() : ROOMS_DATA;
    if (currentRooms[idx]) {
      pin.classList.toggle('active', currentRooms[idx].id === roomId);
      pin.classList.toggle('active-pin', currentRooms[idx].id === roomId);
    }
  });
}

function renderRadarInspector(room) {
  if (!room) return;
  const titleEl = document.getElementById('radarRoomTitle');
  const priceEl = document.getElementById('radarRoomPrice');
  const badgeEl = document.getElementById('radarBadge');
  const walkEl = document.getElementById('radarWalkTime');
  const descEl = document.getElementById('radarRoomDesc');

  if (titleEl) titleEl.textContent = room.title;
  if (priceEl) priceEl.textContent = `${room.price} Triệu/th`;
  if (badgeEl) badgeEl.textContent = `Cách ${room.campusName}: ${room.distanceKm} km`;
  if (walkEl) walkEl.innerHTML = `<i class="fa-solid fa-person-walking"></i> ${room.walkMin} phút đi bộ (~${room.bikeMin}p xe máy)`;
  if (descEl) descEl.textContent = `${room.address}. Tiện ích: ${room.amenityLabels.join(', ')}. Điện ${room.electricityPrice}, nước ${room.waterPrice}.`;
}

// Open Room Quick-Peek Modal
function openQuickPeek(roomId) {
  const room = ROOMS_DATA.find(r => r.id === roomId);
  if (!room) return;

  const titleEl = document.getElementById("peekModalTitle");
  if (titleEl) {
    titleEl.innerHTML = `<i class="fa-solid fa-house-circle-check me-2"></i>${escapeHtml(room.title)}`;
  }

  const bodyEl = document.getElementById("peekModalBody");
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="row g-4">
        <div class="col-md-6">
          <div class="room-img-wrapper rounded-4" style="height: 280px; border: var(--border-thick);">
            <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.title)}" onerror="this.src='https://placehold.co/600x400/183153/FFD43B?text=TroAwesome'">
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex gap-2 mb-2">
              <span class="fa-badge" style="background: var(--fa-yellow);">${room.price} Triệu / tháng</span>
              <span class="fa-badge" style="background: var(--fa-mint);">${room.area}m²</span>
            </div>
            <p class="fw-bold mb-2"><i class="fa-solid fa-location-dot text-danger me-1"></i> ${escapeHtml(room.address)}</p>
            <p class="small fw-semibold bg-light p-3 rounded-3 border border-2 border-dark">
              Phòng đã được đội ngũ <strong>TrọAwesome</strong> kiểm tra thực tế: Hợp đồng minh bạch, không thu phí dịch vụ trung gian, cam kết đúng hình ảnh 100%.
            </p>
            <div class="mb-3">
              <strong class="d-block mb-2">Tiện ích có sẵn:</strong>
              <div class="d-flex flex-wrap gap-2">
                ${room.amenityLabels.map(l => `<span class="fa-badge bg-white"><i class="fa-solid fa-check text-success"></i> ${escapeHtml(l)}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button class="fa-btn fa-btn-mint w-100 justify-content-center" onclick="showToast('Đã gửi yêu cầu hẹn xem phòng qua Zalo chủ nhà!')">
              <i class="fa-solid fa-calendar-check"></i> Hẹn Xem Phòng Ngay
            </button>
          </div>
        </div>
      </div>
    `;
  }
  const modalEl = document.getElementById("roomQuickPeekModal");
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

// Save Room Toggle
function toggleSaveRoom(roomId) {
  const room = ROOMS_DATA.find(r => r.id === roomId);
  if (!room) return;
  if (savedRoomIds.has(roomId)) {
    savedRoomIds.delete(roomId);
    showToast(`Đã bỏ lưu "${room.title}"!`);
  } else {
    savedRoomIds.add(roomId);
    showToast(`Đã lưu "${room.title}" vào yêu thích!`);
  }
  updateSavedBadge();
  renderAllSections();
}

function updateSavedBadge() {
  const badge = document.getElementById("savedCountBadge");
  if (badge) {
    badge.textContent = savedRoomIds.size;
  }
}

function showSavedToast() {
  showToast(`Bạn đang lưu ${savedRoomIds.size} phòng trọ yêu thích!`);
}

function showPostModal() {
  showToast("Mở trình đăng tin chính chủ miễn phí 100%!");
}

// Shuffling Bento
function shuffleBentoHighlight() {
  shuffleOffset++;
  const filtered = getFilteredRooms();
  const displayRooms = filtered.length === 0 ? ROOMS_DATA : filtered;
  renderBentoGrid(displayRooms);
  showToast('Đã đổi góc nhìn và sắp xếp ngẫu nhiên bộ sưu tập Bento!');
}

// Safe Toast Notification (DOM-safe, no innerHTML injection of message)
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "fa-card p-3 mb-2 d-flex align-items-center gap-3";
  toast.style.background = "var(--fa-yellow)";
  toast.style.minWidth = "290px";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-bell fs-4";

  const textDiv = document.createElement("div");
  textDiv.className = "fw-bold small flex-grow-1";
  textDiv.textContent = message; // Safe textContent!

  toast.appendChild(icon);
  toast.appendChild(textDiv);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
