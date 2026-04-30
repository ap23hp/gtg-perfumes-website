/* 
   NAV DROPDOWN
*/
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownParent = document.querySelector(".has-dropdown");

dropdownToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownParent.classList.toggle("active");
});

document.addEventListener("click", () => {
  dropdownParent.classList.remove("active");
});

/* 
   MOBILE MENU
*/
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  hamburger?.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

/*
   PRODUCT IMAGE SLIDER
*/

const mainImage = document.querySelector(".gallery-image");
const prevBtn = document.querySelector(".gallery-arrow.prev");
const nextBtn = document.querySelector(".gallery-arrow.next");
const dots = document.querySelectorAll(".dot");
const thumbs = document.querySelectorAll(".thumb");

/*images */
const images = [
  "assets/big1.png",
  "assets/big2.png",
  "assets/big3.png",
  "assets/big4.png",
];

let currentIndex = 0;

/* default image */
mainImage.src = "assets/pinkperfume.png";

function updateSlider(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];

  thumbs.forEach((thumb, i) =>
    thumb.classList.toggle("active", i === currentIndex)
  );

  dots.forEach((dot, i) =>
    dot.classList.toggle("active", i === currentIndex)
  );
}

/* arrows */
nextBtn?.addEventListener("click", () =>
  updateSlider((currentIndex + 1) % images.length)
);

prevBtn?.addEventListener("click", () =>
  updateSlider((currentIndex - 1 + images.length) % images.length)
);

/* dots */
dots.forEach((dot, i) =>
  dot.addEventListener("click", () => updateSlider(i))
);

/* thumbnails */
thumbs.forEach((thumb, i) =>
  thumb.addEventListener("click", () => updateSlider(i))
);


/*
   SUBSCRIPTION EXPAND / COLLAPSE
 */
const planRadios = document.querySelectorAll('input[name="plan"]');
const cards = document.querySelectorAll(".subscription-card");

planRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    cards.forEach((card) => {
      card.classList.remove("active");
      card.querySelector(".subscription-content")?.classList.add("hidden");
    });

    const activeCard = radio.closest(".subscription-card");
    activeCard.classList.add("active");
    activeCard
      .querySelector(".subscription-content")
      ?.classList.remove("hidden");

    updateAddToCartLink();
  });
});

/* 
   FRAGRANCE ACTIVE STATE
*/
document.querySelectorAll(".fragrance input").forEach((radio) => {
  radio.addEventListener("change", () => {
    const groupName = radio.name;

    document
      .querySelectorAll(`input[name="${groupName}"]`)
      .forEach((r) => r.closest(".fragrance").classList.remove("active"));

    radio.closest(".fragrance").classList.add("active");

    updateAddToCartLink();
  });
});

/*
   ADD TO CART (9 COMBINATIONS)
*/
const addToCartBtn = document.querySelector(".add-to-cart");

function updateAddToCartLink() {
  const plan =
    document.querySelector('input[name="plan"]:checked')?.value || "single";

  let url = "/cart?plan=" + plan;

  if (plan === "single") {
    const f1 =
      document.querySelector('input[name="fragrance_single"]:checked')?.value ||
      "original";

    url += `&fragrance=${f1}`;
  }

  if (plan === "double") {
    const f1 =
      document.querySelector('input[name="fragrance_double_1"]:checked')
        ?.value || "original";

    const f2 =
      document.querySelector('input[name="fragrance_double_2"]:checked')
        ?.value || "original";

    url += `&fragrance1=${f1}&fragrance2=${f2}`;
  }

  addToCartBtn.href = url;
}

updateAddToCartLink();


/* 
  COLLECTION ACCORDION
*/

const accordionItems = document.querySelectorAll(".collection-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".collection-header");

  header.addEventListener("click", () => {
    // close all
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        const iconImg = otherItem.querySelector(".icon img");
        const content = otherItem.querySelector(".collection-content");

        if (iconImg) iconImg.src = "assets/plus.svg";
        if (content) content.style.display = "none";
      }
    });

    // toggle current
    const content = item.querySelector(".collection-content");
    const iconImg = item.querySelector(".icon img");

    const isOpen = item.classList.contains("active");

    if (isOpen) {
      item.classList.remove("active");
      if (iconImg) iconImg.src = "assets/plus.svg";
      if (content) content.style.display = "none";
    } else {
      item.classList.add("active");
      if (iconImg) iconImg.src = "assets/minus.svg";
      if (content) content.style.display = "block";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".StatsGreen-number");

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let current = 0;
      counter.textContent = "0"; // reset every time

      const increment = Math.max(1, Math.floor(target / 60));

      const update = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          requestAnimationFrame(update);
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(document.querySelector(".StatsGreen-section"));
});

function updateAddToCartLink() {
  const plan =
    document.querySelector('input[name="plan"]:checked')?.value || "single";

  let url = "/cart?plan=" + plan;

  if (plan === "single") {
    const f1 =
      document.querySelector('input[name="fragrance_single"]:checked')?.value ||
      "original";

    url += `&fragrance=${f1}`;
  }

  if (plan === "double") {
    const f1 =
      document.querySelector('input[name="fragrance_double_1"]:checked')?.value ||
      "original";

    const f2 =
      document.querySelector('input[name="fragrance_double_2"]:checked')?.value ||
      "original";

    url += `&fragrance1=${f1}&fragrance2=${f2}`;
  }

  addToCartBtn.setAttribute("href", url);
}
