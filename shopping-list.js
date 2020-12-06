function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function redirectToHome() {
  window.location.href = "index.html";
}

function addNewElement(value) {
  const li = document.createElement("li");
  const inputValue = value;
  const textNode = document.createTextNode(inputValue);
  li.appendChild(textNode);
  document.getElementById("shopping-list").appendChild(li);
}

function onLoad() {
  // check if user is logged in.
  const loggedInUser = sessionStorage.getItem("loggedInUserName");
  if (!loggedInUser) redirectToHome();

  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(({ name }) => name === loggedInUser);
  // if user is not present redirect to home
  if (!user) redirectToHome();

  if (users.list.length) {
    users.list.map((listItem) => addNewElement(listItem));
  }
}

function validateFormOnSubmit(formData) {
  addNewElement(formData.item.value);
}
