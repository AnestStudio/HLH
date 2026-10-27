// 1. Mock Database of Curated Student Rooms
const ROOMS_DATA = [
  {
    id: 1,
    title: "The Sunlight Loft - Ngõ Tự Do",
    campus: "BACHKHOA",
    campusName: "ĐH Bách Khoa",
    distanceKm: 0.4,
    walkMin: 5,
    bikeMin: 2,
    price: 3.8,
    priceCategory: "25_40",
    area: 28,
    areaCategory: "MEDIUM",
    matchScore: 99,
    accentBg: "#FFF9DB",
    badgeText: "🔥 CÁCH CỔNG TRƯỜNG 350M",
    badgeBg: "var(--fa-mint)",
    verified: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    amenities: ["no_curfew", "loft", "balcony", "fingerprint"],
    amenityLabels: ["Không chung chủ", "Khóa vân tay"],
    address: "Ngõ 48 Tạ Quang Bửu, Hai Bà Trưng",
    radarX: 36,
    radarY: 32,
    electricityPrice: "3.5k/số",
    waterPrice: "80k/người"
  },
  {
    id: 2,
    title: "Skyline Studio Tầng Thượng",
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
    accentBg: "#F3D9FA",
    badgeText: "👑 Siêu Phẩm Ban Công",
    badgeBg: "var(--fa-yellow)",
    verified: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80",
    amenities: ["no_curfew", "balcony", "pet", "full_furniture"],
    amenityLabels: ["Nuôi Pet", "Ban công riêng"],
    address: "Phố Trần Đại Nghĩa (Sát KTX Kinh Tế)",
    radarX: 68,
    radarY: 28,
    electricityPrice: "Giá dân",
    waterPrice: "Giá dân"
  },
  {
    id: 3,
    title: "Box Trọ Xanh - Sát Cổng Phụ",
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
    accentBg: "#E6FCF5",
    badgeText: "🐷 Tiết Kiệm Nhất",
    badgeBg: "var(--fa-blue)",
    verified: true,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    amenities: ["no_curfew", "full_furniture", "fingerprint"],
    amenityLabels: ["Điều hòa", "Giờ tự do"],
    address: "Ngõ 130 Xuân Thủy, Cầu Giấy",
    radarX: 25,
    radarY: 64,
    electricityPrice: "3.8k/số",
    waterPrice: "70k/người"
  },
  {
    id: 4,
    title: "Duplex Gác Lửng Đôi Mới Xây",
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
    accentBg: "#FFF0F6",
    badgeText: "✨ Mới Xây 100%",
    badgeBg: "var(--fa-blue)",
    verified: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "loft", "balcony", "pet", "full_furniture"],
    amenityLabels: ["2 Giường riêng", "Gác xép rộng"],
    address: "Khu Tân Xã — Cách cổng ĐH FPT 1.4km",
    radarX: 74,
    radarY: 68,
    electricityPrice: "3.5k/số",
    waterPrice: "Miễn phí"
  },
  {
    id: 5,
    title: "Studio Ban Công Thoáng Cầu Giấy",
    campus: "CAUGIAY",
    campusName: "ĐH Sư Phạm",
    distanceKm: 0.8,
    walkMin: 9,
    bikeMin: 2,
    price: 3.2,
    priceCategory: "25_40",
    area: 25,
    areaCategory: "MEDIUM",
    matchScore: 93,
    accentBg: "#E7F5FF",
    badgeText: "☀️ Thoáng Sáng Tự Nhiên",
    badgeBg: "var(--fa-yellow)",
    verified: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "balcony", "full_furniture", "fingerprint"],
    amenityLabels: ["Ban công riêng", "Bếp khép kín"],
    address: "Số 18, Ngõ 165 Cầu Giấy, Hà Nội",
    radarX: 48,
    radarY: 22,
    electricityPrice: "3.5k/số",
    waterPrice: "30k/khối"
  },
  {
    id: 6,
    title: "Phòng Khép Kín Gần KTX Bách Khoa",
    campus: "BACHKHOA",
    campusName: "ĐH Bách Khoa",
    distanceKm: 0.3,
    walkMin: 4,
    bikeMin: 1,
    price: 2.5,
    priceCategory: "25_40",
    area: 22,
    areaCategory: "SMALL",
    matchScore: 91,
    accentBg: "#FFF4E6",
    badgeText: "🛡️ An Ninh Tối Đa",
    badgeBg: "var(--fa-mint)",
    verified: true,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    amenities: ["no_curfew", "full_furniture", "fingerprint"],
    amenityLabels: ["Camera 24/7", "Wifi cực mạnh"],
    address: "Ngõ 30 Tạ Quang Bửu, Bách Khoa",
    radarX: 62,
    radarY: 77,
    electricityPrice: "3.5k/số",
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

// Current Filter State (Defaults to ALL & 5.0km to show all 6 rooms on load)
let currentFilters = {
  campus: "ALL",
  maxDistance: 5.0,
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

// Render 3 Cards per Row Grid
function renderBentoGrid(rooms) {
  const container = document.getElementById("bentoContainer");
  if (!container) return;

  // Rotate room list based on shuffleOffset so different rooms take the spotlight
  let displayList = [...rooms];
  if (shuffleOffset > 0 && displayList.length > 1) {
    const shift = shuffleOffset % displayList.length;
    displayList = displayList.slice(shift).concat(displayList.slice(0, shift));
  }

  function renderRoomCard(room) {
    const isSaved = savedRoomIds.has(room.id);

    return `
      <article class="bento-item" style="background-color: ${room.accentBg};">
        <div>
          <div class="room-img-wrapper" style="height: 200px;">
            <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.title)}" onerror="this.src='https://placehold.co/800x500/183153/FFD43B?text=HoLaHome+360'">
            
            <!-- Top Floating Stickers -->
            <div class="position-absolute top-0 start-0 p-3 d-flex flex-wrap gap-2">
              <span class="fa-badge sticker-rotate-left" style="background: ${room.badgeBg};">
                ${escapeHtml(room.badgeText)}
              </span>
              <span class="fa-badge bg-white">
                <i class="fa-solid fa-heart-circle-check text-danger"></i> ${room.matchScore}% Hợp Gu
              </span>
            </div>
          </div>

          <!-- Room Content Body -->
          <div class="p-3 p-lg-4">
            <h3 class="fs-5 fw-semibold mb-1">${escapeHtml(room.title)}</h3>
            <p class="small fw-semibold mb-2 text-muted">
              <i class="fa-solid fa-location-dot text-danger me-1"></i> ${escapeHtml(room.address)}
            </p>

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

            <!-- Amenity Mini Tags & Electricity/Water Badges -->
            <div class="d-flex flex-wrap gap-1 mb-2">
              ${room.amenityLabels.map(label => `
                <span class="badge bg-white text-dark border border-2 border-dark fw-semibold" style="font-size:0.75rem;">
                  <i class="fa-solid fa-check text-success me-1"></i>${escapeHtml(label)}
                </span>
              `).join('')}
              <span class="badge bg-white text-dark border border-2 border-dark fw-semibold" style="font-size:0.75rem;">
                <i class="fa-solid fa-bolt text-warning me-1"></i>Điện: ${escapeHtml(room.electricityPrice)}
              </span>
              <span class="badge bg-white text-dark border border-2 border-dark fw-semibold" style="font-size:0.75rem;">
                <i class="fa-solid fa-droplet text-primary me-1"></i>Nước: ${escapeHtml(room.waterPrice)}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer Action Row -->
        <div class="px-3 px-lg-4 py-2 d-flex justify-content-between align-items-center border-top border-2 border-dark bg-white bg-opacity-75">
          <div class="d-flex align-items-baseline gap-1">
            <span class="fs-5 fw-black text-danger bento-price">${room.price} Triệu</span>
            <span class="text-muted fw-semibold">/tháng</span>
          </div>
          <div class="d-flex gap-2">
            <button class="fa-btn ${isSaved ? 'fa-btn-yellow' : 'fa-btn-white'} py-1 px-2" title="${isSaved ? 'Bỏ lưu' : 'Lưu phòng này'}" onclick="toggleSaveRoom(${room.id})">
              <i class="${isSaved ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  container.innerHTML = displayList.map(room => renderRoomCard(room)).join('');
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
            <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.title)}" onerror="this.src='https://placehold.co/600x400/183153/FFD43B?text=HoLaHome'">
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex gap-2 mb-2">
              <span class="fa-badge" style="background: var(--fa-yellow);">${room.price} Triệu / tháng</span>
              <span class="fa-badge" style="background: var(--fa-mint);">${room.area}m²</span>
            </div>
            <p class="fw-semibold mb-2"><i class="fa-solid fa-location-dot text-danger me-1"></i> ${escapeHtml(room.address)}</p>
            <p class="small fw-semibold bg-light p-3 rounded-3 border border-2 border-dark">
              Phòng đã được đội ngũ <strong>HoLaHome</strong> kiểm tra thực tế: Hợp đồng minh bạch, không thu phí dịch vụ trung gian, cam kết đúng hình ảnh 100%.
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
  textDiv.className = "fw-semibold small flex-grow-1";
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
