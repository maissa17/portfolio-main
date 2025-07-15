
let isPresentationFinished = false;
let typewriterTimeout;
let current = 0;
let items = [];
let isInProjectMode = false; 
// ==================== TOGGLE DARK/LIGHT MODE ====================
document.addEventListener("DOMContentLoaded", function () {
    const modeBtn = document.createElement('button');
    modeBtn.textContent = '☀️ / 🌙';
    modeBtn.style.position = 'fixed';
    modeBtn.style.top = '20px';
    modeBtn.style.right = '20px';
    modeBtn.style.zIndex = '1000';
    modeBtn.style.padding = '10px 16px';
    modeBtn.style.background = '#232323';
    modeBtn.style.color = '#fff';
    modeBtn.style.border = '2px solid #777';
    modeBtn.style.borderRadius = '8px';
    modeBtn.style.cursor = 'pointer';
    modeBtn.style.fontFamily = 'inherit';
    modeBtn.style.fontSize = '1.2rem';
    modeBtn.classList.add("theme-toggle-btn");

    
  document.body.appendChild(modeBtn);


  const theme = localStorage.getItem("theme");
const applyTheme = (mode) => {
  document.body.classList.toggle("dark-mode", mode === "dark");
  document.body.classList.toggle("light-mode", mode === "light");
  modeBtn.textContent = mode === "dark" ? "🌙" : "☀️";
  modeBtn.style.background = mode === "dark" ? "#1e1e3f" : "#fbf497"; // 💙 ou 💛
  modeBtn.style.color = mode === "dark" ? "#f0f0f0" : "#222";
  modeBtn.style.borderColor = mode === "dark" ? "#1e1e3f" : "#fbf497";
};

  applyTheme(theme === "light" ? "light" : "dark");


  modeBtn.addEventListener("click", function () {
    modeBtn.disabled = true;
    modeBtn.style.opacity = "0.6";
    modeBtn.style.pointerEvents = "none";
    modeBtn.style.transform = "scale(0.95)";

    const isLight = document.body.classList.contains("light-mode");
    const newTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);

    setTimeout(() => {
      modeBtn.disabled = false;
      modeBtn.style.opacity = "1";
      modeBtn.style.pointerEvents = "auto";
      modeBtn.style.transform = "scale(1)";
    }, 600);
  });
});

function stopIntro() {
  clearTimeout(typewriterTimeout);
  isPresentationFinished = true;
}

function resetToIntro() {
  stopIntro();
  const introText = "Bonjour, je m'appelle Maissa et je suis une développeuse passionnée. J'ai créé ce portfolio pour vous présenter mes projets et les technologies que j'utilise.";
  const descriptionBox = document.querySelector(".box3 #presentation-text");
  const inventoryItems = document.querySelectorAll(".inventory .item");

  descriptionBox.textContent = "";
  inventoryItems.forEach(item => item.textContent = "");

  let index = 0;
  function typeWriter() {
    if (index < introText.length) {
      descriptionBox.textContent += introText.charAt(index);
      index++;
      typewriterTimeout = setTimeout(typeWriter, 50);
    } else {
      isPresentationFinished = true;
    }
  }

  isPresentationFinished = false;
  typeWriter();
}
let isShowingDailyLanguages = false;
let dailyLangagesInUse = false; 

const dailyLanguages = Array.from(document.querySelectorAll("#inventory .item")).map(item => item.getAttribute("data-lang") || "");

function updateDisplay(project, forceDaily = false) {
  const descriptionBox = document.querySelector(".box3 #presentation-text");
  const inventoryItems = document.querySelectorAll("#inventory .item");

  descriptionBox.classList.remove("fade");
  void descriptionBox.offsetWidth;
  descriptionBox.classList.add("fade");

  document.getElementById("inventory").classList.remove("hidden");
  document.getElementById("autre").classList.add("hidden");

  const useDaily = forceDaily || dailyLangagesInUse;

  if (useDaily) {
      isInProjectMode = false; 
    inventoryItems.forEach((item, index) => {
      const langage = dailyLanguages[index] || "";
      item.textContent = langage;
      item.setAttribute("data-lang", langage);
    });
   
    return;
  }
else {
    isInProjectMode = true; 
    
}
  const langUsed = project?.dataset.lang?.split(",") || ["Langages non spécifiés"];
  const projectDesc = project?.dataset.desc || "Aucune description disponible.";
  descriptionBox.textContent = projectDesc;

  inventoryItems.forEach((item, index) => {
    const langage = langUsed[index]?.trim() || "";
    item.textContent = langage;
    item.setAttribute("data-lang", langage);
  });
}

function updateCarousel(index) {
  current = index;
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  if (isPresentationFinished && items[current]) {
    updateDisplay(items[current]);
  }
}



