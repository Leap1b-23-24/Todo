const addCard = document.querySelectorAll(".second")
const form = document.querySelector("form")
const todoCards = document.querySelectorAll(".todoCards");
const beginReact = document.querySelector(".beginReact")
const cardTag = document.querySelectorAll(".cardTag")
const turns = document.querySelectorAll(".too")
const search = document.getElementById("search")


let count = 1;

let data = []

let searchValue = "";

const setSearchValue = (newSearchValue) => {
    searchValue = newSearchValue;
    render();
};


const setData = (arr) => {
    arr.sort((a, b) => {
        return a.priority - b.priority
    })
    data = arr;
    render();
}

const render = () => {

    todoCards[0].innerHTML = "";
    todoCards[1].innerHTML = "";
    todoCards[2].innerHTML = "";
    todoCards[3].innerHTML = "";

    data.filter(item => {
        return item.title.includes(searchValue);
    }).forEach((item) => {
        if (item.status == "To do") {
            todoCards[0].innerHTML += Card(item)
        } else if (item.status == "In progress") {
            todoCards[1].innerHTML += Card(item)
        } else if (item.status == "Stuck") {
            todoCards[2].innerHTML += Card(item)
        } else if (item.status == "Done") {
            todoCards[3].innerHTML += Card(item)
        };
    });

    const deleteBtns = document.querySelectorAll(".cardDelete");

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.id;

            const newData = data.filter((item) => {
                return item.id !== id
            });

            setData(newData)

            saveTurn();
        });
    });

    const draggable = document.querySelectorAll(".card")


    draggable.forEach((element) => {
        element.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });
    const done1 = document.querySelectorAll(".zurag")

    done1.forEach((zurag) => {
        zurag.addEventListener("click", (event) => {
            const newData = data.map((item) => {
                if (item.id == zurag.parentNode.parentNode.parentNode.id) {
                    item.status = "Done";
                };
                return item
            });

            setData(newData)

            saveTurn();
        });
    });
};
const Card = (props) => {
    const { title, description, priority, id } = props;

    return `
    <div class="card" id="${id}" draggable="true">
        <div>
            <div class="color">
                <img class="zurag" src="check.png">
                <div class="nav">
                    <p class="cardName">${title}</p>
                    <img id="${id}" class="cardDelete" src="trash.png">
                </div>
            </div>
            <p class="cardDesc">${description}</p>
            <button class="cardTag">${priority === 1
            ? "High"
            : priority === 2
                ? "Medium"
                : "Low"
        }</button>
        </div>
    </div>
    `;
};

render();

addCard.forEach((item) => {
    item.addEventListener("click", () => {
        beginReact.style.display = 'flex'
    })
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { elements } = event.target;
    // console.log(elements);
    const title = elements.title.value;
    const description = elements.description.value;
    const status = elements.status.value;
    const priority = Number(elements.priority.value);

    // console.log(priority)

    const newData = [...data, { title, description, priority, id: "id" + count, status }];

    count++;

    setData(newData);


    beginReact.style.display = "none";

    saveTurn();
});

//add drag and drop function........

const doneDrop = document.querySelectorAll(".navbar")

doneDrop.forEach((item) => {
    item.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
})


doneDrop.forEach((item,) => {
    item.addEventListener("drop", function (event) {
        const dropId = event.dataTransfer.getData("text/plain");
        const stat = item.querySelector(".meg").textContent
        console.log(stat);

        const newData = data.map((item) => {
            if (item.id === dropId) {
                item.status = stat
            };
            return item
        });

        setData(newData);

        saveTurn();
    });
})

const saveTurn = () => {
    turns.forEach((item, index) => {
        item.innerHTML = todoCards[index].childElementCount;
    });
};

saveTurn();



search.addEventListener("input", (event) => {
    setSearchValue(event.target.value)
});















/*
// addCard.forEach((item) => {
//     item.addEventListener("click", () => {
//         document.querySelector(".beginReact").style.display = 'flex'
//     })
// })
// console.log(form)

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const { elements } = event.target;
//     const { title, description, status, priority } = elements;

//     //create card
//     const card = document.createElement("div");
//     card.className = "card";
//     //card append

//     const cardTitle = document.createElement("div");
//     cardTitle.className = "cardTitle";

//     card.appendChild(cardTitle);

//     const cardDesc = document.createElement("p");
//     cardDesc.className = "cardDesc";

//     card.appendChild(cardDesc)

//     const cardTag = document.createElement("p");
//     cardTag.className = "cardTag";


//     card.appendChild(cardTag);

//     const cardName = document.createElement("div");
//     cardName.className = "cardName";

//     cardTitle.appendChild(cardName);

//     const cardDelete = document.createElement("img")
//     cardDelete.className = "cardDelete";
//     cardDelete.src = "./trash.png"

//     cardTitle.appendChild(cardDelete);

//     //Createchilddddd

//     const cardNameText = document.createTextNode(elements[0].value)
//     cardName.appendChild(cardNameText);

//     document.querySelector(".beginReact").style.display = "none"

//     const cardDescText = document.createTextNode(elements[1].value);
//     cardDesc.appendChild(cardDescText);

//     const cardTagText = document.createTextNode(elements[3].value);
//     cardTag.appendChild(cardTagText);

//     const cardDeleteTag = document.createTextNode("");
//     cardDelete.appendChild(cardDeleteTag);



//     card.addEventListener("click", () => {
//         card.parentNode.removeChild(card);
//     });


//     if (status.value === "todo") {
//         cards[0].appendChild(card)
//     } else if (status.value === "progress") {
//         cards[1].appendChild(card)
//     } else if (status.value === "stuck") {
//         cards[2].appendChild(card)
//     } else if (status.value === "done") {
//         cards[3].appendChild(card)
//     }
// });
*/
