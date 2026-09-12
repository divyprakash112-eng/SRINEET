const institutes = [
  {
    id: "pw",
    name: "Physics Wallah",
    short: "PW",
    description: "NEET preparation & test series",
    logo: "assets/logos/pw.png"
  },

  {
    id: "aakash",
    name: "Aakash Institute",
    short: "A",
    description: "NEET preparation & assessment",
    logo: "assets/logos/aakash.png"
  },

  {
    id: "allen",
    name: "ALLEN",
    short: "ALLEN",
    description: "NEET test series & practice",
    logo: "assets/logos/allen.png"
  },

  {
    id: "narayana",
    name: "Narayana",
    short: "N",
    description: "NEET test series",
    logo: "assets/logos/narayana.png"
  },

  {
    id: "unacademy",
    name: "Unacademy",
    short: "U",
    description: "NEET mock tests & preparation",
    logo: "assets/logos/unacademy.png"
  },

  {
    id: "motion",
    name: "Motion Education",
    short: "M",
    description: "NEET mock tests",
    logo: "assets/logos/motion.png"
  },

  {
    id: "resonance",
    name: "Resonance",
    short: "R",
    description: "NEET test papers",
    logo: "assets/logos/resonance.png"
  },

  {
    id: "vedantu",
    name: "Vedantu",
    short: "V",
    description: "NEET mock tests & practice",
    logo: "assets/logos/vedantu.png"
  },

  {
    id: "sri-chaitanya",
    name: "Sri Chaitanya",
    short: "SC",
    description: "NEET preparation tests",
    logo: "assets/logos/sri-chaitanya.png"
  },

  {
    id: "career-point",
    name: "Career Point",
    short: "CP",
    description: "NEET test series",
    logo: "assets/logos/career-point.png"
  }
];


const instituteGrid = document.getElementById("instituteGrid");


function createInstituteCard(institute, index) {

  const card = document.createElement("a");

  card.className = "institute-card";

  /*
    IMPORTANT:
    Abhi batch page nahi banaya hai.
    Isliye temporarily institute path ban raha hai.

    Future:
    institute.html?id=pw
  */

  card.href = `institute.html?id=${encodeURIComponent(institute.id)}`;

  card.innerHTML = `
    
    <div class="institute-number">
      ${String(index + 1).padStart(2, "0")}
    </div>

    <div class="institute-arrow">
      ↗
    </div>

    <div class="logo-box">

      <img
        src="${institute.logo}"
        alt="${institute.name} logo"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
      >

      <span
        class="logo-fallback"
        style="display:none;"
      >
        ${institute.short}
      </span>

    </div>

    <h3>${institute.name}</h3>

    <p>${institute.description}</p>

    <div class="open-label">
      EXPLORE TESTS
    </div>

  `;

  instituteGrid.appendChild(card);
}


institutes.forEach(createInstituteCard);


/* =========================
   DRAWER
========================= */

const menuBtn = document.getElementById("menuBtn");
const closeDrawer = document.getElementById("closeDrawer");
const drawer = document.getElementById("drawer");
const drawerOverlay = document.getElementById("drawerOverlay");


function openDrawer() {
  drawer.classList.add("show");
  drawerOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}


function closeMenu() {
  drawer.classList.remove("show");
  drawerOverlay.classList.remove("show");
  document.body.style.overflow = "";
}


menuBtn.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeMenu);
drawerOverlay.addEventListener("click", closeMenu);


/* ESC key */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeMenu();
  }

});