document.addEventListener("DOMContentLoaded", () => {
    if (items.length) {

  const activeItem = document.querySelector(".carousel-item.active") || items[0];
  if (activeItem && typeof updateDisplay === "function") {
    updateDisplay(activeItem);
  }
}

  items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".arrow-prev");
  const nextBtn = document.querySelector(".arrow-next");
  const projetsLink = document.querySelector("a[href='#projects']");
  const groupeProjet = document.getElementById("groupeProjet");
  const aboutSection = document.getElementById("about");
  const descriptionBox = document.querySelector(".box3 #presentation-text");


  resetToIntro();

  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + items.length) % items.length;
      updateCarousel(current);
    });

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % items.length;
      updateCarousel(current);
    });
    updateCarousel(current);
  }

 
 if (projetsLink && groupeProjet) {
  projetsLink.addEventListener("click", (event) => {
    event.preventDefault();

    if (groupeProjet.classList.contains("show")) {
      groupeProjet.classList.remove("show");

     setTimeout(() => {
    groupeProjet.style.display = "none";
    if (aboutSection) aboutSection.style.display = "block";
    resetToIntro();

   
    updateDisplay(null, true);
  }, 400);
} else {
  
      groupeProjet.style.display = "block";

      setTimeout(() => {
        groupeProjet.classList.add("show");
      }, 10);

      stopIntro();
      descriptionBox.textContent = "";

     
      document.getElementById("inventory").classList.remove("hidden");
      document.getElementById("autre").classList.add("hidden");

      document.querySelector(".box3").style.display = "block";

     
      items = document.querySelectorAll(".carousel-item");
      const activeItem = document.querySelector(".carousel-item.active") || items[0];

      if (activeItem && typeof updateDisplay === "function") {
        updateDisplay(activeItem); 
      }

      if (aboutSection) aboutSection.style.display = "none";
      isPresentationFinished = true;
    }
  });
}

  
 items.forEach(project => {
  project.addEventListener("mouseover", () => {
   
    if (!isShowingDailyLanguages && project.classList.contains("active")) {
      updateDisplay(project);
    }
  });
});


 

  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      const targetId = button.getAttribute("data-target");
      document.querySelectorAll(".inventory").forEach(section => {
        section.classList.add("hidden");
      });
      document.getElementById(targetId).classList.remove("hidden");
    });
  });

 
  const chronoLinks = document.querySelectorAll("a[href='#item1'], a[href='#item2']");
  const boxes = [document.getElementById("item1"), document.getElementById("item2")];
  let activeId = null;

  boxes.forEach(box => box.style.display = "none");
  chronoLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      if (activeId === targetId) {
        document.getElementById(targetId).style.display = "none";
        activeId = null;
      } else {
        boxes.forEach(box => {
          box.style.display = (box.id === targetId) ? "block" : "none";
        });
        activeId = targetId;
      }
    });
  });


});

document.addEventListener("DOMContentLoaded", function () {
  const contactLink = document.querySelector('a[href="#contact"]');
  const cvSection = document.getElementById("contact");
  const presentationSection = document.getElementById("about");
  const presentationBox = document.querySelector(".box3");

  
  cvSection.style.display = "none";

  contactLink.addEventListener("click", function (event) {
    event.preventDefault();

 
    const isCvVisible = getComputedStyle(cvSection).display !== "none";

    if (isCvVisible) {
  
      cvSection.style.display = "none";
      if (presentationSection) presentationSection.style.display = "block";
      if (presentationBox) presentationBox.style.display = "block";
    } else {
      
      cvSection.style.display = "block";
      if (presentationSection) presentationSection.style.display = "none";
      if (presentationBox) presentationBox.style.display = "none";
    }
  });
});

 
function showInfo(title, description, event) {
  let infoBox = document.getElementById('info-box');
  infoBox.innerHTML = `<strong>${title}</strong><br>${description}`;
  infoBox.style.display = 'block';

 
  let rect = event.target.getBoundingClientRect();
  infoBox.style.top = window.scrollY + rect.top - 40 + 'px'; // Positionne juste au-dessus
  infoBox.style.left = window.scrollX + rect.left + 'px'; // Aligne avec l’élément
}

function hideInfo() {
  document.getElementById('info-box').style.display = 'none';
}
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    if (!isInProjectMode) {
      const stars = item.getAttribute("data-stars");
      if (stars) item.textContent = stars;
    }
  });

  item.addEventListener("mouseleave", () => {
    const lang = item.getAttribute("data-lang") || "";
    item.textContent = lang;
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const lienAPropos = document.querySelector('a[href="#about"]');
  const boxAbout = document.getElementById("about-box");
  const projets = document.getElementById("groupeProjet");
  const cv = document.getElementById("contact");

  let isVisible = false;

  lienAPropos.addEventListener("click", (e) => {
    e.preventDefault();
    isVisible = !isVisible;

 if (isVisible) {
  boxAbout.style.display = "block";
  boxAbout.scrollIntoView({ behavior: "smooth" });
  projets.style.display = "none";
  cv.style.display = "none";


  resetToIntro();
  updateDisplay(null, true);
} else {
  boxAbout.style.display = "none";
  projets.style.display = "";
  cv.style.display = "";
}

  });
});

// Chargement de la page avec animation de chargement
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
      loader.style.transition = "opacity 1s ease";
      loader.style.opacity = 0;

      setTimeout(() => {
        loader.style.display = "none";
      }, 1000); 
    }, 1800); 
  });