"use strict";

var mouseIsdown = false;
var shapeArr = [];
var radiusArr = ["50%", "0%"];
var colorArr = ["#F6BB30", "#110F11", "#CE7F3D", "#DF522D", "#BD563B", "#EEDDA4", "#35385C", "#892721", "#AC1E24", "#B66397", "#5A5A5A"];
var keycodeObj = {
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
window.addEventListener("load", function () {
  var notes = document.querySelectorAll(".sound");
  var pianoKeys = document.querySelectorAll(".keys > div > div");

  var setBaseColor = function setBaseColor(element) {
    var parent = element.parentNode.parentNode;
    return parent.className === "white" ? "rgb(207, 132, 102)" : "rgb(49, 49, 49)";
  };

  var playNote = function playNote(element) {
    element.parentNode.style.backgroundColor = "#943939";
    element.currentTime = 0.9;
    element.play();
    createRandomShape();
  };

  var createRandomShape = function createRandomShape() {
    var board = document.querySelector(".cover_board");
    var shape = document.createElement("div");
    var height = Math.floor(Math.random() * 200);
    var top = Math.floor(Math.random() * 80);
    var right = Math.floor(Math.random() * 100);
    var borderRadius = radiusArr[Math.floor(Math.random() * 2)];
    var width = borderRadius === "50%" ? height : Math.floor(Math.random() * 200);
    var color = colorArr[Math.floor(Math.random() * 11)];
    var style = "position:absolute;top:".concat(top, "%;right:").concat(right, "%;background-color:").concat(color, ";height:").concat(height, "px; width:").concat(width, "px; border-radius:").concat(borderRadius, ";");
    shape.style.cssText = style;
    board.appendChild(shape);
    shapeArr.push(shape);

    if (shapeArr.length >= 25) {
      board.removeChild(shapeArr[0]);
      shapeArr.shift();
    }
  };

  document.querySelector("input").addEventListener("change", function (e) {
    document.querySelector("#album div").textContent = e.target.value;
  });
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
  });
  pianoKeys.forEach(function (key, index) {
    key.addEventListener("touchstart", function () {
      key.style.backgroundColor = "#943939";
    });
    key.addEventListener("touchend", function () {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mousedown", function () {
      playNote(notes[index]);
    });
    key.addEventListener("mouseup", function () {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mouseout", function () {
      key.style.backgroundColor = setBaseColor(notes[index]);
    });
    key.addEventListener("mouseover", function () {
      if (mouseIsdown) {
        playNote(notes[index]);
      }
    });
  });

  document.onmousedown = function () {
    mouseIsdown = true;
  };

  document.onmouseup = function () {
    mouseIsdown = false;
  };

  document.onkeydown = function (event) {
    var x = event.keyCode;
    var node = document.getElementById(keycodeObj[x]);

    if (node) {
      playNote(node);
      setTimeout(function () {
        node.parentNode.style.backgroundColor = setBaseColor(node);
      }, 200);
    }
  };
});