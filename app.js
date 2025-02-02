(function () {
  function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const item = document.querySelector(`.item[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    item.classList.add("playing");

    item.addEventListener("transitionend", removeTransition);
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }

  document.querySelector(".flex-grid").addEventListener("click", function (e) {
    if (e.target.closest(".item")) {
      const key = e.target.closest(".item").dataset.key;
      playSound(key);
    }
  });

  // Handle keydown events
  window.addEventListener("keydown", function (e) {
    playSound(e.key.toUpperCase());
  });
})();
