(function () {
  // code for allowing clicks
  const items = document.querySelectorAll(".item");
  items.forEach((item) =>
    item.addEventListener("click", function (e) {
      const key = item.dataset.key;
      const audio = document.querySelector(`audio[data-key="${key}"`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
      item.classList.add("playing");

      item.addEventListener("transitionend", removeTransition);
    })
  );

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;

    this.classList.remove("playing");
  }

  function playSoundOnKeyPress(e) {
    const key = e.key.toUpperCase();
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const item = document.querySelector(`.item[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    item.classList.add("playing");

    const items = document.querySelectorAll(".item");
    items.forEach((item) =>
      item.addEventListener("transitionend", removeTransition)
    );
  }

  window.addEventListener("keydown", playSoundOnKeyPress);
})();
