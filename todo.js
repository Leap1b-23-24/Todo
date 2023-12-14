const addBtn = document.querySelectorAll(".add-btn");
const modal = document.querySelector(".modal-outer");
const cards = document.querySelectorAll(".cards");
const del = document.querySelector(".del");
const form = document.querySelector("form");
let turns = document.querySelectorAll(".turn");
const search = document.querySelector(".search");
const submitBtn = document.querySelector(".submit-btn");

//React

let count = localStorage.getItem("count") ?? 0;

addBtn.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
    del.style.display = "flex";
  });
});

let data = JSON.parse(localStorage.getItem("save")) ?? [];

let searchData = "";

let editId = null;

const setData = (arr) => {
  data = arr;
  render();
};

const searchValue = (value) => {
  searchData = value;
  render();
  saveTurn();
};

const render = () => {
  cards[0].innerHTML = "";
  cards[1].innerHTML = "";
  cards[2].innerHTML = "";

  //sorting
  data.sort((a, b) => {
    let as = a.prior === "High" ? 0 : a.prior === "Medium" ? 1 : 2;
    let bs = b.prior === "High" ? 0 : b.prior === "Medium" ? 1 : 2;

    return as - bs;
  });

  data
    .filter((item) => {
      return searchData.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(searchData);
    })
    .forEach((item) => {
      if (item.stat == "in progress") {
        cards[0].innerHTML += Card(item);
      } else if (item.stat == "on hold") {
        cards[1].innerHTML += Card(item);
      } else if (item.stat == "completed") {
        cards[2].innerHTML += Card(item);
      }
    });

  const imgDel = document.querySelectorAll(".imgDel");

  //delete the task
  imgDel.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;

      const newData = data.filter((el) => {
        return el.id !== id;
      });

      setData(newData);
      saveData();
      saveTurn();
    });
  });

  //edit todo list

  const edits = document.querySelectorAll(".edit-img");

  edits.forEach((item) => {
    item.addEventListener("click", () => {
      modal.style.display = "flex";
      del.style.display = "flex";

      const id = item.parentNode.parentNode.id;

      editId = id;

      const el = data.find((item) => item.id1 === id);

      const { elements } = form;

      elements["title"].value = el.title;
      elements["description"].value = el.desc;
      elements["priority-drop"].value = el.prior;
      elements["status-drop"].value = el.stat;
    });
  });

  //move to completed
  const imgCheck = document.querySelectorAll(".imgCheck");

  imgCheck.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.parentNode.parentNode.parentNode.id;

      const newData = data.map((item) => {
        if (item.id1 === id) {
          item.stat = "completed";
        }
        return item;
      });

      setData(newData);
      saveData();
      saveTurn();
    });
  });

  const dragCards = document.querySelectorAll(".add-card");

  dragCards.forEach((drag) => {
    drag.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });
};

//search value
search.addEventListener("input", (event) => {
  searchValue(event.target.value);
});

const Card = (props) => {
  return `<div id="${props.id1}" draggable="true" class="add-card">
   
    <div class="check-cont">
      <span>
        <img id="${props.id2}" class="imgCheck" src="${props.imgCheck1}"/>
        <h2>${props.title}</h2>
      </span>
      <img id="${props.id}" class="imgDel" src="${props.imgRemove}"/>
    </div>
    <div>
    <p>${props.desc}</p>
    <img class="edit-img" id="${props.id3}" src="./todoimg/edit.png"/>
    </div>
    <p>${props.prior}</p>
    <p>${props.stat}</p>
    
  </div>`;
};

render();

