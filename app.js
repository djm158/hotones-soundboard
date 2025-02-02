const app = (function () {
  function playSound(key) {
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

  function getCurrentKeyBindings() {
    return [...document.querySelectorAll(".item")].map(
      (item) => item.dataset.key
    );
  }

  /*
   * Save the key binding for the selected item
   * Update the key box text and data-key attribute
   * Update the audio data-key attribute
   * Clear the input
   * Close the modal
   */
  function saveKeyBinding() {
    const inputKey = document.querySelector(".key-binding-modal-input").value;
    const currentKey = document.querySelector(
      ".key-binding-modal-key"
    ).textContent;

    const currentKeyBindings = getCurrentKeyBindings();

    if (currentKeyBindings.includes(inputKey.toUpperCase())) {
      alert("You cannot bind the same key to the same sound");
      return;
    }

    const boundItem = document.querySelector(`.item[data-key="${currentKey}"]`);

    const audio = document.querySelector(`audio[data-key="${currentKey}"]`);

    if (!boundItem || !audio) return;

    boundItem.children[0].textContent = inputKey;
    boundItem.dataset.key = inputKey;
    audio.dataset.key = inputKey;
    document.querySelector(".key-binding-modal-input").value = "";
    closeModal();
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

  window.addEventListener("keydown", function (e) {
    playSound(e.key.toUpperCase());
  });

  return {
    saveKeyBinding,
    openModal,
    closeModal,
  };
})();
