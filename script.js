"use strict";

const scaleSelector = document.querySelector("#scales-select");
const mobilescaleSelector = document.querySelector("#mobile-scales-select");
const noteMarkers = document.querySelectorAll(".note__marker");
const mobileNoteMarkers = document.querySelectorAll(".mobile__note__marker");
const infoKey = document.querySelector(".info__key");
const mobileInfoKey = document.querySelector(".mobile__header__info__key");
const infoScale = document.querySelector(".info__scale");
const mobileInfoScale = document.querySelector(".mobile__header__info__scale");
const infoStepsContainer = document.querySelector(".info__steps");
const infoSteps = document.querySelector(".info__steps__steps");

//elements for mobile
const rootButton = document.querySelector(".mobile__root-button");
const rootModal = document.querySelector(".mobile-root-modal");
const scaleButton = document.querySelector(".mobile__scale-button");
const scaleModal = document.querySelector(".mobile-scale-modal");
const closeRootModal = document.querySelector(".close-modal-root");
const closeScaleModal = document.querySelector(".close-modal-scale");
const overlay = document.querySelector(".overlay");

// prettier-ignore
const notes = ["C","Csharp","D","Dsharp","E","F","Fsharp","G","Gsharp","A","Asharp","B","C","Csharp","D","Dsharp","E","F","Fsharp","G","Gsharp","A","Asharp","B",];

let rootNote = "C";
const ionian = [2, 2, 1, 2, 2, 2]; //whole note half note spacing
const dorian = [2, 1, 2, 2, 2, 1];
const phrygian = [1, 2, 2, 2, 1, 2];
const lydian = [2, 2, 2, 1, 2, 2];
const mixolydian = [2, 2, 1, 2, 2, 1];
const aeolian = [2, 1, 2, 2, 1, 2];
const locrian = [1, 2, 2, 1, 2, 2];
const harmonicMinor = [2, 1, 2, 2, 1, 3];
const minorPentatonic = [3, 2, 2, 3];
const majorPentatonic = [2, 2, 3, 2];
const bluesScales = [3, 2, 1, 1, 3];
let selectedScale = 0;

// prettier-ignore
const scales = [ionian,dorian,phrygian,lydian,mixolydian,aeolian,locrian,harmonicMinor,minorPentatonic,majorPentatonic,bluesScales];

const scaleNames = [
  "Ionian (Major)",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian (Natural Minor)",
  "Locrian",
  "Harmonic Minor",
  "Minor Pentatonic",
  "Major Pentatonic",
  "Blues Scale",
];

let scaleNotes = [];

document.querySelectorAll('input[name="rootNote"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    rootNote = event.target.value;

    getScale("desktop");
    setInfo(rootNote, selectedScale, "desktop");
  });
});

document.querySelectorAll('input[name="mobileRootNote"]').forEach((elem) => {
  elem.addEventListener("change", function (event) {
    rootNote = event.target.value;

    getScale("mobile");
    setInfo(rootNote, selectedScale, "Mobile");
  });
});

scaleSelector.addEventListener("change", function (event) {
  selectedScale = event.target.value;
  getScale("desktop");
  setInfo(rootNote, selectedScale, "desktop");
});

mobilescaleSelector.addEventListener("change", function (event) {
  selectedScale = event.target.value;
  getScale("mobile");
  setInfo(rootNote, selectedScale, "mobile");
});

