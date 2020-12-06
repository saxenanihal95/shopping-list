function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function redirectToHome() {
  window.location.href = "index.html";
}

function getLoggedInUser() {
  return sessionStorage.getItem("loggedInUserName");
}

function getShoppingList() {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) redirectToHome();
  return JSON.parse(localStorage.getItem(loggedInUser));
}

function addToShoppingList(item) {
  displayItem(item)
  const loggedInUser = getLoggedInUser();
  const existingList = getShoppingList() || [];
  existingList.push(item);
  localStorage.setItem(loggedInUser, JSON.stringify(existingList))
}

function displayItem(value) {
  const li = document.createElement("li");
  const inputValue = value;
  const textNode = document.createTextNode(inputValue);
  li.appendChild(textNode);
  document.getElementById("shopping-list").appendChild(li);
}

function onLoad() {
  const shoppingList = getShoppingList();
  if (shoppingList) {
    shoppingList.map((listItem) => displayItem(listItem));
  }
}

function validateFormOnSubmit(formData) {
  addToShoppingList(formData.item.value);
}
