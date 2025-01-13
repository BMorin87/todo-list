import "./style.css";
import { format, subDays } from 'date-fns';

class Todo {
  constructor(
    title = "My Todo",
    dueDate = subDays(new Date(), -1), // Default to tomorrow.
    description = "Todo Description",
    priority = "Medium",
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
    this.setName(name);
    this.todoList = [new Todo()];
  }

  setName = (name) => {this.name = name}
}

class ScreenController {
  constructor() {
    this.projectList = [];
    this.LoadDefaultProject()
    this.activeProject = this.projectList[0];

    const addProjectButton = document.getElementById("addProject");
    const addTodoButton = document.getElementById("addTodo");
    const completeCheckbox = document.getElementById("completion")
    addProjectButton.addEventListener('click', () => this.AddProjectOnClick());
    addTodoButton.addEventListener('click', () => this.AddTodoOnClick());
    completeCheckbox.addEventListener('change', (event) => this.CompleteOnChange(event))
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

  AddProjectOnClick() {
    const newProject = new Project("New Project");
    this.projectList.push(newProject);
    this.AddProjectToSelector(newProject);
  }

  AddTodoOnClick() {
    const newTodo = new Todo("New Todo");
    const newCard = this.CreateTodoCard(newTodo);
    this.AddCardToContainer(newCard);
  }

  CompleteOnChange(event) {
    const checkbox = event.target;
    const card = checkbox.closest(".todoCard");
    card.classList.remove("complete");
    if (checkbox.checked) {card.classList.add("complete");}
  }

  CreateTodoCard(todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard")
    const formattedDate = format(todo.dueDate, "yyyy-MM-dd")
    todoCard.innerHTML = `
    <h3 class="todoTitle">${todo.title}</h3>
    <p class="todoDescription">${todo.description}</p>
    <p class="todoDueDate">${formattedDate}</p>
    <p class="todoPriority">
      <select id="priorityDropdown">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
       priority
    </p>
    <label><input type="checkbox" id="completion"> Complete</label>
    `
    const dropdown = todoCard.querySelector("select");
    dropdown.value = todo.priority;
    if (todo.priority === "High") {todoCard.classList.add("highPriority");}
    else if (todo.priority === "Low") {todoCard.classList.add("lowPriority");}
    dropdown.addEventListener("change", (event) => this.PriorityOnChange(event))
    return todoCard;
  }

  PriorityOnChange(event) {
    const dropdown = event.target;
    const priority = dropdown.value;
    const card = dropdown.closest(".todoCard");
    card.classList.remove("highPriority", "lowPriority");
    if (priority === "High") {card.classList.add("highPriority");}
    else if (priority === "Low") {card.classList.add("lowPriority");}
  }

  AddCardToContainer(card) {
    const todoContainer = document.querySelector(".todoContainer");
    todoContainer.appendChild(card);
  }

  AddProjectToSelector(project) {
    const selector = document.querySelector(".projectSelector");
    const newOption = document.createElement('option');
    newOption.text = project.name;
    selector.add(newOption);
  }
}

const controller = new ScreenController();