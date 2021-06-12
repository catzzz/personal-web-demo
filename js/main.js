// navigation menu

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navMenu = document.querySelector(".nav-menu");
const closeNavBtn = document.querySelector(".close-nav-menu");

hamburgerBtn.addEventListener("click", showNavMenu);
closeNavBtn.addEventListener("click", hideNavMenu);

function showNavMenu() {
  console.log("open");
  navMenu.classList.add("open");
  bodyScrollingToggle();
}

function hideNavMenu() {
  navMenu.classList.remove("open");
  fadeOutEffect();
  bodyScrollingToggle();
}

function fadeOutEffect() {
  document.querySelector(".fade-out-effect").classList.add("active");
  setTimeout(() => {
    document.querySelector(".fade-out-effect").classList.remove("active");
  }, 300);
}

// attach and event handler to document
document.addEventListener("click", (event) => {
  console.log(event.target.hash)
  
  if (event.target.classList.contains("link-item")) {
    //make sure event.target.hash has a value before overridding default behavior
    if (event.target.hash !== "") {
      event.preventDefault();
      const hash = event.target.hash;
      console.log(hash);
      //deactive existing active 'section'
      
      const currentActive = document.querySelector(".section.active")
      currentActive.classList.add("hide");
      document.querySelector(".section.active").classList.remove("active");
      //active new section
      document.querySelector(hash).classList.add("active");
      document.querySelector(hash).classList.remove("hide");
      //deactivate existing active navigation menu 'link-item'
      navMenu
        .querySelector(".active")
        .classList.add("outer-shadow", "hover-in-shadow");
      navMenu
        .querySelector(".active")
        .classList.remove("active", "inner-shadow");
        // if clicked 'link-item  is contianed withing the navigation menu
      console.log(navMenu);
      if (navMenu.classList.contains("open")) {
        //active new navigation menu 'link-item'
        event.target.classList.add("active", "inner-shadow");
        event.target.classList.remove("outer-shadow", "hover-in-shadow");
        // hide navigation button
        hideNavMenu();
      }else{
        
        let navItems = navMenu.querySelectorAll(".link-item");
        console.log(navItems);
        navItems.forEach((item) =>{
          if(hash === item.hash){
            // active new navigation menu "link-item"
            item.classList.add("active", "inner-shadow");
            item.classList.remove("outer-shadow", "hover-in-shadow");
          }
        })
        fadeOutEffect();
      }
    }
  }
});
// about section tabs

const aboutSection = document.querySelector(".about-section");
const tabsContainer = document.querySelector(".about-tabs");
tabsContainer.addEventListener("click", (event) => {
  //if event.target contains 'tab-item' class and not contains 'active class
  if (
    event.target.classList.contains("tab-item") &&
    !event.target.classList.contains("active")
  ) {
    // console.log("event.target contains 'tab-item' class and not contains 'active class");
    // console.log(event.target);
    const target = event.target.getAttribute("data-target");
    // console.log(target);
    // deactive existing active tab
    tabsContainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");
    //active new 'tab-item
    event.target.classList.add("active", "outer-shadow");
    // deactive existing active 'tab-content';
    aboutSection
      .querySelector(".tab-content.active")
      .classList.remove("active");
    // actived new "tab-content"
    aboutSection.querySelector(target).classList.add("active");
  }
});

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

// portfolio filter and popup

const filterContainer = document.querySelector(".portfolio-filter");
const portfolioItemsContainer = document.querySelector(".portfolio-items");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const popup = document.querySelector(".portfolio-popup");
const prevBtn = document.querySelector(".pp-prev");
const nextBtn = document.querySelector(".pp-next");
const closeBtn = document.querySelector(".pp-close");
const projectDetailsContainer = popup.querySelector(".pp-details");
const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

let itemIndex, slideIndex, screenshots;

