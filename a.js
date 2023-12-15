const form = document.querySelector("form");
const button = document.querySelectorAll(".btnn");
const p = document.querySelector(".modal");
const sumbit = document.querySelector("#btn");
const close = document.querySelector(".close");
const card = document.querySelector(".card");
const cardHorror = document.querySelector(".cardhorror");
const cardWatched = document.querySelector(".cardwatched");
const cardComedy = document.querySelector(".cardcomedy");
const cardRomance = document.querySelector(".cardromance");
const cardAction = document.querySelector(".cardaction");






button.forEach((item) => {
    item.addEventListener("click", function () {
        p.style.display = "flex";
    });
})

let count = 2;

close.addEventListener("click", () => {
    p.style.display = "none";
})

const imginp = document.querySelector("#x");
const slctimg = document.querySelector(".select-img")
imginp.addEventListener("click", () => {
    slctimg.style.display = "flex"
})

const inside = document.querySelectorAll(".inside")
inside.addEventListener("click", () => {

})

let data = [
    {
        id: "id0",
        title: "Inception",
        description: "sjkdsdka",
        category: "Movies",
        image: "./img/10.jpeg"
    },
    {
        id: "id1",
        title: "doksd",
        description: "sjkddswoa",
        category: "Movies",
        image: "./img/500.jpeg",
    }
];

const setData = (arr) => {
    data = arr;
    render();
};

const render = () => {
    card.innerHTML = "";
    cardWatched.innerHTML = "";
    cardHorror.innerHTML = "";
    cardComedy.innerHTML = "";
    cardRomance.innerHTML = "";
    cardAction.innerHTML = "";

    data.forEach((item) => {
        if (item.category == "Movies") {
            card.innerHTML += Box(item);
        } else if (item.category == "Horror") {
            cardHorror.innerHTML += Box(item);
        } else if (item.category == "Movies") {
            card.innerHTML += Box(item);
        } else if (item.category == "Comedy") {
            cardComedy.innerHTML += Box(item);
        } else if (item.category == "Romance") {
            cardRomance.innerHTML += Box(item);
        } else if (item.category == "Action") {
            cardAction.innerHTML += Box(item);
        }
    })

    const dltbtn = document.querySelectorAll(".dltbutton")

    dltbtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.id;

            const newData = data.filter((item) => {
                return item.id !== id
            })

            setData(newData)
        })
    })
    const draggables = document.querySelectorAll(".box");
    draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });
};






const Box = (props) => {
    return `
    <div class="box" draggable="true" id="${props.id}">
       <div class="title">${props.title}</div>
       <div class="img-cont"><img draggable="false" src="${props.image}" alt="zurag" style="color: aliceblue;"> </div>
       <div class="">${props.description}</div>
     
      <button id="${props.id}" class="dltbutton"> dlt</button>
    </div>
  `;
};

render();



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { elements } = event.target;
    console.log(elements)
    const title = elements.title.value;
    const description = elements.description.value;
    const category = elements.category.value;
    const newData = [...data, {
        title,
        description,
        category,
        id: "id" + count
    }
    ];
    count++;



    setData(newData);

    p.style.display = "none";

});

const movies = document.querySelectorAll(".movies");
movies.forEach((bourd) => {
    bourd.addEventListener("dragover", function (event) {
        if (event.target === this) {
            event.preventDefault();
        }
    });
    bourd.addEventListener("drop", (event) => {
        const status = bourd.querySelector("h2").textContent;
        const id = event.dataTransfer.getData("text");
        const newData = data.map((item) => {
            if (item.id === id) {
                item.category = status;
            }
            return item;
        });
        setData(newData);
    });
});






























// form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     if (
//         event.target.elements.inp1.value == "" ||
//         event.target.elements.inp2.value == ""
//     ) {
//         alert("Can't sumbit");
//         return;
//     }
//     createbox(
//         event.target.elements.inp1.value,
//         event.target.elements.inp2.value,

//     );
//     p.style.display = "none"
//     todo.style.opacity = "1"


// });



// function createbox(a, b) {

//     const inbox = document.querySelector(".card");
//     const text1 = document.createTextNode(a);
//     const text2 = document.createTextNode(b);
//     const box = document.createElement("div");
//     box.classList.add("medku");
//     const dlt = document.createElement("button");
//     const smallbox = document.createElement("div");
//     const smallbox1 = document.createElement("div");
//     smallbox.appendChild(text1);
//     smallbox1.appendChild(text2);
//     box.appendChild(smallbox);
//     box.appendChild(smallbox1);
//     box.appendChild(dlt);
//     inbox.appendChild(box);

// }







// document.querySelector(".select-img").addEventListener("click", () => {
//     document.querySelector(".select-img >div ").style.visibility = "visible";
// })






