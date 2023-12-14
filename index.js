const add = document.querySelector(".add");
const hidden = document.querySelector(".add_task");
const form = document.querySelector("form");
// const deleteButton = document.querySelector(".btn-delete");
const box_1 = document.querySelector(".box_1");

add.addEventListener("click", function () {
    hidden.style.opacity = "1";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const card = document.createElement("div");
    card.classList.add("card");
    const name = document.createElement("h4");
    const name2 = document.createElement("h4");
    const deleteButton = document.createElement("button");
    name.textContent = elements.title.value;
    name2.textContent = elements.second.value;


    card.appendChild(name);
    card.appendChild(name2);
    card.appendChild(deleteButton);
    box_1.appendChild(card);
  

    // event.target.elements.title.value;
    // // console.log(event.target.elements.second.value);
    // event.target.elements.option1.value;
    // event.target.elements.option.value;
    // myFun(event.target.elements.title.value,
    //     event.target.elements.second.value,
    //     event.target.elements.option1.value);
    // deleteButton.style.opacity = "1";
    // box_1.style.opacity = "1";


});


// function myFun(a, b, c) {
//     const ab = document.createTextNode(a);
//     const bb = document.createTextNode(b);
//     const box = document.querySelector(`.${c}`);
//     const boxe = document.querySelector(`.${c}`);
//     const inner = document.createElement("div");
//     const inner1 = document.createElement("div");



//     inner.appendChild(ab);
//     inner1.appendChild(bb);
//     box.appendChild(inner);
//     boxe.appendChild(inner1);




    // const element = document.createElement("div");
    // input.appendChild(element);   
// };

