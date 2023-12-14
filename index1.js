const add = document.querySelector(".add");
const modal = document.querySelector(".list");
const banner = document.querySelector(".listForm");
const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const searchbar = document.querySelector("#search");
const searchBox = document.querySelector(".searchResult");
let searchValue = "";
let identifier = "";
const setSearch = (value) => {
  searchValue = value;
  render();
};

add.addEventListener("click", () => {
  modal.style.display = "flex";
});
//setting data
let mydata = [
  { name: "id1", desc: "zail", position: "Doing", dlt: "id1", prio: "High" },
  { name: "id2", desc: "zail", position: "Doing", dlt: "id2", prio: "High" },
];
function setData(array) {
  mydata = array;
  render();
}
// Rendering
function render() {
  boxes.forEach((box) => {
    box.innerHTML = "";
  });

  // inserting list as position names
  const map = {
    Todo: 0,
    Stuck: 1,
    Doing: 2,
    Done: 3,
  };

  // .filter((item) => {
  //   return item.name.includes(searchValue);
  // })
  mydata.forEach((eachdata) => {
    const innerBox = CreateList(eachdata);
    boxes[map[eachdata.position]].innerHTML += innerBox;
  });
  // delete button need to fixed
  const dltbtn = document.querySelectorAll(".dltButton");
  dltbtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const newData = mydata.filter((a) => {
        return a.dlt !== event.target.id;
      });
      setData(arrangeData(newData));
      listCounter(mydata);
    });
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
    });
    const doneBtn = document.querySelectorAll(".dbtn");
    doneBtn.forEach((btns) => {
      btns.addEventListener("click", (event) => {
        const myObject = mydata.filter(
          (objects) => objects.dlt == `${event.target.id}`
        );
        myObject[0].position = "Done";
        listCounter(mydata);
        setData(arrangeData(mydata));
      });
    });
  });
  const editbtn = document.querySelectorAll(".editbutton");
  editbtn.forEach((eachbtn) => {
    eachbtn.addEventListener("click", (event) => {
      modal.style.display = "flex";
      identifier = `${event.target.id}`;
      // const newData = mydata.forEach((eachdata) => {
      //   return eachdata.dlt === "id1";
      // });
      // console.log(newData);
      // setData(newData);
    });
  });
}

///creating list
function CreateList(props) {
  return `
    <div class="card" draggable="true" id="${props.dlt}">
    <button class="editbutton" id="${props.dlt}">Edit</button>
    <button class="dbtn" id="${props.dlt}">Done</button>
    <h3 class="Text">${props.name}</h3>
    <h5 class="Text">${props.desc}</h3>
    <h6 class="Text">${props.prio}</h6>
    <button class="dltButton" id="${props.dlt}">Delete</button>
    </div>
    `;
}
render();
// Just submit button
let counter = 0;
banner.addEventListener("submit", (event) => {
  console.log(identifier);
  if (identifier !== "") {
    myObj[0].name = event.target.elements.name.value;
    myObj[0].desc = event.target.elements.description.value;
    myObj[0].position = event.target.elements.gategory.value;
    myObj[0].prio = event.target.elements.prio.value;
    console.log("zail");
    identifier = "";
    listCounter(mydata);
    setData(arrangeData(mydata));
  } else {
    console.log(identifier);
    event.preventDefault();
    const titlex = event.target.elements.name.value;
    const divNames = event.target.elements.gategory.value;
    const desc = event.target.elements.description.value;
    const prio = event.target.elements.prio.value;
    if (desc == "" || desc == "") {
      alert("Empty input");
      return;
    }
    // console.log(prio);
    const newData = [
      ...mydata,
      {
        name: titlex,
        desc,
        position: divNames,
        dlt: `id${counter}`,
        prio,
      },
    ];

    setData(arrangeData(newData));
    listCounter(mydata);
  }
  listCounter(mydata);
  setData(arrangeData(mydata));

  modal.style.display = "none";
  counter++;
  event.target.elements.name.value = "";
  event.target.elements.description.value = "";
});
//droping box
boxes.forEach((box) => {
  box.addEventListener("drop", (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    let myObject = mydata.filter((uniID) => uniID.dlt == `${id}`);
    myObject[0].position = `${event.target.id}`;
    setData(arrangeData(mydata));
    listCounter(mydata);
  });
  box.addEventListener("dragover", function (event) {
    if (event.target === this) {
      event.preventDefault();
    }
  });
});
function arrangeData(datas) {
  let arrangedData = datas.sort((a, b) => {
    return (
      (a.prio === "High" ? 0 : a.prio === "Mid" ? 1 : 2) -
      (b.prio === "High" ? 0 : b.prio === "Mid" ? 1 : 2)
    );
  });
  return arrangedData;
}
function listCounter(data) {
  let keyWords = ["Todo", "Stuck", "Doing", "Done"];
  keyWords.forEach((keyword) => {
    let array = data.filter((value) => value.position == `${keyword}`);
    let number = array.length;
    const counts = document.querySelector(`.${keyword}count`);
    counts.innerHTML = number;
  });
}
// const edit = document.querySelector(".editForm");
// edit.addEventListener("submit", (event) => {
//   edit.style.backgorundColor = "green";
// });

searchbar.addEventListener("input", (event) => {
  const { value } = event.target;

  setSearch(value);
});
