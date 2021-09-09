const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const drag = new Audio("./sounds/drag.mp3");
const drop = new Audio("./sounds/drop.mp3");

let parent;
let son;
let currrentContainer;

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    drag.play();
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    checker();
    if (parent == draggable.parentElement) {
      currrentContainer.classList.add("full");
    }
    drop.play();
  });
});

containers.forEach((container) => {
  if (!container.classList.contains("full")) {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      currrentContainer = container;
      const draggable = document.querySelector(".dragging");
      if (!container.classList.contains("full")) {
        container.appendChild(draggable);
      }
      if (container !== parent) {
        container.addEventListener("drop", (e) => {
          parent = container;
          son = container.children.item(0);
          if (container.id == son.innerHTML) {
            son.removeAttribute("draggable");
            son.removeAttribute("style");
          } else {
            son.addEventListener("dragstart", () => {
              container.classList.remove("full");
            });
          }
          if (container.children.length) {
            container.classList.add("full");
          }
        });
      }
    });
  }
});

const checker = () => {
  containers.forEach((container) => {
    if (container.innerHTML !== "") {
      container.classList.add("full");
    }
  });
};