del.addEventListener("click", () => {
  modal.style.display = "none";
  del.style.display = "none";

  const elements = form.elements;

  elements["title"].value = "";
  elements["description"].value = "";
  elements["priority-drop"].value = "";
  elements["status-drop"].value = "";
  document.querySelector("#title").style.border = "";
  document.querySelector(".title-class").style.color = "";
  document.querySelector("#description").style.border = "";
  document.querySelector(".desc-class").style.color = "";
  document.querySelector(".prior-text").style.color = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const elements = event.target.elements;

  if (
    elements["title"].value == "" ||
    elements["description"].value == "" ||
    elements["priority-drop"].value == ""
  ) {
    document.querySelector("#title").style.border = "1px solid red";
    document.querySelector(".title-class").style.color = "red";
    document.querySelector("#description").style.border = "1px solid red";
    document.querySelector(".desc-class").style.color = "red";
    document.querySelector(".prior-text").style.color = "red";
  } else {
    const titlex = elements["title"].value;
    const descx = elements["description"].value;
    const priorx = elements["priority-drop"].value;
    const statusx = elements["status-drop"].value;
    const imgx =
      "https://assets.dryicons.com/uploads/icon/svg/9923/1b11025b-7ecf-4e32-9cac-d5ce5d8c9b1e.svg";
    const imgCheck = "./todoimg/unchecked.png";

    if (editId) {
      const dataCard = data.find((item) => item.id1 == editId);
      console.log(dataCard.title);
      console.log(dataCard.desc);
      console.log(dataCard.prior);
      console.log(dataCard.stat);
      dataCard.title = elements["title"].value;
      dataCard.desc = elements["description"].value;
      dataCard.prior = elements["priority-drop"].value;
      dataCard.stat = elements["status-drop"].value;
      let index1 = data.indexOf(dataCard);

      render();
    } else {
      let newData = [
        ...data,
        {
          title: titlex,
          desc: descx,
          prior: priorx,
          imgRemove: imgx,
          stat: statusx,
          id: "id" + count,
          id1: "drag" + count,
          id2: "prior" + count,
          id3: "edit" + count,
          imgCheck1: imgCheck,
        },
      ];

      count++;

      setData(newData);
    }

    editId = null;

    elements["title"].value = "";
    elements["description"].value = "";
    elements["priority-drop"].value = "";
    elements["status-drop"].value = "";
    document.querySelector("#title").style.border = "";
    document.querySelector(".title-class").style.color = "";
    document.querySelector("#description").style.border = "";
    document.querySelector(".desc-class").style.color = "";
    document.querySelector(".prior-text").style.color = "";
    modal.style.display = "none";
    del.style.display = "none";
    saveData();
    saveTurn();
  }
});

//drag the cards

const boards = document.querySelectorAll(".cards-outer");

boards.forEach((board) => {
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});

boards.forEach((board) => {
  board.addEventListener("drop", (event) => {
    const status = board.querySelector(".stat").textContent;
    // console.log(status);

    const id = event.dataTransfer.getData("text");

    const newData = data.map((item) => {
      if (item.id1 === id) {
        item.stat = status;
      }
      return item;
    });

    setData(newData);
    saveData();
    saveTurn();
  });
});

const saveData = () => {
  localStorage.setItem("save", JSON.stringify(data));
  localStorage.setItem("count", count);
};

const saveTurn = () => {
  turns.forEach((item, index) => {
    item.innerHTML = cards[index].childElementCount;
  });
};

saveTurn();

// const showData = () => {
//   item.innerHTML = localStorage.getItem("save");
// };

// showData();

//Javascript

// //value aguulj bui elementuud
// const form = document.querySelector("form");
// const title = document.querySelector("input");
// const description = document.querySelector("textarea");
// const priority = document.querySelector("#priority-drop");
// const status = document.querySelector("#status-drop");
// const turn = document.querySelector(".turn");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   if (title.value == "" || description.value == "" || priority.value == "") {
//     document.querySelector("#title").style.border = "1px solid red";
//     document.querySelector(".title-class").style.color = "red";
//     document.querySelector("#description").style.border = "1px solid red";
//     document.querySelector(".desc-class").style.color = "red";
//     document.querySelector(".prior-text").style.color = "red";
//   } else {
//     //shine tag uusgeh
//     const card1 = document.createElement("div");
//     const titleOuter = document.createElement("div");
//     const title1 = document.createElement("h2");
//     const removeTask = document.createElement("img");
//     const checkTask = document.createElement("img");
//     const description1 = document.createElement("p");
//     const priority1 = document.createElement("p");

//     card1.className = "add-card";
//     removeTask.className = "rem-img";
//     cards.insertBefore(card1, cards.children[0]);
//     titleOuter.appendChild(title1);
//     titleOuter.appendChild(removeTask);
//     card1.appendChild(titleOuter);
//     card1.appendChild(description1);
//     card1.appendChild(priority1);

//     title1.innerText = title.value;
//     description1.innerText = description.value;
//     priority1.innerText = priority.value;
//     removeTask.src =
//       "https://assets.dryicons.com/uploads/icon/svg/9923/1b11025b-7ecf-4e32-9cac-d5ce5d8c9b1e.svg";

//     modal.style.display = "none";
//     del.style.display = "none";
//     title.value = "";
//     description.value = "";
//     priority.value = "";
//     status.value = "";
//     saveData();
//     counterF();

//     removeTask.addEventListener("click", () => {
//       card1.remove();

//       saveData();
//       counterF();
//     });
//   }
// });

// showTask();
// counterF();

// function saveData() {
//   localStorage.setItem("data", cards.innerHTML);
//   localStorage.setItem("counter", cards.childElementCount);
// }
// function showTask() {
//   cards.innerHTML = localStorage.getItem("data");
// }

// function counterF() {
//   turn.innerHTML = localStorage.getItem("counter");
// }

// const imgs = cards.querySelectorAll(".rem-img");

// imgs.forEach((item) => {
//   item.addEventListener("click", () => {
//     item.parentNode.parentNode.remove();
//     saveData();
//     counterF();
//   });
// });
