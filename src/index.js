import "./style.css";
import { format, subDays } from 'date-fns';

class Todo {
  constructor(
    title = "Your Todo",
    dueDate = subDays(new Date(), -1),
    description = "Todo Description",
    priority,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    if (priority !== null) {this.priority = priority}
    this.notes = "";
    this.complete = false;
  }
}

class Project {
  constructor(name = "Project 1") {
    this.name = name;
    this.todoList = [new Todo()];
  }
}

const project = new Project();
const formattedDate = format(project.todoList[0].dueDate, 'yyyy-MM-dd');
console.log(formattedDate);