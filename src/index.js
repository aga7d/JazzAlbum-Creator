let mouseIsdown = false;
const shapeArr = [];
const radiusArr = ["50%", "0%"];
const colorArr = [
  "#F6BB30",
  "#110F11",
  "#CE7F3D",
  "#DF522D",
  "#BD563B",
  "#EEDDA4",
  "#35385C",
  "#892721",
  "#AC1E24",
  "#B66397",
  "#5A5A5A"
];
const keycodeObj = {
  "81": "c3",
  "50": "db3",
  "87": "d3",
  "51": "eb3",
  "69": "e3",
  "82": "f3",
  "53": "gb3",
  "84": "g3",
  "54": "ab3",
  "89": "a3",
  "55": "bb3",
  "85": "b3",
  "73": "c4",
  "57": "db4",
  "79": "d4",
  "48": "eb4",
  "80": "e4",
  "219": "f4",
  "187": "gb4",
  "221": "g4",
  "65": "ab4",
  "90": "a4",
  "83": "bb4",
  "88": "b4"
};
window.addEventListener("load", () => {
  const notes = document.querySelectorAll(".sound");
  const pianoKeys = document.querySelectorAll(".keys > div > div");

  const setBaseColor = element => {
    const parent = element.parentNode.parentNode;
    return parent.className === "white"
      ? "rgb(207, 132, 102)"
      : "rgb(49, 49, 49)";
  };

  const playNote = element => {
    element.parentNode.style.backgroundColor = "#943939";
    element.currentTime = 0.9;
    element.play();
    createRandomShape();
  };
  const createRandomShape = () => {
    const board = document.querySelector(".cover_board");
    const shape = document.createElement("div");
    const height = Math.floor(Math.random() * 200);
    const top = Math.floor(Math.random() * 80);
    const right = Math.floor(Math.random() * 100);
    const borderRadius = radiusArr[Math.floor(Math.random() * 2)];
    const width =
      borderRadius === "50%" ? height : Math.floor(Math.random() * 200);
    const color = colorArr[Math.floor(Math.random() * 11)];
    const style = `position:absolute;top:${top}%;right:${right}%;background-color:${color};height:${height}px; width:${width}px; border-radius:${borderRadius};`;
    shape.style.cssText = style;
    board.appendChild(shape);
    shapeArr.push(shape);
    if (shapeArr.length >= 25) {
      board.removeChild(shapeArr[0]);
      shapeArr.shift();
    }
  };
  document.querySelector("input").addEventListener("change", e => {
    document.querySelector("#album div").textContent = e.target.value;
  });
  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
  });

  pianoKeys.forEach((key, index) => {
    key.addEventListener("touchstart", () => {
      key.style.backgroundColor = "#943939";
    });
    key.addEventListener("touchend", () => {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mousedown", () => {
      playNote(notes[index]);
    });
    key.addEventListener("mouseup", () => {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mouseout", () => {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mouseover", () => {
      if (mouseIsdown) {
        playNote(notes[index]);
      }
    });
  });

  document.onmousedown = () => {
    mouseIsdown = true;
  };
  document.onmouseup = () => {
    mouseIsdown = false;
  };
  document.onkeydown = event => {
    const x = event.keyCode;
    const node = document.getElementById(keycodeObj[x]);
    if (node) {
      playNote(node);
      setTimeout(() => {
        node.parentNode.style.backgroundColor = setBaseColor(node);
      }, 200);
    }
  };
});
