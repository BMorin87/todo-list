import "./style.css";
import { format, subDays } from 'date-fns';

class Todo {
  constructor(
    title = "My Todo",
    dueDate = new Date(),
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
const formattedDate = format(todo.dueDate, 'yyyy-MM-dd');
console.log(formattedDate);