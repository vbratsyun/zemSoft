const arrow = document.querySelector(".header__button");

let timer;

const onArrowClick = () => {
  window.scrollTo({
    top: 900,
    left: 0,
    behavior: "smooth",
  });
};

const onWindowLoad = () => {
  timer = setInterval(() => {
    arrow.classList.toggle("header__button--transform");
    arrow.addEventListener("click", onArrowClick);
  }, 600);
};

window.addEventListener("load", onWindowLoad);
