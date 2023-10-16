let todoList = [];
displayItems();
addToLocalStorage();

let inputElement = document.querySelector('#todo_detail');


inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addToDo();
    }
});


function addToDo() {
    let dateElement = document.querySelector('#todo_date');

    let todoItem = inputElement.value;
    let todoDate = dateElement.value;


    if (todoItem !== "" && todoDate !== "") {
        todoList.push({ item: todoItem, dueDate: todoDate });
    } else {
        alert("Fill Out All Details");
    }

    inputElement.value = '';
    dateElement.value = '';

    addToLocalStorage();
    displayItems();
}

function addToLocalStorage() {
    localStorage.setItem('todo-items', JSON.stringify(todoList));
}

function displayItems() {
    let containerElement = document.querySelector("#todo_container");
    let newHtml = " ";
    if (localStorage.getItem("todo-items")) {
        let local_todo = JSON.parse(localStorage.getItem("todo-items"));
        todoList = local_todo;
        for (let i = 0; i < todoList.length; i++) {
            let { item, dueDate } = todoList[i];
            newHtml += `<div class="todo-display" >  <span> ${i+1}. ${item} </span> <span> ${dueDate} </span>  <button  class="button-3" id="delete" onclick="removeItem(${i})"> Delete </button> </div>`;
        }
    }
    containerElement.innerHTML = newHtml;
}

function removeItem(index) {
    let confirmation = confirm("Are You Sure?");
    if(confirmation){
        todoList.splice(index, 1);
        addToLocalStorage();
        displayItems();
    }
}
