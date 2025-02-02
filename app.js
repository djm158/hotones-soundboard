const app = (function () {
  function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const keybindingContainer = document.querySelector(
      `.audio-keybinding-container[data-key="${key}"]`
    );
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    keybindingContainer.classList.add("playing");

    const keybindingContainers = document.querySelectorAll(
      ".audio-keybinding-container"
    );
    keybindingContainers.forEach((container) =>
      container.addEventListener("transitionend", removeTransition)
    );
  }

  // handle right click on key box to open keybinding modal
  const keyBoxes = document.querySelectorAll(".key-box");
  keyBoxes.forEach((keyBox) => {
    keyBox.addEventListener("contextmenu", function (e) {
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
    return [...document.querySelectorAll(".audio-keybinding-container")].map(
      (container) => container.dataset.key
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

    const keybindingContainer = document.querySelector(
      `.audio-keybinding-container[data-key="${currentKey}"]`
    );

    const audio = document.querySelector(`audio[data-key="${currentKey}"]`);

    if (!keybindingContainer || !audio) return;

    keybindingContainer.children[0].textContent = inputKey;
    keybindingContainer.dataset.key = inputKey;
    audio.dataset.key = inputKey;
    document.querySelector(".key-binding-modal-input").value = "";
    closeModal();
  }

  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }

  document.querySelector(".flex-grid").addEventListener("click", function (e) {
    if (e.target.closest(".audio-keybinding-container")) {
      const key = e.target.closest(".audio-keybinding-container").dataset.key;
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
