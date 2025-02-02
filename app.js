const app = (function () {
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
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
    const item = document.querySelector(`.item[data-key="${e.keyCode}"]`);
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

  // handle right click on key box to open keybinding modal
  const keyBoxes = document.querySelectorAll(".key-box");
  keyBoxes.forEach((keyBox) => {
    keyBox.addEventListener("contextmenu", function (e) {
      console.log("contextmenu");
      const key = keyBox.textContent;
      const text = keyBox.nextElementSibling.textContent;
      e.preventDefault();
      if (
        document.querySelector(".key-binding-modal").classList.contains("open")
      ) {
        closeModal();
      } else {
        openModal(key, text);
      }
    });
  });

  function openModal(key, text) {
    document.querySelector(".key-binding-modal").classList.add("open");
    document.querySelector(
      ".key-binding-modal-title"
    ).textContent = `Configure Key Binding for: ${text}`;
    document.querySelector(".key-binding-modal-key").textContent = key;
  }

  function closeModal() {
    document.querySelector(".key-binding-modal").classList.remove("open");
  }
  function saveKeyBinding() {
    const key = document.querySelector(".key-binding-modal-input").value;

    const keyCode = key.toUpperCase().charCodeAt(0);
    console.log(keyCode);
    const keybinding = document.querySelector(`[data-key="${keyCode}"]`);
    console.log(keybinding);
    if (!keybinding) return;
    keybinding.children[0].textContent = key.toUpperCase();
    document.querySelector(".key-binding-modal-input").value = "";
    closeModal();
  }
  return {
    saveKeyBinding,
    openModal,
    closeModal,
  };
})();
