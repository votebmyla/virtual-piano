const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttonFullscreen = document.querySelector(".fullscreen");
const btn = document.querySelector(".btn-container");

piano.addEventListener("mousedown", pianoEventHandle);
window.addEventListener("mouseup", pianoEventHandle);
piano.addEventListener("mouseout", pianoEventHandle);
window.addEventListener("keydown", pianoEventHandle);
window.addEventListener("keyup", pianoEventHandle);
buttonFullscreen.addEventListener("click", changeFullscreen);
btn.addEventListener("click", displayNotes);

function pianoEventHandle(event) {
  if (!(event instanceof MouseEvent) && !(event instanceof KeyboardEvent)) {
    return;
  }
  let note;
  if (event instanceof MouseEvent) {
    let pianoKey = event.target;
    note = event.target.dataset.note;
    switch (event.type) {
      case "mousedown":
        pianoKeyScaleDown(pianoKey);
        playSound(note);
        moveOverPianoKeys(event);
        break;
      case "mouseup":
        pianoKeyScaleUp(pianoKey);
        moveOutPianoKeys(event);
        break;
      case "mouseout":
        pianoKeyScaleUp(pianoKey);
        break;
    }
  } else if (event instanceof KeyboardEvent) {
    let letter = event.code[event.code.length - 1];
    if (event.code.startsWith("Digit")) {
      return;
    }
    let pianoKey = piano.querySelector(`[data-letter=${letter}]`);
    if (!pianoKey) {
      return;
    }
    note = pianoKey.dataset.note;
    switch (event.type) {
      case "keydown":
        pianoKeyScaleDown(pianoKey);
        playSound(note);
        break;
      case "keyup":
        pianoKeyScaleUp(pianoKey);
        break;
    }
  }
}

function pianoKeyScaleDown(pianoKey) {
  pianoKey.classList.add("piano-key-active");
}

function pianoKeyScaleUp(pianoKey) {
  if (pianoKey.classList.contains("piano-key-active")) {
    pianoKey.classList.remove("piano-key-active");
  }
}

function playSound(note) {
  const audio = new Audio();
  audio.src = `./assets/audio/${note}.mp3`;
  audio.currentTime = 0;
  audio.play();
}

function changeFullscreen() {
  if (buttonFullscreen.classList.contains("openfullscreen")) {
    document.documentElement.requestFullscreen();
    buttonFullscreen.classList.remove("openfullscreen");
  } else {
    document.exitFullscreen();
    buttonFullscreen.classList.add("openfullscreen");
  }
}

function displayNotes(event) {
  const clickedButton = event.target;
  let activeButton = document.querySelector(".btn-active");
  if (
    clickedButton.className == "btn-container" ||
    clickedButton.classList.contains("btn-active")
  ) {
    return;
  }
  activeButton.classList.remove("btn-active");
  clickedButton.classList.add("btn-active");
  activeButton = document.querySelector(".btn-active");
  if (clickedButton.classList.contains("btn-letters")) {
    for (let elem of pianoKeys) {
      if (!elem.classList.contains("none")) {
        elem.classList.add("letter");
      }
    }
  } else {
    for (let elem of pianoKeys) {
      elem.classList.remove("letter");
    }
  }
}

function moveOverPianoKeys() {
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", mouseoverHandle);
  });
}

function mouseoverHandle(event) {
  let note = event.target.dataset.note;
  pianoKey = event.target;
  pianoKeyScaleDown(pianoKey);
  playSound(note);
}

function moveOutPianoKeys() {
  pianoKeys.forEach((elem) => {
    elem.removeEventListener("mouseover", mouseoverHandle);
  });
}
