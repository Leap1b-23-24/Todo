const cards = document.querySelectorAll(".cards");
const addCard = document.querySelectorAll(".nemeh");
const form = document.querySelector("form");

const todo = document.querySelectorAll(".todo")
const inprogress = document.querySelector(".inprogress")
const stuck = document.querySelector('.stuck');
const done = document.querySelector(".done");

let counter = 1;

let data = [
    {
        id: "id-0",
        title: "",
        description: "",
        status: "",
        priority: "",
    },

];

// const arr = [1, 2, 3, 4, 5]
// const newARr = arr.filter((item) => item !== 5)

const setData = (arr) => {
    data = arr;
    render();
};


const render = () => {
    cards[0].innerHTML = "";
    cards[1].innerHTML = "";
    cards[2].innerHTML = "";
    cards[3].innerHTML = "";



    data.forEach((item) => {
        if (item.status == "To do") {
            cards[0].innerHTML += Card(item);
        }
        if (item.status == "In progress") {
            cards[1].innerHTML += Card(item);
        }
        if (item.status == "Stuck") {
            cards[2].innerHTML += Card(item);
        }
        if (item.status == "Done") {
            cards[3].innerHTML += Card(item);
        }
    });

    const bigcont = document.querySelectorAll(".bigcont");
    bigcont.forEach((draggable) => {
        draggable.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    const ustgah = document.querySelectorAll(".delete");
    ustgah.forEach((ustgah) => {
        ustgah.addEventListener("click", () => {
            const id = ustgah.id;
            const newData = data.filter((item) => {
                return item.id !== id;
            });
            setData(newData);
        });
    });
    const check =document.querySelectorAll(".check");
    check.forEach((check) => {
        check.addEventListener("click", () => {
            c
        }
         )
    })
};

const Card = (props) => {
    return `
     <div class="bigcont" draggable="true" id="${props.id}" > 
        <div class="check">
        <img src="./Screen Shot 2023-11-06 at 10.23.53.png"/>
        </div>
        <div class="container">
            <div class="card">
                <h3>${props.title}</h3>
                <p>${props.description}</p>
                <p>${props.status} </p>
                <div class="priorit">${props.priority}</div>
            </div>
            <div id="${props.id}" class="delete">
                <p>X</p>
            </div>
        </div>
    </div>
    `
}

render();



addCard.forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelector(".modal").style.display = 'flex';
    });
});



form.addEventListener("submit", (event) => {
    event.preventDefault();


    const { elements } = event.target;
    const title = elements.title.value;
    const description = elements.descrip.value;
    const status = elements.status.value;
    const priority = elements.prior.value;


    const newData = [
        ...data,
        { title, description, status, priority, id: "id-" + counter }
    ];

    counter++;

    setData(newData);

    document.querySelector(".modal").style.display = 'none'
});


todo.forEach((todo) => {
    todo.addEventListener("drop", event => {
        const id = event.dataTransfer.getData("text");
        const status = todo.querySelector("b").textContent

        const newData = data.map((item) => {
            if (item.id === id) {
                item.status = status
            }
            return item
        })

        setData(newData)
    });

    todo.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

});