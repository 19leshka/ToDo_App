const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button");

const btnActive = (event) => {
    let userEnteredValue = event.target.value;
    if(userEnteredValue.trim() != 0){
        addBtn.classList.add("active");
    } 
    else{
        addBtn.classList.remove("active");
    }
}

const addBtnTask = (event) => {
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("Todo List");
    if(getLocalStorageData == null){
        listArray = [];
    }
    else{
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("Todo List", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
    inputBox.value = "";
}

window.onload = showTasks;
inputBox.addEventListener("keyup", btnActive);
addBtn.addEventListener("click", addBtnTask);
clearAllBtn.addEventListener("click", deleteAllTask)

function showTasks() {
    let getLocalStorageData = localStorage.getItem("Todo List");
    if(getLocalStorageData == null){
        listArray = [];
    }
    else{
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNum = document.querySelector(".pendingTasks");
    pendingTasksNum.textContent = listArray.length;
    if(listArray.length > 0){
        clearAllBtn.classList.add("active");
    }
    else{
        clearAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("Todo List");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("Todo List", JSON.stringify(listArray));
    showTasks();
}

function deleteAllTask() {
    listArray = [];
    localStorage.setItem("Todo List", JSON.stringify(listArray));
    showTasks();
}