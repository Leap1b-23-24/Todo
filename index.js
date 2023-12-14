const form = document.querySelector("#task");
const exit1 = document.querySelector(".exit");
const test1 = document.querySelector("#test");
const data1 = document.querySelector("#data");
const car = document.querySelector("#cars");
const close1 = document.querySelector(".close");
const plus1 = document.querySelectorAll(".plus");
const parents = document.querySelector(".parent");

const boxs = document.querySelector(".box"); 

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const contnr = document.createElement("div");
  const exit = document.createElement("span")
  const play = document.createElement("h1");
  const write = document.createElement("h4");
  const blah = document.createElement("p");

  exit.textContent = "×";

  contnr.className = "parent";
  exit.className = "exit";

  boxs.insertBefore(contnr, boxs.children[1]);
  contnr.appendChild(exit);
  contnr.appendChild(play);
  contnr.appendChild(write);
  contnr.appendChild(blah);

  play.innerText = test1.value;
  write.innerText = data1.value;
  blah.innerText = car.value;

  modal.style.display = "none";
});

// exit1.onclick = function () {
//   parent.style.display = "none";
// }
var modal = document.getElementById("myModal");
var btn = document.getElementById("plus");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
close1.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// let data = [
//   {
//   title: "Card 1",
//   priority: 1,
//   },
//   {
//   title: "Card 2",
//   priority: 2,
//   },
//  ];
//  let data2 = [];
//  const setData = (arr) => {
//   data = arr;
//   render();
//  };
//  const render = () => {
//   box.innerHTML = "";
//   data.forEach((item) => {
//   boz.innerHTML += Card(item);
//   });
//  };
//  const Card = (props) => {
//   return `
//   <div class="card">
//   <h3>${props.title}</h3>
//   </div>
//   `;
//  };
//  render();
//  close1 .addEventListener("click", () => {
//   modal.style.display = "flex";
//  });
//  form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const { elements } = event.target;
//   const titlex = elements["title"].value;
//   const newData = [...data, { title: titlex }];
//   setData(newData);
//   modal.style.display = "none";
//  });