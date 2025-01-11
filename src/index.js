import "./style.css";

class Todo {
  constructor() {
    this.title = "Default";
    this.description = "Default";
    this.dueDate = "Next week";
    this.priority = "High";
    this.notes = "";
    this.complete = false;
  }
}

class Project {
  constructor() {
    this.name = "Project 1";
    this.todoList = [];
    this.todoList.push(new Todo());
  }
}

const project = new Project();
console.log(project.todoList[0].title);