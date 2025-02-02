const app = (function () {
  // Constants
  const KEY_BINDING_MODAL_SELECTOR = ".key-binding-modal";
  const AUDIO_CONTAINER_SELECTOR = ".audio-keybinding-container";

  // Common function to play sound
  function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const keybindingContainer = document.querySelector(
      `${AUDIO_CONTAINER_SELECTOR}[data-key="${key}"]`
    );
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    keybindingContainer.classList.add("playing");

    const keybindingContainers = document.querySelectorAll(
      AUDIO_CONTAINER_SELECTOR
    );
    keybindingContainers.forEach((container) =>
      container.addEventListener("transitionend", removeTransition)
    );
  }

  // Remove transition effect
  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }

  // Handle right-click on key box to open keybinding modal
  function setupKeyBindingModal() {
    const keyBoxes = document.querySelectorAll(".key-box");
    keyBoxes.forEach((keyBox) => {
      keyBox.addEventListener("contextmenu", function (e) {
        const key = keyBox.textContent;
        const text = keyBox.nextElementSibling.textContent;
        e.preventDefault();
        const modal = document.querySelector(KEY_BINDING_MODAL_SELECTOR);
        if (modal.classList.contains("open")) {
          closeModal();
        } else {
          openModal(key, text);
        }
      });
    });
  }

  function openModal(key, text) {
    const modal = document.querySelector(KEY_BINDING_MODAL_SELECTOR);
    modal.classList.add("open");
    modal.querySelector(
      ".key-binding-modal-title"
    ).textContent = `Configure Key Binding for: ${text}`;
    modal.querySelector(".key-binding-modal-key").textContent = key;
  }

  function closeModal() {
    document.querySelector(KEY_BINDING_MODAL_SELECTOR).classList.remove("open");
  }

  function getCurrentKeyBindings() {
    return [...document.querySelectorAll(AUDIO_CONTAINER_SELECTOR)].map(
      (container) => container.dataset.key
    );
  }

  function saveKeyBinding() {
    const inputKey = document
      .querySelector(".key-binding-modal-input")
      .value.toUpperCase();
    const currentKey = document.querySelector(
      ".key-binding-modal-key"
    ).textContent;
    const currentKeyBindings = getCurrentKeyBindings();

    if (currentKeyBindings.includes(inputKey)) {
      alert("You cannot bind the same key to the same sound");
      return;
    }

    const keybindingContainer = document.querySelector(
      `${AUDIO_CONTAINER_SELECTOR}[data-key="${currentKey}"]`
    );
    const audio = document.querySelector(`audio[data-key="${currentKey}"]`);

    if (!keybindingContainer || !audio) {
      console.error("Keybinding container or audio element not found");
      return;
    }

    keybindingContainer.children[0].textContent = inputKey;
    keybindingContainer.dataset.key = inputKey;
    audio.dataset.key = inputKey;
    document.querySelector(".key-binding-modal-input").value = "";
    closeModal();
  }

  function setupEventListeners() {
    document
      .querySelector(".flex-grid")
      .addEventListener("click", function (e) {
        const keybindingContainer = e.target.closest(AUDIO_CONTAINER_SELECTOR);
        if (keybindingContainer) {
          const key = keybindingContainer.dataset.key;
          playSound(key);
        }
      });

    window.addEventListener("keydown", function (e) {
      playSound(e.key.toUpperCase());
    });
  }

  // Initialize app
  setupKeyBindingModal();
  setupEventListeners();

  return {
    saveKeyBinding,
    openModal,
    closeModal,
  };
})();
