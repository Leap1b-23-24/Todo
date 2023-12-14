const todo2 = document.querySelectorAll(".todo2");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const todoCard = document.querySelectorAll(".todoCard");
const todo = document.querySelectorAll(".todo");
const search = document.querySelector("#search");
const nums = document.querySelectorAll("h1");

const labels = ["Todo", "In progress", "Stuck", "Done"];

let counter = 0;

let data = [];
const setData = (arr) => {
  data = arr;
  render();
};

const render = () => {
  todoCard.forEach((item) => {
    item.innerHTML = "";
  });

  data.forEach((item) => {
    if (item.status == "Todo") {
      todoCard[0].innerHTML += Card(item);
    } else if (item.status == "In progress") {
      todoCard[1].innerHTML += Card(item);
    } else if (item.status == "Stuck") {
      todoCard[2].innerHTML += Card(item);
    } else if (item.status == "Done") {
      todoCard[3].innerHTML += Card(item);
    }
  });

  // const sorted = data.sort((a, b) => {
  //   const sa = a.priority === "high" ? 0 : a.priority === "medium" ? 1 : 2;
  //   const sb = b.priority === "high" ? 0 : b.priority === "medium" ? 1 : 2;
  //   return sa - sb;
  // });

  nums.forEach((item, index) => {
    item.textContent = labels[index] + " " + todoCard[index].childElementCount;
  });

  const card = document.querySelectorAll(".card");
  card.forEach((dragable) => {
    dragable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  const cardDelete = document.querySelectorAll(".cardDelete");
  cardDelete.forEach((eachbtn) => {
    eachbtn.addEventListener("click", () => {
      const id = eachbtn.id;
      const newData = data.filter((item) => {
        return item.id != id;
      });
      setData(newData);
    });
  });

  // const cardEdit = document.querySelectorAll(".cardEdit");
  // cardEdit.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     const id = item.id;
  //     const newData = data.filter((item) => {});
  //   });
  // });

  const check = document.querySelectorAll(".check");
  check.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;
      const newData = data.map((item) => {
        if (item.id === id) {
          item.status = "Done";
        }
        return item;
      });
      setData(newData);
    });
  });
};

const Card = (props) => {
  return `
    <div class="card" draggable="true" id="${props.id}">
      <div class="check" id="${props.id}">
      </div>
      <div>
        <h2>${props.title}</h2>
        <p>${props.description}<p> 
        <p class="put2">${
          props.priority === 1
            ? "high"
            : props.priority === 2
            ? "medium"
            : "low"
        }</p> 
      </div>
      <div>
        <img class="cardDelete" id="${props.id}" src="trash.png" alt="" />
        <img class="cardEdit"  src="pen.png" alt="" />
      <div/>
    </div>
 `;
};
render();

todo2.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".addtask2").style.display = "flex";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElement = event.target;
  console.log(formElement.elements);

  const { elements } = event.target;
  const title = elements.Title.value;
  const description = elements.Description.value;
  const status = elements.Status.value;
  const priority = Number(elements.Priority.value);
  const newData = [
    ...data,
    { title, description, status, priority, id: `id${counter}` },
  ];
  counter++;
  console.log(newData);
  setData(newData);

  const todo = document.querySelectorAll(".todo");
  todo.forEach((bourd) => {
    bourd.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    bourd.addEventListener("drop", (event) => {
      const status = bourd.querySelector("h1").textContent.slice(0, -2);
      const id = event.dataTransfer.getData("text");
      const newData = data.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      });
      setData(newData);
    });
  });

  document.querySelector(".addtask2").style.display = "none";
});

search.addEventListener("input", (event) => {
  const { value } = event.target;

  const newData = data.filter((item) => {
    return item.title.includes(index);
  });
  setData(newData);
});
