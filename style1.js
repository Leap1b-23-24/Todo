const cards = document.querySelectorAll(".cards");
const boards = document.querySelectorAll(".board");
const modal = document.querySelector(".modal");
const addBtn = document.querySelectorAll("#add-btn");
const form = document.querySelector("form");
const doToo = document.querySelectorAll(".do_tooloh");
const doneToo = document.querySelectorAll(".done_tooloh");
const doingToo = document.querySelectorAll(".doing_tooloh");
const search = document.querySelector("#search");



let data = [
    {
        title: "Card 1",
        second: "bn",
        status: "doing",
        prior: "high",
        dlt: "id1",
    }
];  //ogogdol hadgalah Array huvisagch zarlana
const setData = (arr) => {     //array avdag datagaa oorcildog punkts 
    data = arr;
    render(); // arr-d ogogdol hiine 
};

const render = () => {
    cards.forEach((card) => {
        card.innerHTML = ""; //card dotrohoo hooson bolgono
    });

    const sorted = data.sort((a, b) => {
        const sa = a.prior=== "high" ? 0 : a.prior === "medium" ? 1 : 2;
        const sb = b.prior=== "high" ? 0 : b.prior === "medium" ? 1 : 2;

        return sa - sb;

    });

    sorted.forEach((item) => {
        if (item.status === "to_do") {
            cards[0].innerHTML += Card(item);
        } else if (item.status === "done") {
            cards[1].innerHTML += Card(item);
        } else if (item.status === "doing") {
            cards[2].innerHTML += Card(item)
        }
    });
    // setData(sorted);
    //delete button
    const deleteBtn = document.querySelectorAll(".buttondlt");
    deleteBtn.forEach((eachbtn) => {
        eachbtn.addEventListener("click", (event) => {
            let id = event.target.id;
            const newD = data.filter((data) => {
                return data.dlt !== id;
            });
            setData(newD);
            //   let index =data.map((data)=>data.dlt).indexOf(id);   
            //   data.splice(index,1);
            //   setData(data);    
        });
    });

    const doneBtn = document.querySelectorAll(".buttonDone");
    doneBtn.forEach((eachbtn) => {
        eachbtn.addEventListener("click", (event) => {
            let id = event.target.id;
            const newI = data.filter((data) => data.dlt === `${id}`);
            newI[0].status = "done"
            setData(data);
        });
    });


    const card = document.querySelectorAll(".card");

    card.forEach((box) => {
        box.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });
    myCount(data); //toolura duudaj ajlulna
};

const Card = (props) => {
    return `<div class="card" draggable="true" id="${props.dlt}">

            <h3>${props.title}</h3>     
            <h3>${props.second}</h3> 
            <h3>${props.prior}<h3>
            <button class="buttonDone" id="${props.dlt}">Done</button>  
            <button class="buttondlt" id="${props.dlt}">X</button>  
            </div>
    `;
}
render(); //ajillulj bna


addBtn.forEach((Add) => {
    Add.addEventListener("click", () => {
        modal.style.display = "flex";
    });
});


let count = 1;
form.addEventListener("submit", (event) => {

    event.preventDefault();
    const { elements } = event.target;

    const second = elements.second.value;

    const title = elements.title.value;

    if (title === "" || second === "") {
        alert("Hooson bn")
        modal.style.display = "none"
        return;
    }

    const status = elements.op.value;
    const prior = elements["option1"].value;
    console.log(elements["option1"].value, elements.op.value, prior);

    count++;
    const newData = [...data, { title: title, second: second, status: status, prior, dlt: `id${count}` }]; //...huucin data copydno 
    setData(newData);

    console.log(data);
    modal.style.display = "none";
});

// tooluur

function myCount(data) {
    let arr = ["to_do", "done", "doing"];
    arr.forEach((array) => {
        let myArray = data.filter((value) => value.status == `${array}`);
        const tooloh = document.querySelector(`.${array}tooloh`);
        tooloh.innerHTML = `${myArray.length}`;
    });
};

cards.forEach((card) => {
 card.addEventListener("drop", (event) => {
        const id = event.dataTransfer.getData("text/plain");
        const status = event.target.id;
        const newData = data.map((item) => {
            if (item.dlt === id) {
                item.status = status
            }
            return item;
        })

        setData(newData)
    });

    card.addEventListener("dragover", function (event) {
        if (event.target === this) {
            event.preventDefault();
        }
    });
});

// search.addEventListener("input", (event) => {
//     const { value } = event.target;

//     const newData = data.filter(item) => {
//         return item.title.includes(value);
//     });
// setData(newData);
// });




