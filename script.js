/* =========================================================
   MEDICARE — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header = document.getElementById("siteHeader");

  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    const bars = menuToggle.querySelectorAll("span");

    if (isOpen) {
      bars[0].style.transform = "translateY(7px) rotate(45deg)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      bars[0].style.transform = "";
      bars[1].style.opacity = "";
      bars[2].style.transform = "";
    }
  });


  /* Close mobile menu after clicking a link */

  mainNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      const bars = menuToggle.querySelectorAll("span");

      bars[0].style.transform = "";
      bars[1].style.opacity = "";
      bars[2].style.transform = "";

    });

  });


  /* =======================================================
     DOCTOR SEARCH
  ======================================================= */

  const doctorSearch = document.getElementById("doctorSearch");
  const searchResult = document.getElementById("searchResult");

  doctorSearch.addEventListener("submit", (event) => {

    event.preventDefault();

    const keyword =
      document.getElementById("doctorKeyword").value.trim();

    const specialty =
      document.getElementById("specialtySelect").value;

    const location =
      document.getElementById("locationInput").value.trim();


    const searchTerms = [];

    if (keyword) {
      searchTerms.push(`"${keyword}"`);
    }

    if (specialty) {
      searchTerms.push(specialty);
    }

    if (location) {
      searchTerms.push(location);
    }


    if (searchTerms.length === 0) {

      searchResult.innerHTML =
        `<i class="fa-solid fa-circle-info"></i>
         Please enter a doctor, specialty or location.`;

    } else {

      searchResult.innerHTML =
        `<i class="fa-solid fa-circle-check"></i>
         Searching for doctors matching
         <strong>${searchTerms.join(" · ")}</strong>.`;

    }

    searchResult.classList.add("show");

    setTimeout(() => {
      searchResult.classList.remove("show");
    }, 4500);

  });


  /* =======================================================
     TOAST
  ======================================================= */

  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);

  }


  /* =======================================================
     BOOK BUTTONS
  ======================================================= */

  document.querySelectorAll(".book-btn").forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      showToast(
        "Appointment booking is ready to be connected."
      );

    });

  });


  /* =======================================================
     SERVICE / PROFILE DEMO LINKS
  ======================================================= */

  document.querySelectorAll(
    ".profile-btn, .service-card a, .specialty-card"
  ).forEach(link => {

    link.addEventListener("click", event => {

      const href = link.getAttribute("href");

      if (href === "#") {

        event.preventDefault();

        showToast(
          "This demo link is ready for your real page."
        );

      }

    });

  });


  /* =======================================================
     TESTIMONIAL SLIDER
  ======================================================= */

  const track = document.getElementById("testimonialTrack");
  const cards = document.querySelectorAll(".testimonial-card");

  const nextButton = document.getElementById("nextTestimonial");
  const prevButton = document.getElementById("prevTestimonial");

  let currentSlide = 0;


  function getVisibleCards() {

    if (window.innerWidth <= 600) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 3;

  }


  function updateSlider() {

    const visibleCards = getVisibleCards();

    const maxSlide =
      Math.max(0, cards.length - visibleCards);

    currentSlide =
      Math.min(currentSlide, maxSlide);

    if (!cards.length) {
      return;
    }

    const cardWidth =
      cards[0].getBoundingClientRect().width;

    const gap = 20;

    const offset =
      currentSlide * (cardWidth + gap);

    track.style.transform =
      `translateX(-${offset}px)`;

  }


  nextButton.addEventListener("click", () => {

    const visibleCards = getVisibleCards();

    const maxSlide =
      Math.max(0, cards.length - visibleCards);

    if (currentSlide < maxSlide) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }

    updateSlider();

  });


  prevButton.addEventListener("click", () => {

    const visibleCards = getVisibleCards();

    const maxSlide =
      Math.max(0, cards.length - visibleCards);

    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = maxSlide;
    }

    updateSlider();

  });


  window.addEventListener("resize", updateSlider);

  updateSlider();


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const targetId =
        this.getAttribute("href");

      if (
        targetId === "#" ||
        !document.querySelector(targetId)
      ) {
        return;
      }

      event.preventDefault();

      const target =
        document.querySelector(targetId);

      const headerHeight =
        header.offsetHeight;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     SEARCH ICON
  ======================================================= */

  const searchToggle =
    document.querySelector(".search-toggle");

  searchToggle.addEventListener("click", () => {

    const searchBox =
      document.querySelector(".search-box");

    searchBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(() => {

      document
        .getElementById("doctorKeyword")
        .focus();

    }, 600);

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".specialty-card, .doctor-card, .service-card, .process-item, .benefit, .testimonial-card"
    );


  revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
      "opacity .6s ease, transform .6s ease";

  });


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform =
              "translateY(0)";

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".main-nav a");


  function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 160;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (href === `#${current}`) {
        link.classList.add("active");
      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNav
  );

});