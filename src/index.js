import "./style.css";
import { format, subDays } from 'date-fns';

class Todo {
  constructor(
    title = "My Todo",
    dueDate = subDays(new Date(), -1), // Default to tomorrow.
    description = "Todo Description",
    priority,
  ) {
    this.setTitle(title);
    this.setDescription(description);
    this.setDueDate(dueDate);
    this.setPriority(priority);
    this.setIncomplete();
  }

  setTitle = (title) => {this.title = title;}
  setDueDate = (dueDate) => {this.dueDate = dueDate;}
  setDescription = (description) => {this.description = description;}

  setComplete = () => {this.complete = true;}
  setIncomplete = () => {this.complete = false;}

  setPriority = (priority) => {this.priority = priority;}
}

class Project {
  constructor(name = "My Project") {
    this.name = name;
    this.todoList = [new Todo()];
  }
}

const project = new Project();
const todo = project.todoList[0];
const formattedDate = format(todo.dueDate, "yyyy-MM-dd")

const todoContainer = document.getElementById("todoContainer");
const todoCard = document.createElement("div");
todoCard.classList.add("todoCard")
todoCard.innerHTML = `
<p class="todoTitle">${todo.title}</p>
<p class="todoDescription">${todo.description}</p>
<p class="todoDueDate">${formattedDate}</p>
<p class="todoPriority">${todo.priority}</p>
<label><input type="checkbox" class="completion"> Todo complete</label>
`
todoContainer.appendChild(todoCard);