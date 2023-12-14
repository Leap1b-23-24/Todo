const add = document.querySelector(".add");
const banner = document.querySelector(".list");
const submit = document.querySelector("#submit");
const todo = document.querySelector(".todo");
const container = document.querySelector(".container");
const form = document.querySelector("form");
const input1 = document.querySelector("#name");
const input2 = document.querySelector("#description");
const options = document.querySelectorAll(".option");
add.addEventListener("click", () => {
  banner.style.display = "flex";
  banner.style.zIndex = "1";
  container.style.opacity = "0.2";
  container.style.zIndex = "auto";
});
submit.addEventListener("click", () => {
  banner.style.display = "none";
  container.style.zIndex = "1";
  banner.style.zIndex = "auto";
  container.style.opacity = "1";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    event.target.elements.description.value == "" ||
    event.target.elements.name.value == ""
  ) {
    alert("Hooson bnaa hu");
    return;
  }
  createbox(
    event.target.elements.description.value,
    event.target.elements.name.value,
    event.target.elements.gategory.value
  );
  event.target.elements.description.value = "";
  event.target.elements.name.value = "";
});
let count = 0;
function createbox(a, b, c) {
  count++;
  // creating and appending
  const inbox = document.querySelector(`.${c}`);
  const text1 = document.createTextNode(b);
  const text2 = document.createTextNode(a);
  const box = document.createElement("div");
  const smallbox = document.createElement("div");
  const smallbox1 = document.createElement("div");
  const dlt = document.createElement("div");
  smallbox.appendChild(text1);
  smallbox1.appendChild(text2);
  box.appendChild(smallbox);
  box.appendChild(smallbox1);
  box.appendChild(dlt);
  box.setAttribute("draggable", true);
  inbox.appendChild(box);
  //setting ids for boxes and dlt buttons
  box.setAttribute("id", "gg" + count);
  box.setAttribute("class", "boxess");
  dlt.setAttribute("id", "gg" + count);
  // delete style
  dlt.style.width = "30%";
  dlt.style.height = "20px";
  dlt.style.cursor = "pointer";
  dlt.innerHTML = "delete";
  dlt.style.border = "1px solid";
  dlt.style.borderRadius = "4px";
  dlt.style.backgroundColor = "lightblue";
  // delete event listeners
  dlt.addEventListener("click", () => {
    let id = dlt.getAttribute("id");
    var remove = document.getElementById(id);
    remove.remove();
  });
  const boxes = document.querySelectorAll(".boxess");
  boxes.forEach((elements) => {
    elements.addEventListener("click", (event) => {
      event.target.style.backgroundColor = "red";
    });
  });
}
// function drag() {

// }