//open root modal
rootButton.addEventListener("click", function (e) {
  e.preventDefault();
  rootModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeRootModal.addEventListener("click", function (e) {
  e.preventDefault();
  rootModal.classList.add("hidden");
  overlay.classList.add("hidden");
});

//scale modal
scaleButton.addEventListener("click", function (e) {
  e.preventDefault();
  scaleModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeScaleModal.addEventListener("click", function (e) {
  e.preventDefault();
  scaleModal.classList.add("hidden");
  overlay.classList.add("hidden");
});

function getScale(view) {
  const startNote = notes.indexOf(rootNote);
  const octave = notes.slice(startNote, startNote + 12);
  scaleNotes = [];
  scaleNotes.push(rootNote);
  let scalePosition = 0;

  let myScale = scales[selectedScale];
  //loop through the octave selecting notes according to step values of each scale type
  myScale.forEach(function (element, i) {
    scalePosition += +element;

    scaleNotes.push(octave[scalePosition]);
  });
  displayNotes(view);
}

function displayNotes(view) {
  //reset note markers
  noteMarkers.forEach(function (el) {
    el.classList.add("hidden");
    el.classList.remove("root-note");
    el.classList.remove("major-charateristic");
    el.classList.remove("minor-charateristic");
  });
  mobileNoteMarkers.forEach(function (el) {
    el.classList.add("hidden");
    el.classList.remove("root-note");
    el.classList.remove("major-charateristic");
    el.classList.remove("minor-charateristic");
  });
  //hide  mobile modals
  if (view == "mobile") {
    rootModal.classList.add("hidden");
    scaleModal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  // display notes
  scaleNotes.forEach(function (el) {
    const noteToShow = document.querySelectorAll(`[data-note = ${el}]`);

    noteToShow.forEach(function (el) {
      el.classList.remove("hidden");
    });

    //add root note class
    const rootNotes = document.querySelectorAll(`[data-note = ${rootNote}]`);
    rootNotes.forEach(function (el) {
      el.classList.add("root-note");
    });

    /////////////////////////////////////////////////
    ///CHARACTERISTIC NOTES
    //selected scale 0:ionian 1:dorian 2:phrygian 3:lydian 4:mixolydian 5:aeolian 6:locrian
    const characNotes = [];
    let characNote = [];

    ////major modes
    if (selectedScale == 0 || selectedScale == 3 || selectedScale == 4) {
      characNotes.push(scaleNotes[3]);
      characNotes.push(scaleNotes[6]);

      characNotes.forEach(function (el) {
        characNote = document.querySelectorAll(`[data-note = ${el}]`);
        characNote.forEach(function (el, i) {
          el.classList.add("major-charateristic");
        });
      });
    }

    ////minor modes
    if (
      selectedScale == 1 ||
      selectedScale == 2 ||
      selectedScale == 5 ||
      selectedScale == 6
    ) {
      characNotes.push(scaleNotes[1]);
      characNotes.push(scaleNotes[5]);

      characNotes.forEach(function (el) {
        characNote = document.querySelectorAll(`[data-note = ${el}]`);
        characNote.forEach(function (el, i) {
          el.classList.add("minor-charateristic");
        });
      });
    }
  });

  // do flats for modes
  doFlats();
  //do flats for flat scales
  flatScales();
}

function setInfo(rootNote, selectedScale, view) {
  if (rootNote.includes("sharp")) {
    mobileInfoKey.innerHTML = sharpToFlat(rootNote);
  } else {
    mobileInfoKey.innerHTML = rootNote;
  }
  mobileInfoScale.innerHTML = scaleNames[selectedScale];

  if (rootNote.includes("sharp")) {
    infoKey.innerText = sharpToFlat(rootNote);
  } else {
    infoKey.innerHTML = rootNote;
  }

  infoScale.innerHTML = scaleNames[selectedScale];

  let steps = "";
  scales[selectedScale].forEach(function (el) {
    if (el == 1) {
      steps = steps += "H ";
    }
    if (el == 2) {
      steps = steps += "W ";
    }
  });
  infoSteps.innerHTML = steps;
  if (selectedScale < 7) {
    infoStepsContainer.classList.remove("hidden");
  } else {
    infoStepsContainer.classList.add("hidden");
  }
}

/// change # for flats

function doFlats() {
  resetSharps();
  //selected scale 0:ionian 1:dorian 2:phrygian 3:lydian 4:mixolydian 5:aeolian 6:locrian 7:harmonic minor 8:minor pentatonic
  //flattened thirds for modes & harmonic minor
  if (
    selectedScale == 1 ||
    selectedScale == 2 ||
    selectedScale == 5 ||
    selectedScale == 6 ||
    selectedScale == 7
  ) {
    if (scaleNotes[2].includes("sharp")) {
      const flat3rd = document.querySelectorAll(`[data-note=${scaleNotes[2]}]`);
      const flatNote = sharpToFlat(scaleNotes[2]);

      flat3rd.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  //minor pentatonic
  if (selectedScale == 8) {
    if (scaleNotes[1].includes("sharp")) {
      const flat3rd = document.querySelectorAll(`[data-note=${scaleNotes[1]}]`);
      const flatNote = sharpToFlat(scaleNotes[1]);
      flat3rd.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
    if (scaleNotes[4].includes("sharp")) {
      const flat7th = document.querySelectorAll(`[data-note=${scaleNotes[4]}]`);
      const flatNote = sharpToFlat(scaleNotes[4]);
      flat7th.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  //blues scale
  if (selectedScale == 10) {
    if (scaleNotes[1].includes("sharp")) {
      const flat3rd = document.querySelectorAll(`[data-note=${scaleNotes[1]}]`);
      const flatNote = sharpToFlat(scaleNotes[1]);
      flat3rd.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
    if (scaleNotes[5].includes("sharp")) {
      const flat7th = document.querySelectorAll(`[data-note=${scaleNotes[5]}]`);
      const flatNote = sharpToFlat(scaleNotes[5]);
      flat7th.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  //flattened 7th All minors and mixolydian
  if (
    selectedScale == 1 ||
    selectedScale == 2 ||
    selectedScale == 4 ||
    selectedScale == 5 ||
    selectedScale == 6
  ) {
    if (scaleNotes[6].includes("sharp")) {
      const flat7th = document.querySelectorAll(`[data-note=${scaleNotes[6]}]`);
      const flatNote = sharpToFlat(scaleNotes[6]);
      flat7th.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  // flattened 6ths Phrygian Aeolian locrian harmonic minor
  if (
    selectedScale == 2 ||
    selectedScale == 5 ||
    selectedScale == 6 ||
    selectedScale == 7
  ) {
    if (scaleNotes[5].includes("sharp")) {
      const flat6th = document.querySelectorAll(`[data-note=${scaleNotes[5]}]`);
      const flatNote = sharpToFlat(scaleNotes[5]);
      flat6th.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  //flattened 2nd Phrygian and Locrian
  if (selectedScale == 2 || selectedScale == 6) {
    if (scaleNotes[1].includes("sharp")) {
      const flat2nd = document.querySelectorAll(`[data-note=${scaleNotes[1]}]`);
      const flatNote = sharpToFlat(scaleNotes[1]);
      flat2nd.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }

  //flattened 5th Locrian
  if (selectedScale == 6) {
    if (scaleNotes[4].includes("sharp")) {
      const flat5th = document.querySelectorAll(`[data-note=${scaleNotes[4]}]`);
      const flatNote = sharpToFlat(scaleNotes[4]);
      flat5th.forEach(function (el) {
        el.innerText = flatNote;
      });
    }
  }
}

function sharpToFlat(note) {
  switch (note) {
    case "Csharp":
      return "Db";
      break;
    case "Dsharp":
      return "Eb";
      break;
    case "Fsharp":
      return "Gb";
      break;
    case "Gsharp":
      return "Ab";

    case "Asharp":
      return "Bb";
    default:
      return "Error";
  }
}

function resetSharps() {
  const Csharp = document.querySelectorAll(`[data-note=Csharp]`);
  Csharp.forEach((el) => (el.innerText = "C#"));
  const Dsharp = document.querySelectorAll(`[data-note=Dsharp]`);
  Dsharp.forEach((el) => (el.innerText = "D#"));
  const Fsharp = document.querySelectorAll(`[data-note=Fsharp]`);
  Fsharp.forEach((el) => (el.innerText = "F#"));
  const Gsharp = document.querySelectorAll(`[data-note=Gsharp]`);
  Gsharp.forEach((el) => (el.innerText = "G#"));
  const Asharp = document.querySelectorAll(`[data-note=Asharp]`);
  Asharp.forEach((el) => (el.innerText = "A#"));
}

function flatScales() {
  //restSharps();
  //for F Bb Eb Ab
  let flatNotes = [];

  if (
    rootNote === "F" ||
    rootNote === "Asharp" ||
    rootNote === "Csharp" ||
    rootNote === "Dsharp" ||
    rootNote === "Gsharp" ||
    rootNote === "Fsharp"
  ) {
    resetSharps();

    flatNotes = scaleNotes.filter((note) => note.includes("sharp"));

    flatNotes.forEach(function (el, i) {
      const toFlat = document.querySelectorAll(`[data-note=${el}]`);
      toFlat.forEach(function (el) {
        el.innerText = sharpToFlat(flatNotes[i]);
      });
    });
  }
}
