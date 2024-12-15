import Handlebars from "handlebars";
import users from "./data.js";

const templateSource = `
  <ul class="user-list">
    {{#each users}}
    <li>
      <h2>{{name}}</h2>
      <p>Age: {{age}}</p>
      <p>Occupation: {{occupation}}</p>
      <button class="edit-button" data-id="{{id}}">Edit</button>
    </li>
    {{/each}}
  </ul>
`;

const template = Handlebars.compile(templateSource);

const container = document.getElementById("app");

const render = (data) => {
  const markup = template({ users: data });
  container.innerHTML = markup;
};

render(users.users);

const filterByAge = (minAge) => {
  const filteredUsers = users.users.filter((user) => user.age >= minAge);
  render(filteredUsers);
};

const sortByAge = (order = "asc") => {
  const sortedUsers = [...users.users].sort((a, b) => {
    return order === "asc" ? a.age - b.age : b.age - a.age;
  });
  render(sortedUsers);
};

const editUser = (id) => {
  const user = users.users.find((user) => user.id === id);
  const newName = prompt("Enter new name:", user.name);
  if (newName) {
    user.name = newName;
    render(users.users);
  }
};

const addControls = () => {
  const filterButton = document.createElement("button");
  filterButton.textContent = "Show users age >= 30";
  filterButton.addEventListener("click", () => filterByAge(30));

  const sortAscButton = document.createElement("button");
  sortAscButton.textContent = "Sort by Age (Ascending)";
  sortAscButton.addEventListener("click", () => sortByAge("asc"));

  const sortDescButton = document.createElement("button");
  sortDescButton.textContent = "Sort by Age (Descending)";
  sortDescButton.addEventListener("click", () => sortByAge("desc"));

  document.body.insertBefore(filterButton, container);
  document.body.insertBefore(sortAscButton, container);
  document.body.insertBefore(sortDescButton, container);
};

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const userId = Number(event.target.dataset.id);
    editUser(userId);
  }
});

addControls();
