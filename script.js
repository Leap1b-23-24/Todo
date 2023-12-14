const form = document.querySelector("#task");
const test1 = document.querySelector("#test");
const data1 = document.querySelector("#data");
const cars = document.querySelector("#cars");
const close1 = document.querySelectorAll(".close");
const plus = document.querySelectorAll(".plus");
const parent = document.querySelectorAll(".parent");
const box0 = document.querySelector(".box0");
const modal = document.querySelector(".modal");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box = document.querySelectorAll(".box");
const header = document.querySelectorAll(".header");
const  count = document.querySelectorAll(".count");

let counter = 2;

let data = [
  {
    id: "id0",
    title: "Card 1",
    priority: 1,
  },
  {
    id: "id1",
    title: "Card 2",
    priority: 2,
  },
];

const setData = (arr) => {
  data = arr;
  render();
};

const render = () => {
  box0.innerHTML = "";
  box1.innerHTML = "";
  box2.innerHTML = "";
  box3.innerHTML = "";

  data.forEach((item) => {
    if (item.status == "To do") {
      box0.innerHTML += Card(item);
    } else if (item.status == "In Progress") {
      box1.innerHTML += Card(item);
    } else if (item.status == "Stuck") {
      box2.innerHTML += Card(item);
    } else if (item.status == "Done") {
      box3.innerHTML += Card(item);
    }

  });

  const exit = document.querySelectorAll(".exit");
console.log(exit);
  exit.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;
      console.log('item',item.id);
      const newData = data.filter((item) => {
        return item.id != id;
      });
      setData(newData)
    });
  });

  const check = document.querySelectorAll(".check");

  check.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;

      console.log(id)
      const newData = data.map((item) => {
        if (item.id === id) {
          item.status = "Done";
        }
        return item;
      });
      setData(newData);
      render();
      counter1();
    });
  });

  const parent = document.querySelectorAll(".parent");

  parent.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
      console.log(event.target.id);
    });
  });

  // count.forEach((item, index) => {
  //   item[index].innerHTML = box[index].childElementCount;
  // });

  const counter1 = () => {
    console.log(box0);
    count[0].innerHTML = box0.childElementCount;
    count[1].innerHTML = box1.childElementCount;
    count[2].innerHTML = box2.childElementCount;
    count[3].innerHTML = box3.childElementCount;
  }
  counter1();

};

const Card = (props) => {
  return `
    <div class="parent" id="${props.id}" draggable="true">
      <span class="exit" id="${props.id}">×</span>
      <div class="check" id="${props.id}">
        <i class="fa fa-check-circle" style="font-size:18px"></i> 
      </div>
      <div class="support">
        <h1>${props.title}</h1>
        <h4>${props.Description}</h4>
        <p>${props.priority}</p>
      </div>  
    </div>
    `;
};
render();

plus.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});
close1.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { elements } = event.target;
  const titlex = elements["test"].value;
  const Descriptionx = elements["data"].value;
  const statusx = elements["hi"].value;
  const priorityx = elements["cars"].value;
  const newData = [
    ...data,
    {
      id: "id" + counter,

      title: titlex,

      Description: Descriptionx,

      status: statusx,

      priority: priorityx,
    }
  ];

  counter++;

  setData(newData);
  counter1();

  modal.style.display = "none"
});

header.forEach((item) => {
  item.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  item.addEventListener("drop", (event) => {
    const statusx = item.querySelector("h1").textContent;
    const id = event.dataTransfer.getData("text");
    // console.log('bourd',bourd.id);
    const newData = data.map((item) => {
      if (item.id === id) {
        item.status = statusx;
        console.log(statusx);
      }
      return item;
    });
    setData(newData);
    counter1();
  });
});
const counter1 = () => {
  console.log(box0);
  count[0].innerHTML = box0.childElementCount;
  count[1].innerHTML = box1.childElementCount;
  count[2].innerHTML = box2.childElementCount;
  count[3].innerHTML = box3.childElementCount;
}
counter1();