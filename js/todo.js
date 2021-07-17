const todoForm=document.querySelector("#todo-form");
const todoInput=todoForm.querySelector("input");
const todoList=document.querySelector("#todo-list");

let toDos=[];

const TODOS_KEY="todos";

function saveTodos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}
function deleteTodo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    saveTodos();
    li.remove();
}
function viewMore(span){
    const box = document.createElement("textarea");
    span.innerText="바뀜";
}
function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText=newTodo.text;

    const button = document.createElement("button");
    button.innerText="X";
    button.addEventListener("click",deleteTodo);

    const morebutton = document.createElement("button");
    morebutton.innerText="수정";
    morebutton.addEventListener("click",event=>viewMore(span));

    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(morebutton);
    todoList.appendChild(li);

    span.addEventListener("click",function(){
        span.classList.toggle("line-through");
    });
}
function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    console.log(newTodo);
    todoInput.value="";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

//paintTodos();
todoForm.addEventListener("submit",handleToDoSubmit);

const saveToDos = localStorage.getItem(TODOS_KEY);
if(saveToDos != null){
    const parsedToDos = JSON.parse(saveToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}