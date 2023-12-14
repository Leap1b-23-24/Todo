// const text = prompt("Are ya wining, son (づ •. •)?");

// alert("Don't give up ≽^•⩊•^≼");

const box = document.querySelectorAll(".box");
const hidden = document.querySelector(".hidden");
const addBtn = document.querySelectorAll(".btn1");
const form = document.querySelector("form");
const boxes = document.querySelector(".boxes");
const exitBtn = document.querySelector(".exit-btn");
const cancel = document.querySelector(".cancel");
const cancel2 = document.querySelector("cancel2");
const myTextbox = document.getElementById("title");

// myTextbox.addEventListener("keydown", checkName, false);

// function checkName(evt) {
//   const key = evt.key;
//   const lowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
// }
// if (!lowerCaseAlphabet.includes(key)) {
//   evt.preventDefault();
// }

let data = [];

const setData = (arr) => {
  data = arr;
  render();
};

const render = () => {
  boxes.innerHTML = "";

  data.forEach((item) => {
    boxes.innerHTML += Box(item);
  });
};

const Box = (props) => {
  return `
  <div class="box" draggable="true">
    <div class="inner">
      <div class="inner1">
        <button class="innerbtn cancel">✖</button>
      </div>
      <div class="inner2">
          <h2>${props.title}</h2>
          <h3>${props.description}</h3>
          <button class="high">${
            props.priority === 2
              ? "High"
              : props.priority === 1
              ? "Medium"
              : "Low"
          }</button>
        </div>
        <div class="inner3">
          <button class="innerbtn">✔</button>
          <button class="innerbtn cancel2">✍</button>
        </div>
      </div>
    </div>
  `;
};

render();

addBtn.forEach((item) => {
  item.addEventListener("click", () => {
    hidden.style.display = "flex";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { elements } = event.target;

  const title = elements.title.value;
  const description = elements.description.value;

  const newData = [...data, { title, description, priority: 2 }];

  setData(newData);

  hidden.style.display = "none";
});
