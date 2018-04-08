(function() {
  // code for allowing clicks
  const items = document.querySelectorAll(".item");
  items.forEach(item =>
    item.addEventListener("click", function(e) {
      const key = item.dataset.key;
      const audio = document.querySelector(`audio[data-key="${key}"`);
      if (!audio) return;
      audio.play();
      item.classList.add("playing");

      item.addEventListener('transitionend', removeTransition)

    })
  );

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;

    this.classList.remove("playing");
  }
})();