// filter portfolio items
filterContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("filter-item") &&
    !event.target.classList.contains("active")
  ) {
    //deactive  existing active 'filter-term'
    filterContainer
      .querySelector(".active")
      .classList.remove("outer-shadow", "active");
    // active new filter item
    event.target.classList.add("active", "outer-shadow");

    const target = event.target.getAttribute("data-target");
    console.log(target);

    portfolioItems.forEach((item) => {
      if (target === item.getAttribute("data-category") || target === "all") {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  }
});

portfolioItemsContainer.addEventListener("click", (event) => {
  // console.log(event.target.closest(".portfolio-item-inner"));
  if (event.target.closest(".portfolio-item-inner")) {
    const portfolioItem = event.target.closest(
      ".portfolio-item-inner"
    ).parentElement;
    // console.log(portfolioItem);
    // console.log(portfolioItem.parentElement.children);
    // get the portfolioItem index
    itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
      portfolioItem
    );
    // console.log(itemIndex);
    screenshots = portfolioItems[itemIndex]
      .querySelector(".portfolio-item img")
      .getAttribute("data-screenshot");
    //convet screenshots into array
    screenshots = screenshots.split(",");
    if (screenshots.length === 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
    slideIndex = 0;
    popupToggle();
    popupSlideshow();
    popupDetails();
  }
});

function popupToggle() {
  popup.classList.toggle("open");
  bodyScrollingToggle();
}

closeBtn.addEventListener("click", () => {
  popupToggle();
});

function popupSlideshow() {
  const imgSrc = screenshots[slideIndex];
  console.log(imgSrc);
  const popupImage = popup.querySelector(".pp-img");
  console.log(popupImage);
  // active loader untile the popup image loaded
  popup.querySelector(".pp-loader").classList.add("active");

  popupImage.src = imgSrc;
  popupImage.onload = () => {
    // deactive loader after the popupImage loaded
    popup.querySelector(".pp-loader").classList.remove("active");
  };
  popup.querySelector(".pp-counter").innerHTML =
    slideIndex + 1 + " of " + screenshots.length;
}

nextBtn.addEventListener("click", () => {
  if (slideIndex === screenshots.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  popupSlideshow();
});

prevBtn.addEventListener("click", () => {
  if (slideIndex === 0) {
    slideIndex = screenshots.length - 1;
  } else {
    slideIndex--;
  }
  popupSlideshow();
});

projectDetailsBtn.addEventListener("click", () => {
  popupDetailsToggle();
});
function popupDetailsToggle() {
  if (projectDetailsContainer.classList.contains("active")) {
    projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailsBtn.querySelector("i").classList.add("fa-plus");
    projectDetailsContainer.classList.remove("active");
    projectDetailsContainer.style.maxHeight = 0 + "px";
  } else {
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");

    projectDetailsContainer.classList.add("active");
    projectDetailsContainer.style.maxHeight =
      projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0, projectDetailsContainer.offsetTop);
  }
}

function popupDetails() {
  //if portfolio-item details not exists
  if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
    console.log("no details");
    projectDetailsBtn.style.display = "none";
    return;
  }
  projectDetailsBtn.style.display = "block";
  //get the project details
  const details = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-details"
  ).innerHTML;
  popup.querySelector(".pp-project-details").innerHTML = details;
  const title = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-title"
  ).innerHTML;
  popup.querySelector(".pp-title h2").innerHTML = title;
  const category = portfolioItems[itemIndex].getAttribute("data-category");
  popup.querySelector(".pp-project-category").innerHTML = category
    .split("-")
    .join(" ");
}

const testi_sliderContainer = document.querySelector(".testi-slider-container");
const testi_slides = testi_sliderContainer.querySelectorAll(".testi-item");
const testi_slideWidth = testi_sliderContainer.offsetWidth;
const testi_prevBtn = document.querySelector(".testi-slider-nav .prev");
const testi_nextvBtn = document.querySelector(".testi-slider-nav .next");
const testi_activeSlide =
  testi_sliderContainer.querySelector(".testi-item.active");

let testi_slideIndex = Array.from(
  testi_activeSlide.parentElement.children
).indexOf(testi_activeSlide);

// set width of all slide
testi_slides.forEach((slide) => {
  slide.style.width = testi_slideWidth + "px";
});

// // set width of slider Container
testi_sliderContainer.style.width =
  testi_slideWidth * testi_slides.length + "px";

testi_prevBtn.addEventListener("click", () => {
  console.log(testi_slideIndex);
});
testi_nextvBtn.addEventListener("click", () => {
  if (testi_slideIndex === testi_slides.length - 1) {
    testi_slideIndex = 0;
  } else {
    testi_slideIndex++;
  }
  // console.log(testi_slideWidth);
  testi_sliderContainer.style.marginLeft =
    -(testi_slideWidth * testi_slideIndex) + "px";
  // console.log(testi_slideWidth);
  testi_slider();
});

testi_prevBtn.addEventListener("click", () => {
  if (testi_slideIndex === 0) {
    testi_slideIndex = testi_slides.length - 1;
  } else {
    testi_slideIndex--;
  }
  // console.log(testi_slideWidth);
  testi_sliderContainer.style.marginLeft =
    -(testi_slideWidth * testi_slideIndex) + "px";
  // console.log(testi_slideWidth);
  testi_slider();
});

function testi_slider() {
  //deactive existing active slider
  testi_sliderContainer
    .querySelector(".testi-item.active")
    .classList.remove("active");
  //active new slide
  testi_slides[testi_slideIndex].classList.add("active");
  testi_sliderContainer.style.marginLeft =
    -(testi_slideWidth * testi_slideIndex) + "px";
}
// testi_slider();

//  hide all section expect active

const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  if (!section.classList.contains("active")) {
    section.classList.add("hide");
  }
});


//  loading

window.addEventListener("load",()=>{
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(()=>{
    document.querySelector(".preloader").style.display="none";
  },500)
})