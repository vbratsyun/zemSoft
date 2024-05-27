const upButton = document.querySelector(".body__up-button");

const onWindowOnScroll = () => {
  if (window.scrollY > 3000) {
    upButton.classList.add("body__up-button--show");
  } else {
    upButton.classList.remove("body__up-button--show");
  }
};

window.addEventListener("scroll", onWindowOnScroll);

upButton.onclick = function () {
  window.scrollTo(0, 0);
};
