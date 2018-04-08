window.addEventListener("keydown", function(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
  const item = document.querySelector(`.item[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop the function from running all together
  audio.currentTime = 0;
  audio.play();
  item.classList.add("playing");

  const items = document.querySelectorAll(".item");
  items.forEach(key => key.addEventListener("transitionend", removeTransition));
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;

  this.classList.remove("playing");
}

// code for allowing clicks
// const items = document.querySelectorAll('.item');
// items.forEach(item => item.addEventListener('click', function(e) {
//     if (!audio) return
// }))