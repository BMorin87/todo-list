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

  setTitle = (title) => { this.title = title; }
  setDueDate = (dueDate) => { this.dueDate = dueDate; }
  setDescription = (description) => { this.description = description; }

  setComplete = () => { this.complete = true; }
  setIncomplete = () => { this.complete = false; }

  setPriority = (priority) => { this.priority = priority; }
}

class Project {
  constructor(name = "My Project") {
    this.name = name;
    this.todoList = [new Todo()];
  }
}

class ScreenController {
  constructor() {
    this.projectList = [];
    this.LoadDefaultProject()
    this.activeProject = this.projectList[0];

    const addProjectButton = document.getElementById("addProject");
    const addTodoButton = document.getElementById("addTodo");
    addProjectButton.addEventListener('click', () => this.AddProjectClick());
    addTodoButton.addEventListener('click', () => this.AddTodoClick());
  }

  LoadDefaultProject() {
    const defaultProject = new Project();
    this.projectList.push(defaultProject);

    // Create a default todo card.
    const todo = this.projectList[0].todoList[0];
    const card = this.CreateTodoCard(todo);
    this.AddCardToContainer(card);

    // Add the default project to the dropdown menu.
    this.AddProjectToSelector(defaultProject)
  }

  AddProjectClick() {
    const newProject = new Project("New Project");
    this.projectList.push(newProject);
    this.AddProjectToSelector(newProject);
  }

  AddTodoClick() {
    const newTodo = new Todo("New Todo");
    const newCard = this.CreateTodoCard(newTodo);
    this.AddCardToContainer(newCard);
  }

  CreateTodoCard(todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard")
    const formattedDate = format(todo.dueDate, "yyyy-MM-dd")
    todoCard.innerHTML = `
    <h3 class="todoTitle">${todo.title}</h3>
    <p class="todoDescription">${todo.description}</p>
    <p class="todoDueDate">${formattedDate}</p>
    <p class="todoPriority">${todo.priority}</p>
    <label><input type="checkbox" class="completion"> Todo complete</label>
    `
    return todoCard;
  }

  AddCardToContainer(card) {
    const todoContainer = document.getElementById("todoContainer");
    todoContainer.appendChild(card);
  }

  AddProjectToSelector(project) {
    const selector = document.getElementById("projectSelector");
    const newOption = document.createElement('option');
    newOption.text = project.name;
    selector.add(newOption);
  }
}

const controller = new ScreenController();